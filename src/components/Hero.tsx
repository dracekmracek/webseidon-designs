import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import WaveAnimation from './WaveAnimation';
import { Terminal } from 'lucide-react';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Init systém webseidon.cz v2.0.2.5.",
    "Přijímání objednávek...... OK",
    "Konzultace s klienty........ OK",
    "Vysoké ceny.................. ERROR",
    "Dostatek času.................. ERROR",
    "Systém webseidon.cz připraven.",
    "Zadejte 'help' pro zobrazení příkazů."
  ]);
  const [userInput, setUserInput] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<HTMLDivElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  
  // Commands that can be entered by the user
  const commands: Record<string, () => string[]> = {
    help: () => [
      "Dostupné příkazy:",
      "  help          - Zobrazí tento seznam příkazů",
      "  služby        - Zobrazí nabízené služby",
      "  kontakt       - Ukáže kontaktní informace",
      "  projekty      - Příklady našich projektů",
      "",
      "Linuxové příkazy:",
      "  ls            - Výpis souborů",
      "  pwd           - Aktuální adresář",
      "  whoami        - Kdo používá tento terminál",
      "  date          - Aktuální datum a čas",
      "  cat [soubor]  - Zobrazí obsah souboru",
      "  mkdir [název] - Vytvoří složku",
      "  rm [soubor]   - Smaže soubor",
      "  sudo [příkaz] - Spustí příkaz s oprávněním root",
      "  apt-get install webseidon - Nainstaluje Webseidon",
      "  git clone webseidon - Naklonuje repozitář webseidon",
      "  npm install - Nainstaluje závislosti",
      "  grep [text] - Vyhledá text v souborech",
      
    ],
    clear: () => [],
    služby: () => [
      "Nabízené služby:",
      "- Zakázkový vývoj webových stránek, nebo softwaru",
      "- WordPress, nebo Next.js/React.js řešení",
      "- Redesign a optimalizace existujících webů",
      "- SEO, Loga, AI agenti, AI generování fotografií",
      "- Webhosting a následná správa",
    ],
    kontakt: () => [
      "Kontaktní informace:",
      "Email: info@webseidon.cz",
      "Telefon: +420 776 211 336",
      "Web: webseidon.cz",
    ],
    projekty: () => [
      "Navštivte portfolio v sekci níže",
      "Spouštím 'zobrazit_projekty.sh'...",
    ],
    ls: () => [
      "website-templates/",
      "next-projects/",
      "portfolio.txt",
      "wordpress-starter.zip",
      "webseidon-secret-sauce.sh",
      "client-projects/",
      "responsive-designs/",
      "cool-animations.css",
    ],
    pwd: () => [
      "/home/webseidon/web-development/secret-design"
    ],
    whoami: () => [
      "webseidon - webový vývojář a digitální kouzelník",
      "Status OK: Připraven na tvorbu úžasných webových stránek"
    ],
    date: () => {
      const now = new Date();
      return [`${now.toLocaleDateString()} ${now.toLocaleTimeString()} - Čas začít s novým webem!`];
    },
    cat: () => [
      "Pro jaký soubor? Zkuste 'cat portfolio.txt' nebo 'cat webseidon-secret-sauce.sh'"
    ],
    "cat portfolio.txt": () => [
      "=== PORTFOLIO WEBSEIDON ===",
      "- E-shop pro lokální značku oblečení",
      "- Webové stránky pro právnickou kancelář",
      "- Rezervační systém pro restauraci",
      "- Osobní blog s automatickým zálohováním",
      "- Single-page aplikace pro realitní kancelář",
      "... a mnoho dalších projektů, které změnily podnikání našich klientů!"
    ],
    "cat webseidon-secret-sauce.sh": () => [
      "#!/bin/bash",
      "# TAJNÝ RECEPT WEBSEIDON",
      "# Varování: Následující kód může způsobit nárůst návštěvnosti webu a zvýšení konverzí!",
      "",
      "mix_ingredients() {",
      "  echo \"Přidávám responzivní design...\"",
      "  echo \"Míchám s optimalizací pro SEO...\"",
      "  echo \"Přisypávám rychlost načítání...\"",
      "  echo \"Dochucuji originálním UX designem...\"",
      "  echo \"ERROR: Nepodařilo se číst ze souboru, mažu paměť...\"",
      "}",
      "",
      "# Hlavní tajná přísada je láska k webdesignu!"
    ],
    mkdir: () => [
      "Složka s virem úspěšně vytvořena!",
      "Tip: Chcete se zbavit viru? Kontaktujte mě na info@webseidon.cz!"
    ],
    rm: () => [
      "Chcete smazat staré webové stránky a nahradit je novými?", 
      "Volejte Webseidon a já to za vás rád udělám! Bez rm příkazu a mnohem elegantněji."
    ],
    sudo: () => [
      "Pro využití sudo oprávnění musíte být Webseidon klient.",
      "Staňte se klientem a získejte přístup k exkluzivním možnostem!"
    ],
    "sudo apt-get install webseidon": () => [
      "Čtu seznamy balíčků... Hotovo",
      "Stavím strom závislostí... Hotovo",
      "Instaluji Webseidon webdesign balíček:",
      "  - moderní_design (100%)",
      "  - responzivní_zobrazení (100%)",
      "  - seo_optimalizace (100%)",
      "  - rychlé_načítání (100%)",
      "Balíček úspěšně nainstalován!",
      "Váš web je nyní o 1000% lepší!"
    ],
    "apt-get install wordpress": () => [
      "Nemáte oprávnění pro tuto operaci. Zkuste: sudo apt-get install webseidon",
      "Webseidon WordPress instalace zahrnuje zabezpečení, optimalizaci a prémiové pluginy!"
    ],
    "git clone webseidon": () => [
      "Klonuji repozitář 'webseidon'...",
      "Stahování kreativity...",
      "Stahování designových vzorů...",
      "Stahování webových zkušeností...",
      "Chyba: Nelze naklonovat kreativitu. Kontaktujte Webseidon pro osobní přístup!"
    ],
    "npm install": () => [
      "added 1,286 packages, and audited 1,287 packages in 5s",
      "108 packages are looking for funding",
      "Webseidon dependencies installed successfully!",
      "Chcete spustit npm run dev? Kontaktujte Webseidon a my to za vás uděláme lépe!"
    ],
    grep: () => [
      "Hledání 'úspěšný web' v databázi klientů...",
      "Nalezeno: všichni klienti Webseidon mají úspěšný web!",
      "Důkaz: zeptejte se kteréhokoliv z nich nebo si prohlédněte portfolio."
    ],
    man: () => [
      "MAN(1) - Manuálová stránka Webseidon",
      "",
      "NÁZEV",
      "     webseidon - webový designér a vývojář pro úspěšné firmy",
      "",
      "POUŽITÍ",
      "     kontaktujte webseidon pro [projekt] [rozpočet] [termín]",
      "",
      "POPIS",
      "     Webseidon je webový specialista specializující se na tvorbu",
      "     moderních a efektivních webových stránek pro firmy a",
      "     živnostníky, kteří chtějí růst v online světě."
    ],
    ping: () => [
      "PING webseidon.cz (192.168.1.1): 56 data bytes",
      "64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=0.8 ms",
      "64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.5 ms",
      "64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.6 ms",
      "--- webseidon.cz ping statistics ---",
      "3 packets transmitted, 3 packets received, 0.0% packet loss",
      "round-trip min/avg/max/stddev = 0.5/0.6/0.8/0.1 ms",
      "",
      "Webseidon je vždy online a připraven pomoci! Kontaktujte nás."
    ]
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedInput = userInput.trim();
    const commandLower = trimmedInput.toLowerCase();
    
    // Add the user input to the terminal with bash-like prompt
    setTerminalOutput(prev => [...prev, `webseidon@server:~$ ${trimmedInput}`]);
    
    // Clear the input
    setUserInput("");
    
    // Reset contentEditable div
    if (inputRef.current) {
      inputRef.current.textContent = "";
    }
    
    // Process command
    setTimeout(() => {
      let commandFn: (() => string[]) | undefined;
      
      // Try exact match first
      commandFn = commands[trimmedInput];
      
      // If not found, try lowercase version
      if (!commandFn) {
        commandFn = commands[commandLower];
      }
      
      // Handle special cases for commands with arguments (like cat filename)
      if (!commandFn && trimmedInput.startsWith('cat ')) {
        const fullCommand = trimmedInput;
        commandFn = commands[fullCommand];
        if (!commandFn) {
          const filename = trimmedInput.substring(4).trim();
          commandFn = () => [`Soubor '${filename}' nenalezen. Zkuste 'cat portfolio.txt'`];
        }
      }
      
      // Handle commands with arguments that we don't specifically handle
      if (!commandFn && (trimmedInput.startsWith('mkdir ') || trimmedInput.startsWith('rm '))) {
        const command = trimmedInput.split(' ')[0];
        commandFn = commands[command];
      }
      
      // Handle unknown commands
      if (!commandFn && trimmedInput !== "") {
        commandFn = () => [`Příkaz nenalezen: ${trimmedInput}. Zkuste 'help' pro nápovědu.`];
      }
      
      // Clear the terminal if command is 'clear'
      if (commandLower === "clear") {
        setTerminalOutput([]);
      } else if (commandFn) {
        // Execute the command and add the output to the terminal
        setTerminalOutput(prev => [...prev, ...commandFn!()]);
      }
      
      // Scroll to bottom after output is displayed
      if (terminalContentRef.current) {
        setTimeout(() => {
          if (terminalContentRef.current) {
            terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
          }
        }, 50);
      }
    }, 300);
  };

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    
    return () => clearInterval(interval);
  }, []);

  // Focus on click
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  // Scroll to bottom when terminal output changes
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [terminalOutput]);
  
  // Detekce mobilního zařízení
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section 
      id="hero" 
      className={cn(
        "min-h-screen pt-24 sm:pt-28 md:pt-32 pb-20 relative overflow-hidden flex flex-col items-center justify-center",
        className
      )}
    >
      {/* Základní pozadí */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-darkest via-ocean-darker to-ocean-darkest"></div>
      
      {/* Trojzubec - animovaný symbol Poseidona v pozadí */}
      <div className="absolute right-[5%] top-[20%] opacity-10 pointer-events-none">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-60 h-60 text-ocean-light animate-trident-thrust"
          style={{ animationDuration: '12s' }}
        >
          <path d="M12 2v14M4 9h16M7 3v5M17 3v5" />
        </svg>
      </div>

      {/* Container for content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Heading and Text */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <div className="mb-8 mt-4 sm:mt-6 md:mt-8 mx-auto lg:mx-0 max-w-2xl lg:max-w-none">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white relative text-center lg:text-left">
                <span className="block relative z-10">
                  Přidejte se k ostatním <span className="title-gradient-animation">na vlnu Internetu!</span>
                </span>
                <div className="absolute -bottom-2 left-0 right-0 lg:right-auto lg:w-24 h-1 bg-gradient-to-r from-gold to-transparent mx-auto lg:mx-0"></div>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-lg font-medium leading-relaxed mt-5 backdrop-blur-sm bg-ocean-darkest/10 p-4 rounded-md border-l-4 border-ocean-light/30 mx-auto lg:mx-0">
                Webové stránky pro malé firmy a živnostníky, kteří svému podnikání chtějí přidat na důvěryhodnosti a dostat do popředí skrze online svět.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
              <a 
                href="#services" 
                className="btn-terminal relative"
              >
                <span className="font-mono mr-2">./Prozkoumat služby</span>
              </a>
              <a 
                href="#pricing" 
                className="bg-transparent border-2 border-gold/70 hover:border-terminal-cyan/80 text-gold hover:text-terminal-cyan rounded-md px-6 py-3 text-sm font-medium transition-all duration-300 group inline-flex items-center"
              >
                <span className="font-mono mr-2 opacity-80 group-hover:opacity-100">$</span>
                Ceník
              </a>
            </div>
          </div>
          
          {/* Right Column - Terminal */}
          <div className="mt-0 sm:mt-6 md:mt-10 lg:mt-0">
            <div className="max-w-xl mx-auto lg:mx-0">
              <div 
                className="bg-ocean-darkest rounded-lg shadow-lg overflow-hidden border border-terminal-green/20 terminal-card"
                onClick={handleTerminalClick}
                tabIndex={0} 
                onKeyDown={handleKeyPress}
                style={{ cursor: 'text' }}
              >
                <div className="flex items-center justify-between p-2 border-b border-terminal-green/20 bg-ocean-darkest">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-terminal-red mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-terminal-yellow mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
                  </div>
                  <div className="text-xs text-terminal-white/60 font-mono">webseidon@server: ~/projects</div>
                  <div className="w-4"></div>
                </div>
                
                <div 
                  ref={terminalContentRef}
                  className="p-4 font-mono text-white/90 text-sm h-60 sm:h-80 overflow-y-auto bg-ocean-darkest"
                >
                  {terminalOutput.map((line, index) => (
                    <div key={index} className={cn(
                      line.startsWith("webseidon@server") ? "text-terminal-green mb-1" : "text-terminal-cyan mb-1",
                      line.includes("ERROR") || line.includes("Chyba") ? "text-terminal-red" : "",
                      line.includes("OK") || line.includes("úspěšně") ? "text-terminal-green" : ""
                    )}>
                      {line}
                    </div>
                  ))}
                  
                  <div className="flex items-center mt-2">
                    <span className="text-terminal-green mr-2">webseidon@server:~$</span>
                    <div
                      ref={inputRef}
                      contentEditable
                      className="outline-none bg-transparent text-terminal-white flex-1 min-w-[1px]"
                      onInput={(e) => setUserInput(e.currentTarget.textContent || "")}
                      suppressContentEditableWarning={true}
                    ></div>
                    <div className={`terminal-cursor-animated ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vlnitá animace v patě sekce */}
      <WaveAnimation
        className="bottom-0 md:-mb-1"
        waveColor="rgba(93, 169, 233, 0.4)"
        intensity="dark"
        position="bottom"
        height={isMobile ? "200" : "360"}
        zIndex={1}
      />
    </section>
  );
};

export default Hero;
