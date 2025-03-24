
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Code, FileCode, Layout, Check, RefreshCw, Zap } from 'lucide-react';

interface WorkflowProps {
  className?: string;
}

interface WorkflowStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  commandLine: string;
  number: number;
  delay?: number;
}

const WorkflowStep: React.FC<WorkflowStepProps> = ({ icon, title, description, commandLine, number, delay = 0 }) => {
  return (
    <div 
      className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 relative"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-6">
        <div className="relative">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-terminal-black border border-terminal-green/50 text-terminal-green">
            {icon}
          </div>
          {number < 5 && (
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 h-12 w-px bg-terminal-green/30"></div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-mono font-bold mb-2 text-terminal-white">{title}</h3>
          <p className="text-foreground/80 mb-4 font-mono text-sm">{description}</p>
          
          <div className="bg-terminal-black/80 border border-terminal-green/20 rounded-md p-3 font-mono text-xs text-terminal-green">
            <span className="mr-2">$</span>
            {commandLine}
          </div>
        </div>
      </div>
    </div>
  );
};

const Workflow: React.FC<WorkflowProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);

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
      id="workflow" 
      ref={sectionRef}
      className={cn(
        "py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-ocean-darker/10 to-transparent",
        className
      )}
    >
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-terminal-green/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4PSIxIiB5PSIxIiByeD0iMC41IiBmaWxsPSJyZ2JhKDkzLCAxNjksIDIzMywgMC4xKSIvPjwvc3ZnPg==')] opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 terminal-section-title inline-block">
            workflow
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 max-w-2xl mx-auto text-foreground/80 font-mono">
            # How I transform ideas into exceptional digital experiences
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <WorkflowStep 
            icon={<Layout size={24} />}
            title="Discovery & Planning"
            description="Deep dive into your business goals and requirements to create a solid foundation for your project."
            commandLine="mkdir new_project && cd new_project && touch requirements.md"
            number={1}
            delay={0}
          />
          
          <WorkflowStep 
            icon={<FileCode size={24} />}
            title="Design & Wireframing"
            description="Create intuitive interfaces and user experiences that align with your brand and business objectives."
            commandLine="figma --new design.fig && npm install design-system"
            number={2}
            delay={200}
          />
          
          <WorkflowStep 
            icon={<Code size={24} />}
            title="Development"
            description="Transform designs into fully functional websites with clean, efficient, and maintainable code."
            commandLine="git init && npm install && wp scaffold theme custom_theme"
            number={3}
            delay={400}
          />
          
          <WorkflowStep 
            icon={<RefreshCw size={24} />}
            title="Testing & Refinement"
            description="Rigorous testing across devices and browsers to ensure a flawless user experience."
            commandLine="npm run test && lighthouse --view && pagespeed insights"
            number={4}
            delay={600}
          />
          
          <WorkflowStep 
            icon={<Zap size={24} />}
            title="Launch & Optimization"
            description="Seamless deployment and post-launch optimization to ensure peak performance."
            commandLine="git push production && wp deploy --optimize --cache"
            number={5}
            delay={800}
          />
        </div>
        
        <div className="text-center mt-16">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 inline-flex items-center bg-gradient-to-r from-terminal-black to-ocean-dark px-6 py-4 rounded-lg border border-terminal-green/30">
            <Check className="text-terminal-green mr-2" />
            <p className="font-mono text-sm text-terminal-white">Ready to start your project? Let's create something amazing together.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
