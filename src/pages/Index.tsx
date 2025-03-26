import React, { useEffect } from 'react';
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
    
    // Optimalizovaná verze vytváření kapek - menší interval a méně časté vytváření
    const createWaterDroplets = () => {
      const container = document.createElement('div');
      container.className = 'fixed inset-0 pointer-events-none z-50 overflow-hidden';
      document.body.appendChild(container);
      
      // Méně časté vytváření kapek
      setInterval(() => {
        if (Math.random() > 0.85) { // 15% šance
          const droplet = document.createElement('div');
          droplet.className = 'water-droplet';
          
          // Random position
          droplet.style.left = `${Math.random() * 100}%`;
          droplet.style.top = `${Math.random() * 100}%`;
          
          // Random size
          const size = Math.random() * 4 + 2; // 2-6px
          droplet.style.width = `${size}px`;
          droplet.style.height = `${size}px`;
          
          // Set color to ocean blue
          droplet.style.backgroundColor = 'rgba(93, 169, 233, 0.6)';
          droplet.style.boxShadow = '0 0 3px rgba(93, 169, 233, 0.8)';
          droplet.style.animation = 'water-drop 3s ease-out forwards, blink 1.5s ease-in-out infinite';
          
          container.appendChild(droplet);
          
          // Rychlejší odstranění kapky
          setTimeout(() => {
            if (container.contains(droplet)) {
              container.removeChild(droplet);
            }
          }, 3000);
        }
      }, 500); // Větší interval pro méně častou tvorbu
    };
    
    // Zpožděně vytvoříme kapky až po načtení stránky
    setTimeout(createWaterDroplets, 1500);
    
    return () => {
      document.body.classList.remove('page-loaded');
    };
  }, []);

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
