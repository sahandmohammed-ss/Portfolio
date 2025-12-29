import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory rate limiter (for serverless, use Vercel KV or Upstash Redis in production)
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(ip);
    }
  }
}, 3600000); // 1 hour

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Sanitize input to prevent XSS and injection attacks
 */
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .slice(0, 1000); // Limit length
}

/**
 * Get client IP address from request headers
 */
function getClientIP(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded 
    ? (typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded[0])
    : req.headers['x-real-ip'] || 'unknown';
  return typeof ip === 'string' ? ip : 'unknown';
}

/**
 * Check rate limit for IP address
 * Returns true if rate limit exceeded
 */
function isRateLimited(ip: string, maxRequests = 3, windowMs = 3600000): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    // New window
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return false;
  }

  if (entry.count >= maxRequests) {
    console.warn(`[SPAM BLOCKED] IP ${ip} exceeded rate limit (${entry.count} attempts)`);
    return true;
  }

  // Increment counter
  entry.count++;
  return false;
}

/**
 * Verify Cloudflare Turnstile token
 */
async function verifyTurnstile(token: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.warn('[WARNING] TURNSTILE_SECRET_KEY not set - skipping verification');
    return true; // Allow in development
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('[ERROR] Turnstile verification failed:', error);
    return false;
  }
}

/**
 * Send email using Web3Forms
 */
async function sendEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      access_key: process.env.WEB3FORMS_ACCESS_KEY,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      to: process.env.CONTACT_EMAIL || 'sahandmohammed4@gmail.com',
    }),
  });

  const result = await response.json();
  return result.success === true;
}

/**
 * Main API handler
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { name, email, subject, message, honeypot, turnstileToken } = req.body;

    // 1. HONEYPOT CHECK - If filled, it's a bot
    if (honeypot) {
      console.warn('[BOT DETECTED] Honeypot field filled');
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid submission' 
      });
    }

    // 2. VALIDATE INPUTS
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email address' 
      });
    }

    // 3. GET CLIENT IP
    const clientIP = getClientIP(req);

    // 4. RATE LIMIT CHECK (3 requests per hour per IP)
    if (isRateLimited(clientIP)) {
      console.warn(`[RATE LIMIT] IP ${clientIP} blocked`);
      return res.status(429).json({ 
        success: false, 
        message: 'Too many requests. Please try again later.',
        retryAfter: 3600, // seconds
      });
    }

    // 5. VERIFY TURNSTILE (CAPTCHA)
    if (process.env.NODE_ENV === 'production') {
      const isValidCaptcha = await verifyTurnstile(turnstileToken);
      if (!isValidCaptcha) {
        console.warn(`[CAPTCHA FAILED] IP ${clientIP}`);
        return res.status(400).json({ 
          success: false, 
          message: 'Captcha verification failed. Please try again.' 
        });
      }
    }

    // 6. SANITIZE INPUTS
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message),
    };

    // 7. SEND EMAIL
    const emailSent = await sendEmail(sanitizedData);

    if (!emailSent) {
      throw new Error('Failed to send email');
    }

    // 8. LOG SUCCESS
    console.log(`[SUCCESS] Email sent from ${clientIP} (${sanitizedData.email})`);

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error('[ERROR] Contact form submission failed:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error. Please try again later.' 
    });
  }
}
