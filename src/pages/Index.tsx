import { Starfield } from '@/components/Starfield';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Contact } from '@/components/Contact';

const Index = () => {
  return (
    <div className="relative">
      <Starfield />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
};

export default Index;
