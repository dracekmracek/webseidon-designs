
import React from 'react';
import { cn } from '@/lib/utils';

interface WaveAnimationProps {
  className?: string;
  waveColor?: string;
  reverse?: boolean;
  intensity?: 'light' | 'medium' | 'dark';
  position?: 'top' | 'bottom';
}

export const WaveAnimation: React.FC<WaveAnimationProps> = ({
  className,
  waveColor = 'rgb(93, 169, 233, 0.2)',
  reverse = false,
  intensity = 'medium',
  position = 'bottom',
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

  return (
    <div className={cn("absolute left-0 w-full overflow-hidden z-0 h-32", positionClass, className)}>
      <div className="h-full w-[200%] relative">
        <svg 
          className={cn(
            "h-full w-full", 
            reverse ? "animate-wave-reverse" : "animate-wave",
            "absolute top-0 left-0",
          )}
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fill={waveColorWithOpacity}
            d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,218.7C672,245,768,267,864,266.7C960,267,1056,245,1152,218.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <svg 
          className={cn(
            "h-full w-full", 
            reverse ? "animate-wave-reverse animation-delay-200" : "animate-wave animation-delay-200",
            "absolute top-0 left-0",
          )}
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fill={waveColorWithOpacity}
            d="M0,96L48,106.7C96,117,192,139,288,149.3C384,160,480,160,576,138.7C672,117,768,75,864,74.7C960,75,1056,117,1152,149.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default WaveAnimation;
