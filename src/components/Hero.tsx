import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

const roles = [
  "Frontend Engineer",
  "Full-Stack Developer",
  "UI/UX Enthusiast",
  "Creative Coder",
];

export const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentWord.length) {
            setDisplayText(currentWord.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 sm:pt-0"
    >
      {/* Nebula background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-[80px] sm:blur-[120px] animate-float" />
        <div
          className="absolute bottom-1/4 -right-20 w-64 h-64 sm:w-96 sm:h-96 bg-accent/20 rounded-full blur-[80px] sm:blur-[120px] animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="animate-slideUp">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-poppins font-extrabold mb-4 sm:mb-6 leading-tight">
            Crafting Web
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Experiences
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-3 sm:mb-4 font-inter px-4">
            Turning ideas into code
          </p>

          <div className="h-7 sm:h-8 mb-8 sm:mb-10 md:mb-12">
            <p className="text-base sm:text-lg md:text-xl text-primary font-semibold font-inter">
              {displayText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4 sm:px-0">
            <button
              onClick={scrollToProjects}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg gradient-hero text-background font-semibold text-base sm:text-lg hover:scale-105 transition-all glow-cyan"
            >
              View My Work
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg glass border-2 border-primary/50 text-foreground font-semibold text-base sm:text-lg hover:border-primary hover:glow-cyan transition-all"
            >
              Get In Touch
            </button>
          </div>
        </div>

        <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 ml-2 flex justify-center">
          <button
            onClick={scrollToProjects}
            className="animate-bounce"
            aria-label="Scroll to projects"
          >
            <ArrowDown className="w-8 h-8 text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
};
