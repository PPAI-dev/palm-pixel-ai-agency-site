import React from "react";
import logoUrl from "../assets/images/ChatGPT_Image_Jun_15__2026__04_48_05_PM.png";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function PalmPixelLogo({ className = "", size = 48 }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <img
        src={logoUrl}
        alt="Palm & Pixel AI Agency"
        style={{ width: size, height: size }}
        className="object-contain"
      />
      <div className="flex flex-col select-none">
        <span className="font-bold text-lg text-white tracking-widest leading-none">
          PALM & PIXEL
        </span>
        <span className="text-[10px] font-mono tracking-[0.35em] text-[#DFBA73] uppercase">
          AI AGENCY
        </span>
      </div>
    </div>
  );
}