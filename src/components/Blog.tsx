import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface BlogProps {
  className?: string;
}

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  url: string;
  delay?: number;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ 
  title, 
  excerpt, 
  date, 
  image, 
  category,
  url,
  delay = 0
}) => {
  return (
    <div 
      className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <a 
        href={url} 
        className="block h-full rounded-xl overflow-hidden bg-ocean-darker/90 border border-ocean-light/10 hover:border-ocean-light/30 shadow-sm hover:shadow-ocean transition-all duration-300"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-darker/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-block px-3 py-1 bg-gold text-ocean-darker text-xs font-medium rounded-full">
              {category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center text-xs text-terminal-cyan mb-3 font-mono">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {date}
          </div>
          
          <h3 className="text-lg font-bold font-serif mb-2 text-terminal-white group-hover:text-gold transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-terminal-white/80 text-sm line-clamp-3">
            {excerpt}
          </p>
          
          <div className="mt-4 flex items-center text-terminal-cyan text-sm font-medium group-hover:text-gold transition-colors duration-300">
            <span className="mr-2">Přečíst článek</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
};

const Blog: React.FC<BlogProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Blog posts data
  const blogPosts = [
    {
      title: "5 klíčových SEO strategií pro malé podnikatele v roce 2025",
      excerpt: "Objevte efektivní SEO techniky, které pomohou vaší firmě prosadit se v internetových vyhledávačích a přivedou vám kvalitní organickou návštěvnost bez nutnosti drahých PPC kampaní.",
      date: "15. ledna 2025",
      image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      category: "SEO",
      url: "https://webseidon-blog.cz"
    },
    {
      title: "WordPress vs. konkurenční CMS systémy - proč zvolit WordPress?",
      excerpt: "Komplexní srovnání WordPressu s jinými populárními CMS platformami. Zjistěte, proč WordPress stále dominuje trhu a jaké výhody přináší malým a středním podnikům.",
      date: "23. března 2025",
      image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "WordPress",
      url: "https://webseidon-blog.cz"
    },
    {
      title: "Elementor Pro: Kompletní návod pro tvorbu profesionálních webů",
      excerpt: "Naučte se využívat plný potenciál page builderu Elementor Pro. Od základního nastavení po pokročilé funkce a vlastní šablony - vše, co potřebujete pro vytvoření moderního webu.",
      date: "10. dubna 2025",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "Elementor",
      url: "https://webseidon-blog.cz"
    }
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
      id="blog" 
      ref={sectionRef}
      className={cn(
        "py-20 md:py-28 relative overflow-hidden",
        className
      )}
    >
      {/* Terminal-style background pattern */}
      <div className="absolute inset-0 bg-enhanced-gradient"></div>
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="h-full w-full bg-wavy-grid"></div>
      </div>
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 terminal-section-title inline-block">
            grep "Zajímavosti" /var/www/blog
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 max-w-2xl mx-auto subtitle-text">
            <span className="text-terminal-magenta">find</span> ./články <span className="text-terminal-red">-type</span> f <span className="text-terminal-red">-name</span> "*.md" <span className="text-terminal-red">|</span> <span className="text-terminal-cyan">head</span> -n 3
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {blogPosts.map((post, index) => (
            <BlogPostCard 
              key={index}
              {...post}
              delay={index * 100}
            />
          ))}
        </div>
        
        <div className="text-center">
          <a 
            href="https://webseidon-blog.cz" 
            className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 btn-terminal"
          >
            <span className="mr-2">Navštívit blog</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
        </div>
        
        
      </div>
    </section>
  );
};

export default Blog;
