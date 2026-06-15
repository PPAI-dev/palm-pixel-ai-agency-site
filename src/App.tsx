import React, { useState } from "react";
import * as Lucide from "lucide-react";

// Components
import PalmPixelLogo from "./components/PalmPixelLogo";
import SolutionCard from "./components/SolutionCard";
import InteractiveROI from "./components/InteractiveROI";
import StrategyQuiz from "./components/StrategyQuiz";
import BookingModal from "./components/BookingModal";

// Types
import { Solution, Problem, WhyBenefit, IndustryCategory } from "./types";

// Founder Headshot Image Asset
// @ts-ignore
import headshotUrl from "./assets/images/founder_headshot_1781538511707.jpg";

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preFilledPain, setPreFilledPain] = useState("");
  const [preFilledRec, setPreFilledRec] = useState("");
  const [selectedSolutionTitle, setSelectedSolutionTitle] = useState("");

  // Handlers for interactive connections
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 85; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleOpenBooking = (solutionTitle: string = "") => {
    setSelectedSolutionTitle(solutionTitle);
    setPreFilledPain("");
    setPreFilledRec("");
    setIsBookingOpen(true);
  };

  const handlePreFillBooking = (quizData: { painPoint: string; recommendationDetails: string }) => {
    setPreFilledPain(quizData.painPoint);
    setPreFilledRec(quizData.recommendationDetails);
    setSelectedSolutionTitle("");
    setIsBookingOpen(true);
  };

  // Structured Core Datasets
  const solutions: Solution[] = [
    {
      id: "agents",
      title: "AI Agents",
      shortDesc: "Intelligent digital representatives that qualify inbound leads, resolve tickets, and support customers 24/7. 35–50% of calls go unanswered after hours — and 85% of those callers call your competitor next. Your AI Agent answers in seconds. Every time. No exceptions.",
      longDesc: "These operate with bespoke prompt graphs and vectorized knowledge context, linking with Twilio and web chat to process client messages instantly.",
      iconName: "Bot",
      impactMetric: "Lead pre-qualification & live dispatch — 24/7/365",
      useCase: "Unanswered calls & after-hours lead leakage"
    },
    {
      id: "bpa",
      title: "Business Process Automation",
      shortDesc: "Automate complex, manual multi-stage workflows, eliminate double data-entries, and bridge fragmented clouds. The average service business takes 12 hours to return a lead. The data says you have 5 minutes. After that, your odds of converting drop 80%.",
      longDesc: "Using custom serverless script endpoints or Make/Zapier setups, we automate file parsing, dispatching notifications, and updating job files.",
      iconName: "Workflow",
      impactMetric: "15+ hours saved per staff member weekly",
      useCase: "Unified job assignment pipeline"
    },
    {
      id: "comm",
      title: "Customer Communication Systems",
      shortDesc: "Inbound and outbound communication hubs streamlining calls, text alerts, and email notifications into single automated pipelines. 78% of leads go with whoever responds first. We make sure that's always you.",
      longDesc: "Ensures no customer inquiry goes unacknowledged. Connects directly to core telephony APIs to dispatch status updates on demand.",
      iconName: "MessageSquareCode",
      impactMetric: "99.8% client response SLA met",
      useCase: "Scattered communication centralization"
    },
    {
      id: "lead",
      title: "Lead Capture & Qualification",
      shortDesc: "Identify, filter, score, and instantly respond to incoming customer opportunities without waiting for standard office hours. 40% of leads come in after 5pm. Your team is off the clock. Your RRS system isn't.",
      longDesc: "Captures visitors on web pages, screens high-value prospects dynamically, and instantly books pre-filtered meetings on calendars.",
      iconName: "Target",
      impactMetric: "100% of leads contacted within 5 minutes of inquiry",
      useCase: "Speed-to-lead & after-hours conversion"
    },
    {
      id: "crm",
      title: "CRM & Operations Automation",
      shortDesc: "Connect your field dispatch software, billing platform, and central CRM systems to maintain a singular, clean state of truth. Thousands of leads sitting in your CRM you already paid $50–$200 each to acquire — nobody's calling them back. That's not a database. That's a graveyard of money. We fix that.",
      longDesc: "Bridges platforms like HubSpot, Airtable, Salesforce, or Jobber, mapping accounts, contracts, and scheduling without human delay.",
      iconName: "Database",
      impactMetric: "Full pipeline reactivation & zero data duplication",
      useCase: "Dead CRM leads & fragmented operations"
    },
    {
      id: "custom",
      title: "Custom AI Development",
      shortDesc: "Bespoke engineered algorithms, private vector database setups, and localized models configured exactly for your specialized needs. Built around your business goals, your workflows, and your existing legacy systems. No boxed subscriptions. No SaaS markup. Just clean infrastructure that compounds over time.",
      longDesc: "For companies needing sovereign AI environments to index hundreds of technical files, custom estimating scripts, or internal reference apps.",
      iconName: "Brain",
      impactMetric: "Full-custom delivery — guaranteed SLA",
      useCase: "Businesses requiring proprietary AI infrastructure"
    }
  ];

  const problems: Problem[] = [
    {
      id: "p1",
      title: "Manual Processes",
      challenge: "Teams logging hours manual-handling records",
      consequence: "Generates high labor waste & increases entry errors.",
      iconName: "UserX"
    },
    {
      id: "p2",
      title: "Slow Response Times",
      challenge: "Inbound leads waiting hours or days for replies",
      consequence: "Anxious prospects leave for competitors who answer first.",
      iconName: "Clock"
    },
    {
      id: "p3",
      title: "Missed Opportunities",
      challenge: "Organic leads sliding through cracks unnoticed",
      consequence: "Wastes underlying marketing spend & leaks pipeline capital.",
      iconName: "Target"
    },
    {
      id: "p4",
      title: "Information Silos",
      challenge: "Crucial project updates locked in separate tools",
      consequence: "Forces constant phone tagging & team communication friction.",
      iconName: "Database"
    },
    {
      id: "p5",
      title: "Operational Bottlenecks",
      challenge: "Core leadership constantly managing simple admin chores",
      consequence: "Freezes strategic project work and slows down team growth.",
      iconName: "AlertTriangle"
    },
    {
      id: "p6",
      title: "Repetitive Admin Work",
      challenge: "Duplicating invoices, quotes, and worker assignments",
      consequence: "Staff burn out doing low-leverage mechanical data logging.",
      iconName: "Layers"
    }
  ];

  const benefits: WhyBenefit[] = [
    {
      title: "Tailored Implementation",
      description: "We do not sell pre-boxed SaaS packages. We analyze your specific crew structures, databases, and client patterns to design customized integrations.",
      accentText: "01/06 BLUEPRINT FOCUS"
    },
    {
      title: "Scalable Systems",
      description: "We build systems to handle 5x user volume effortlessly. Your administrative capability expands through code rather than expensive labor bloating.",
      accentText: "02/06 HIGH THRU-PUT"
    },
    {
      title: "Modern Technology",
      description: "Harness low-latency pipelines, modern foundation models (GPT-4o, Claude 3.5), and robust vector stores without having to write code.",
      accentText: "03/06 APIS & VECTOR"
    },
    {
      title: "Business-First Strategy",
      description: "We do not push complex models where a simple relational query wins. We solve business problems with the most stable, cost-efficient infrastructure.",
      accentText: "04/06 OBJECTIVE COMMERCE"
    },
    {
      title: "Ongoing Optimization",
      description: "We conduct programmatic telemetry audits to ensure your pipelines adapt as customer behaviors, APIs, and commercial workflows scale forward.",
      accentText: "05/06 ACTIVE TELEMETRY"
    },
    {
      title: "Human-Centered Automation",
      description: "We build systems to elevate human capability, removing dry, repetitive machine work to free your team for high-value strategic relationships.",
      accentText: "06/06 STAFF ELEVATION"
    }
  ];

  const industryCategories: IndustryCategory[] = [
    {
      title: "Construction & Trades",
      subCategory: "Field Operations & Crew Sync",
      examples: ["HVAC & Plumbing Contractors", "Commercial Builders", "Electrical Services", "Roofing Teams"]
    },
    {
      title: "Service Businesses",
      subCategory: "Client Hubs & Qualification",
      examples: ["SaaS Operators", "Elite Consulting Hubs", "Marketing Agencies", "Logistics & Dispatchers"]
    },
    {
      title: "Healthcare Organizations",
      subCategory: "Triage & Admin Unburdening",
      examples: ["Dental Groups", "Specialty Medical Clinics", "Aesthetic Centers", "Wellness Providers"]
    },
    {
      title: "Retail & E-Commerce",
      subCategory: "Automating Order Pipelines",
      examples: ["Custom Fabricators", "High-Volume Stores", "Specialty Distributors", "Fulfillment Teams"]
    },
    {
      title: "Professional Services",
      subCategory: "Automating Document Intake",
      examples: ["High-End Accounting Firms", "Private Law Practices", "Real Estate Brokerages", "Wealth Planners"]
    },
    {
      title: "Growing Enterprises",
      subCategory: "Scaling Without Headcount Bloat",
      examples: ["Mid-Sized Operations Teams", "Asset Managers", "Family Offices", "Regional Franchises"]
    }
  ];

  // Helper to render lucide icon on demand safely
  const renderLucide = (name: string, styleCls: string = "w-5 h-5 text-zinc-400") => {
    const Icon = (Lucide as any)[name];
    if (!Icon) return <Lucide.Sparkles className={styleCls} />;
    return <Icon className={styleCls} />;
  };

  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100 font-sans selection:bg-[#DFBA73] selection:text-black antialiased relative">
      
      {/* GLOBAL GLOW ACCENTS */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[30vh] left-[5%] w-[350px] h-[350px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20vh] right-[5%] w-[450px] h-[450px] bg-[#DFBA73]/5 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#070708]/80 backdrop-blur-md border-b border-zinc-900/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo Component */}
          <PalmPixelLogo />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-zinc-400">
            <a href="#solutions" onClick={(e) => scrollToSection(e, "solutions")} className="hover:text-white transition-colors">SOLUTIONS</a>
            <a href="#process" onClick={(e) => scrollToSection(e, "process")} className="hover:text-white transition-colors">PROCESS</a>
            <a href="#founder" onClick={(e) => scrollToSection(e, "founder")} className="hover:text-white transition-colors">PRINCIPAL</a>
          </nav>

          {/* Booking CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOpenBooking()}
              className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl text-xs font-mono font-bold tracking-widest bg-zinc-900 text-white border border-zinc-800 hover:border-[#DFBA73] hover:text-[#DFBA73] transition-all duration-300 shadow-xl cursor-pointer"
            >
              BOOK CONSULTATION
            </button>
          </div>

        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="relative">

        {/* HERO SECTION */}
        <section 
          className="relative py-20 md:py-32 flex items-center justify-center text-center overflow-hidden border-b border-zinc-950"
          style={{ backgroundColor: '#0a0a0a' }}
        >
          {/* Pure CSS deep-near black background to override empty or asset dependencies */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at center, rgba(26, 10, 46, 0.4) 0%, #0a0a0a 100%)',
            }}
          />
          
          {/* Animated decorative grid background */}
          <div className="absolute inset-x-0 top-0 bottom-1/4 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Glow in deep purple (#1a0a2e) centered behind the headline text */}
          <div 
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[140px] select-none pointer-events-none opacity-90" 
            style={{ backgroundColor: '#1a0a2e' }}
          />

          <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6 sm:space-y-8">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/80 text-xs text-[#DFBA73] font-mono tracking-[0.25em] font-semibold animate-fadeIn shadow-2xl">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping mr-0.5" />
              WE BUILD. WE AUTOMATE. YOU GROW.
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight leading-[1.05] max-w-3xl mx-auto">
              Custom AI Solutions <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-[#DFBA73] drop-shadow-xl font-serif font-light italic">Built Around</span> Your Business
            </h1>

            {/* Subheadline */}
            <p className="text-zinc-400 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto font-light">
              We design and implement intelligent systems that automate repetitive work, improve customer interactions, and help organizations operate more efficiently.
            </p>

            {/* Stat Bar Area — 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-950/40 backdrop-blur-md rounded-2xl border border-zinc-800/60 p-6 md:p-8 max-w-3xl mx-auto">
              <div className="space-y-1 text-center">
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-[#DFBA73] tracking-tight block">
                  5 Minutes
                </span>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed font-light">
                  Window before conversion odds drop 80%
                </p>
              </div>

              <div className="space-y-1 text-center border-y md:border-y-0 md:border-x border-zinc-900/80 md:py-0 py-4 md:px-6">
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-purple-400 tracking-tight block">
                  $336,000
                </span>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed font-light">
                  Average annual revenue lost to missed leads
                </p>
              </div>

              <div className="space-y-1 text-center">
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-[#DFBA73] tracking-tight block">
                  78%
                </span>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed font-light">
                  Of leads go with whoever responds first
                </p>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
              <button
                onClick={() => handleOpenBooking()}
                className="w-full sm:w-auto py-4 px-8 rounded-xl font-mono text-xs font-bold tracking-widest bg-white text-black hover:bg-[#DFBA73] transition-all duration-300 shadow-xl shadow-white/5 flex items-center justify-center gap-2 group cursor-pointer"
              >
                SCHEDULE A STRATEGY CALL
                <Lucide.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#solutions"
                onClick={(e) => scrollToSection(e, "solutions")}
                className="w-full sm:w-auto py-4 px-8 rounded-xl font-mono text-xs font-bold tracking-widest bg-zinc-950 text-white border border-zinc-800 hover:border-zinc-700 transition-all duration-300 flex items-center justify-center gap-1.5"
              >
                EXPLORE SOLUTIONS
              </a>
            </div>

          </div>
        </section>


        {/* VALUE STATEMENT OVERVIEW (CORE POSITIONING) */}
        <section className="bg-zinc-950 py-16 border-y border-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              <div className="md:col-span-4">
                <span className="text-xs font-mono font-bold text-[#DFBA73] tracking-[0.25em] uppercase block mb-1">
                  CORE PRINCIPLE &amp; STAND
                </span>
                <h2 className="text-3xl font-heading font-semibold text-white tracking-tight">
                  We Solve Business Problems, Not Software sales.
                </h2>
              </div>

              <div className="md:col-span-8 md:border-l md:border-zinc-800 md:pl-8 text-zinc-400 text-sm md:text-base leading-relaxed space-y-4 font-light text-left">
                <p>
                  Every solution is designed around the <span className="text-white font-medium">client's business goals, workflows, and existing legacy systems</span>. We do not sell boxed subscription products that force you into artificial layout constraints. We build clean mathematical integrations that synchronize real outcomes.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1.5">
                  <div className="flex items-center gap-2 py-1 select-none">
                    <div className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      ✓
                    </div>
                    <span>No unneeded software licenses or SaaS markup.</span>
                  </div>
                  <div className="flex items-center gap-2 py-1 select-none">
                    <div className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      ✓
                    </div>
                    <span>Proprietary business sovereignty over your data.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* INEFFICIENCIES DIAGNOSTIC (PROBLEM SECTION) */}
        <section className="py-20 md:py-32" id="operational-drag">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono tracking-widest text-[#DFBA73] uppercase font-bold">
                COMMERCIAL INERTIA
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-semibold tracking-tight text-white">
                Growth Gets Hard When Systems Can't Keep Up
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base font-light">
                Outdated processes act as a quiet tax on your gross margins. Here are the friction nodes that consistently limit scaling.
              </p>
            </div>

            {/* Problem Bento Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {problems.map((prob) => (
                <div
                  key={prob.id}
                  className="bg-[#0b0c0d]/60 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between hover:border-red-500/20 hover:bg-zinc-950/60 transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center group-hover:bg-red-500/5 group-hover:text-red-400 transition-colors">
                        {renderLucide(prob.iconName, "w-5 h-5")}
                      </div>
                      <span className="text-[10px] font-mono text-zinc-600 group-hover:text-red-300 uppercase tracking-widest font-semibold">
                        [ FRICTION VALUE ]
                      </span>
                    </div>

                    <h3 className="text-lg font-heading font-semibold text-white tracking-tight group-hover:text-red-100 transition-colors mb-2">
                      {prob.title}
                    </h3>
                    
                    <p className="text-xs font-mono text-zinc-500 leading-snug">
                      THE DRAG: {prob.challenge}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-900/60 text-xs text-zinc-400 font-sans italic leading-relaxed">
                    <span className="text-red-400/80 font-mono font-bold uppercase not-italic text-[10px] tracking-wider block mb-1">
                      UNDER-PERFORMANCE IMPACT:
                    </span>
                    &ldquo;{prob.consequence}&rdquo;
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* THE SOLUTIONS (SOLUTIONS SECTION) */}
        <section className="py-20 md:py-32 bg-[#09090b] border-y border-zinc-900" id="solutions">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
            
            <div className="text-center sm:text-left flex flex-col sm:flex-row items-end justify-between gap-6">
              <div className="max-w-3xl space-y-3">
                <span className="text-xs font-mono tracking-widest text-[#DFBA73] uppercase font-bold block">
                  THE RRS — REVENUE RECOVERY SYSTEM
                </span>
                <h2 className="text-3xl sm:text-5xl font-heading font-semibold tracking-tight text-white">
                  We Don't Sell Software. We Install a Revenue Engine.
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                  Every AI worker below is built, trained, and managed for your specific business. You don't configure anything. You don't learn a dashboard. You approve the final product, and your engine goes live.
                </p>
              </div>

              <button
                onClick={() => handleOpenBooking()}
                className="shrink-0 py-3 px-6 rounded-xl font-mono text-xs font-bold tracking-widest bg-[#DFBA73] text-black hover:bg-white transition-all duration-300 shadow-xl cursor-pointer"
              >
                REQUEST CUSTOM BLUEPRINT
              </button>
            </div>

            {/* Stat Bar — 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 bg-zinc-950/40 backdrop-blur-md rounded-2xl border border-zinc-800/60 p-6 md:p-8">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-3xl md:text-4xl font-heading font-extrabold text-[#DFBA73] tracking-tight block">
                  5 Min
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed font-light font-sans">
                  Window to contact a lead before conversion odds drop 80%
                </p>
              </div>

              <div className="space-y-2 text-center md:text-left border-y md:border-y-0 md:border-x border-zinc-900/80 md:py-0 py-6 md:px-8">
                <span className="text-3xl md:text-4xl font-heading font-extrabold text-purple-400 tracking-tight block">
                  $336K/yr
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed font-light font-sans">
                  Average annual revenue lost to missed and ignored leads
                </p>
              </div>

              <div className="space-y-2 text-center md:text-left">
                <span className="text-3xl md:text-4xl font-heading font-extrabold text-[#DFBA73] tracking-tight block">
                  78%
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed font-light font-sans">
                  Of leads go with whoever responds first — every time
                </p>
              </div>
            </div>

            {/* Custom Solution Cards Mapping */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {solutions.map((sol, idx) => (
                <SolutionCard
                  key={sol.id}
                  solution={sol}
                  index={idx}
                  onSelectBooking={(title) => handleOpenBooking(title || "")}
                />
              ))}
            </div>

          </div>
        </section>


        {/* WHY PALM & PIXEL (WHY SECTION) */}
        <section className="py-20 md:py-32 overflow-hidden border-b border-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono tracking-widest text-[#DFBA73] uppercase font-bold block">
                  STRATEGIC ADVISORY
                </span>
                <h2 className="text-3xl md:text-5xl font-heading font-semibold tracking-tight text-white leading-tight">
                  Technology Built Around Your Business
                </h2>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
                  Every company operates differently. We never start with a canned software recommendation. First, we identify your core financial objectives, current crew workflows, and database obstacles. Then, we architect the solution code.
                </p>

                <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-900 mt-6 space-y-2">
                  <span className="text-xs font-mono text-[#DFBA73] font-bold block tracking-wider uppercase">
                    OUR CLIENT PROMISE
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    &ldquo;We will never advise building or paying for automation that does not pay back its setup investment inside nine operating months.&rdquo;
                  </p>
                </div>
              </div>

              {/* Bento Grid benefits items */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((ben, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-zinc-900/25 border border-zinc-900 hover:border-zinc-800 transition-all duration-300 relative group"
                  >
                    <span className="text-[9px] font-mono text-zinc-500 font-bold tracking-widest block mb-2">
                      {ben.accentText}
                    </span>
                    <h4 className="text-base font-semibold text-white tracking-tight mb-2 font-heading group-hover:text-[#DFBA73] transition-colors">
                      {ben.title}
                    </h4>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light">
                      {ben.description}
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>


        {/* OUR PROCESS (PROCESS SECTION) */}
        <section className="py-20 md:py-32 bg-[#09090b] border-y border-zinc-900" id="process">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono tracking-widest text-[#DFBA73] uppercase font-bold block">
                DELIVERY PROTOCOL
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-semibold tracking-tight text-white">
                Our Process
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm font-light">
                High-integrity architecture designed to deploy stable, high-ROI systems without breaking existing workflows.
              </p>
            </div>

            {/* Flow line Process grids */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              
              {/* Step 1 */}
              <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-800 transition-all duration-300 relative z-10">
                <span className="text-3xl font-heading font-bold text-[#DFBA73] block mb-4">01</span>
                <div>
                  <h4 className="text-lg font-semibold tracking-tight text-white mb-2">Discover</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light">
                    Deep consultation assessing operational workflows, identifying leakage, and clarifying CRM architectures.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-900 text-[10px] font-mono text-zinc-500 uppercase">
                  OBJECTIVE SCOPE
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-800 transition-all duration-300 relative z-10">
                <span className="text-3xl font-heading font-bold text-purple-400 block mb-4">02</span>
                <div>
                  <h4 className="text-lg font-semibold tracking-tight text-white mb-2">Design</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light">
                    Drafting data maps, scheduling slot flows, testing logic trees, and formulating absolute system budgets.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-900 text-[10px] font-mono text-zinc-500 uppercase">
                  CUSTOM SCHEMATICS
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-800 transition-all duration-300 relative z-10">
                <span className="text-3xl font-heading font-bold text-blue-400 block mb-4">03</span>
                <div>
                  <h4 className="text-lg font-semibold tracking-tight text-white mb-2">Build</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light">
                    Developing and deploying serverless databases, Webhook paths, and training initial team on operations state.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-900 text-[10px] font-mono text-zinc-500 uppercase">
                  ACTIVE DEPLOYMENT
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-800 transition-all duration-300 relative z-10">
                <span className="text-3xl font-heading font-bold text-emerald-400 block mb-4">04</span>
                <div>
                  <h4 className="text-lg font-semibold tracking-tight text-white mb-2">Optimize</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light">
                    Testing API request logs, reducing cloud call limits, and programmatically refining decision loops.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-900 text-[10px] font-mono text-zinc-500 uppercase">
                  TELEMETRY HARVESTING
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* INDUSTRIES (INDUSTRIES SECTION) */}
        <section className="py-20 md:py-28 bg-[#09090b] border-y border-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono tracking-widest text-[#DFBA73] uppercase font-bold block">
                INTEGRATION CAPABILITY
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-semibold tracking-tight text-white">
                Designed For Any Business Ready To Work Smarter
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm font-light">
                We custom-engineer operations engines across a vast spectrum of specialized service models and scaling teams.
              </p>
            </div>

            {/* Premium Industry Showcase grids */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {industryCategories.map((ind, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-950/60 rounded-2xl p-6 border border-zinc-900 flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300"
                >
                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] font-mono text-[#DFBA73] tracking-widest uppercase block font-semibold">
                      {ind.subCategory}
                    </span>
                    <h3 className="text-base font-semibold text-white tracking-tight font-heading">
                      {ind.title}
                    </h3>
                  </div>

                  <div className="border-t border-zinc-900/80 pt-4 space-y-1.5 text-xs text-zinc-400 text-left">
                    {ind.examples.map((ex, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-purple-500" />
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-zinc-500 font-mono tracking-wide max-w-md mx-auto pt-4 leading-relaxed">
              &ldquo;Our solutions are customized for the unique needs of every organization. We map the data endpoints your existing workforce prefers.&rdquo;
            </p>

          </div>
        </section>


        {/* RESULTS METRIC SANDBOX (RESULTS SECTION) */}
        <section className="py-20 md:py-32" id="roi-calculator">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 md:space-y-14">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono tracking-widest text-[#DFBA73] uppercase font-bold block">
                METRIC CAPTURE YIELD
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-semibold tracking-tight text-white text-center">
                What Better Systems Create
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base font-light text-center">
                Adjust the interactive calculators below to evaluate the immediate financial and temporal yield unlocked by intelligent workflow integrations.
              </p>
            </div>

            {/* Embedded Live ROI Dashboard Component */}
            <InteractiveROI onPreFillBooking={handlePreFillBooking} />

          </div>
        </section>


        {/* MEETING THE FOUNDER (FOUNDER SECTION) */}
        <section className="relative py-20 md:py-32 bg-[#09090b] border-y border-zinc-900 overflow-hidden" id="founder" style={{ zIndex: 10 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center relative z-10">
              
              {/* Left Column: Image wrapper with luxury glass frame */}
              <div className="lg:col-span-5 flex justify-center relative z-10">
                <div className="relative p-3 bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full shadow-2xl group overflow-hidden">
                  
                  {/* Subtle hover zoom and glimmers */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-[#DFBA73]/10 opacity-40 group-hover:opacity-80 transition-opacity duration-500 z-10" />
                  
                  <img
                    src={headshotUrl}
                    alt="Michael Tukman"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto aspect-[3/4] object-cover rounded-xl border border-zinc-850 filter brightness-95 contrast-105 select-none relative z-10"
                  />

                  {/* Minimal caption tag inside photo frame */}
                  <div className="mt-4 pt-3 border-t border-zinc-850 flex justify-between items-center px-1 relative z-10">
                    <div className="text-left select-none">
                      <span className="text-xs font-bold text-white uppercase font-sans tracking-wide block">Michael Tukman</span>
                      <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Founder &amp; Principal</span>
                    </div>
                    
                    <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-805">
                      SEALED 2026
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Copy Letter */}
              <div className="lg:col-span-7 space-y-6 text-left relative z-20">
                
                <div className="space-y-1 relative z-20">
                  <span className="text-xs font-mono tracking-widest text-[#DFBA73] uppercase font-bold block relative z-20">
                    FOUNDER'S NOTE
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-heading font-semibold tracking-tight text-white relative z-20" style={{ position: 'relative', zIndex: 30 }}>
                    Meet Michael Tukman
                  </h2>
                  <span className="text-xs font-semibold text-zinc-400 font-sans tracking-wide block uppercase relative z-20">
                    Founder &amp; Principal, Palm &amp; Pixel AI Agency
                  </span>
                </div>

                <div className="text-zinc-400 text-sm sm:text-base leading-relaxed space-y-4 font-light">
                  <p>
                    Palm &amp; Pixel AI Agency helps organizations unlock the practical value of artificial intelligence through custom-built systems and automation strategies.
                  </p>
                  <p>
                    &ldquo;My mission is to help businesses operate more efficiently, serve customers better, and create sustainable growth through intelligent technology. We do not pitch unproven vaporware or overly complicated model agents. We focus exclusively on resolving the specific mechanical friction dragging your team's day-to-day productivity.&rdquo;
                  </p>
                  <p>
                    Whether you are coordinating a field-trade crew, a specialty dental clinic group, or a growing mid-market professional services firm, we map the exact logic pipelines that allow your company to absorb growth without needing equivalent headcount overhead.
                  </p>
                </div>

                {/* Sincere Signature contacts */}
                <div className="pt-6 border-t border-zinc-900 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-zinc-950 p-4 rounded-xl border border-zinc-900 group hover:border-[#DFBA73] transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#DFBA73] shrink-0">
                      <Lucide.Phone className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">Principal direct</span>
                      <a href="tel:941-307-9869" className="text-xs font-mono font-bold text-white hover:text-[#DFBA73] transition-colors">
                        941-307-9869
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-zinc-950 p-4 rounded-xl border border-zinc-900 group hover:border-[#DFBA73] transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-zinc-[#09090b] border border-zinc-800 flex items-center justify-center text-[#DFBA73] shrink-0">
                      <Lucide.Mail className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">Corporate channel</span>
                      <a href="mailto:info@palmpixelaiagency.com" className="text-xs font-mono font-bold text-white hover:text-[#DFBA73] transition-colors break-all">
                        info@palmpixelaiagency.com
                      </a>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* SYSTEM ASSESSMENT WIDGET (STRATEGY QUIZ SECTION) */}
        <section className="py-20 md:py-32" id="architecture">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 md:space-y-12">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono tracking-widest text-[#DFBA73] uppercase font-bold block">
                SYSTEM AGILITY DIAGNOSTIC
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-semibold tracking-tight text-white">
                Obtain Your Custom Setup Blueprint
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm font-light">
                Answer four diagnostic criteria to map administrative inefficiencies, locate pipeline slip, and receive actionable automation specifications.
              </p>
            </div>

            {/* Opportunity Diagnosis Quiz */}
            <StrategyQuiz onPreFillBooking={handlePreFillBooking} />

          </div>
        </section>


        {/* FINAL CONCLUDING CALL TO ACTION (CTA SECTION) */}
        <section className="py-24 md:py-36 relative overflow-hidden border-t border-zinc-950">
          {/* Subtle dynamic circular aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-6 md:space-y-8">
            
            <span className="text-xs font-mono tracking-widest text-[#DFBA73] uppercase font-bold bg-[#DFBA73]/10 px-3 py-1 rounded-full">
              ENTERPRISE OPPORTUNITY SYNC
            </span>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-semibold text-white tracking-tight leading-none">
              Ready To See What's Possible With AI?
            </h2>
            
            <p className="text-zinc-400 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Schedule a strategy session and discover where intelligent automation can create the biggest impact in your business. We will arrive with custom solutions prepared for review.
            </p>

            {/* Direct large CTA */}
            <div className="pt-4">
              <button
                onClick={() => handleOpenBooking()}
                className="py-4 px-10 rounded-xl font-mono text-xs font-bold tracking-widest bg-white text-black hover:bg-[#DFBA73] transition-all duration-300 shadow-2xl flex items-center gap-2.5 mx-auto group cursor-pointer"
              >
                BOOK YOUR STRATEGY CALL
                <Lucide.Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pt-2">
              OR EMAIL TO INTAKE DIRECTLY AT <a href="mailto:info@palmpixelaiagency.com" className="text-[#DFBA73] hover:underline">info@palmpixelaiagency.com</a>
            </p>

          </div>
        </section>

      </main>


      {/* FOOTER NAVBAR AREA */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-16 relative z-10 text-zinc-400" id="footer-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 items-start">
            
            {/* Left Column: Logo & Tagline */}
            <div className="space-y-4">
              <PalmPixelLogo />
              <p className="text-zinc-500 font-mono text-[10px] tracking-[0.2em] uppercase font-bold">
                We Build. We Automate. You Grow.
              </p>
              <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-light font-sans">
                Palm &amp; Pixel AI Agency architects secure, low-latency intelligent auto-orchestration pipelines and custom agency solutions that scale strategic performance.
              </p>
            </div>

            {/* Center Column: Navigation links */}
            <div className="space-y-4 md:pl-12">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">NAVIGATION</span>
              <nav className="flex flex-col gap-3 text-xs font-mono tracking-widest text-[#DFBA73] font-bold">
                <a href="#solutions" onClick={(e) => scrollToSection(e, "solutions")} className="hover:text-white transition-colors w-fit">SOLUTIONS</a>
                <a href="#process" onClick={(e) => scrollToSection(e, "process")} className="hover:text-white transition-colors w-fit">PROCESS</a>
                <a href="#founder" onClick={(e) => scrollToSection(e, "founder")} className="hover:text-white transition-colors w-fit">PRINCIPAL</a>
                <button 
                  onClick={() => handleOpenBooking()} 
                  className="hover:text-white transition-colors font-mono uppercase tracking-widest text-left w-fit cursor-pointer bg-transparent border-none p-0 focus:outline-none text-[#DFBA73] font-bold"
                >
                  BOOK CONSULTATION
                </button>
              </nav>
            </div>

            {/* Right Column: Contact Details */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">DIRECT CHANNELS</span>
              <div className="space-y-3">
                <a href="tel:941-307-9869" className="text-sm font-mono text-[#DFBA73] font-semibold hover:underline block">
                  941-307-9869
                </a>
                <a href="mailto:info@palmpixelaiagency.com" className="text-sm font-mono text-purple-400 font-semibold hover:underline block break-all">
                  info@palmpixelaiagency.com
                </a>
                <p className="text-[10px] text-zinc-500 font-light leading-relaxed font-sans">
                  Submit architectural briefings or operational criteria. Michael Tukman will review custom criteria before consultation.
                </p>
              </div>
            </div>

          </div>

          {/* Legal sign-off footer bottom */}
          <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-600">
            <span>&copy; {new Date().getFullYear()} Palm &amp; Pixel AI Agency. All corporate rights reserved.</span>
            <span className="tracking-widest uppercase text-zinc-700">INTELLIGENT INTEGRATION SYSTEMS</span>
          </div>

        </div>
      </footer>


      {/* INTERACTIVE Consultation Appointment Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preFilledPainPoint={preFilledPain}
        preFilledRecommendation={preFilledRec}
        selectedSolutionTitle={selectedSolutionTitle}
      />

    </div>
  );
}
