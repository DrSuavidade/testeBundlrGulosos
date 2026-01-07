import React from 'react';

interface WavyDividerProps {
  color?: string; // CSS hex or Tailwind class color for the fill
  className?: string;
  variant?: 'gentle' | 'wave' | 'curve' | 'asymmetric' | 'swoop' | 'flow';
}

export const WavyDivider: React.FC<WavyDividerProps> = ({ 
  color = '#FFF6F1', 
  className = '',
  variant = 'gentle' 
}) => {
  // All paths are designed to be placed at the top of a section, "pointing up" 
  // (filling the bottom part of the SVG).
  
  const paths = {
    // A standard sine-like wave
    gentle: "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,42.7C672,32,768,32,864,42.7C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    
    // A more pronounced wave
    wave: "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    
    // A simple large convex curve
    curve: "M0,160 C320,0 1120,0 1440,160 L1440,320 L0,320 Z",

    // An asymmetric organic slope
    asymmetric: "M0,192L60,170.7C120,149,240,107,360,106.7C480,107,600,149,720,165.3C840,181,960,171,1080,144C1200,117,1320,75,1380,53.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",

    // New: Large sweeping concave curve (Good for Hero -> Section transitions)
    swoop: "M0,32L80,58.7C160,85,320,139,480,160C640,181,800,171,960,144C1120,117,1280,75,1360,53.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z",

    // New: Very gentle, liquid flow
    flow: "M0,256L80,245.3C160,235,320,213,480,181.3C640,149,800,107,960,106.7C1120,107,1280,149,1360,170.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
  };

  return (
    <div className={`w-full overflow-hidden leading-[0] ${className}`}>
      <svg 
        className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[120px] lg:h-[200px]" 
        data-name="Layer 1" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320" 
        preserveAspectRatio="none"
      >
        <path d={paths[variant]} fill={color}></path>
      </svg>
    </div>
  );
};
