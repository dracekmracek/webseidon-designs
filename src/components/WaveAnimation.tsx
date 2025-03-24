
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
  waveColor = 'rgb(93, 169, 233)',
  reverse = false,
  intensity = 'medium',
  position = 'bottom',
  variant = 'smooth',
}) => {
  const intensityValues = {
    light: '0.1',
    medium: '0.2',
    dark: '0.3',
  };

  const opacity = intensityValues[intensity];
  const waveColorWithOpacity = waveColor.replace(/[\d.]+\)$/, `${opacity})`);
  
  const positionClass = position === 'top' ? 'top-0 -mt-1' : 'bottom-0 -mb-1';

  return (
    <div className={cn("absolute left-0 w-full overflow-hidden z-0 h-32", positionClass, className)}>
      {/* Static water base layer with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-light/5 to-ocean-medium/10"></div>
      
      <div className="h-full w-full relative">
        {/* First wave layer - smooth vertical motion */}
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
            d="M0,192 C48,181.3 96,170.7 144,160 C192,149.3 240,138.7 288,144 C336,149.3 384,170.7 432,192 C480,213.3 528,234.7 576,229.3 C624,224 672,192 720,186.7 C768,181.3 816,202.7 864,208 C912,213.3 960,202.7 1008,186.7 C1056,170.7 1104,149.3 1152,144 C1200,138.7 1248,149.3 1296,160 C1344,170.7 1392,181.3 1440,192 L1440,320 L0,320 Z"
          ></path>
        </svg>
        
        {/* Second wave layer - different timing */}
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
            fill={waveColorWithOpacity.replace(/[\d.]+\)$/, `${Number(opacity) * 0.7})`)}
            d="M0,160 C48,181.3 96,202.7 144,192 C192,181.3 240,138.7 288,128 C336,117.3 384,138.7 432,160 C480,181.3 528,202.7 576,192 C624,181.3 672,138.7 720,128 C768,117.3 816,138.7 864,160 C912,181.3 960,202.7 1008,192 C1056,181.3 1104,138.7 1152,128 C1200,117.3 1248,138.7 1296,160 L1440,160 L1440,320 L0,320 Z"
            transform="translate(0, 5)"
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
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-ocean-light/5 opacity-30 animate-shimmer-slow pointer-events-none"></div>
      </div>
    </div>
  );
};

export default WaveAnimation;
