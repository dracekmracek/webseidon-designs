
import React from 'react';
import { cn } from '@/lib/utils';

interface WaveAnimationProps {
  className?: string;
  waveColor?: string;
  reverse?: boolean;
  intensity?: 'light' | 'medium' | 'dark';
  position?: 'top' | 'bottom';
  variant?: 'smooth' | 'choppy' | 'cascade';
}

export const WaveAnimation: React.FC<WaveAnimationProps> = ({
  className,
  waveColor = 'rgb(93, 169, 233, 0.2)',
  reverse = false,
  intensity = 'medium',
  position = 'bottom',
  variant = 'smooth',
}) => {
  // Adjust opacity based on intensity
  const intensityValues = {
    light: '0.1',
    medium: '0.2',
    dark: '0.3',
  };

  const opacity = intensityValues[intensity];
  const waveColorWithOpacity = waveColor.replace(/[\d.]+\)$/, `${opacity})`);
  
  const positionClass = position === 'top' ? 'top-0 -mt-1' : 'bottom-0 -mb-1';

  // Get the appropriate wave path based on variant
  const getWavePath = (variation: number = 0) => {
    switch(variant) {
      case 'choppy':
        if (variation === 1) {
          return "M0,160 C30,140 60,180 90,170 C120,160 150,120 180,110 C210,100 240,170 270,160 C300,150 330,100 360,90 C390,80 420,130 450,120 C480,110 510,70 540,60 C570,50 600,100 630,90 C660,80 690,40 720,30 C750,20 780,70 810,60 C840,50 870,10 900,0 L900,320 L0,320 Z";
        } else if (variation === 2) {
          return "M0,140 C40,120 80,160 120,150 C160,140 200,100 240,90 C280,80 320,150 360,140 C400,130 440,80 480,70 C520,60 560,110 600,100 C640,90 680,50 720,40 C760,30 800,80 840,70 C880,60 920,20 960,10 C1000,0 1040,50 1080,40 C1120,30 1160,0 1200,0 L1200,320 L0,320 Z";
        }
        return "M0,160 C40,150 80,240 120,230 C160,220 200,140 240,130 C280,120 320,200 360,190 C400,180 440,120 480,110 C520,100 560,160 600,150 C640,140 680,80 720,70 C760,60 800,130 840,120 C880,110 920,50 960,40 C1000,30 1040,90 1080,80 C1120,70 1160,20 1200,10 L1200,320 L0,320 Z";
      case 'cascade':
        if (variation === 1) {
          return "M0,172 C50,144 100,90 150,70 C200,50 250,86 300,118 C350,150 400,174 450,182 C500,190 550,174 600,150 C650,126 700,114 750,118 C800,122 850,158 900,166 C950,174 1000,150 1050,118 C1100,86 1150,74 1200,86 L1200,320 L0,320 Z";
        } else if (variation === 2) {
          return "M0,160 C48,140 96,130 144,120 C192,110 240,128 288,134 C336,140 384,160 432,182 C480,204 528,224 576,219 C624,214 672,182 720,176 C768,171 816,192 864,198 C912,204 960,192 1008,176 C1056,160 1104,139 1152,134 C1200,129 1248,139 1296,150 C1344,161 1392,172 1440,182 L1440,320 L1392,320 C1344,320 1296,320 1248,320 C1200,320 1152,320 1104,320 C1056,320 1008,320 960,320 C912,320 864,320 816,320 C768,320 720,320 672,320 C624,320 576,320 528,320 C480,320 432,320 384,320 C336,320 288,320 240,320 C192,320 144,320 96,320 L48,320 L0,320 Z";
        }
        return "M0,192 C60,164 120,100 180,80 C240,60 300,96 360,128 C420,160 480,184 540,192 C600,200 660,184 720,160 C780,136 840,124 900,128 C960,132 1020,168 1080,176 C1140,184 1200,160 1260,128 C1320,96 1380,84 1440,96 L1440,320 L0,320 Z";
      default: // smooth
        if (variation === 1) {
          return "M0,172 C48,161.3 96,150.7 144,140 C192,129.3 240,118.7 288,124 C336,129.3 384,150.7 432,172 C480,193.3 528,214.7 576,209.3 C624,204 672,172 720,166.7 C768,161.3 816,182.7 864,188 C912,193.3 960,182.7 1008,166.7 C1056,150.7 1104,129.3 1152,124 C1200,118.7 1248,129.3 1296,140 C1344,150.7 1392,161.3 1440,172 L1440,320 L1392,320 C1344,320 1296,320 1248,320 C1200,320 1152,320 1104,320 C1056,320 1008,320 960,320 C912,320 864,320 816,320 C768,320 720,320 672,320 C624,320 576,320 528,320 C480,320 432,320 384,320 C336,320 288,320 240,320 C192,320 144,320 96,320 L48,320 L0,320 Z";
        } else if (variation === 2) {
          return "M0,212 C48,201.3 96,190.7 144,180 C192,169.3 240,158.7 288,164 C336,169.3 384,190.7 432,212 C480,233.3 528,254.7 576,249.3 C624,244 672,212 720,206.7 C768,201.3 816,222.7 864,228 C912,233.3 960,222.7 1008,206.7 C1056,190.7 1104,169.3 1152,164 C1200,158.7 1248,169.3 1296,180 C1344,190.7 1392,201.3 1440,212 L1440,320 L1392,320 C1344,320 1296,320 1248,320 C1200,320 1152,320 1104,320 C1056,320 1008,320 960,320 C912,320 864,320 816,320 C768,320 720,320 672,320 C624,320 576,320 528,320 C480,320 432,320 384,320 C336,320 288,320 240,320 C192,320 144,320 96,320 L48,320 L0,320 Z";
        }
        return "M0,192 C48,181.3 96,170.7 144,160 C192,149.3 240,138.7 288,144 C336,149.3 384,170.7 432,192 C480,213.3 528,234.7 576,229.3 C624,224 672,192 720,186.7 C768,181.3 816,202.7 864,208 C912,213.3 960,202.7 1008,186.7 C1056,170.7 1104,149.3 1152,144 C1200,138.7 1248,149.3 1296,160 C1344,170.7 1392,181.3 1440,192 L1440,320 L1392,320 C1344,320 1296,320 1248,320 C1200,320 1152,320 1104,320 C1056,320 1008,320 960,320 C912,320 864,320 816,320 C768,320 720,320 672,320 C624,320 576,320 528,320 C480,320 432,320 384,320 C336,320 288,320 240,320 C192,320 144,320 96,320 L48,320 L0,320 Z";
    }
  };

  // Create multiple layers of waves with different speeds, directions and offsets for a more natural effect
  return (
    <div className={cn("absolute left-0 w-full overflow-hidden z-0 h-32", positionClass, className)}>
      {/* Static water base layer */}
      <div className="bg-ocean-light/5 absolute inset-0"></div>
      
      <div className="h-full w-full relative">
        {/* First wave layer - left to right */}
        <svg 
          className={cn(
            "h-full w-[200%] absolute top-0 left-0", 
            reverse ? "animate-wave-reverse" : "animate-wave",
          )}
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            fill={waveColorWithOpacity}
            d={getWavePath()}
          ></path>
        </svg>
        
        {/* Second wave layer - right to left with different wave pattern */}
        <svg 
          className={cn(
            "h-full w-[200%] absolute top-0 left-0", 
            reverse ? "animate-wave-slow" : "animate-wave-slow-reverse",
          )}
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            fill={waveColor.replace(/[\d.]+\)$/, `${Number(opacity) * 0.7})`)}
            d={getWavePath(1)}
            transform="translate(0, 10) scale(1, 0.95)"
          ></path>
        </svg>
        
        {/* Third wave layer - bouncing up and down with different speed */}
        <svg 
          className="h-full w-[200%] absolute top-0 left-0 animate-bounce-slow" 
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            fill={waveColor.replace(/[\d.]+\)$/, `${Number(opacity) * 0.5})`)}
            d={getWavePath(2)}
            transform="translate(0, 5) scale(1, 0.9)"
          ></path>
        </svg>
        
        {/* Water droplet/particle effects */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full animate-float-up"
              style={{
                backgroundColor: waveColor.replace(/[\d.]+\)$/, '0.4)'),
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${70 + Math.random() * 30}%`,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        
        {/* Shimmering water surface effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 opacity-30 animate-shimmer-slow pointer-events-none"></div>
      </div>
    </div>
  );
};

export default WaveAnimation;
