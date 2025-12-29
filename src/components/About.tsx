import { useEffect, useRef, useState } from "react";

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20"
    >
      <div
        className={`max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold mb-6 sm:mb-8 text-center text-foreground">
          About{" "}
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Me
          </span>
        </h2>

        <div className="glass rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 space-y-4 sm:space-y-6">
          <p className="text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed">
          I'm An Aspiring Web Developer Focused On Building Clean, Modern, And Responsive Websites. I Enjoy Turning Ideas Into Functional And Engaging Web Projects While Continuously Improving My Skills. I'm Developing My Abilities In Both Front-End And Back-End Technologies, With An Emphasis On Writing Efficient And Reliable Code. I Stay Curious, Learn From Real Projects, And Aim To Grow Into A Developer Who Builds Practical, Meaningful Solutions For The Web.
          </p>

        </div>
      </div>
    </section>
  );
};
