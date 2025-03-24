
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
          terminalOutput.innerHTML += '<span class="text-terminal-green">webseidon@server</span>:<span class="text-terminal-blue">~/about</span>$ <span class="terminal-cursor">█</span>';
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
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-terminal-green/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek00NiAxNGgtMnYtNGgydjR6TTI0IDIyaC00djJoNHYyaDJ2LTRoLTJ6TTEyIDMwdi0ySDh2MmgzdjJoMnYtMmgtMXptLTIgNnYtMkg4djJoMnptMCAxMHYtMmgtMnYyaDJ6bTMyLTI2di00aC0ydjRoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Terminal Section */}
          <div className="w-full md:w-5/12 relative">
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
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
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <div className="flex items-center mb-4">
                <Terminal className="text-terminal-green mr-3" />
                <h2 className="terminal-section-title text-2xl font-mono font-bold">
                  cat about.md
                </h2>
              </div>
              
              <p className="text-lg mb-6 text-foreground/80 font-mono">
                I'm a full-stack developer specializing in creating exceptional WordPress websites and custom web applications with the power and elegance of Poseidon's command over the digital seas.
              </p>

              <p className="mb-8 text-foreground/80 font-mono">
                With years of experience in web development, I combine technical expertise with creative design to deliver websites that not only look stunning but also perform flawlessly. I take pride in creating digital experiences that make waves in the industry.
              </p>

              <div className="bg-terminal-black/20 border border-terminal-green/20 rounded-lg p-4 mb-8">
                <div className="font-mono text-sm mb-2 text-terminal-green">
                  $ grep "skills" ./profile.json | jq
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 terminal-list text-sm">
                  <li>WordPress Development</li>
                  <li>Custom Theme Creation</li>
                  <li>E-commerce Solutions</li>
                  <li>Performance Optimization</li>
                  <li>Responsive Design</li>
                  <li>API Integration</li>
                  <li>SEO Optimization</li>
                  <li>Website Maintenance</li>
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
