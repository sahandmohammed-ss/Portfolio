import { Mail, Github, Linkedin, X, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Custom Telegram Icon Component
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
  </svg>
);

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export const Contact = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Anti-bot honeypot field
  });

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsFormOpen(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) return;

    // Client-side validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      toast.error("⚠️ Missing information", {
        description: "Please fill out all fields before sending.",
        duration: 3000,
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("⚠️ Invalid email", {
        description: "Please enter a valid email address.",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get Turnstile token (if widget is loaded)
      let turnstileToken = "";
      if (
        window.turnstile &&
        typeof window.turnstile.getResponse === "function"
      ) {
        turnstileToken = window.turnstile.getResponse();
      }

      // Call our secure backend API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          honeypot: formData.honeypot, // Should be empty
          turnstileToken,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Show cosmic success message
        toast.success("🚀 Message transmitted successfully!", {
          description:
            "Your message has been launched into the cosmic void. I'll respond soon!",
          duration: 4000,
        });

        closeModal();
        // Reset form
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
            honeypot: "",
          });
        }, 300);
      } else if (response.status === 429) {
        // Rate limit exceeded
        toast.error("⏰ Too many transmissions", {
          description:
            "You've reached the message limit. Please try again later.",
          duration: 5000,
        });
      } else {
        // Other errors
        toast.error("⚠️ Transmission failed", {
          description:
            result.message ||
            "Unable to send message. Please try again or email me directly.",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("⚠️ Connection lost", {
        description: "Please check your internet connection and try again.",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);

      // Reset Turnstile if present
      if (window.turnstile && typeof window.turnstile.reset === "function") {
        window.turnstile.reset();
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      className="min-h-screen py-16 sm:py-20 relative flex items-center"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-slideUp">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold mb-4 sm:mb-6 text-foreground">
              Let's Work{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
              Interested in building real-world experience and growing through
              collaboration. I’m always open to joining impactful projects or
              contributing to meaningful initiatives.
            </p>

            <div className="glass rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch mb-6 sm:mb-8">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl gradient-coral text-white font-semibold text-base sm:text-lg hover:scale-105 transition-all duration-300 glow-coral w-full sm:w-auto justify-center"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="whitespace-nowrap">Send Email</span>
                </button>
                <a
                  href="#"
                  className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl glass border-2 border-primary/50 text-foreground font-semibold text-base sm:text-lg hover:border-primary hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center group"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-primary transition-colors" />
                  <span className="whitespace-nowrap">Download Resume</span>
                </a>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center pt-6 sm:pt-8 border-t border-border">
                {[
                  {
                    icon: Github,
                    label: "GitHub",
                    url: "https://github.com/sahandmohammed-ss",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    url: "https://www.linkedin.com/in/sahand-mohammed-61124638a",
                  },
                  {
                    icon: TelegramIcon,
                    label: "Telegram",
                    url: "https://t.me/SahandMohammedx",
                  },
                  {
                    icon: WhatsAppIcon,
                    label: "WhatsApp",
                    url: "https://wa.me/9647732821122",
                  },
                ].map(({ icon: Icon, label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 sm:p-4 rounded-xl glass hover:glass hover:border-primary/50 transition-all hover:scale-110 hover:glow-cyan group"
                    aria-label={label}
                    title={label}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div className="text-xs sm:text-sm text-muted-foreground px-4">
              <p>© 2025 Sahand Mohammed. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {isFormOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
            isClosing ? "opacity-0" : "opacity-100 animate-fadeIn"
          }`}
        >
          <div
            className={`glass rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-primary/30 shadow-2xl transition-all duration-300 ${
              isClosing
                ? "opacity-0 scale-95 translate-y-4"
                : "opacity-100 scale-100 translate-y-0 animate-slideUp"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-primary/10 transition-colors group"
              aria-label="Close form"
            >
              <X className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>

            {/* Form Header */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold mb-2 sm:mb-3 text-foreground">
                Get In{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Touch
                </span>
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Fill out the form below and I'll get back to you as soon as
                possible.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg glass border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder-muted-foreground text-sm sm:text-base"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg glass border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder-muted-foreground text-sm sm:text-base"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg glass border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder-muted-foreground text-sm sm:text-base"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg glass border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder-muted-foreground resize-none text-sm sm:text-base"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Honeypot field - hidden from users, but bots will fill it */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Cloudflare Turnstile CAPTCHA */}
              <div className="flex justify-center">
                <div
                  className="cf-turnstile"
                  data-sitekey={
                    import.meta.env.VITE_TURNSTILE_SITE_KEY ||
                    "1x00000000000000000000AA"
                  }
                  data-theme="dark"
                  data-size="normal"
                ></div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 sm:px-8 py-3 sm:py-4 rounded-lg gradient-coral text-white font-semibold text-base sm:text-lg hover:scale-105 transition-all glow-coral flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg glass border-2 border-primary/50 text-foreground font-semibold text-base sm:text-lg hover:border-primary hover:glow-cyan transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
