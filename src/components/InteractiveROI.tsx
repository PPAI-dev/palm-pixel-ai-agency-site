import React, { useState, useMemo } from "react";
import { 
  Clock, 
  DollarSign, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Check, 
  Users, 
  ArrowRight,
  TrendingUp,
  HelpCircle,
  Briefcase,
  Hammer,
  Stethoscope,
  ShoppingCart,
  Layers
} from "lucide-react";

interface BottleneckPreset {
  id: string;
  title: string;
  category: string;
  averageWeeklyLoss: number;
  realWorldFriction: string;
  automatedState: string;
  realResultMetric: string;
}

const BOTTLENECK_PRESETS: BottleneckPreset[] = [
  {
    id: "scheduling",
    title: "Email Chasing & Meeting Scheduling",
    category: "Customer Relations",
    averageWeeklyLoss: 5,
    realWorldFriction: "Drafting emails manually, writing back-and-forth 'what time works?' messages, and dealing with client no-shows.",
    automatedState: "A self-serve online booker linked to text/email reminder loops that decrease no-shows by 80%.",
    realResultMetric: "Instant bookings + zero manual follow-ups"
  },
  {
    id: "copypasting",
    title: "Copy-Pasting Data & Spreadsheet Entry",
    category: "Daily Administration",
    averageWeeklyLoss: 6,
    realWorldFriction: "Manually copying lead contacts, client requirements, or payment details between distinct web apps, causing typos.",
    automatedState: "A secure trigger parses new entries and syncs CRM, project folders, and spreadsheets seamlessly in 0.1 seconds.",
    realResultMetric: "100% human-error eliminated, zero manual data entry"
  },
  {
    id: "onboarding",
    title: "Client Onboarding & File Chasing",
    category: "Post-Sale Service",
    averageWeeklyLoss: 4,
    realWorldFriction: "Drafting welcome kits, requesting files/documents, and hounding clients for assets before projects can start.",
    automatedState: "An automated welcome portal shares instructions, captures high-res uploads, and notifies the team automatically.",
    realResultMetric: "Projects kick-off 5 days faster, highly professional impression"
  },
  {
    id: "billing",
    title: "Invoicing, Quotes & Status Reporting",
    category: "Financials",
    averageWeeklyLoss: 3,
    realWorldFriction: "Manually typing out invoices, drafting progress summaries, and sending repetitive 'friendly payment reminders' to overdue accounts.",
    automatedState: "Instant secure link creation, automatic payment collection updates, and auto-triggered delinquent follow-up cycles.",
    realResultMetric: "Saves cash flow bottlenecks, gets invoices paid 3x faster"
  }
];

