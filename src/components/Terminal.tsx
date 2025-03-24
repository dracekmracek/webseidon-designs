
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
  className?: string;
}

const Terminal: React.FC<TerminalProps> = ({ className }) => {
  const [currentCommand, setCurrentCommand] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const commands = [
    {
      input: "whoami",
      output: "Webseidon - Full Stack Developer specializing in WordPress and modern web technologies."
    },
    {
      input: "ls -la projects/",
      output: "drwxr-xr-x  2 webseidon dev   4096 Jun 12 09:15 e-commerce/\ndrwxr-xr-x  2 webseidon dev   4096 Jun 10 11:30 portfolio/\ndrwxr-xr-x  2 webseidon dev   4096 Jun 15 14:22 blog/\ndrwxr-xr-x  2 webseidon dev   4096 Jun 11 16:45 corporate/"
    },
    {
      input: "cat skills.txt",
      output: "WordPress Development\nResponsive Design\nCustom Theme Development\nE-commerce Solutions\nUI/UX Design\nPerformance Optimization\nSEO Friendly Development\nWebsite Security"
    },
    {
      input: "sudo apt-get install success",
      output: "Reading package lists... Done\nBuilding dependency tree... Done\nThe following NEW packages will be installed:\n  success creativity excellence\n0 upgraded, 3 newly installed, 0 to remove and 0 not upgraded.\nNeed to get 21.3 MB of archives.\nAfter this operation, 42.6 MB of additional disk space will be used.\nGet:1 https://webseidon.dev success [10.5 MB]\nGet:2 https://webseidon.dev creativity [5.8 MB]\nGet:3 https://webseidon.dev excellence [5.0 MB]\nFetched 21.3 MB in 2s (10.6 MB/s)\nInstalling success (100%)\nInstalling creativity (100%)\nInstalling excellence (100%)\nSuccess: Your project is ready to launch!"
    },
    {
      input: "git status",
      output: "On branch master\nYour branch is up to date with 'origin/master'.\n\nChanges to be committed:\n  (use \"git reset HEAD <file>...\" to unstage)\n\n\tnew file:   amazing-feature.js\n\tmodified:   styles.css\n\nChanges not staged for commit:\n  (use \"git add <file>...\" to update what will be committed)\n  (use \"git checkout -- <file>...\" to discard changes in working directory)\n\n\tmodified:   index.html"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          
          if (entry.target === sectionRef.current) {
            typeCommand();
          }
        }
      });
    }, { threshold: 0.2 });

    const animatedElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements && sectionRef.current) {
      animatedElements.forEach(el => {
        observer.observe(el);
      });
      observer.observe(sectionRef.current);
    }

    // Removed automatic command switching interval

    return () => {
      if (animatedElements && sectionRef.current) {
        animatedElements.forEach(el => {
          observer.unobserve(el);
        });
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const typeCommand = () => {
    if (!terminalRef.current) return;
    
    const terminalOutput = terminalRef.current;
    const cmd = commands[currentCommand];
    
    terminalOutput.innerHTML = '<span class="text-terminal-green">webseidon@server</span>:<span class="text-terminal-blue">~</span>$ ';
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < cmd.input.length) {
        terminalOutput.innerHTML += cmd.input.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          terminalOutput.innerHTML += '<br>' + cmd.output.replace(/\n/g, '<br>') + '<br><br><span class="text-terminal-green">webseidon@server</span>:<span class="text-terminal-blue">~</span>$ <span class="terminal-cursor">█</span>';
        }, 500);
      }
    }, 50);
  };

  useEffect(() => {
    typeCommand();
  }, [currentCommand]);

  return (
    <section 
      id="terminal" 
      ref={sectionRef}
      className={cn(
        "py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-ocean-darker/20 to-transparent",
        className
      )}
    >
      <div className="absolute inset-0 bg-terminal-grid bg-[length:40px_40px] opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <TerminalIcon className="text-terminal-green mr-3" />
            <h2 className="terminal-section-title">
              command_center.sh
            </h2>
          </div>
          <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 max-w-2xl mx-auto text-foreground/80 font-mono">
            # Experience the command-line power of Webseidon development
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 rounded-lg overflow-hidden shadow-xl">
            <div className="bg-terminal-black border border-terminal-green/20 rounded-lg">
              <div className="bg-terminal-black px-4 py-2 border-b border-terminal-green/20 flex items-center">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
                </div>
                <div className="text-terminal-white/70 text-xs font-mono mx-auto">webseidon@server: ~</div>
              </div>
              <div className="p-6 font-mono text-sm text-terminal-white min-h-[320px] h-[320px] overflow-y-auto">
                <div ref={terminalRef} className="terminal-output leading-6"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {commands.map((cmd, index) => (
              <button
                key={index}
                onClick={() => setCurrentCommand(index)}
                className={cn(
                  "px-4 py-2 rounded font-mono text-sm transition-all",
                  currentCommand === index 
                    ? "bg-terminal-green text-terminal-black" 
                    : "bg-terminal-black/70 text-terminal-green border border-terminal-green/30 hover:bg-terminal-black"
                )}
              >
                $ {cmd.input}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terminal;
