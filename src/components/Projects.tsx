import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "BuildPro Construction",
    description:
      "A personal project — a modern, production-ready portfolio website template for construction/architecture companies. Features homepage, projects showcase, about section, and contact form with smooth animations and responsive design.",
    tags: ["Next.js 14", "React 18", "TypeScript", "Framer Motion", "Lenis"],
    image: "/projects/buildpro.png",
    demoUrl: "https://buildpro-construction-website.vercel.app/",
    githubUrl: "https://github.com/sahandmohammed-ss/buildpro-construction-website",
  },
];

export const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen py-16 sm:py-20 relative"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 animate-slideUp">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold mb-3 sm:mb-4 text-foreground">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            A selection of web projects I've built while learning and developing my skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
