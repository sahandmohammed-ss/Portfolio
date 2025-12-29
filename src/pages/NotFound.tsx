import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Rocket } from "lucide-react";
import { useEffect, useState } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  const [stars, setStars] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate random stars for background
    const generatedStars = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0e1a] to-[#1a1f3a] overflow-hidden flex items-center justify-center">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Nebula effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "1s" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-2xl mx-auto">
        {/* Floating Rocket Icon */}
        <div className="mb-8 inline-block animate-float">
          <div className="relative">
            <Rocket className="w-24 h-24 sm:w-32 sm:h-32 text-primary mx-auto animate-glow" />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gradient-to-b from-accent to-transparent blur-sm" />
          </div>
        </div>

        {/* 404 Title */}
        <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-poppins font-extrabold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-slideUp">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold mb-4 text-foreground animate-slideUp" style={{ animationDelay: "0.1s" }}>
          Lost in <span className="text-primary">Space</span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 leading-relaxed animate-slideUp" style={{ animationDelay: "0.2s" }}>
          Looks like you've drifted into uncharted territory. This page doesn't exist in our galaxy.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center animate-slideUp" style={{ animationDelay: "0.3s" }}>
          <button
            onClick={() => navigate("/")}
            className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg gradient-hero text-background font-semibold text-base sm:text-lg hover:scale-105 transition-all glow-cyan"
          >
            <Home className="w-5 h-5" />
            Return Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg glass border-2 border-primary/50 text-foreground font-semibold text-base sm:text-lg hover:border-primary hover:glow-cyan transition-all"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </div>

        {/* Fun Message */}
        <p className="mt-8 sm:mt-12 text-sm text-muted-foreground/60 animate-fadeIn" style={{ animationDelay: "0.5s" }}>
          Error Code: <span className="font-mono text-primary">COSMIC_NOT_FOUND</span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
