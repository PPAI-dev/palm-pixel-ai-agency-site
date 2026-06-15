import React from "react";

interface LogoProps {
  className?: string;
  size?: number; // width/height in px
  showText?: boolean;
}

export default function PalmPixelLogo({ className = "", size = 48, showText = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="palm-pixel-logo">
      <div
        className="relative flex items-center justify-center cursor-pointer group"
        style={{ width: size, height: size }}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-full blur-sm opacity-20 group-hover:opacity-60 transition-opacity duration-500" />
        
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative z-10 transition-transform duration-500 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradient definitions based on business card accents */}
            <linearGradient id="trunk-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFBA73" /> {/* Warm luxury gold */}
              <stop offset="100%" stopColor="#A88135" /> {/* Deep gold */}
            </linearGradient>

            <linearGradient id="frond-gradient-left" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#8A2BE2" /> {/* Purple */}
              <stop offset="50%" stopColor="#EC4899" /> {/* Pink */}
              <stop offset="100%" stopColor="#3B82F6" /> {/* Blue */}
            </linearGradient>

            <linearGradient id="frond-gradient-right" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8A2BE2" />
              <stop offset="60%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>

            <linearGradient id="frond-gradient-center" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="50%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
            
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* BACKGROUND SHADOW OR AMBIENT CIRClE */}
          {/* PALM FRONDS (GEOMETRIC & LOW POLY AESTHETIC) */}
          
          {/* Top Center Frond */}
          <path
            d="M50,42 L50,15 C50,15 54,22 53,28 C52,34 50,42 50,42 Z"
            fill="url(#frond-gradient-center)"
            opacity="0.95"
          />
          
          {/* Top Left Fronds */}
          <path
            d="M50,42 Q40,25 31,23 Q40,32 50,42 Z"
            fill="url(#frond-gradient-left)"
            opacity="0.9"
          />
          <path
            d="M50,42 Q30,34 21,37 Q33,42 50,42 Z"
            fill="url(#frond-gradient-left)"
            opacity="0.85"
          />
          <path
            d="M50,42 Q28,45 23,54 Q35,50 50,42 Z"
            fill="url(#frond-gradient-left)"
            opacity="0.8"
          />

          {/* Top Right Fronds */}
          <path
            d="M50,42 Q60,25 69,23 Q60,32 50,42 Z"
            fill="url(#frond-gradient-right)"
            opacity="0.9"
          />
          <path
            d="M50,42 Q70,34 79,37 Q67,42 50,42 Z"
            fill="url(#frond-gradient-right)"
            opacity="0.85"
          />
          <path
            d="M50,42 Q72,45 77,54 Q65,50 50,42 Z"
            fill="url(#frond-gradient-right)"
            opacity="0.8"
          />

          {/* TRUNK AS A STYLIZED SERIF CAPITAL 'P' */}
          {/* Vertical stem of the P */}
          <path
            d="M47,40 Q47,56 47,82 M51,40 Q51,56 51,82"
            stroke="url(#trunk-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Base of capitalization (serif foot) */}
          <path
            d="M42,82 L56,82"
            stroke="url(#trunk-gradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Golden Serif top support */}
          <path
            d="M44,42 L53,42"
            stroke="url(#trunk-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* The loop of the 'P' forming the core focal point, blending under/around the trunk */}
          <path
            d="M49,42 C61,42 61,59 49,59 L49,59"
            stroke="url(#trunk-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Little pixel nodes of light radiating around representing "PIXEL" */}
          <rect x="25" y="18" width="2" height="2" fill="#58A6FF" opacity="0.75" />
          <rect x="73" y="20" width="2" height="2" fill="#F472B6" opacity="0.75" />
          <rect x="18" y="47" width="2.5" height="2.5" fill="#C084FC" opacity="0.8" />
          <rect x="80" y="49" width="2" height="2" fill="#DFBA73" opacity="0.8" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col select-none">
          <span className="font-heading font-tracking-wide font-bold text-lg md:text-xl text-white tracking-widest leading-none">
            PALM &amp; PIXEL
          </span>
          <span className="text-[10px] md:text-[11px] font-mono tracking-[0.35em] text-[#DFBA73] uppercase leading-relaxed font-semibold">
            A I &bull; A G E N C Y
          </span>
        </div>
      )}
    </div>
  );
}
