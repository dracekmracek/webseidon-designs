import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import WaveAnimation from './WaveAnimation';
import { Terminal } from 'lucide-react';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Init systém webseidon v1.0.3",
    "Kontrola závislostí...... OK",
    "Nahrávání rozhraní............ OK",
    "Načítání kreativního enginu.......... OK",
    "Inicializace webového božstva........... OK",
    "Připojování ke Kosmickému oceánskému API............ OK",
    "Systém webseidon připraven.",
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
      "  rm [soubor]   - Smaže soubor"
    ],
    clear: () => [],
    služby: () => [
      "Nabízené služby:",
      "- Zakázkový vývoj webových stránek, nebo softwaru",
      "- WordPress, nebo Next.js řešení",
      "- Redesign a optimalizace existujících webů",
      "- SEO a digitální marketingové služby",
      "- Webhosting a správa",
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
      "/home/webseidon/web-development/ocean-designs"
    ],
    whoami: () => [
      "webseidon - webový vývojář a digitální kouzelník",
      "Status: Připraven na tvorbu úžasných webových stránek"
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
      "  echo \"Dochucuji UX designem...\"",
      "}",
      "",
      "# Hlavní tajná přísada je láska ke kódu!"
    ],
    mkdir: () => [
      "Složka úspěšně vytvořena! (Ale jen virtuálně - toto je pouze simulace terminálu)",
      "Tip: Skutečnou složku pro váš web můžeme vytvořit na našem serveru. Kontaktujte nás!"
    ],
    rm: () => [
      "Chcete smazat staré webové stránky a nahradit je novými?", 
      "Volejte Webseidon a my to za vás rádi uděláme! Bez rm příkazu a mnohem elegantněji."
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
      "Důkaz: zeptejte se kteréhokoliv z nich nebo si prohlédněte naše portfolio."
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
      "     Webseidon je webové studio specializující se na tvorbu",
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

  return (
    <section 
      id="home" 
      className={cn(
        "min-h-screen pt-20 pb-20 md:pt-32 md:pb-20 relative overflow-hidden bg-deep-ocean flex flex-col items-center justify-center",
        className
      )}
    >
      {/* Ambient animated gradient background */}
      <div className="absolute inset-0 opacity-100 bg-animated-gradient"></div>
      
      {/* Digital rain effect - zmírněný, ale jasnější */}
      <div className="absolute inset-0 bg-digital-rain opacity-10 pointer-events-none brightness-125"></div>
      
      {/* Modern grid overlay */}
      <div className="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none"></div>
      
      {/* Noise texture for depth */}
      <div className="absolute inset-0 bg-noise"></div>
      
      {/* Container for content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Heading and Text */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white">
                Přidejte se k ostatním na <span className="text-gradient-gold">vlnu Internetu!</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-lg">
                Webové stránky pro malé firmy a živnostníky, kteří svému podnikání chtějí přidat na důvěryhodnosti a dostat do popředí skrze online svět.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <a 
                href="#services" 
                className="btn-primary"
              >
                <span className="font-mono mr-2">./</span>
                Prozkoumat služby
              </a>
              <a 
                href="#pricing" 
                className="btn-secondary"
              >
                <span className="font-mono mr-2">$</span>
                Ceník
              </a>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-white/70">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gold" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Responzivní</span>
              </div>
              <div className="flex items-center text-white/70">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gold" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>SEO Optimalizované</span>
              </div>
              <div className="flex items-center text-white/70">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gold" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Rychlé a Bezpečné</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Terminal */}
          <div className="flex justify-center lg:justify-end items-center">
            <div 
              className="bg-ocean-darkest/80 backdrop-blur-sm rounded-lg border border-ocean-light/20 shadow-glow w-full max-w-lg overflow-hidden transition-all duration-300 hover:border-ocean-light/40 hover:shadow-glow-lg"
              onClick={handleTerminalClick}
              tabIndex={0} 
              onKeyDown={handleKeyPress}
              style={{ cursor: 'text' }}
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-ocean-dark/90 border-b border-ocean-light/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-white/80 text-xs font-mono">webseidon@terminal:~</div>
                <div className="text-white/80 text-xs font-mono opacity-50">bash</div>
              </div>
              
              {/* Terminal Content */}
              <div 
                ref={terminalContentRef}
                className="p-4 font-mono text-white/90 text-sm h-80 overflow-y-auto"
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
      
      {/* Floating particles effect - menší počet, ale v popředí */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {Array.from({ length: 8 }).map((_, i) => {
          // Náhodné parametry pro každou částici
          const size = 0.08 + Math.random() * 1.5; // Různé velikosti (0.8px - 2.3px)
          const opacity = 0.025 + Math.random() * 0.4; // Různá průhlednost (25%-65%)
          const glowIntensity = 100 + Math.random() * 15; // Různá intenzita záře (10px-25px)
          const glowColor = Math.random() > 0.5 
            ? 'rgba(93, 169, 233, 0.6)' // Modrá
            : Math.random() > 0.5 
              ? 'rgba(255, 215, 0, 0.4)' // Zlatá
              : 'rgba(255, 255, 255, 0.5)'; // Bílá
          
          return (
            <div 
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                zIndex: Math.floor(Math.random() * 30) + 20,
                backgroundColor: glowColor.replace('0.6', `${opacity}`),
                animationDuration: `${5 + Math.random() * 15}s`,
                animationDelay: `${Math.random() * 5}s`,
                boxShadow: `0 0 ${glowIntensity}px ${glowColor}`
              }}
            />
          );
        })}
      </div>
      
      {/* Wave Animation at bottom */}
      <WaveAnimation position="bottom" variant="choppy" waveColor="rgba(93, 169, 233, 0.4)" />    
    </section>
  );
};

export default Hero;
