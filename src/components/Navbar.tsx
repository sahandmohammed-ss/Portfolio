import { useState, useEffect } from "react";
import { Code2, Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Scroll spy to detect active section
      const sections = ["home", "about", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 200; // Offset for better detection
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    
    handleScroll(); // Call once on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              className="inline-flex items-center gap-2 group select-none"
              aria-label="Go to homepage"
            >
              <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:animate-glow transition-all" />
              <span className="text-base sm:text-xl font-poppins font-bold text-foreground">
                Sahand Mohammed
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {["home", "about", "projects", "skills", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`${
                    activeSection === item
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                  } transition-colors capitalize font-medium relative group`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-hero transition-all ${
                    activeSection === item ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </button>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:flex">
              <button
                onClick={() => scrollToSection("contact")}
                className="px-4 lg:px-6 py-2 rounded-lg gradient-coral text-white font-semibold hover:glow-coral transition-all hover:scale-105 text-sm lg:text-base"
              >
                Let's Talk
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg glass hover:bg-primary/10 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-primary" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="relative h-full flex flex-col items-center justify-center gap-8 animate-fadeIn">
            {["home", "about", "projects", "skills", "contact"].map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-2xl font-poppins font-semibold ${
                  activeSection === item
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                } transition-all capitalize relative group`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item}
                <span className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-hero transition-all rounded-full ${
                  activeSection === item ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </button>
            ))}
            
            <button
              onClick={() => scrollToSection("contact")}
              className="mt-8 px-8 py-4 rounded-lg gradient-coral text-white font-semibold text-lg glow-coral"
            >
              Let's Talk
            </button>
          </div>
        </div>
      )}
    </>
  );
};
