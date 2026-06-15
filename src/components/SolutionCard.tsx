import React, { useState } from "react";
import * as LucideIcons from "lucide-react";
import { Solution } from "../types";

interface SolutionCardProps {
  key?: string | number;
  solution: Solution;
  index: number;
  onSelectBooking: (solutionTitle: string) => void;
}

export default function SolutionCard({ solution, index, onSelectBooking }: SolutionCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Dynamic icon resolution
  const renderIcon = (name: string) => {
    const IconComponent = (LucideIcons as any)[name];
    if (!IconComponent) return <LucideIcons.Sparkles className="w-6 h-6 text-[#DFBA73]" />;
    return <IconComponent className="w-6 h-6 text-[#DFBA73] stroke-[1.5]" />;
  };

  return (
    <div
      className="relative flex flex-col justify-between bg-zinc-950/40 backdrop-blur-md rounded-2xl border border-zinc-800/60 p-6 md:p-8 hover:border-purple-500/40 transition-all duration-500 group overflow-hidden"
      id={`solution-card-${solution.id}`}
    >
      {/* Absolute Glow Spot */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-purple-600/10 via-blue-500/0 to-transparent rounded-full blur-xl group-hover:from-purple-600/20 group-hover:scale-150 transition-all duration-700" />

      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 text-[#DFBA73] group-hover:border-[#DFBA73]/50 transition-colors duration-300">
            {renderIcon(solution.iconName)}
          </div>
          <span className="text-xs font-mono text-zinc-500 font-medium tracking-widest uppercase">
            [ OPTION 0{index + 1} ]
          </span>
        </div>

        {/* Card Title */}
        <h3 className="text-xl font-heading font-semibold text-white tracking-tight mb-3 group-hover:text-purple-300 transition-colors duration-300">
          {solution.title}
        </h3>

        {/* Short Description */}
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
          {solution.shortDesc}
        </p>

        {/* Practical Use Case Overlay */}
        <div className="mb-6 p-3.5 rounded-lg bg-zinc-900/30 border border-zinc-900/50">
          <span className="text-[10px] font-mono tracking-widest text-[#DFBA73] uppercase block mb-1">
            Primary Target
          </span>
          <span className="text-xs text-zinc-300 font-medium font-sans">
            {solution.useCase}
          </span>
        </div>

        {/* Impact Metric Highlight */}
        <div className="mb-4 flex items-center justify-between border-t border-zinc-900 pt-4">
          <span className="text-xs text-zinc-500 font-mono tracking-wider">ESTIMATED IMPACT</span>
          <span className="text-xs font-mono font-semibold text-[#DFBA73] bg-[#DFBA73]/5 px-2 py-0.5 rounded border border-[#DFBA73]/10">
            {solution.impactMetric}
          </span>
        </div>
      </div>

      {/* Accordion / Expanded technical specs */}
      <div className="mt-4 pt-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono tracking-wider hover:text-white transition-colors cursor-pointer mb-2"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <>
              <LucideIcons.ChevronUp className="w-3.5 h-3.5 text-purple-400" />
              HIDE ARCHITECTURE DETAILS
            </>
          ) : (
            <>
              <LucideIcons.ChevronDown className="w-3.5 h-3.5 text-purple-400" />
              EXPLORE BLUEPRINT SPEC
            </>
          )}
        </button>

        {isOpen && (
          <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-900 mt-2 space-y-3.5 text-left text-xs text-zinc-400 animate-fadeIn font-sans leading-relaxed">
            <div>
              <span className="text-[#DFBA73] font-mono text-[10px] block uppercase tracking-wider mb-1">
                How It Works
              </span>
              <p className="text-zinc-300 font-light translate-y-0 text-xs">
                {solution.longDesc}
              </p>
            </div>
            
            <div>
              <span className="text-purple-400 font-mono text-[10px] block uppercase tracking-wider mb-1">
                Key Integrations
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {solution.id === "agents" && ["OpenAI GPT-4o", "Claude 3.5 Sonnet", "vapi.ai", "Retell AI", "Zapier"].map(i => (
                  <span key={i} className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md font-mono text-[9px]">{i}</span>
                ))}
                {solution.id === "bpa" && ["Make.com", "Zapier", "Flowise", "ActivePieces", "n8n"].map(i => (
                  <span key={i} className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md font-mono text-[9px]">{i}</span>
                ))}
                {solution.id === "comm" && ["Twilio", "SendGrid", "Resend", "Loom", "Cal.com"].map(i => (
                  <span key={i} className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md font-mono text-[9px]">{i}</span>
                ))}
                {solution.id === "lead" && ["Typeform", "Clay", "LinkedIn Sales Nav", "Smartlead"].map(i => (
                  <span key={i} className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md font-mono text-[9px]">{i}</span>
                ))}
                {solution.id === "crm" && ["HubSpot", "Salesforce", "GoHighLevel", "Pipedrive", "Airtable"].map(i => (
                  <span key={i} className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md font-mono text-[9px]">{i}</span>
                ))}
                {solution.id === "custom" && ["AWS Lambda", "Supabase", "Pinecone Vector DB", "LangChain"].map(i => (
                  <span key={i} className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md font-mono text-[9px]">{i}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-zinc-900/80 pt-4 flex items-center justify-between">
        <button
          onClick={() => onSelectBooking(solution.title)}
          className="w-full py-2.5 px-4 rounded-xl font-mono text-xs font-semibold text-center tracking-wider bg-transparent text-white border border-zinc-800 hover:border-[#DFBA73] hover:text-[#DFBA73] transition-all duration-300 cursor-pointer"
        >
          DISCUSS RESOLUTION
        </button>
      </div>
    </div>
  );
}
