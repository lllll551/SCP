import React from 'react';

export const FlyingButterfly: React.FC = () => {
  return (
    <div className="butterfly-container" title="Saadi Collection Butterfly">
      <div className="relative w-12 h-10 flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(212,160,52,0.4)]">
        
        {/* Left Wing */}
        <div className="butterfly-wing-left w-6 h-10 flex items-center justify-end">
          <svg
            viewBox="0 0 100 140"
            className="w-6 h-10 overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="goldPurpleGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="45%" stopColor="#d97706" />
                <stop offset="85%" stopColor="#7e22ce" />
                <stop offset="100%" stopColor="#3b0764" />
              </linearGradient>
            </defs>
            {/* Top Forewing */}
            <path
              d="M95,70 C70,25 35,5 5,20 C-12,30 5,75 50,75 C75,75 90,72 95,70 Z"
              fill="url(#goldPurpleGradLeft)"
              stroke="#fbbf24"
              strokeWidth="2.5"
            />
            {/* Lower Hindwing */}
            <path
              d="M95,70 C80,95 45,135 15,120 C-5,110 15,75 60,72 C80,70 90,70 95,70 Z"
              fill="url(#goldPurpleGradLeft)"
              stroke="#fbbf24"
              strokeWidth="2"
              opacity="0.95"
            />
            {/* Wing Vein Detailing */}
            <path
              d="M90,68 Q50,45 20,35 M85,70 Q45,60 15,65 M90,72 Q50,95 25,110"
              stroke="#fef08a"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Central Butterfly Body & Antennae */}
        <div className="relative w-1.5 h-7 bg-stone-900 rounded-full z-10 mx-[-1px] shadow-sm flex flex-col items-center justify-between">
          {/* Head & Antennae */}
          <div className="relative w-2 h-2 bg-amber-400 rounded-full mt-[-2px]">
            <span className="absolute -top-2.5 -left-1.5 w-2 h-3 border-t-2 border-l-2 border-amber-300 rounded-tl-full rotate-[-20deg]" />
            <span className="absolute -top-2.5 -right-1.5 w-2 h-3 border-t-2 border-r-2 border-amber-300 rounded-tr-full rotate-[20deg]" />
          </div>
          <div className="w-1 h-3.5 bg-gradient-to-b from-amber-400 to-purple-900 rounded-full" />
        </div>

        {/* Right Wing */}
        <div className="butterfly-wing-right w-6 h-10 flex items-center justify-start">
          <svg
            viewBox="0 0 100 140"
            className="w-6 h-10 overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="goldPurpleGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="45%" stopColor="#d97706" />
                <stop offset="85%" stopColor="#7e22ce" />
                <stop offset="100%" stopColor="#3b0764" />
              </linearGradient>
            </defs>
            {/* Top Forewing */}
            <path
              d="M5,70 C30,25 65,5 95,20 C112,30 95,75 50,75 C25,75 10,72 5,70 Z"
              fill="url(#goldPurpleGradRight)"
              stroke="#fbbf24"
              strokeWidth="2.5"
            />
            {/* Lower Hindwing */}
            <path
              d="M5,70 C20,95 55,135 85,120 C105,110 85,75 40,72 C20,70 10,70 5,70 Z"
              fill="url(#goldPurpleGradRight)"
              stroke="#fbbf24"
              strokeWidth="2"
              opacity="0.95"
            />
            {/* Wing Vein Detailing */}
            <path
              d="M10,68 Q50,45 80,35 M15,70 Q55,60 85,65 M10,72 Q50,95 75,110"
              stroke="#fef08a"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.8"
            />
          </svg>
        </div>

      </div>
    </div>
  );
};
