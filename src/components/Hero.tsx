import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import WaveAnimation from './WaveAnimation';
import { Terminal } from 'lucide-react';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
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

  return (
    <section 
      id="hero" 
      className={cn(
        "min-h-screen pt-24 sm:pt-28 md:pt-32 pb-20 relative overflow-hidden flex flex-col items-center justify-center",
        className
      )}
    >
      {/* Vylepšený animovaný gradient pozadí */}
      <div className="absolute inset-0 breathing-gradient"></div>
      
      {/* Overlay s animovaným zábleskem */}
      <div className="absolute inset-0 glow-pulse"></div>
      
      {/* Sekundární glow efekt pro zvýšení hloubky */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-full h-full bg-gradient-radial from-wave-blue-light/30 via-transparent to-transparent" 
          style={{
            top: '-10%',
            left: '45%',
            width: '800px',
            height: '800px',
            animation: 'breathing-light-animation 15s ease-in-out infinite',
            animationDelay: '1s'
          }}></div>
        <div className="absolute w-full h-full bg-gradient-radial from-ocean-light/20 via-transparent to-transparent" 
          style={{
            bottom: '-5%',
            right: '35%',
            width: '600px',
            height: '600px',
            animation: 'breathing-light-animation 12s ease-in-out infinite',
            animationDelay: '2s'
          }}></div>
      </div>
      
      {/* Futuristická modrá mřížka pro technologický vzhled */}
      <div className="absolute inset-0 bg-cyber-grid-blue opacity-15 pointer-events-none"></div>
      
      {/* Jemný šum pro texturovaný efekt */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
      
      {/* Multi-vrstvé gradientové efekty pro hloubku a dimenzi */}
      <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-wave-blue/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-ocean-darker/30 to-transparent"></div>
      <div className="absolute top-0 left-0 w-1/3 h-screen bg-gradient-to-r from-ocean-light/5 to-transparent opacity-50"></div>
      <div className="absolute top-0 right-0 w-1/3 h-screen bg-gradient-to-l from-ocean-light/5 to-transparent opacity-50"></div>
      
      {/* Glow efekty pro dynamické světelné body */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-wave-blue/10 filter blur-3xl breathing-light"></div>
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-wave-blue/10 filter blur-3xl breathing-light" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-gold/10 filter blur-3xl breathing-light" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-ocean-light/10 filter blur-3xl breathing-light" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Pulzující efekt světla pro zvýšení dynamiky */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-wave-blue-light/20 to-transparent animate-pulse-glow" style={{ animationDuration: '8s' }}></div>
      </div>
      
      {/* Ambientní světelné částice s různou intenzitou a barvami */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {Array.from({ length: 30 }).map((_, i) => {
          const size = 0.8 + Math.random() * 2; 
          const opacity = 0.15 + Math.random() * 0.3;
          const glowIntensity = 8 + Math.random() * 15;
          const glowColor = Math.random() > 0.7 
            ? 'rgba(93, 169, 233, 0.6)' 
            : Math.random() > 0.5 
              ? 'rgba(255, 215, 0, 0.4)' 
              : 'rgba(255, 255, 255, 0.5)';
          const duration = 10 + Math.random() * 20;
          
          return (
            <div 
              key={i}
              className="absolute rounded-full animate-particle-fade"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                zIndex: Math.floor(Math.random() * 10) + 5,
                backgroundColor: glowColor.replace('0.6', `${opacity}`),
                animationDuration: `${duration}s`,
                animationDelay: `${Math.random() * 15}s`,
                boxShadow: `0 0 ${glowIntensity}px ${glowColor}`
              }}
            />
          );
        })}
      </div>
      
      {/* Bubliny - Poseidonův prvek */}
      <div className="bubble-container">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              width: `${10 + Math.random() * 25}px`,
              height: `${10 + Math.random() * 25}px`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
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
      
      {/* Whirlpool efekt */}
      <div className="whirlpool absolute top-[15%] left-[8%] opacity-15"></div>
      
      {/* Container for content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Heading and Text */}
          <div className="flex flex-col justify-center">
            <div className="mb-8 mt-4 sm:mt-6 md:mt-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white relative">
                <span className="text-shadow-lg block relative z-10">
                  Přidejte se k ostatním <span className="title-gradient-animation">na vlnu Internetu!</span>
                </span>
                <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-gold to-transparent"></div>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-lg font-medium leading-relaxed mt-5 backdrop-blur-sm bg-ocean-darkest/10 p-4 rounded-md border-l-4 border-ocean-light/30">
                Webové stránky pro malé firmy a živnostníky, kteří svému podnikání chtějí přidat na důvěryhodnosti a dostat do popředí skrze online svět.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <a 
                href="#services" 
                className="btn-primary water-effect relative group"
              >
                <span className="font-mono mr-2">./</span>
                Prozkoumat služby
                <div className="absolute -top-1 -right-1 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-full bg-ocean-light animate-water-drop"></div>
                </div>
              </a>
              <a 
                href="#pricing" 
                className="btn-secondary hover:bg-gold/20 border-2 border-gold hover:border-terminal-cyan hover:text-terminal-cyan transition-all duration-300 water-effect"
              >
                <span className="font-mono mr-2">$</span>
                Ceník
              </a>
            </div>
          </div>
          
          {/* Right Column - Terminal */}
          <div className="flex justify-center lg:justify-end items-center mt-4 sm:mt-0">
            <div 
              className="bg-ocean-darkest/80 backdrop-blur-sm rounded-lg border border-ocean-light/20 shadow-glow w-full max-w-lg overflow-hidden transition-all duration-300 hover:border-ocean-light/40 hover:shadow-glow-lg water-effect"
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
      
      {/* Wave Animation at bottom - vylepšená pro lepší propojení mezi sekcemi */}
      <WaveAnimation 
        position="bottom" 
        variant="choppy" 
        waveColor="rgba(93, 169, 233, 0.4)"
        height="380"
      />    
    </section>
  );
};

export default Hero;
