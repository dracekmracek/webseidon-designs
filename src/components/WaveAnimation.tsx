import React from 'react';
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
  waveColor = 'rgba(93, 169, 233, 0.4)', // Výchozí barva oceánu - budeme používat konzistentně
  reverse = false,
  intensity = 'medium',
  position = 'bottom',
  variant = 'smooth',
  height = '320',
  zIndex = 0,
}) => {
  const intensityValues = {
    light: '0.3',
    medium: '0.4',
    dark: '0.5',
  };

  const opacity = intensityValues[intensity];
  // Zajistíme, že barva je vždy ve formátu rgb/rgba pro manipulaci s průhledností
  const isRgb = waveColor.startsWith('rgb');
  const waveColorWithOpacity = isRgb 
    ? waveColor.replace(/[\d.]+\)$/, `${opacity})`)
    : `rgba(93, 169, 233, ${opacity})`; // Garantujeme oceánskou modrou s určenou průhledností
  
  const positionClass = position === 'top' 
    ? 'top-0 -mt-1 transform scale-y-100' 
    : 'bottom-0 -mb-1';

  // Vybere správnou vlnovou křivku podle varianty
  const getWavePath = (variant: string, isSecondLayer = false, forTopPosition = false) => {
    // Pro horní pozici potřebujeme převrátit křivku svisle
    const paths = {
      choppy: {
        first: "M0,192 C48,170 96,140 144,150 C192,160 240,210 288,224 C336,238 384,214 432,192 C480,170 528,150 576,160 C624,170 672,210 720,224 C768,238 816,214 864,192 C912,170 960,150 1008,160 C1056,170 1104,210 1152,224 C1200,238 1248,214 1296,192 C1344,170 1392,150 1440,160 L1440,320 L0,320 Z",
        second: "M0,160 C60,130 120,110 180,150 C240,190 300,130 360,110 C420,90 480,150 540,170 C600,190 660,130 720,100 C780,70 840,130 900,160 C960,190 1020,130 1080,110 C1140,90 1200,150 1260,170 C1320,190 1380,130 1440,120 L1440,320 L0,320 Z"
      },
      cascade: {
        first: "M0,256 C48,240 96,224 144,224 C192,224 240,240 288,256 C336,272 384,288 432,288 C480,288 528,272 576,256 C624,240 672,224 720,224 C768,224 816,240 864,256 C912,272 960,288 1008,288 C1056,288 1104,272 1152,256 C1200,240 1248,224 1296,224 C1344,224 1392,240 1440,256 L1440,320 L0,320 Z",
        second: "M0,128 C48,144 96,160 144,160 C192,160 240,144 288,128 C336,112 384,96 432,96 C480,96 528,112 576,128 C624,144 672,160 720,160 C768,160 816,144 864,128 C912,112 960,96 1008,96 C1056,96 1104,112 1152,128 C1200,144 1248,160 1296,160 C1344,160 1392,144 1440,128 L1440,320 L0,320 Z"
      },
      smooth: {
        first: "M0,192 C48,181.3 96,170.7 144,160 C192,149.3 240,138.7 288,144 C336,149.3 384,170.7 432,192 C480,213.3 528,234.7 576,229.3 C624,224 672,192 720,186.7 C768,181.3 816,202.7 864,208 C912,213.3 960,202.7 1008,186.7 C1056,170.7 1104,149.3 1152,144 C1200,138.7 1248,149.3 1296,160 C1344,170.7 1392,181.3 1440,192 L1440,320 L0,320 Z",
        second: "M0,160 C48,181.3 96,202.7 144,192 C192,181.3 240,138.7 288,128 C336,117.3 384,138.7 432,160 C480,181.3 528,202.7 576,192 C624,181.3 672,138.7 720,128 C768,117.3 816,138.7 864,160 C912,181.3 960,202.7 1008,192 C1056,181.3 1104,138.7 1152,128 C1200,117.3 1248,138.7 1296,160 C1344,170.7 1392,181.3 1440,192 L1440,320 L0,320 Z"
      }
    };

    // Pro horní pozici převrátíme křivku
    if (forTopPosition) {
      // Pro horní pozici převrátíme křivku - bereme křivku a převrátíme ji pomocí transformace
      const path = isSecondLayer ? paths[variant as keyof typeof paths].second : paths[variant as keyof typeof paths].first;
      // Změníme pouze koncovou část, aby navazovala na horní hranu (0 místo 320)
      return path.replace("L1440,320 L0,320 Z", "L1440,0 L0,0 Z");
    } else {
      return isSecondLayer ? paths[variant as keyof typeof paths].second : paths[variant as keyof typeof paths].first;
    }
  };

  return (
    <div 
      className={cn(
        "absolute left-0 w-full overflow-hidden", 
        positionClass, 
        className,
        position === 'top' ? 'rotate-180' : ''
      )} 
      style={{ 
        height: `${height}px`, 
        zIndex: zIndex
      }}
    >
      {/* Odstraněno statické namodralé pozadí */}
      
      <div className="h-full w-full relative">
        {/* První vrstva vln - plynulý vertikální pohyb */}
        <svg 
          className={cn(
            "h-full w-[200%] absolute top-0 left-0 animate-bounce-wave", 
            reverse ? "animate-wave-reverse" : "animate-wave"
          )}
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            fill={waveColorWithOpacity}
            d={getWavePath(variant, false, position === 'top')}
          ></path>
        </svg>
        
        {/* Druhá vrstva vln - odlišné časování */}
        <svg 
          className={cn(
            "h-full w-[200%] absolute top-0 left-0 animate-bounce-wave-slow", 
            reverse ? "animate-wave-slow" : "animate-wave-slow-reverse"
          )}
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            fill={isRgb ? waveColorWithOpacity.replace(/[\d.]+\)$/, `${Number(opacity) * 0.8})`) : `rgba(93, 169, 233, ${Number(opacity) * 0.8})`}
            d={getWavePath(variant, true, position === 'top')}
            transform="translate(0, 5)"
          ></path>
        </svg>
        
        {/* Efekt vodních kapiček */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full animate-float-up"
              style={{
                backgroundColor: 'rgba(93, 169, 233, 0.5)', // Jasnější kapičky
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: position === 'top' ? `${Math.random() * 30}%` : `${70 + Math.random() * 30}%`,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 5}s`,
                boxShadow: '0 0 3px rgba(93, 169, 233, 0.8)', // Jasnější záře
              }}
            />
          ))}
        </div>
        
        {/* Třpytivý efekt vodní hladiny */}
        <div className="absolute inset-0 holographic opacity-10 pointer-events-none"></div>
        
        {/* Jemně svítící body - imitace odrazu světla */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div 
              key={`glow-${i}`}
              className="absolute rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                left: `${Math.random() * 100}%`,
                top: position === 'top' ? `${Math.random() * 40}%` : `${60 + Math.random() * 40}%`,
                opacity: Math.random() * 0.3 + 0.1,
                transform: 'translateZ(0)',
                animation: `float ${5 + Math.random() * 7}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaveAnimation;
