import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProjectsProps {
  className?: string;
}

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  delay?: number;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, category, image, delay = 0, onClick }) => {
  return (
    <div 
      className="opacity-100 translate-y-0 transition-all duration-700 relative cursor-pointer group"
      style={{ transitionDelay: `${delay}ms` }}
      onClick={onClick}
    >
      <div className="overflow-hidden rounded-xl shadow-lg relative">
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-darker to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300 z-10"></div>
        <div 
          className="aspect-[4/3] group-hover:scale-110 transition-transform duration-700 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
          <p className="text-gold text-sm tracking-wider uppercase opacity-100 transition-colors duration-300">{category}</p>
          <h3 className="text-xl font-serif font-bold text-white opacity-100 transition-colors duration-300">{title}</h3>
          <div className="mt-4 opacity-100 transition-transform duration-300">
            <span className="px-4 py-2 rounded-full text-xs border border-gold/30 text-gold hover:bg-gold hover:text-ocean-darker transition-colors duration-300 group-hover:border-gold/60">
              Zobrazit detail
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectDetail: React.FC<{
  project: {
    title: string;
    category: string;
    image: string;
    description: string;
    technologies: string[];
  } | null;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="relative bg-white dark:bg-ocean-darker rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in shadow-xl border border-ocean-light/20"
      >
        <div className="sticky top-0 right-0 pt-4 pr-4 flex justify-end z-10">
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="aspect-video rounded-lg overflow-hidden mb-6">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-ocean-light/10 text-ocean-medium rounded-full text-xs font-medium">{project.category}</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-serif font-bold">{project.title}</h2>
            
            <p className="text-foreground/80">{project.description}</p>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-ocean-light/10 text-ocean-medium rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button className="btn-gold">
                Visit Website
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC<ProjectsProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<null | (typeof projects[0] & { date?: string; url?: string })>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "autoskla-vejmola.cz",
      category: "Výměna autoskel",
      image: "/img/broken_windshield.jpg",
      description: "Webové stránky pro služby výměny a opravy autoskel. Web zahrnuje základní informace o službách, cenník, lokalizace a kontakt s formulářem.",
      technologies: ["WordPress", "Custom Theme", "Responsive Design", "SEO Optimization"]
    },
    {
      title: "unamisteel.cz",
      category: "Zámečnické služby",
      image: "/img/metalwork.jpg",
      description: "Firemní prezentace pro výrobce ocelových konstrukcí. Web obsahuje portfolio realizovaných projektů a přehled nabízených služeb.",
      technologies: ["WordPress", "Custom Theme", "JS Animations", "Responsive Design", "SEO Optimization"]
    },
    {
      title: "betrim.cz",
      category: "Lakovna a práškovna",
      image: "/img/betrim.jpg",
      description: "Práškovna a lakovna ve Fulneku. Web obsahuje portfolio realizovaných projektů a přehled nabízených služeb.",
      technologies: ["React", "Node.js", "Next.js", "Tailwind CSS"]
    },
  ];

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements) {
      animatedElements.forEach(el => {
        observer.observe(el);
      });
    }

    return () => {
      if (animatedElements) {
        animatedElements.forEach(el => {
          observer.unobserve(el);
        });
      }
    };
  }, []);

  return (
    <section 
      id="projects" 
      className={cn(
        "py-16 md:py-24 relative overflow-hidden",
        className
      )}
    >
      {/* Vylepšený gradient pozadí - upraveno na světlejší variantu */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-darker via-ocean-dark to-ocean-darker"></div>
      
      {/* Modrá mřížka v pozadí */}
      <div className="absolute inset-0 bg-cyber-grid-blue opacity-15 pointer-events-none"></div>
      
      {/* Šumový efekt pro texturovaný vzhled */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
      
      {/* Světelné gradientové efekty - zesíleny */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-wave-blue/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-wave-blue/15 rounded-full filter blur-3xl"></div>
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-gold/8 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gold/10 rounded-full filter blur-3xl"></div>
      
      {/* Dynamické světelné částice - zvýšena intenzita */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute h-2 w-2 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 7}s`,
              animationDelay: `${Math.random() * 4}s`,
              backgroundColor: i % 3 === 0 
                ? 'rgba(255, 215, 0, 0.3)' 
                : 'rgba(93, 169, 233, 0.3)',
              boxShadow: i % 3 === 0 
                ? '0 0 15px rgba(255, 215, 0, 0.4)' 
                : '0 0 15px rgba(93, 169, 233, 0.4)'
            }}
          />
        ))}
      </div>
      
      {/* Paprskovité světelné efekty - zvýšena intenzita */}
      <div 
        className="absolute -top-20 -left-20 w-96 h-96 opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(93, 169, 233, 0.5) 0%, rgba(93, 169, 233, 0) 70%)'
        }}
      ></div>
      <div 
        className="absolute -bottom-20 -right-20 w-96 h-96 opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(93, 169, 233, 0.5) 0%, rgba(93, 169, 233, 0) 70%)'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="opacity-100 translate-y-0 transition-all duration-700 terminal-section-title inline-block">
            find ./projekty -type f -name "*.html" | sort
          </h2>
          <p className="opacity-100 translate-y-0 transition-all duration-700 max-w-2xl mx-auto subtitle-text">
          # Ukázky uskutečněných projektů a spoluprací
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              category={project.category}
              image={project.image}
              delay={index * 100}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-terminal-black px-4 py-3 rounded-md border border-terminal-green/30 font-mono text-sm text-terminal-green">
            <span className="mr-2">$</span>
            Chceš taky takový web? Stačí zavolat, nebo napsat! <span className="text-terminal-red"></span>  <span className="text-terminal-cyan"></span><span className="blink-cursor">■</span>
          </div>
        </div>
        
        {/* Project Modal - upraven pro lepší sladění s designem */}
        {selectedProject && (
          <div className="fixed inset-0 bg-ocean-darker/80 backdrop-blur-md z-[100] overflow-y-auto flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
            
            <div 
              className="w-full max-w-4xl bg-gradient-to-b from-ocean-dark to-ocean-deeper rounded-xl shadow-2xl relative animate-fade-in-up overflow-hidden border border-ocean-light/20"
              ref={modalRef}
            >
              <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>
              <div className="absolute inset-0 holographic opacity-10 pointer-events-none"></div>
              
              <div className="flex justify-between items-center p-4 border-b border-ocean-light/10">
                <h3 className="text-xl font-bold font-mono text-terminal-cyan">
                  {selectedProject.title}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-terminal-white/70 hover:text-terminal-white transition-colors"
                  aria-label="Zavřít"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="relative rounded-lg overflow-hidden mb-4 border border-ocean-light/10">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs rounded-full bg-terminal-cyan/20 text-terminal-cyan font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-6">
                      <h4 className="text-lg font-bold mb-2 font-mono text-terminal-white">O projektu</h4>
                      <p className="text-terminal-white/80 font-mono text-sm">{selectedProject.description}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-bold mb-2 font-mono text-terminal-white">Podrobnosti</h4>
                      <ul className="space-y-2 text-sm text-terminal-white/80 font-mono">
                        <li><span className="text-terminal-green mr-2">Kategorie:</span>{selectedProject.category}</li>
                        <li><span className="text-terminal-green mr-2">Vytvořeno:</span>{selectedProject.date || "2024"}</li>
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-bold mb-2 font-mono text-terminal-white">Technický přístup</h4>
                      <p className="text-terminal-white/80 font-mono text-sm">
                        Projekt byl implementován s důrazem na výkon, SEO a moderní uživatelský zážitek.
                        Bylo využito responzivního designu a optimalizace pro mobilní zařízení.
                      </p>
                    </div>
                    
                    <div className="flex gap-4">
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="btn-terminal"
                      >
                        Zavřít
                      </button>
                      {selectedProject.url && (
                        <a
                          href={selectedProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                        >
                          <span className="font-mono mr-2">$</span>
                          Navštívit web
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
