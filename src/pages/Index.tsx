
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

  // Add class to handle page transitions
  useEffect(() => {
    document.body.classList.add('page-loaded');
    
    // Create water droplet effects throughout the page
    const createWaterDroplets = () => {
      const container = document.createElement('div');
      container.className = 'fixed inset-0 pointer-events-none z-50 overflow-hidden';
      document.body.appendChild(container);
      
      // Create occasional water droplets
      setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance of creating a droplet
          const droplet = document.createElement('div');
          droplet.className = 'water-droplet';
          
          // Random position
          droplet.style.left = `${Math.random() * 100}%`;
          droplet.style.top = `${Math.random() * 100}%`;
          
          // Random size
          const size = Math.random() * 4 + 2; // 2-6px
          droplet.style.width = `${size}px`;
          droplet.style.height = `${size}px`;
          
          container.appendChild(droplet);
          
          // Remove droplet after animation
          setTimeout(() => {
            container.removeChild(droplet);
          }, 3000);
        }
      }, 200);
    };
    
    createWaterDroplets();
    
    return () => {
      document.body.classList.remove('page-loaded');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Technologies />
        <Projects />
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
