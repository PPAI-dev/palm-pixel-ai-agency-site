import React, { useState } from "react";
import { Sparkles, ArrowRight, RefreshCw, ClipboardCheck, ArrowLeft, Trophy, CheckCircle, Flame } from "lucide-react";
import { QuizQuestion } from "../types";

const ASSESS_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Where is your team spending the most manual overhead?",
    options: [
      { text: "Chasing/answering early leads and qualifying inbound enquiries", score: 3, description: "Lead Capture & Qualification bottleneck" },
      { text: "Re-typing info into spreadsheets, invoices, or disjointed CRMs", score: 2, description: "CRM & Operations synchronization bottleneck" },
      { text: "Responding to same customer questions across calls, texts, and emails", score: 1, description: "Customer Communication Systems bottleneck" },
      { text: "Assigning crew members/jobs and pulling basic status updates", score: 4, description: "Business Process Automation bottleneck" }
    ]
  },
  {
    id: 2,
    question: "What is your typical lead response time for new opportunities?",
    options: [
      { text: "Virtually instant (under 5 minutes, 24/7 coverage)", score: 1, description: "Highly optimized" },
      { text: "15 - 60 minutes during standard office hours only", score: 2, description: "Moderately exposed to competitors" },
      { text: "Often several hours or overnight on weekends", score: 3, description: "High leakage of hot opportunities" },
      { text: "Inconsistent. Leads frequently go unanswered or slide through cracks", score: 4, description: "Critical operational vulnerability" }
    ]
  },
  {
    id: 3,
    question: "How synchronized are your current core business systems?",
    options: [
      { text: "Unified. Platforms speak to each other automatically via standard pipelines", score: 1, description: "Cooperative ecosystem" },
      { text: "Partially. Some manual data syncing is required several times a day", score: 2.5, description: "Prone to human entry delays" },
      { text: "Siloed. Different departments use separate tools with zero automated sync", score: 4, description: "High friction, double-handling" }
    ]
  },
  {
    id: 4,
    question: "What is your primary commercial scaling objective?",
    options: [
      { text: "Boost gross profit margins by streamlining internal administrative tasks", score: 3, description: "Margin optimization focus" },
      { text: "Capture 100% of pipeline opportunities without adding staff headcount", score: 4, description: "Leads/Pipeline expansion focus" },
      { text: "Hand over day-to-day coordination to free up leadership for strategy", score: 2, description: "Linchpin delegation focus" }
    ]
  },
  {
    id: 5,
    question: "How does your team currently coordinate client & site calendars?",
    options: [
      { text: "Seamless self-serve booking links synced real-time with double-booking safety", score: 1, description: "Self-serve automated booking" },
      { text: "Dozens of tedious back-and-forth emails, texts, or calls daily to select a time", score: 3, description: "High booking drag" },
      { text: "Manual paper diaries or static spreadsheets with frequent misbookings and no-shows", score: 4, description: "Critical schedule disarray" }
    ]
  },
  {
    id: 6,
    question: "What happens after a sale or service agreement is finalized?",
    options: [
      { text: "Immediate auto-trigger of client welcome details, contract requests, and workspace setup", score: 1, description: "Zero-latency onboarding" },
      { text: "Staff manually copy-paste templates, attach legal documents, and chase files over days", score: 3, description: "Repetitive onboarding bottleneck" },
      { text: "Lagging or loose onboarding process where staff wait indefinitely on client files to launch", score: 4, description: "Onboarding delivery stall" }
    ]
  },
  {
    id: 7,
    question: "How is client billing, deposit management, or fee status currently run?",
    options: [
      { text: "Triggered instantly via payment webhooks with automated past-due reminder loops", score: 1, description: "Liquidity auto-pilot" },
      { text: "Manually drafted invoices, custom billing files, and manual spreadsheet trackers", score: 4, description: "Invoicing & payments drag" },
      { text: "Stand-alone billing system requiring redundant manual keying or status checks", score: 2.5, description: "Semi-isolated collection pipeline" }
    ]
  }
];

interface StrategyQuizProps {
  onPreFillBooking: (data: { painPoint: string; recommendationDetails: string }) => void;
}

