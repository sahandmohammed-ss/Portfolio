import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "Cosmic Dashboard",
    description:
      "A real-time analytics dashboard with interactive data visualizations and live updates.",
    tags: ["React", "D3.js", "TypeScript", "WebSocket"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Neural Commerce",
    description:
      "AI-powered e-commerce platform with personalized recommendations and smart search.",
    tags: ["Next.js", "TensorFlow", "Prisma", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Quantum Chat",
    description:
      "End-to-end encrypted real-time messaging app with voice and video capabilities.",
    tags: ["WebRTC", "Socket.io", "React", "Node.js"],
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Stellar Tracker",
    description:
      "Project management tool with Gantt charts, time tracking, and team collaboration.",
    tags: ["Vue.js", "Firebase", "Tailwind", "Chart.js"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Galaxy Finance",
    description:
      "Cryptocurrency portfolio tracker with real-time prices and advanced analytics.",
    tags: ["React", "GraphQL", "Apollo", "Recharts"],
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=600&fit=crop",
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Nebula Docs",
    description:
      "Collaborative documentation platform with markdown support and version control.",
    tags: ["Next.js", "MDX", "PostgreSQL", "Vercel"],
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=600&fit=crop",
    demoUrl: "#",
    githubUrl: "#",
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
