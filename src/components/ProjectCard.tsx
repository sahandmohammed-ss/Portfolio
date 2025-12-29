import { useState, useRef, MouseEvent } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
}

export const ProjectCard = ({ title, description, tags, image, demoUrl, githubUrl }: ProjectCardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="perspective-1000">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-card/60 border border-white/10 rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:glow-cyan preserve-3d h-full"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            decoding="async"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            style={{ imageRendering: 'auto' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-40" />
        </div>

        <div className="p-4 sm:p-6 flex flex-col">
          <h3 className="text-xl sm:text-2xl font-poppins font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-2">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-background transition-all hover:glow-cyan"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm font-semibold">Demo</span>
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-background transition-all hover:glow-magenta"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm font-semibold">Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
