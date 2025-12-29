import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
}

export const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    const stars: Star[] = [];
    const numStars = 400;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 1000,
        size: Math.random() * 2,
      });
    }

    let scrollY = 0;
    let isVisible = true;
    let animationId: number;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      // Pause animation when tab is hidden
      if (!isVisible) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      ctx.fillStyle = 'rgba(10, 14, 26, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach((star) => {
        // Parallax effect based on scroll
        const parallaxOffset = scrollY * (star.z / 1000) * 0.5;
        
        star.z -= 0.5;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
        }

        const k = 128.0 / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY - parallaxOffset;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = (1 - star.z / 1000) * star.size;
          const opacity = 1 - star.z / 1000;
          
          // Create gradient for glow effect
          const gradient = ctx.createRadialGradient(px, py, 0, px, py, size * 2);
          gradient.addColorStop(0, `rgba(0, 217, 255, ${opacity})`);
          gradient.addColorStop(0.5, `rgba(255, 0, 110, ${opacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: 'linear-gradient(to bottom, #0a0e1a 0%, #1a1f3a 100%)' }}
    />
  );
};
