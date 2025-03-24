
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
  const getWavePath = () => {
    switch(variant) {
      case 'choppy':
        return "M0,160 C40,150 80,240 120,230 C160,220 200,140 240,130 C280,120 320,200 360,190 C400,180 440,120 480,110 C520,100 560,160 600,150 C640,140 680,80 720,70 C760,60 800,130 840,120 C880,110 920,50 960,40 C1000,30 1040,90 1080,80 C1120,70 1160,20 1200,10 L1200,320 L0,320 Z";
      case 'cascade':
        return "M0,192 C60,164 120,100 180,80 C240,60 300,96 360,128 C420,160 480,184 540,192 C600,200 660,184 720,160 C780,136 840,124 900,128 C960,132 1020,168 1080,176 C1140,184 1200,160 1260,128 C1320,96 1380,84 1440,96 L1440,320 L0,320 Z";
      default: // smooth
        return "M0,192 C48,181.3 96,170.7 144,160 C192,149.3 240,138.7 288,144 C336,149.3 384,170.7 432,192 C480,213.3 528,234.7 576,229.3 C624,224 672,192 720,186.7 C768,181.3 816,202.7 864,208 C912,213.3 960,202.7 1008,186.7 C1056,170.7 1104,149.3 1152,144 C1200,138.7 1248,149.3 1296,160 C1344,170.7 1392,181.3 1440,192 L1440,320 L1392,320 C1344,320 1296,320 1248,320 C1200,320 1152,320 1104,320 C1056,320 1008,320 960,320 C912,320 864,320 816,320 C768,320 720,320 672,320 C624,320 576,320 528,320 C480,320 432,320 384,320 C336,320 288,320 240,320 C192,320 144,320 96,320 L48,320 L0,320 Z";
    }
  };

  // Create multiple layers of waves with different speeds and offsets for a more natural effect
  return (
    <div className={cn("absolute left-0 w-full overflow-hidden z-0 h-32", positionClass, className)}>
      <div className="h-full w-full relative">
        {/* First wave layer */}
        <svg 
          className={cn(
            "h-full w-full absolute top-0 left-0", 
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
        
        {/* Second wave layer - slightly offset and different opacity */}
        <svg 
          className={cn(
            "h-full w-full absolute top-0 left-0", 
            reverse ? "animate-wave-slow-reverse" : "animate-wave-slow",
          )}
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            fill={waveColor.replace(/[\d.]+\)$/, `${Number(opacity) * 0.7})`)}
            d={getWavePath()}
            transform="translate(60, 10) scale(0.95)"
          ></path>
        </svg>
        
        {/* Third wave layer - different speed for depth effect */}
        <svg 
          className={cn(
            "h-full w-full absolute top-0 left-0", 
            reverse ? "animate-wave-fast-reverse" : "animate-wave-fast",
          )}
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            fill={waveColor.replace(/[\d.]+\)$/, `${Number(opacity) * 0.5})`)}
            d={getWavePath()}
            transform="translate(-30, 5) scale(0.9)"
          ></path>
        </svg>
        
        {/* Water droplet/particle effects */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
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
      </div>
    </div>
  );
};

export default WaveAnimation;
