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
      output: "INICIALIZUJI IDENTIFIKAČNÍ PROTOKOL...\n\n[BIOMETRICKÉ OVĚŘENÍ DOKONČENO]\n[PŘÍSTUP AUTORIZOVÁN]\n\nJMÉNO: Lukáš Adámek\nKÓDOVÉ OZNAČENÍ: WebCommander_01\nBEZPEČNOSTNÍ ÚROVEŇ: Alpha-5\n\n[DEKLASIFIKOVANÉ DOVEDNOSTI]:\n\n> INFILTRACE SYSTÉMŮ: Windows & Linux - specializace na průnik do nepřátelských sítí a získání admin oprávnění\n> MANIPULACE DAT: SQL databáze - schopnost extrahovat, transformovat a optimalizovat datové struktury\n> AUTOMATIZACE: PowerShell skripty - rychlost psaní převyšuje standardní lidské limity o 278%\n> DIGITÁLNÍ KAMUFLÁŽ: CSS & Frontend - mistrovská schopnost skrýt komplexní kód pod elegantním rozhraním\n> SERVEROVÉ OPERACE: Optimalizace - prediktivní údržba a prevence výpadků\n\n[TAJNÁ SCHOPNOST]: Vývoj AI asistenta s pokročilou autonomií a zpravodajskými funkcemi\n\n[VAROVÁNÍ]: Subjekt disponuje schopností transformovat \"bugy\" na \"features\" a prodávat je jako premium aktualizace.\n\n[KONEC PŘENOSU]"
    },
    {
      input: "sudo -l",
      output: "[INICIALIZACE PRIVILEGOVANÉHO PŘÍSTUPU]\n[SKENOVÁNÍ OPRÁVNĚNÍ...]\n\n================================================\n============ BEZPEČNOSTNÍ PROTOKOL ============\n================================================\n\nUživatel: lukasadamek\nSkupina: webseidon-admin\nHash: f8d7e5c3b1a9d2f6e8c4b7a5d3f2e1c9\n\nPOVOLENÝ PŘÍSTUP K TĚMTO PŘÍKAZŮM:\n\n> ./Notebook-otevřít.sh\n> ./Přesnost-rychlost-kreativita-dokonalost.bat\n> ./Zjištění_IQ_webseidon.sh\n\n[DIAGNOSTIKA SYSTÉMU V PRŮBĚHU]\n\nKONTROLA INTEGRITY... OK\nSKENOVÁNÍ SÍTĚ... OK\nTESTOVÁNÍ PING webseidon.cz [46.28.106.229]... ÚSPĚŠNÉ\n64 bytes přijato: čas=31.202 ms\n\n[INSTALACE KRITICKÝCH KOMPONENT]\n\nInstaluji úspěch....................[100%] DOKONČENO\nInstaluji kreativitu................[100%] DOKONČENO\nInstaluji dokonalost................[100%] DOKONČENO\n\n[SYSTÉMOVÁ ZPRÁVA]: Váš projekt je připraven na nasazení s nejvyšší úrovní oprávnění.\n\n[KONEC PŘENOSU]"
    },
    {
      input: "cat seo_manual.txt",
      output: "=== CO JE SEO A PROČ JE DŮLEŽITÉ ===\n\n[ACCESS GRANTED]\n\nSEO (Search Engine Optimization) je tajná zbraň pro digitální převahu vašeho webu v informační válce o pozornost uživatelů.\n\nWebové vyhledávače používají složité algoritmy k hodnocení a řazení webových stránek. Bez správné SEO optimalizace je váš web jako stealth letadlo bez stealth technologie - nikdo ho nenajde.\n\n[CRITICAL INTELLIGENCE]\n\n1. Organická viditelnost: 93% online interakcí začíná přes vyhledávače\n2. Důvěryhodnost: Vysoké pozice = vyšší konverzní poměr o 14.6%\n3. Nákladová efektivita: Dlouhodobé výsledky bez placené reklamy\n4. Konkurenční výhoda: Analýza digitální stopy konkurence\n\nWARNING: Bez SEO je váš web jako tajný dokument pohřbený v archivu. Nikdo ho nenajde, nikdo ho nepřečte.\n\n[CONNECTION SECURE] - Další informace na požádání"
    },
    {
      input: "./scan_responsive_design.sh",
      output: "sudo ./scan_responsive_design.sh --verbose --access-level=admin\n\n[SKENOVÁNÍ ZAHÁJEN0]\n[ANALYZUJI DŮLEŽITOST RESPONZIVITY]\n\nVÝSLEDEK SKENU:\n\n>>> KRITICKÁ DŮLEŽITOST RESPONZIVITY WEBU <<<\n\n- 68.1% všech návštěv webů probíhá přes mobilní zařízení\n- Google indexuje primárně mobilní verze stránek (Mobile-First Indexing)\n- 57% uživatelů opustí stránku, která se nenačte do 3 sekund\n- Neresponzivní weby ztrácí až 61.5% potenciálních konverzí\n\n[DETEKOVÁNO]: Webové stránky bez responzivního designu jsou v moderní éře jako systém s kritickou bezpečnostní mezerou - zranitelné a ignorované většinou uživatelů.\n\n[VAROVÁNÍ]: Responzivní design není volba, je to nezbytnost pro přežití v digitálním ekosystému.\n\n[SKEN DOKONČEN] - Při redesignu je potřeba implementovat mobile-first přístup."
    },
    {
      input: "decrypt why_redesign.key",
      output: "Dešifruji soubor: why_redesign.key\n[██████████] 100% Dešifrování dokončeno\n\n=== PROČ JE ČAS NA REDESIGN VAŠEHO WEBU ===\n\nTAJNÉ DŮVODY PRO REDESIGN WEBU:\n\n1. TECHNOLOGICKÁ EVOLUCE\n   Zastaralé weby používají technologie, které již nejsou kompatibilní s moderními prohlížeči a bezpečnostními standardy. Je to jako používat diskety v době cloudových úložišť.\n\n2. DIGITÁLNÍ PRVNÍ DOJEM\n   83% uživatelů opustí web, který vypadá zastarale nebo neprofesionálně během prvních 5 sekund. Web je vaše digitální vizitka - chcete předat vzkaz, že jste zasekli v roce 2010?\n\n3. KONKURENČNÍ ZPRAVODAJSTVÍ\n   Vaše konkurence neustále vylepšuje své digitální zbraně. Statický, zastaralý web je jako přinést nůž do přestřelky.\n\n4. BEZPEČNOSTNÍ PROTOKOL\n   Zastaralé weby jsou zranitelné vůči kybernetickým útokům. Redesign není jen estetická záležitost, ale i bezpečnostní upgrade.\n\n[PŘÍSNĚ TAJNÉ]: Předpoklad ROI při redesignu se pohybuje mezi 400-1000% při správné implementaci.\n\nKONEC PŘENOSU - WEBSEIDON OUT"
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
          terminalOutput.innerHTML += '<br>' + cmd.output.replace(/\n/g, '<br>') + '<br><br><span class="text-terminal-green">webseidon@server</span>:<span class="text-terminal-blue">~</span>$ ';
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
      
      {/* Korálová dekorace na spodní části sekce */}
      <div className="coral-decoration"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            {/* <TerminalIcon className="text-terminal-green mr-3" /> */}
            <h2 className="terminal-section-title">
              Terminal.app
            </h2>
          </div>
          <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 max-w-2xl mx-auto subtitle-text font-mono">
            # cd ./expertní_informace
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 rounded-lg overflow-hidden shadow-xl">
            <div className="bg-ocean-darkest border border-terminal-green/20 rounded-lg">
              <div className="bg-ocean-darkest px-4 py-2 border-b border-terminal-green/20 flex items-center">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
                </div>
                <div className="text-terminal-white/70 text-xs font-mono mx-auto">webseidon@server: ~</div>
              </div>
              <div className="p-6 font-mono text-sm text-terminal-white min-h-[320px] h-[320px] overflow-y-auto bg-ocean-darkest">
                <div ref={terminalRef} className="terminal-output leading-6"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCurrentCommand(0)}
              className={cn(
                "px-4 py-2 rounded font-mono text-sm transition-all",
                currentCommand === 0 
                  ? "bg-terminal-green text-terminal-black" 
                  : "bg-terminal-black/70 text-terminal-green border border-terminal-green/30 hover:bg-terminal-black"
              )}
            >
              $ whoami
            </button>
            <button
              onClick={() => setCurrentCommand(1)}
              className={cn(
                "px-4 py-2 rounded font-mono text-sm transition-all",
                currentCommand === 1 
                  ? "bg-terminal-green text-terminal-black" 
                  : "bg-terminal-black/70 text-terminal-green border border-terminal-green/30 hover:bg-terminal-black"
              )}
            >
              $ sudo -l
            </button>
            <button
              onClick={() => setCurrentCommand(2)}
              className={cn(
                "px-4 py-2 rounded font-mono text-sm transition-all",
                currentCommand === 2 
                  ? "bg-terminal-green text-terminal-black" 
                  : "bg-terminal-black/70 text-terminal-green border border-terminal-green/30 hover:bg-terminal-black"
              )}
            >
              $ cat seo_manual.txt
            </button>
            <button
              onClick={() => setCurrentCommand(3)}
              className={cn(
                "px-4 py-2 rounded font-mono text-sm transition-all",
                currentCommand === 3 
                  ? "bg-terminal-green text-terminal-black" 
                  : "bg-terminal-black/70 text-terminal-green border border-terminal-green/30 hover:bg-terminal-black"
              )}
            >
              $ ./scan_responsive_design.sh
            </button>
            <button
              onClick={() => setCurrentCommand(4)}
              className={cn(
                "px-4 py-2 rounded font-mono text-sm transition-all",
                currentCommand === 4 
                  ? "bg-terminal-green text-terminal-black" 
                  : "bg-terminal-black/70 text-terminal-green border border-terminal-green/30 hover:bg-terminal-black"
              )}
            >
              $ decrypt why_redesign.key
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terminal;
