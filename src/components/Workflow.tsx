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
          <p className="subtitle-text mb-4 text-sm">{description}</p>
          
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
          <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 max-w-2xl mx-auto subtitle-text">
            # Jak bude probíhat naše spolupráce
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <WorkflowStep 
            icon={<Layout size={24} />}
            title="START - Odeslání Vašeho požadavku"
            description="Využít můžete kontaktní formulář. Popište veškeré Vaše požadavky, nebo se jen na něco zeptejte. Společně zjistíme účel webových stránek a od toho se bude odvíjet i jejich tvorba."
            commandLine="echo 'Váš požadavek' > kontaktni_formular.txt"
            number={1}
            delay={0}
          />
          
          <WorkflowStep 
            icon={<FileCode size={24} />}
            title="Informace o Vašem podnikání"
            description="Bude Vám odeslán dodatečný formulář. Po přijetí požadavku se doptám na všechny potřebné informace, které budou potřeba pro správné vytvoření Vašich stránek."
            commandLine="mkdir podnikani_info && touch podnikani_info/formular.md"
            number={2}
            delay={200}
          />
          
          <WorkflowStep 
            icon={<Code size={24} />}
            title="Platba první části projektu"
            description="Při přijetí všech informací a vzájemnému potvrzení se neplatí celý projekt, ale pouze 50%. To slouží pro zaplacení počátečních nákladů, jako jsou například doména a webhosting."
            commandLine="payment --amount '50%' --service 'doména a webhosting'"
            number={3}
            delay={400}
          />
          
          <WorkflowStep 
            icon={<RefreshCw size={24} />}
            title="WEB - Začátek práce na projektu"
            description="Nyní začínám pracovat na Vámi zadaném projektu. Veškeré informace předem budou zodpovězeny. Kolik času zabere tvorba a konkrétní cenu se dozvíte ještě před tím, než začnu Vaši stránku zhotovovat."
            commandLine="cd nas_projekt && git init && npm start"
            number={4}
            delay={600}
          />
          
          <WorkflowStep 
            icon={<Zap size={24} />}
            title="Předání webu"
            description="Nakonec Vám předám veškeré informace a údaje. Následně se zaplatí zbylých 50%. To ale nemusí být konec naší společné cesty. Mohu Vám pomoci s další administrací webu a jeho obecné funkčnosti."
            commandLine="deploy --production && send_credentials.sh"
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