const INDUSTRY_GAINS: Record<string, {
  label: string;
  iconName: string;
  highlights: Record<string, {
    outcome: string;
    actionableFix: string;
    projectedGain: string;
  }>;
}> = {
  "professional_services": {
    label: "Professional Services",
    iconName: "Briefcase",
    highlights: {
      scheduling: {
        outcome: "Reduces intake overhead by 85%. Client picks from your pre-set calendar rules with integrated qualification safeguards.",
        actionableFix: "Smart qualification forms automatically filter matching cases before exposing live booking links.",
        projectedGain: "Adds 2 extra high-yield billable hours/week per advisor"
      },
      copypasting: {
        outcome: "Auto-syncs signed service agreements straight to Google Drive folders, active task boards, and team coordination hubs.",
        actionableFix: "Automated triggers extract form data to populate client profile pages in your practice portal.",
        projectedGain: "Zero manual files misplaced; 100% compliant documentation"
      },
      onboarding: {
        outcome: "Speeds up client document collections by 6 days on average. Auto-notifies clients to upload missing bank statements or files.",
        actionableFix: "Interactive Client Intake Portal with multi-file drag-and-drop secure upload link.",
        projectedGain: "Projects start on day 1 with completed client briefs"
      },
      billing: {
        outcome: "Cuts down invoice draft and chasing time by 90%. Invoices auto-generate as project milestones are completed.",
        actionableFix: "Secure Stripe or QuickBooks webhook integration with custom automated reminder loops.",
        projectedGain: "Accounts Receivable cycle reduced from 34 days to under 4 days"
      }
    }
  },
  "construction_trades": {
    label: "Construction & Trades",
    iconName: "Hammer",
    highlights: {
      scheduling: {
        outcome: "Instantly schedules dispatch and field assignments as soon as custom site requests come in.",
        actionableFix: "Client booking triggers route assignments directly to field service staff apps with maps.",
        projectedGain: "No back-and-forth phone tag; dispatch happens 4 hours quicker"
      },
      copypasting: {
        outcome: "Eliminates double entry between site punch list apps, spreadsheet logs, and supplier purchase orders.",
        actionableFix: "Syncs crew checklist logs to central sheets to auto-calculate material usage.",
        projectedGain: "Prevents supply order typos and protects project margin by 3.5%"
      },
      onboarding: {
        outcome: "Forces clients or subcontractors to submit job-site safety forms and contract signatures before site entry.",
        actionableFix: "A simple text-message link gets signatures and photo uploads from contractors in real-time.",
        projectedGain: "Cuts down pre-construction administrative delays by 75%"
      },
      billing: {
        outcome: "Collects 50% deposit automatically at booking, releasing progress invoices dynamically based on field sign-offs.",
        actionableFix: "Webhooks sync job completions to trigger customized, professional invoice links directly to email.",
        projectedGain: "Improves contractor cash flow and collections by $15,000/mo"
      }
    }
  },
  "healthcare_clinics": {
    label: "Healthcare & Wellness",
    iconName: "Stethoscope",
    highlights: {
      scheduling: {
        outcome: "Reduces appointment slot vacancies and client no-shows by sending progressive check-in text loops.",
        actionableFix: "Auto-sync clinic calendars to patient queues and issue automated check-in details via SMS.",
        projectedGain: "Drops client vacancy rate by 22% with zero extra call hours"
      },
      copypasting: {
        outcome: "Patient history questionnaires automatically parse and securely stream into practice dashboards.",
        actionableFix: "Form entries auto-propagate to centralized client trackers, avoiding tedious manual typing.",
        projectedGain: "Saves reception staff 12 hours of dry paperwork each week"
      },
      onboarding: {
        outcome: "Automates intake health questionnaires, liability waivers, and insurance document upload workflows.",
        actionableFix: "Secure digital intake checklist is sent immediately upon booking to patient's mobile phone.",
        projectedGain: "Wasted waiting-room time decreased by 18 minutes per patient"
      },
      billing: {
        outcome: "Triggers instant text-to-pay links for co-pays or package deposits.",
        actionableFix: "Integrated payment gateways dispatch text receipts with instant follow-up reschedule links.",
        projectedGain: "Reduces patient invoice collection drag and outstanding balances by 90%"
      }
    }
  },
  "retail_ecommerce": {
    label: "E-Commerce & Retail",
    iconName: "ShoppingCart",
    highlights: {
      scheduling: {
        outcome: "Auto-routes incoming custom requests to the appropriate rep calendar based on product category.",
        actionableFix: "Categorized routing hooks for bulk buyers or custom spec consultations.",
        projectedGain: "Converts high-value wholesale inbound queries 2x faster"
      },
      copypasting: {
        outcome: "Auto-notifies fulfillment partners and updates inventory counts as custom orders flow in.",
        actionableFix: "Unified webhooks push transaction entries directly into dispatch queues and tracking documents.",
        projectedGain: "Decreases label creation and fulfillment lag by 36 hours"
      },
      onboarding: {
        outcome: "Streamlines wholesale buyer application processes, auto-qualifying resellers instantly on tax documents.",
        actionableFix: "Online reseller request flow securely parses tax certificates and creates wholesale logins.",
        projectedGain: "Slashed reseller activation cycles from 7 days to 2 minutes"
      },
      billing: {
        outcome: "Creates dynamic quote estimates with automated deposit locks for custom manufacturing requests.",
        actionableFix: "Bespoke invoice generator creates checkout links instantly when custom specs are finalized.",
        projectedGain: "Improves custom project conversion ratios by 28%"
      }
    }
  },
  "growing_enterprises": {
    label: "Growing Enterprise",
    iconName: "Layers",
    highlights: {
      scheduling: {
        outcome: "Auto-assigns inbound sales leads or operational queries using customized round-robin team rules.",
        actionableFix: "Intelligent scheduling integration distributes consultation slots equally among available representatives.",
        projectedGain: "First-contact response times average under 10 minutes"
      },
      copypasting: {
        outcome: "Connects fragmented tools (legacy databases, active portals, project boards) to synchronize state in real time.",
        actionableFix: "Develop secure custom data sync pipelines that connect multiple software tools, avoiding manual data moving.",
        projectedGain: "Eliminates operational latency by 100% across departments"
      },
      onboarding: {
        outcome: "Coordinates multi-department workflows (legal review, IT setup, finance approvals) automatically.",
        actionableFix: "New partner activation triggers a cascade of task creation items inside tools like Asana.",
        projectedGain: "Dramatically improves operational tempo and vendor relationship start times"
      },
      billing: {
        outcome: "Enforces automatic late-payment escalation notices and locks access for delinquent enterprise accounts.",
        actionableFix: "Smart financial rules trigger secondary reminders and restrict features automatically when fees are past due.",
        projectedGain: "Saves treasury hundreds of hours of manual tracking and chasing"
      }
    }
  }
};

