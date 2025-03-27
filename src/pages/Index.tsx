import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Technologies from '@/components/Technologies';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import Blog from '@/components/Blog';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Terminal from '@/components/Terminal';
import Workflow from '@/components/Workflow';

const Index = () => {
  const [isMobile, setIsMobile] = useState(false);
  
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
  
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const href = target.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const id = href.substring(1);
        const element = document.getElementById(id);
        
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Adjust for navbar height
            behavior: 'smooth'
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorLinkClick as EventListener);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorLinkClick as EventListener);
      });
    };
  }, []);

  // Optimalizovaná verze - odstraníme zbytečné zpoždění a efekty
  useEffect(() => {
    // Ihned označit stránku jako načtenou
    document.body.classList.add('page-loaded');
    
    // Optimalizovaná verze vytváření kapek s detekcí mobilních zařízení
    const createWaterDroplets = () => {
      // Na mobilních zařízeních tento efekt použijeme velmi omezeně
      if (isMobile && Math.random() > 0.5) return; // 50% šance na úplné přeskočení na mobilech
      
      const container = document.createElement('div');
      container.className = 'fixed inset-0 pointer-events-none z-50 overflow-hidden';
      document.body.appendChild(container);
      
      // Interval vytváření kapek - delší interval pro mobilní zařízení
      const dropletInterval = isMobile ? 1200 : 500; // ms
      
      // Omezení počtu kapek v jeden moment
      let activeDroplets = 0;
      const maxDroplets = isMobile ? 5 : 15;
      
      const interval = setInterval(() => {
        // Kontrola počtu aktivních kapek
        if (activeDroplets >= maxDroplets) return;
        
        // Menší šance vytvoření kapky na mobilních zařízeních
        const dropletChance = isMobile ? 0.05 : 0.15; // 5% vs 15% šance
        
        if (Math.random() > (1 - dropletChance)) {
          const droplet = document.createElement('div');
          droplet.className = 'water-droplet';
          activeDroplets++;
          
          // Random position
          droplet.style.left = `${Math.random() * 100}%`;
          droplet.style.top = `${Math.random() * 100}%`;
          
          // Random size - menší velikost na mobilních zařízeních
          const size = isMobile 
            ? Math.random() * 2 + 1 // 1-3px na mobilech
            : Math.random() * 4 + 2; // 2-6px na desktopech
            
          droplet.style.width = `${size}px`;
          droplet.style.height = `${size}px`;
          
          // Set color to ocean blue
          droplet.style.backgroundColor = 'rgba(93, 169, 233, 0.6)';
          
          // Použijeme méně intenzivní stín na mobilech pro lepší výkon
          droplet.style.boxShadow = isMobile
            ? '0 0 2px rgba(93, 169, 233, 0.6)'
            : '0 0 3px rgba(93, 169, 233, 0.8)';
            
          // Kratší animace na mobilních zařízeních
          const animationDuration = isMobile ? 2 : 3; // sekundy
          droplet.style.animation = `water-drop ${animationDuration}s ease-out forwards, blink 1.5s ease-in-out infinite`;
          
          container.appendChild(droplet);
          
          // Rychlejší odstranění kapky
          setTimeout(() => {
            if (container.contains(droplet)) {
              container.removeChild(droplet);
              activeDroplets--;
            }
          }, animationDuration * 1000);
        }
      }, dropletInterval);
      
      // Odstranění interval při unmount
      return () => {
        clearInterval(interval);
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      };
    };
    
    // Zpožděně vytvoříme kapky až po načtení stránky, delší zpoždění na mobilech
    const delay = isMobile ? 2500 : 1500;
    const timeoutId = setTimeout(createWaterDroplets, delay);
    
    return () => {
      document.body.classList.remove('page-loaded');
      clearTimeout(timeoutId);
    };
  }, [isMobile]);

  return (
    <div className="min-h-screen flex flex-col relative bg-ocean-darker text-gray-100">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Terminal />
        <Technologies />
        <Projects />
        <Workflow />
        <Testimonials />
        <Pricing />
        <Blog />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
