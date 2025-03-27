import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<string>('profile');
  
  // Interaktivní bubliny
  const bubblesRef = useRef<HTMLDivElement>(null);
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-float-up');
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
  
  // Dynamické generování bublin
  useEffect(() => {
    if (!bubblesRef.current) return;
    
    const container = bubblesRef.current;
    const bubbleCount = 20;
    
    const createBubble = () => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      
      const size = 5 + Math.random() * 15;
      const left = Math.random() * 100;
      const animationDuration = 5 + Math.random() * 10;
      const animationDelay = Math.random() * 5;
      
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.animationDuration = `${animationDuration}s`;
      bubble.style.animationDelay = `${animationDelay}s`;
      
      container.appendChild(bubble);
      
      // Odstraníme bublinu po dokončení animace
      setTimeout(() => {
        bubble.remove();
        createBubble();
      }, (animationDuration + animationDelay) * 1000);
    };
    
    // Vytvoříme iniciální bubliny
    for (let i = 0; i < bubbleCount; i++) {
      setTimeout(() => createBubble(), i * 200);
    }
    
    return () => {
      // Cleanup před odmontováním komponenty
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className={cn(
        "py-20 md:py-28 relative overflow-hidden",
        className
      )}
    >
      {/* Hlavní pozadí - tmavě modrá jako hlubiny oceánu */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-darkest via-ocean-deeper to-ocean-darkest"></div>
      
      {/* Pozadí s efekty */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>
      
      {/* Vodní efekty - bublinky */}
      <div ref={bubblesRef} className="bubble-container"></div>
      
      {/* Poseidonův efekt víru */}
      <div className="whirlpool absolute top-[15%] right-[5%] opacity-10 z-0"></div>
      <div className="whirlpool absolute bottom-[10%] left-[8%] opacity-10 z-0"></div>
      
      {/* Světelné efekty */}
      <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-ocean-light/5 filter blur-3xl"></div>
      <div className="absolute -bottom-20 right-1/3 w-80 h-80 rounded-full bg-gold/5 filter blur-3xl"></div>
      
      {/* Animovaný trojzubec v pozadí */}
      <div className="absolute left-0 top-1/4 opacity-5 pointer-events-none">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-64 h-64 text-ocean-light animate-float"
          style={{ animationDuration: '15s' }}
        >
          <path d="M12 2v14M4 9h16M7 3v5M17 3v5" />
        </svg>
      </div>
      
      {/* Korálová dekorace na spodku sekce */}
      <div className="coral-decoration"></div>
      
      {/* Obsah sekce */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="ocean-title terminal-section-title inline-block">
            <span className="text-gold"></span> Pán internetových vod
          </h2>
          <div className="trident-divider my-6"></div>
          <p className="max-w-2xl mx-auto text-white/80 font-mono">
            Jako Poseidon vládne oceánům, tak Webseidon přináší moderní webové technologie do vašeho podnikání.
            Ponořte se se mnou do světa moderního webdesignu.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Levý sloupec - navigační záložky a fotografie */}
          <div className="md:col-span-1 lg:col-span-2 order-2 lg:order-1">
            <div className="mb-10 bg-ocean-darkest/50 backdrop-blur-md border border-ocean-light/10 rounded-xl overflow-hidden shadow-xl water-effect">
              <div className="relative p-1">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ocean-light/0 via-ocean-light/30 to-ocean-light/0"></div>
                <div className="absolute inset-0 bg-coral-pattern opacity-30 z-[1] pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-none">
                    <img 
                      src="/img/antekcz__Nerdy_Poseidon_with_short_hair_and_dioptric_glasses__2e7350e5-7b43-4fbf-9ecf-00a8eaa62603_2.png" 
                      alt="Lukáš Adamek - Web Developer" 
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-full h-full text-gold opacity-50 animate-sea-sway"
                    >
                      <path d="M12 2v14M4 9h16M7 3v5M17 3v5" />
                    </svg>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-ocean-darker/70 backdrop-blur-sm p-2 rounded-lg border border-ocean-light/20">
                    <p className="text-xs text-ocean-light font-mono">Webseidon - vládce digitálních vod</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-center mb-6">
                  <div className="flex space-x-1">
                    {[
                      { id: 'profile', label: './me' },
                      { id: 'skills', label: './dovednosti' },
                      { id: 'journey', label: './cesta' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "px-4 py-2 rounded-md font-mono text-sm transition-all duration-300 relative",
                          activeTab === tab.id 
                            ? "bg-ocean-medium/30 text-ocean-light border-ocean-light border" 
                            : "bg-ocean-darkest text-white/60 hover:text-white hover:bg-ocean-deeper border-ocean-dark/50 border"
                        )}
                      >
                        <span className="relative z-10">{tab.label}</span>
                        {activeTab === tab.id && (
                          <div className="absolute inset-0 bg-wave-dots opacity-20 animate-water-shimmer rounded-md"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="transition-all duration-500">
                  {activeTab === 'profile' && (
                    <div className="animate-float-up">
                      <h3 className="text-xl text-ocean-light mb-3 sea-waves-border inline-block">
                        <span className="trident-icon"></span>
                        Lukáš Adamek
                      </h3>
                      <p className="text-white/80 font-mono mb-4">
                        Jsem <span className="text-ocean-light font-semibold">freelance vývojář</span> s více než 
                        <span className="text-gold"> 10 lety zkušeností</span>. Podobně jako Poseidon ovládá oceány, 
                        já ovládám webové technologie. Specializuji se na tvorbu moderních, responzivních 
                        a optimalizovaných webů pro malé firmy a živnostníky.
                      </p>
                      <div className="flex space-x-4 mt-4">
                        <a 
                          href="https://github.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-ocean-dark hover:bg-ocean-medium text-ocean-light w-10 h-10 flex items-center justify-center rounded-md transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                        </a>
                        <a 
                          href="https://linkedin.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-ocean-dark hover:bg-ocean-medium text-ocean-light w-10 h-10 flex items-center justify-center rounded-md transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                        </a>
                        <a 
                          href="https://instagram.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-ocean-dark hover:bg-ocean-medium text-ocean-light w-10 h-10 flex items-center justify-center rounded-md transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </a>
                        <a 
                          href="https://facebook.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-ocean-dark hover:bg-ocean-medium text-ocean-light w-10 h-10 flex items-center justify-center rounded-md transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'skills' && (
                    <div className="animate-float-up space-y-4">
                      <h3 className="text-xl text-ocean-light mb-5 sea-waves-border inline-block">
                        <span className="trident-icon"></span>
                        Technické dovednosti
                      </h3>
                      
                      <div className="space-y-3">
                        {[
                          { name: "Full-stack", value: 90, color: "from-gold to-gold/70" },
                          { name: "React/Vite", value: 75, color: "from-ocean-light to-ocean-medium" },
                          { name: "/HTML/JS/Tailwind/CSS", value: 95, color: "from-ocean-light to-ocean-medium" },
                          { name: "WordPress", value: 90, color: "from-ocean-light to-ocean-medium" },
                          { name: "UI/UX Design", value: 85, color: "from-ocean-light to-ocean-medium" }
                        ].map((skill) => (
                          <div key={skill.name} className="mb-2">
                            <div className="flex justify-between mb-1">
                              <span className="text-white/90 font-mono text-sm">{skill.name}</span>
                              <span className="text-white/60 font-mono text-sm">{skill.value}%</span>
                            </div>
                            <div className="w-full bg-ocean-darkest rounded-full h-2.5 mb-2 overflow-hidden">
                              <div 
                                className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                                style={{ width: `${skill.value}%`, transition: 'width 1s ease-in-out' }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'journey' && (
                    <div className="animate-float-up">
                      <h3 className="text-xl text-ocean-light mb-4 sea-waves-border inline-block">
                        <span className="trident-icon"></span>
                        Moje cesta
                      </h3>
                      
                      <div className="relative pl-6 border-l border-ocean-light/20 space-y-4">
                        {[
                          { year: "2025", title: "Specializace na React, Vite", desc: "Rozšíření nabídky o specializované webové aplikace, spolupráce na SAAS projektech" },
                          { year: "2024", title: "Založení Webseidon", desc: "Specializace na tvorbu webových stránek a optimalizaci webů ve WordPressu" },
                          { year: "2020", title: "První weby", desc: "První projekty a webové stránky za použití HTML/CSS/JS" },
                          { year: "2015", title: "Webové začátky", desc: "První kroky k webdesignu a programování" },
                          { year: "2010", title: "Tvorba hudby", desc: "FL Studio, Serum, spolupráce s dalšími umělci" },
                          { year: "2000", title: "IT Odkojenec", desc: "První krůčky k počítači" }
                        ].map((item, index) => (
                          <div key={index} className="mb-4 relative">
                            <div className="absolute -left-[28px] w-[14px] h-[14px] rounded-full bg-ocean-light border-2 border-ocean-darker"></div>
                            <div className="flex items-start">
                              <span className="mr-3 font-bold text-gold">{item.year}</span>
                              <div>
                                <h4 className="text-ocean-light font-medium">{item.title}</h4>
                                <p className="text-white/70 text-sm font-mono">{item.desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Pravý sloupec - hlavní informace */}
          <div className="md:col-span-1 lg:col-span-3 order-1 lg:order-2">
            <div className="space-y-6">
              {/* Sekce - Co dělám */}
              <div className="bg-ocean-darkest/50 backdrop-blur-md p-6 rounded-xl border border-ocean-light/10 hover:border-ocean-light/20 transition-all duration-300 shadow-xl poseidon-card water-effect animate-on-scroll">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center sea-waves-border">
                  <span className="text-gold mr-2">01</span>
                  <span className="trident-icon"></span>
                  Co dělám
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {[
                    {
                      title: "Webový design",
                      desc: "Navrhuji moderní, estetické webové stránky zaměřené na uživatelský zážitek a konverze."
                    },
                    {
                      title: "Frontend vývoj",
                      desc: "Implementuji responzivní a optimalizované webové stránky pomocí React, Next.js a Tailwind CSS."
                    },
                    {
                      title: "Wordpress řešení",
                      desc: "Vytvářím a upravuji WordPress weby, včetně vlastních témat a pluginů."
                    },
                    {
                      title: "Technická optimalizace",
                      desc: "Zajišťuji rychlé načítání, SEO optimalizaci a technickou údržbu webů."
                    }
                  ].map((service, index) => (
                    <div key={index} className="p-4 border border-ocean-light/10 rounded-lg hover:border-ocean-light/30 transition-all duration-300 flex flex-col">
                      <h4 className="text-ocean-light font-bold mb-2">{service.title}</h4>
                      <p className="text-white/70 text-sm font-mono flex-grow">{service.desc}</p>
                    </div>
                  ))}
                </div>
                
                <p className="text-white/80 font-mono">
                  Používám nejmodernější technologie, abych zajistil, že vaše webové stránky budou nejen 
                  vizuálně přitažlivé, ale také rychlé, bezpečné a optimalizované pro vyhledávače.
                </p>
              </div>
              
              {/* Sekce - Proč spolupracovat */}
              <div className="bg-ocean-darkest/50 backdrop-blur-md p-6 rounded-xl border border-ocean-light/10 hover:border-ocean-light/20 transition-all duration-300 shadow-xl poseidon-card water-effect animate-on-scroll animation-delay-200">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center sea-waves-border">
                  <span className="text-gold mr-2">02</span>
                  <span className="trident-icon"></span>
                  Proč spolupracovat
                </h3>
                
                <ul className="text-white/80 font-mono space-y-3 trident-bullet">
                  <li>
                    <strong className="text-ocean-light">Profesionální přístup</strong> - Individuální přístup ke každému projektu s důrazem na kvalitu a detail
                  </li>
                  <li>
                    <strong className="text-ocean-light">Moderní technologie</strong> - Využívám nejnovější trendy a nástroje pro vytvoření konkurenceschopných webů
                  </li>
                  <li>
                    <strong className="text-ocean-light">Transparentnost</strong> - Jasná komunikace, srozumitelné podmínky, žádné skryté poplatky
                  </li>
                  <li>
                    <strong className="text-ocean-light">Dlouhodobá spolupráce</strong> - Poskytuji i následnou podporu a údržbu vašeho webu
                  </li>
                  <li>
                    <strong className="text-ocean-light">Výsledky</strong> - Weby, které nejen dobře vypadají, ale také plní obchodní cíle
                  </li>
                </ul>
                
                <div className="mt-6 text-center">
                  <a 
                    href="#contact" 
                    className="btn-terminal inline-flex items-center water-effect relative hover:bg-ocean-light/10 group"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-5 h-5 mr-2 text-ocean-light"
                    >
                      <path d="M12 2v14M4 9h16M7 3v5M17 3v5" />
                    </svg>
                    Kontaktovat mě
                    <div className="absolute -top-1 -right-1 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 rounded-full bg-ocean-light animate-water-drop"></div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
