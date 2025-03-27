import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface WaveAnimationProps {
  className?: string;
  waveColor?: string;
  reverse?: boolean;
  intensity?: 'light' | 'medium' | 'dark';
  position?: 'top' | 'bottom';
  variant?: 'smooth' | 'choppy' | 'cascade';
  height?: string;
  zIndex?: number;
}

export const WaveAnimation: React.FC<WaveAnimationProps> = ({
  className,
  waveColor = 'rgba(93, 169, 233, 0.4)',
  reverse = false,
  intensity = 'medium',
  position = 'bottom',
  variant = 'smooth',
  height = '360',
  zIndex = 0,
}) => {
  const intensityValues = {
    light: '0.3',
    medium: '0.5',
    dark: '0.8',
  };

  const opacity = intensityValues[intensity];
  const isRgb = waveColor.startsWith('rgb');
  const waveColorWithOpacity = isRgb 
    ? waveColor.replace(/[\d.]+\)$/, `${opacity})`)
    : `rgba(93, 169, 233, ${opacity})`;
  
  const positionClass = position === 'top' 
    ? 'top-0 -mt-1 transform scale-y-100' 
    : 'bottom-0 -mb-1';

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let waves: Wave[] = [];
    const waveCount = 6; // Zvýšení počtu vln pro bohatší efekt

    // Nastavení velikosti plátna podle obrazovky
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = parseInt(height, 10); // Použití hodnoty z props
      initWaves();
    };

    // Inicializace vln s různými parametry
    const initWaves = () => {
      waves = [];
      const baseSpeed = 0.004; // Zpomalení pro plynulejší pohyb
      const heightMultiplier = canvas.height / 7;

      for (let i = 0; i < waveCount; i++) {
        waves.push({
          amplitude: heightMultiplier * (1.2 + Math.random() * 0.6),
          period: Math.max(canvas.width / (1.5 + Math.random() * 2.2), 180),
          phase: Math.random() * Math.PI * 2,
          speed: baseSpeed * (0.7 + Math.random() * 0.5) * (reverse ? -1 : 1),
          color: `rgba(93, ${169 - i * 12}, ${233 - i * 15}, ${0.2 + i * 0.05})`, // Odstupňované modré tóny
        });
      }
    };

    // Vykreslení vln
    const drawWaves = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Vylepšený gradient pro přechod mezi sekcemi
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, position === 'top' ? 'rgba(10, 25, 47, 0.15)' : 'rgba(10, 25, 47, 0)');
      gradient.addColorStop(1, position === 'top' ? 'rgba(10, 25, 47, 0)' : 'rgba(10, 25, 47, 0.15)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.moveTo(0, position === 'top' ? 0 : canvas.height);

        // Parametry pro vlnu
        const baseY = position === 'top' ? canvas.height * 0.3 : canvas.height * 0.7;
        wave.phase += wave.speed;

        // Vykreslení křivky vlny s vyšší plynulostí
        for (let x = 0; x <= canvas.width; x += 3) { // Zjemnění křivky pro plynulejší vizuální efekt
          let y = baseY;
          
          // Různě modulovaný signál pro vlnu podle varianty
          if (variant === 'choppy') {
            y += Math.sin(x / wave.period + wave.phase + time / 1200) * wave.amplitude * 
                 (1 + Math.sin(time / 3500 + index) * 0.15) * 
                 (0.9 + Math.cos(x / 200) * 0.1);
          } else if (variant === 'cascade') {
            y += (Math.sin(x / wave.period + wave.phase + time / 1500) + 
                 Math.sin(x / (wave.period / 2) + wave.phase + time / 800) * 0.3) * 
                 wave.amplitude * (1 + Math.sin(time / 4000) * 0.1);
          } else { // smooth
            y += Math.sin(x / wave.period + wave.phase + time / 1800) * wave.amplitude * 
                 (1 + Math.cos(time / 5000) * 0.08);
          }
          
          if (x === 0) {
            ctx.moveTo(x, position === 'top' ? canvas.height - y : y);
          } else {
            ctx.lineTo(x, position === 'top' ? canvas.height - y : y);
          }
        }

        // Dokončení cesty
        ctx.lineTo(canvas.width, position === 'top' ? 0 : canvas.height);
        ctx.lineTo(0, position === 'top' ? 0 : canvas.height);
        ctx.closePath();

        // Nastavení barvy a vyplnění
        ctx.fillStyle = wave.color;
        ctx.fill();

        // Vykreslení okraje vlny pro lepší definici
        ctx.strokeStyle = wave.color.replace(/[\d.]+\)$/, '0.7)');
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame((time) => drawWaves(time));
    };

    // Obsluha změny velikosti okna
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Spuštění animace
    animationFrameId = requestAnimationFrame((time) => drawWaves(time));

    // Úklid při odmontování komponenty
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [height, variant, position, reverse]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute left-0 w-full pointer-events-none", 
        positionClass, 
        className,
        position === 'top' ? 'rotate-180' : ''
      )}
      style={{ height: `${height}px`, zIndex: zIndex }}
    />
  );
};

// Definice typu vlny
interface Wave {
  amplitude: number;
  period: number;
  phase: number;
  speed: number;
  color: string;
}

export default WaveAnimation;
