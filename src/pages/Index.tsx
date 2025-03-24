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

  // Add class to handle page transitions
  useEffect(() => {
    document.body.classList.add('page-loaded');
    
    // Create water droplets effects throughout the page - hackers style
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
          
          // Set color to ocean blue
          droplet.style.backgroundColor = 'rgba(93, 169, 233, 0.6)';
          // Add light effect for hackers style
          droplet.style.boxShadow = '0 0 3px rgba(93, 169, 233, 0.8)';
          // Add blinking effect
          droplet.style.animation = 'water-drop 3s ease-out forwards, blink 1.5s ease-in-out infinite';
          
          container.appendChild(droplet);
          
          // Remove droplet after animation
          setTimeout(() => {
            if (container.contains(droplet)) {
              container.removeChild(droplet);
            }
          }, 3000);
        }
      }, 200);
    };
    
    createWaterDroplets();
    
    // Matrix effect in the background
    const createMatrixBackground = () => {
      const canvas = document.createElement('canvas');
      canvas.className = 'fixed inset-0 pointer-events-none z-0';
      canvas.style.opacity = '0.05'; // Very subtle effect
      document.body.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const columns = Math.floor(canvas.width / 20);
      const drops: number[] = [];
      
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
      }
      
      const draw = () => {
        ctx.fillStyle = 'rgba(10, 25, 47, 0.05)'; // Very dark background
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(93, 169, 233, 0.8)'; // Text color
        ctx.font = '12px monospace';
        
        for (let i = 0; i < drops.length; i++) {
          const text = characters[Math.floor(Math.random() * characters.length)];
          ctx.fillText(text, i * 20, drops[i] * 20);
          
          if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          
          drops[i]++;
        }
      };
      
      setInterval(draw, 50);
      
      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    };
    
    createMatrixBackground();
    
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
