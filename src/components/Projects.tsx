
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
      className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 relative cursor-pointer group"
      style={{ transitionDelay: `${delay}ms` }}
      onClick={onClick}
    >
      <div className="overflow-hidden rounded-xl shadow-lg relative">
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-darker to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-10"></div>
        <div 
          className="aspect-[4/3] group-hover:scale-110 transition-transform duration-700 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
          <p className="text-gold text-sm tracking-wider uppercase transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">{category}</p>
          <h3 className="text-xl font-serif font-bold text-white transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">{title}</h3>
          <div className="mt-4 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-200">
            <span className="px-4 py-2 rounded-full text-xs border border-gold/30 text-gold hover:bg-gold hover:text-ocean-darker transition-colors duration-300">
              View Project
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
  const [selectedProject, setSelectedProject] = useState<null | {
    title: string;
    category: string;
    image: string;
    description: string;
    technologies: string[];
  }>(null);

  const projects = [
    {
      title: "Ocean Blue E-commerce",
      category: "E-commerce",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      description: "A premium e-commerce platform for a luxury ocean-themed jewelry brand. The design incorporates fluid animations and a sophisticated color palette that evokes the mystery and beauty of the deep sea.",
      technologies: ["WordPress", "WooCommerce", "Custom Theme", "GSAP", "PHP", "MySQL"]
    },
    {
      title: "Coastal Retreats",
      category: "Travel & Hospitality",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      description: "A booking website for exclusive beach-front properties. The site features interactive maps, real-time availability, and a seamless booking experience with secure payment processing.",
      technologies: ["WordPress", "Custom Plugin Development", "Google Maps API", "Stripe", "CSS3 Animations"]
    },
    {
      title: "Marine Conservation Fund",
      category: "Non-Profit",
      image: "https://images.unsplash.com/photo-1533713692156-f70938dc0d54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
      description: "A website for a marine conservation organization that needed a platform to showcase their work, accept donations, and organize volunteer events. The site includes interactive infographics and a donation system.",
      technologies: ["WordPress", "Donation System", "Event Management", "D3.js", "Responsive Design"]
    },
    {
      title: "Aquatic Sports Club",
      category: "Sports & Recreation",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      description: "A dynamic website for a water sports club offering various activities including surfing, sailing, and scuba diving. The site includes membership management, event scheduling, and weather integration.",
      technologies: ["WordPress", "Custom Theme", "Membership Plugin", "REST API", "Weather Integration"]
    },
    {
      title: "Deep Blue Analytics",
      category: "Business & Finance",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1426&q=80",
      description: "A corporate website for a data analytics firm that specializes in maritime shipping logistics. The site features interactive data visualizations and a client portal for accessing custom reports.",
      technologies: ["WordPress", "Custom Plugin", "Chart.js", "User Authentication", "AJAX"]
    },
    {
      title: "Seaside Wellness Spa",
      category: "Health & Wellness",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      description: "A tranquil website for a luxury spa offering ocean-inspired treatments. The design emphasizes relaxation with smooth animations, blue tones, and an intuitive booking system for treatments and packages.",
      technologies: ["WordPress", "Booking System", "Custom Theme", "CSS Animations", "Mobile Optimization"]
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
      ref={sectionRef}
      className={cn(
        "py-20 md:py-28 relative overflow-hidden",
        className
      )}
    >
      {/* Background Decoration */}
      <div className="absolute bottom-0 right-0 w-full h-1/2 bg-wave-pattern bg-repeat-x bg-contain opacity-5 transform rotate-180"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 section-title inline-block after:left-1/2 after:-translate-x-1/2">
            Recent Projects
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 max-w-2xl mx-auto text-foreground/80">
            Dive into my portfolio of WordPress websites and web applications that showcase my expertise in creating powerful digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              category={project.category}
              image={project.image}
              delay={index * 100}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectDetail 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
