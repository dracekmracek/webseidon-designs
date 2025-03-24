import React from 'react';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, Code, Terminal } from 'lucide-react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      "py-12 bg-terminal-black text-terminal-white relative overflow-hidden",
      className
    )}>
      {/* Terminal-style background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="h-full w-full bg-terminal-grid bg-[size:20px_20px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 border-b border-terminal-green/20 pb-8">
          {/* Logo a popis */}
          <div>
            <div className="text-2xl font-mono font-bold flex items-center mb-4">
              <span className="text-terminal-green">Web</span>
              <span className="text-terminal-white">seidon</span>
              <span className="ml-1 text-gold text-gold-shimmer">∿≡</span>
            </div>
            <p className="text-terminal-white/70 font-mono text-sm mb-4">
              Vývoj moderních webových stránek v hackerském stylu s důrazem na výkon a bezpečnost.
            </p>
            <div className="flex items-center text-terminal-green/80 text-sm font-mono">
              <Terminal className="w-4 h-4 mr-2" />
              <span>Version 1.0.0</span>
            </div>
          </div>
          
          {/* Kontakt */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-mono text-terminal-green">./kontakt.sh</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Mail className="w-4 h-4 mr-2 mt-1 text-terminal-green" />
                <span className="text-terminal-white/80">info@webseidon.cz</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-4 h-4 mr-2 mt-1 text-terminal-green" />
                <span className="text-terminal-white/80">+420 777 123 456</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 text-terminal-green" />
                <span className="text-terminal-white/80">
                  Praha, Česká republika
                </span>
              </li>
            </ul>
          </div>
          
          {/* Rychlé odkazy */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-mono text-terminal-green">./navigace.sh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => {
                  const element = document.getElementById('about');
                  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }} className="text-terminal-white/80 hover:text-terminal-green transition-colors">
                  O nás
                </button>
              </li>
              <li>
                <button onClick={() => {
                  const element = document.getElementById('services');
                  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }} className="text-terminal-white/80 hover:text-terminal-green transition-colors">
                  Služby
                </button>
              </li>
              <li>
                <button onClick={() => {
                  const element = document.getElementById('pricing');
                  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }} className="text-terminal-white/80 hover:text-terminal-green transition-colors">
                  Ceník
                </button>
              </li>
              <li>
                <button onClick={() => {
                  const element = document.getElementById('faq');
                  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }} className="text-terminal-white/80 hover:text-terminal-green transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }} className="text-terminal-white/80 hover:text-terminal-green transition-colors">
                  Kontakt
                </button>
              </li>
            </ul>
          </div>
          
          {/* Sociální sítě */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-mono text-terminal-green">./sledujte_nas.sh</h3>
            <div className="flex space-x-3 mb-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-md bg-terminal-black border border-terminal-green/30 text-terminal-green hover:bg-terminal-green hover:text-terminal-black transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-md bg-terminal-black border border-terminal-green/30 text-terminal-green hover:bg-terminal-green hover:text-terminal-black transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-md bg-terminal-black border border-terminal-green/30 text-terminal-green hover:bg-terminal-green hover:text-terminal-black transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"></path>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-md bg-terminal-black border border-terminal-green/30 text-terminal-green hover:bg-terminal-green hover:text-terminal-black transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
            <p className="text-sm text-terminal-white/60 font-mono">
              <span className="text-terminal-green">$</span> cat newsletter_signup.txt
            </p>
            <div className="mt-2 flex">
              <input 
                type="email" 
                placeholder="Váš email" 
                className="bg-terminal-black border border-terminal-green/30 text-terminal-white px-3 py-2 text-sm rounded-l-md focus:outline-none focus:border-terminal-green"
              />
              <button className="bg-terminal-green text-terminal-black font-mono text-sm font-medium px-3 py-2 rounded-r-md hover:bg-terminal-green/80 transition-colors">
                Odeslat
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
          <div className="text-sm text-terminal-white/60 mb-4 md:mb-0 font-mono">
            <span className="text-terminal-green">$ echo</span> "© {currentYear} Webseidon. Všechna práva vyhrazena."
          </div>
          <div className="text-sm">
            <a href="#" className="text-terminal-white/60 hover:text-terminal-green mr-4 transition-colors">Ochrana soukromí</a>
            <a href="#" className="text-terminal-white/60 hover:text-terminal-green transition-colors">Podmínky použití</a>
          </div>
        </div>
        
        {/* Animovaný terminálový kurzor v zápatí */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center bg-terminal-black px-4 py-2 rounded-md border border-terminal-green/30 font-mono text-xs text-terminal-green">
            <span className="mr-2">$</span>
            <span className="typing-effect">shutdown -r now</span>
            <span className="blink-cursor ml-1">■</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