interface InteractiveROIProps {
  onPreFillBooking?: (data: { painPoint: string; recommendationDetails: string }) => void;
}

export default function InteractiveROI({ onPreFillBooking }: InteractiveROIProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("professional_services");
  const [teamSize, setTeamSize] = useState<number>(4);
  const [hourlyRate, setHourlyRate] = useState<number>(45);
  const [selectedBottlenecks, setSelectedBottlenecks] = useState<string[]>([
    "scheduling",
    "copypasting"
  ]);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const renderIndustryIcon = (industryKey: string, iconClass: string = "w-4 h-4") => {
    switch (industryKey) {
      case "professional_services":
        return <Briefcase className={iconClass} />;
      case "construction_trades":
        return <Hammer className={iconClass} />;
      case "healthcare_clinics":
        return <Stethoscope className={iconClass} />;
      case "retail_ecommerce":
        return <ShoppingCart className={iconClass} />;
      case "growing_enterprises":
        return <Layers className={iconClass} />;
      default:
        return <Briefcase className={iconClass} />;
    }
  };

  // Toggle bottlenecks
  const handleToggleBottleneck = (id: string) => {
    setSelectedBottlenecks(prev => {
      if (prev.includes(id)) {
        // Keep at least one selected to avoid empty/meaningless states
        if (prev.length === 1) return prev;
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Calculated stats based on user inputs
  const stats = useMemo(() => {
    // Calculate hours lost based on selected checkboxes
    const hoursLostPerPersonWeekly = BOTTLENECK_PRESETS
      .filter(p => selectedBottlenecks.includes(p.id))
      .reduce((acc, curr) => acc + curr.averageWeeklyLoss, 0);

    const weeklyHoursSaved = teamSize * hoursLostPerPersonWeekly;
    const monthlyHoursSaved = Math.round(weeklyHoursSaved * 4.33);
    const annualHoursSaved = weeklyHoursSaved * 52;
    
    // Value lost
    const weeklySavings = weeklyHoursSaved * hourlyRate;
    const monthlySavings = Math.round(weeklySavings * 4.33);
    const annualSavings = weeklySavings * 52;

    // Estimate of the average client project value or employee overhead value turned back
    // Standard industry assumptions: 100 hrs saved = capacity for 1 new client project or major milestone
    const extraProjectCapacityAnnual = Math.max(1, Math.floor(annualHoursSaved / 120));

    // Dynamic system recommendation based on high-impact areas
    let systemName = "Client Intake & Operations Auto-Pilot";
    let actionBlueprint = "Connects CRM, online calendars, and document management.";
    let setupTimeline = "2 to 3 Weeks";

    if (selectedBottlenecks.length >= 3 || teamSize > 8) {
      systemName = "Unified Team Workflow Hub + Agent Routing";
      actionBlueprint = "Automates cross-team handoffs, auto-syncs invoices, and sets up high-volume lead pipelines.";
      setupTimeline = "3 to 4 Weeks";
    } else if (selectedBottlenecks.includes("billing") && selectedBottlenecks.includes("onboarding")) {
      systemName = "Post-Sale Revenue & Onboarding Acceleration Engine";
      actionBlueprint = "Secures payment, automatically activates client portals, and triggers task checklists.";
      setupTimeline = "2 Weeks";
    }

    return {
      hoursLostPerPersonWeekly,
      weeklyHoursSaved,
      monthlyHoursSaved,
      annualHoursSaved,
      monthlySavings,
      annualSavings,
      extraProjectCapacityAnnual,
      systemName,
      actionBlueprint,
      setupTimeline
    };
  }, [teamSize, hourlyRate, selectedBottlenecks]);

  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 md:p-10 text-left relative overflow-hidden" id="operational-assessment-container">
      {/* Subtle glowing mesh blobs to fit the premium branding */}
      <div className="absolute top-0 left-1/4 w-[#400px] h-[#200px] bg-[#DFBA73]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[#300px] h-[#200px] bg-[#bf9d56]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10">
        
        {/* Left Hand: Relatable Inputs */}
        <div className="lg:col-span-6 flex flex-col space-y-6 md:space-y-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#DFBA73] uppercase mb-1.5 block">
              OPERATIONAL ASSESSMENT
            </span>
            <h3 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight">
              A Simple Audit of Your Common Inefficiencies
            </h3>
            <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
              Standard administrative drag, manual follow-ups, and repetitive copy-pasting wear down staff. 
              <strong className="text-zinc-200"> Select what you experience below</strong> to calculate practical, real-world impacts.
            </p>
          </div>

          {/* Step 1: Industry Selector */}
          <div className="space-y-3 bg-zinc-900/10 p-4 rounded-2xl border border-zinc-900">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest block font-bold">
              Step 1: Select Your Specific Industry
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.entries(INDUSTRY_GAINS).map(([key, ind]) => {
                const isSelected = selectedIndustry === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedIndustry(key)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 focus:outline-none gap-2 ${
                      isSelected 
                        ? "bg-zinc-900 border-[#DFBA73] text-white shadow-[0_0_8px_rgba(223,186,115,0.06)]"
                        : "bg-zinc-900/10 border-zinc-900 text-zinc-400 hover:border-zinc-800 hover:text-zinc-300"
                    }`}
                    id={`industry-select-btn-${key}`}
                  >
                    {renderIndustryIcon(key, isSelected ? "text-[#DFBA73] w-5 h-5" : "text-zinc-500 w-5 h-5")}
                    <span className="text-xs font-sans font-medium">
                      {ind.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Checkbox Presets */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
              Step 2: Which bottlenecks currently occur in your business?
            </label>
            <div className="grid grid-cols-1 gap-3">
              {BOTTLENECK_PRESETS.map((preset) => {
                const isSelected = selectedBottlenecks.includes(preset.id);
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleToggleBottleneck(preset.id)}
                    type="button"
                    className={`p-4 rounded-xl border text-left transition-all duration-200 focus:outline-none flex gap-3.5 items-start relative overflow-hidden ${
                      isSelected 
                        ? "bg-zinc-900/80 border-[#DFBA73] shadow-[0_0_12px_rgba(223,186,115,0.06)]"
                        : "bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50"
                    }`}
                    id={`bottleneck-btn-${preset.id}`}
                  >
                    {/* Visual Check Indicator */}
                    <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-all duration-200 ${
                      isSelected 
                        ? "bg-[#DFBA73] border-[#DFBA73] text-zinc-950" 
                        : "border-zinc-700 bg-zinc-950/40 text-transparent"
                    }`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-medium text-white text-sm">
                          {preset.title}
                        </span>
                        <span className="text-[10px] bg-zinc-800 text-zinc-400 font-mono px-1.5 py-0.5 rounded uppercase">
                          ~{preset.averageWeeklyLoss} hrs/wk
                        </span>
                      </div>
                      <p className="text-zinc-400 text-xs leading-relaxed">
                        {preset.realWorldFriction}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Simple Parameters Sliders */}
          <div className="space-y-5 pt-2 border-t border-zinc-900">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
              Adjust Your Business Profile
            </span>

            {/* Slider 1: Team Size */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="text-zinc-300 font-medium font-sans flex items-center gap-2" htmlFor="range-team-size">
                  <Users className="w-4 h-4 text-[#DFBA73]" />
                  Impacted Team Size
                </label>
                <span className="font-mono text-white bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-xs select-none">
                  {teamSize} {teamSize === 1 ? "person" : "people"}
                </span>
              </div>
              <input
                id="range-team-size"
                type="range"
                min="1"
                max="30"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value) || 1)}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#DFBA73]"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono select-none">
                <span>1 Local Office</span>
                <span>15 Mid-Scale</span>
                <span>30+ High Volume</span>
              </div>
            </div>

            {/* Slider 2: Hourly Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="text-zinc-300 font-medium font-sans flex items-center gap-2" htmlFor="range-hourly-rate">
                  <span className="w-4 h-4 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-bold text-[#DFBA73]">$</span>
                  Blended Wage Cost
                  <button 
                    type="button"
                    onClick={() => setShowTooltip(!showTooltip)}
                    className="text-zinc-500 hover:text-zinc-300 relative focus:outline-none"
                    aria-label="What is blended wage cost?"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    {showTooltip && (
                      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] p-2 rounded-lg leading-normal shadow-xl z-20 font-normal">
                        Average hourly cost of your employees or staff, factoring in salary, taxes, and software tools.
                      </span>
                    )}
                  </button>
                </label>
                <span className="font-mono text-white bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-xs text-[#DFBA73] select-none">
                  ${hourlyRate}/hr
                </span>
              </div>
              <input
                id="range-hourly-rate"
                type="range"
                min="20"
                max="100"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value) || 20)}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#DFBA73]"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono select-none">
                <span>$20 Admin/Staff</span>
                <span>$50 Specialist</span>
                <span>$100 Lead/Manager</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Hand: Detailed Real-World Impacts */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
              ANALYSIS OF RESULTS
            </span>

            {/* Calculations Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Box 1: Time Drain */}
              <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800/80 rounded-2xl p-5 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl w-fit mb-3">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 block uppercase">Weekly Hours Wasted</span>
                  <div className="text-3xl font-heading font-semibold text-white mt-1">
                    {stats.weeklyHoursSaved} <span className="text-sm text-zinc-500 font-normal">hrs / wk</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-900/80 text-[11px] text-zinc-400">
                  Equivalent to losing <span className="text-white font-medium">~{stats.monthlyHoursSaved} hours</span> every single month across your team.
                </div>
              </div>

              {/* Box 2: Capital Waste */}
              <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800/80 rounded-2xl p-5 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl w-fit mb-3">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 block uppercase">Annual Wage Sink</span>
                  <div className="text-3xl font-heading font-semibold text-[#DFBA73] mt-1">
                    ${stats.annualSavings.toLocaleString()}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-900/80 text-[11px] text-zinc-400">
                  Current cost paid to people to manually update systems and handle administrative friction.
                </div>
              </div>

            </div>

            {/* Real-World Industry-Specific Dynamic Highlights */}
            <div className="bg-[#DFBA73]/5 border border-[#DFBA73]/20 rounded-2xl p-5 space-y-4 shadow-[inset_0_1px_3px_rgba(223,186,115,0.02)]">
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  {renderIndustryIcon(selectedIndustry, "w-4 h-4 text-[#DFBA73]")}
                  <h4 className="text-xs font-mono font-bold tracking-widest text-[#DFBA73] uppercase">
                    {INDUSTRY_GAINS[selectedIndustry]?.label || "Industry"} Efficiency Gains
                  </h4>
                </div>
                <span className="text-[10px] bg-[#DFBA73]/10 text-[#DFBA73] px-2 py-0.5 rounded font-mono uppercase tracking-wider font-semibold">
                  Dynamic Projection
                </span>
              </div>
              
              <div className="space-y-4 text-xs">
                {selectedBottlenecks.map((bottleneckId) => {
                  const highlight = INDUSTRY_GAINS[selectedIndustry]?.highlights[bottleneckId];
                  const originalPreset = BOTTLENECK_PRESETS.find(p => p.id === bottleneckId);
                  if (!highlight || !originalPreset) return null;
                  
                  return (
                    <div key={bottleneckId} className="space-y-2.5 border-b border-zinc-900 pb-3.5 last:border-0 last:pb-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="font-semibold text-zinc-100 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          {originalPreset.title}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium w-fit">
                          {highlight.projectedGain}
                        </span>
                      </div>
                      <p className="text-zinc-400 leading-relaxed text-xs">
                        <strong className="text-zinc-200 font-medium font-sans">Bespoke Outcome:</strong> {highlight.outcome}
                      </p>
                      <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-850 text-zinc-300 flex items-start gap-2 text-xs">
                        <Zap className="w-3.5 h-3.5 text-[#DFBA73] shrink-0 mt-0.5 animate-pulse" />
                        <span>
                          <strong className="text-[#DFBA73] font-semibold font-sans">Actionable Implementation Hook:</strong> {highlight.actionableFix}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Real Life Practical Outcomes */}
            <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 rounded-2xl border border-zinc-800 p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#DFBA73]" />
                <span className="text-xs font-mono tracking-widest text-[#DFBA73] uppercase font-bold">
                  PROPOSED REMEDIAL ACTION
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-sans font-medium text-white">
                  We deploy: <span className="text-[#DFBA73]">{stats.systemName}</span>
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {stats.actionBlueprint} No custom coding required from your team. We construct everything behind the scenes and guide your staff in 30 minutes of simple training.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-900 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Implementation Time</span>
                    <span className="text-white font-medium">{stats.setupTimeline}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Added Client Capacity</span>
                    <span className="text-emerald-400 font-medium">+{stats.extraProjectCapacityAnnual} extra projects/yr</span>
                  </div>
                </div>

                {onPreFillBooking && (
                  <button
                    type="button"
                    onClick={() => onPreFillBooking({
                      painPoint: stats.systemName,
                      recommendationDetails: `Industry: ${INDUSTRY_GAINS[selectedIndustry]?.label}. Impacted team size: ${teamSize} staff. wage weight: $${hourlyRate}/hr. Weekly hours recuperated: ${stats.weeklyHoursSaved} hours. Recommended system: ${stats.systemName}.`
                    })}
                    className="mt-4 w-full py-3 px-5 rounded-xl font-mono text-xs font-bold tracking-widest bg-white text-black hover:bg-[#DFBA73] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    LOCK IN ESTIMATE &amp; BOOK AUDIT
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#DFBA73] group-hover:text-black" />
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Core bottom badges */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1 text-[11px] text-zinc-400">
            <div className="flex items-center gap-2 bg-zinc-900/30 px-3 py-2 rounded-lg border border-zinc-900">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Full step-by-step custom screen recordings included</span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-900/30 px-3 py-2 rounded-lg border border-zinc-900">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Includes 30 days post-launch support and adjustments</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
