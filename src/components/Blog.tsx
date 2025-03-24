
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
        className="block h-full rounded-xl overflow-hidden bg-white dark:bg-ocean-darker shadow-sm hover:shadow-ocean transition-all duration-300"
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
          <div className="flex items-center text-xs text-foreground/60 mb-3 font-mono">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {date}
          </div>
          
          <h3 className="text-lg font-bold font-serif mb-2 group-hover:text-gold transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-foreground/70 text-sm line-clamp-3">
            {excerpt}
          </p>
          
          <div className="mt-4 flex items-center text-ocean-light text-sm font-medium">
            <span className="mr-2">Read more</span>
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
      title: "10 Essential WordPress Plugins for E-Commerce Sites",
      excerpt: "Discover the must-have plugins that will transform your WordPress store into a conversion machine with enhanced functionality and user experience.",
      date: "June 15, 2023",
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      category: "E-Commerce",
      url: "#"
    },
    {
      title: "How to Optimize WordPress Performance for Core Web Vitals",
      excerpt: "Learn proven techniques to improve your WordPress site's speed and performance metrics to boost SEO rankings and provide a better user experience.",
      date: "May 23, 2023",
      image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      category: "Performance",
      url: "#"
    },
    {
      title: "Creating Custom Block Patterns in WordPress Gutenberg",
      excerpt: "Master the art of building reusable block patterns to streamline your content creation process and maintain design consistency across your site.",
      date: "April 10, 2023",
      image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      category: "Development",
      url: "#"
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
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="h-full w-full bg-terminal-grid bg-[size:20px_20px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 terminal-section-title inline-block">
            grep "insights" /var/www/blog
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 max-w-2xl mx-auto text-foreground/80 font-mono">
            <span className="text-terminal-magenta">find</span> ./articles <span className="text-terminal-red">-type</span> f <span className="text-terminal-red">-name</span> "*.md" <span className="text-terminal-red">|</span> <span className="text-terminal-cyan">head</span> -n 3
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
          <button className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 btn-terminal">
            <span className="mr-2">View All Articles</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        
        {/* Newsletter signup */}
        <div className="mt-20 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 max-w-4xl mx-auto">
          <div className="p-8 rounded-xl bg-ocean-gradient text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-serif font-bold mb-3">Subscribe to Our Newsletter</h3>
                <p className="text-white/80 mb-4">
                  Get the latest WordPress tips, tricks, and tutorials delivered directly to your inbox.
                </p>
                <div className="flex items-center text-sm text-white/70 font-mono">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                  One email per month. No spam.
                </div>
              </div>
              
              <div>
                <form className="space-y-3">
                  <div>
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      className="w-full px-4 py-3 rounded-md border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                  <button type="submit" className="w-full btn-gold">
                    <span className="mr-2">Subscribe</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
