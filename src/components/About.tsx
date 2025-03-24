import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Code, Terminal } from 'lucide-react';

interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

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

    // Terminal typing effect
    if (terminalRef.current) {
      const commands = [
        { cmd: "cat about.txt", delay: 800, output: "Full stack developer specialized in WordPress and modern web technologies" },
        { cmd: "ls -la skills/", delay: 1200, output: "drwxr-xr-x  2 webseidon dev   4096 Jun 12 09:15 wordpress\ndrwxr-xr-x  2 webseidon dev   4096 Jun 10 11:30 javascript\ndrwxr-xr-x  2 webseidon dev   4096 Jun 15 14:22 ui-ux\ndrwxr-xr-x  2 webseidon dev   4096 Jun 11 16:45 react\ndrwxr-xr-x  2 webseidon dev   4096 Jun 09 10:12 php" },
        { cmd: "grep -r 'experience' .", delay: 1000, output: "./experience.log:10+ years developing exceptional websites\n./clients.log:100+ happy clients with excellent experience" },
      ];

      const terminalOutput = terminalRef.current;
      let totalDelay = 0;

      const typeCommand = (cmd: string, callback: () => void) => {
        let i = 0;
        const interval = setInterval(() => {
          if (i < cmd.length) {
            terminalOutput.innerHTML += cmd.charAt(i);
            i++;
          } else {
            clearInterval(interval);
            terminalOutput.innerHTML += '<br>';
            callback();
          }
        }, 50);
      };

      const typeOutput = (output: string, callback: () => void) => {
        terminalOutput.innerHTML += output + '<br>';
        callback();
      };

      const processCommands = (index = 0) => {
        if (index >= commands.length) {
          terminalOutput.innerHTML += '<span class="text-terminal-green">webseidon@server</span>:<span class="text-terminal-blue">~/about</span>$ ';
          return;
        }

        const cmd = commands[index];
        
        setTimeout(() => {
          terminalOutput.innerHTML += '<span class="text-terminal-green">webseidon@server</span>:<span class="text-terminal-blue">~/about</span>$ ';
          
          typeCommand(cmd.cmd, () => {
            setTimeout(() => {
              typeOutput(cmd.output, () => {
                processCommands(index + 1);
              });
            }, 300);
          });
        }, cmd.delay);
      };

      // Start typing
      processCommands();
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
      id="about" 
      ref={sectionRef}
      className={cn(
        "py-20 md:py-28 relative overflow-hidden",
        className
      )}
    >
      {/* Hlavní pozadí */}
      <div className="absolute inset-0 bg-deep-ocean"></div>
      
      {/* Digitální déšť efekt - subtilní */}
      <div className="absolute inset-0 bg-digital-rain opacity-15 pointer-events-none"></div>
      
      {/* Šum pro texturu */}
      <div className="absolute inset-0 bg-noise"></div>
      
      {/* Constellation - hvězdné pozadí */}
      <div className="absolute inset-0 bg-constellation opacity-20 pointer-events-none"></div>
      
      {/* Rozmazané gradienty pro atmosféru */}
      <div className="absolute -left-40 top-1/4 w-96 h-96 bg-ocean-light/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -right-40 bottom-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Terminal Section */}
          <div className="w-full md:w-5/12 relative">
            <div className="opacity-100 translate-y-0 transition-all duration-700">
              <div className="bg-terminal-black border border-terminal-green/30 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-terminal-black px-4 py-2 border-b border-terminal-green/20 flex items-center">
                  <div className="flex gap-1.5 mr-2">
                    <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                    <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
                    <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
                  </div>
                  <div className="text-terminal-white/70 text-xs font-mono mx-auto">webseidon@server: ~/about</div>
                </div>
                <div className="p-4 font-mono text-sm text-terminal-white">
                  <div ref={terminalRef} className="terminal-output"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-7/12">
            <div className="opacity-100 translate-y-0 transition-all duration-700">
              <div className="flex items-center mb-4">
                <Terminal className="text-terminal-green mr-3" />
                <h2 className="terminal-section-title text-2xl font-mono font-bold">
                  cat about.md
                </h2>
              </div>
              
              <p className="text-lg mb-6 subtitle-text">
                Proč vybrat Webseidon? Široká nabídka služeb, která pokryje veškeré požadavky Vašeho podnikání.
              </p>

              <p className="mb-8 subtitle-text">
                Služby, které poskytuji Vám pomohou se vším, co budete potřebovat. Lze domluvit i funkcionality, které zde nenajdete. Přistupuji ke každému individuálně. Je to jen na Vás.
              </p>

              <div className="bg-terminal-black/20 border border-terminal-green/20 rounded-lg p-4 mb-8">
                <div className="font-mono text-sm mb-2 text-terminal-green">
                  $ grep "služby" ./profile.json | jq
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 terminal-list text-sm">
                  <li>Tvorba webových stránek</li>
                  <li>Redesign stávajícího webu</li>
                  <li>Tvorba loga</li>
                  <li>SEO optimalizace</li>
                  <li>WordPress řešení</li>
                  <li>Podpora a údržba webu</li>
                  <li>Copywriting</li>
                  <li>Webhosting a doména</li>
                </ul>
              </div>

              <button 
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                      top: offsetTop - 80,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="btn-terminal"
              >
                <Code className="mr-2 h-4 w-4" />
                ./contact.sh
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