export default function StrategyQuiz({ onPreFillBooking }: StrategyQuizProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectOption = (score: number) => {
    const nextAnswers = [...answers, score];
    setAnswers(nextAnswers);

    if (currentStep < ASSESS_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  const analysis = React.useMemo(() => {
    if (!isCompleted) return null;
    
    // Calculate total score to evaluate maturity index
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    
    // Max raw score is 28 (7 * 4), min is 8 (Q4 minimum is 2, others are 1)
    const maxPossibleScore = 28;
    const minPossibleScore = 8;
    
    // Compute dynamic 1-100 rating scale (higher rating is more efficient)
    const rawPercent = (totalScore - minPossibleScore) / (maxPossibleScore - minPossibleScore);
    const efficiencyRating = Math.max(15, Math.min(100, Math.round(100 - rawPercent * 85)));
    
    let diagnosisTitle = "";
    let diagnosisDesc = "";
    let systemFocus = "";
    let actionBlueprint = "";
    
    if (efficiencyRating <= 45) {
      diagnosisTitle = "High-Friction Manual Drag";
      diagnosisDesc = "Your operations are heavily reliant on human micro-management. Administrative workflows, disjointed systems, and delayed qualification are actively keeping your company in 'firefighting' mode, creating bottlenecks and limiting growth capacity.";
      systemFocus = "AI CRM Sync + Inbound Qualification Agent";
      actionBlueprint = "Deploy a custom 24/7 web/voice AI Agent to pre-qualify incoming opportunities, then instantly populate unified custom Airtable/HubSpot pipelines using backend automations (Make.com/Zapier).";
    } else if (efficiencyRating <= 75) {
      diagnosisTitle = "System Leakage & Slippage";
      diagnosisDesc = "Basic workflows exist, but data is poorly linked. While the team performs well, delayed follow-up times on inquiries during weekends, combined with recurring manual copying of invoices/records, is draining high-value staff focus.";
      systemFocus = "Automated Lead Capture & Operational CRM Sync";
      actionBlueprint = "Build a cross-platform data pipeline with Twilio SMS integration, instantly answering inbound leads within 60 seconds with personalized pre-qualification and a high-converting scheduling link.";
    } else {
      diagnosisTitle = "Fragmented Efficiency Potential";
      diagnosisDesc = "Your team has reasonably agile workflows but lacks a single source of truth. Implementing intelligent systems will elevate your business from 'coordinated manual' to 'hyper-automated cloud engine', enabling scale without equivalent cost structures.";
      systemFocus = "End-to-End Core Operations Automation";
      actionBlueprint = "Implement custom AI-driven middleware that bridges QuickBooks/Stripe, client portals, and field tracking sheets, completely eliminating internal manual administrative coordination.";
    }

    return {
      totalScore,
      diagnosisTitle,
      diagnosisDesc,
      systemFocus,
      actionBlueprint,
      efficiencyRating,
    };
  }, [answers, isCompleted]);

  const progressPct = ((currentStep) / ASSESS_QUESTIONS.length) * 100;

  return (
    <div className="bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 md:p-10 max-w-4xl mx-auto relative overflow-hidden" id="strategy-assessment">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {!isCompleted ? (
        <div>
          {/* Header */}
          <div className="flex justify-between items-center mb-8 border-b border-zinc-900 pb-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#DFBA73]" />
              <span className="text-xs font-mono tracking-widest text-[#DFBA73] uppercase font-bold">
                DIAGNOSTIC ENGINE
              </span>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              QUESTION {currentStep + 1} OF {ASSESS_QUESTIONS.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-zinc-900 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-[#DFBA73] transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Main Question block */}
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-heading font-medium text-white tracking-tight text-center md:text-left min-h-[64px]">
              {ASSESS_QUESTIONS[currentStep].question}
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {ASSESS_QUESTIONS[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.score)}
                  className="w-full text-left p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/30 hover:bg-zinc-900/70 hover:border-purple-500/40 transition-all duration-300 group cursor-pointer flex justify-between items-center"
                >
                  <span className="text-zinc-300 text-sm font-sans pr-4 group-hover:text-white transition-colors">
                    {option.text}
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-zinc-900 text-zinc-500 group-hover:text-[#DFBA73] group-hover:border-[#DFBA73]/30 border border-zinc-800 flex items-center justify-center shrink-0 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Back action only if step > 0 */}
          {currentStep > 0 && (
            <button
              onClick={() => {
                setCurrentStep(currentStep - 1);
                setAnswers(answers.slice(0, answers.length - 1));
              }}
              className="mt-6 flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 font-mono tracking-wider cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              BACK TO PREVIOUS STEP
            </button>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-fadeIn text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-5">
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <ClipboardCheck className="w-4 h-4 text-[#DFBA73]" />
                <span className="text-xs font-mono tracking-widest text-[#DFBA73] uppercase font-bold">
                  DIAGNOSTIC REPORT GENERATED
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-semibold text-white mt-1 tracking-tight">
                Operational Leakage Assessment
              </h3>
            </div>
            
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs font-mono tracking-widest text-zinc-400 hover:text-white border border-zinc-800 bg-zinc-950 px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              RE-RUN DIAGNOSTIC
            </button>
          </div>

          {/* Metric Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Efficiency gauge */}
            <div className="md:col-span-4 bg-zinc-900/40 border border-zinc-850 rounded-2xl p-6 flex flex-col justify-between items-center text-center">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-normal">
                SYSTEM EFFICIENCY RATING
              </span>
              
              <div className="relative flex items-center justify-center my-6">
                {/* Simulated circle indicator */}
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    stroke="#18181b"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    stroke={analysis?.efficiencyRating && analysis?.efficiencyRating < 50 ? "#EC4899" : "#C084FC"}
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 52}
                    strokeDashoffset={2 * Math.PI * 52 * (1 - (analysis?.efficiencyRating || 50) / 100)}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-heading font-bold text-white">
                    {analysis?.efficiencyRating}
                  </span>
                  <span className="text-[8px] font-mono tracking-wider text-zinc-500 uppercase">
                    SCORE / 100
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                {analysis?.efficiencyRating && analysis.efficiencyRating < 50 ? (
                  <>
                    <Flame className="w-4 h-4 text-pink-500 shrink-0" />
                    <span className="font-medium text-pink-400 text-[10px] tracking-wide uppercase font-mono">CRITICAL LEAKAGE DETECTED</span>
                  </>
                ) : (
                  <>
                    <ClipboardCheck className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="font-medium text-purple-400 text-[10px] tracking-wide uppercase font-mono">OPTIMIZATION OPPORTUNITY</span>
                  </>
                )}
              </div>
            </div>

            {/* Strategic Diagnosis Details */}
            <div className="md:col-span-8 bg-zinc-900/20 backdrop-blur-sm border border-zinc-850/60 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#DFBA73] uppercase bg-[#DFBA73]/10 text-[#DFBA73] px-2.5 py-1 rounded inline-block mb-3">
                  DIAGNOSIS: {analysis?.diagnosisTitle}
                </span>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-light">
                  {analysis?.diagnosisDesc}
                </p>

                <div className="border-t border-zinc-900 pt-5 space-y-4">
                  <div>
                    <span className="text-purple-400 font-mono text-xs font-semibold block mb-1 uppercase tracking-wider">
                      PRIMARY SYSTEM DEPLOYMENT:
                    </span>
                    <span className="text-white font-medium text-base">
                      {analysis?.systemFocus}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#DFBA73] font-mono text-xs font-semibold block mb-1 uppercase tracking-wider">
                      PROPOSED BLUEPRINT ROUTE:
                    </span>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light">
                      {analysis?.actionBlueprint}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button: Auto load into scheduling form */}
              <button
                onClick={() => {
                  if (analysis) {
                    onPreFillBooking({
                      painPoint: analysis.diagnosisTitle,
                      recommendationDetails: `Identified dynamic need: ${analysis.systemFocus}. Diagnosis: ${analysis.diagnosisDesc}`
                    });
                  }
                }}
                className="mt-6 w-full md:w-fit py-3 px-6 rounded-xl text-xs font-mono font-bold tracking-widest bg-white text-black hover:bg-[#DFBA73] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-white/5"
              >
                APPLY REPORT TO STRATEGY BOOKING
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
