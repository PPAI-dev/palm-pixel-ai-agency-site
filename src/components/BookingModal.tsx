import React, { useState, useMemo } from "react";
import { X, Calendar, Clock, User, Building2, Phone, Mail, ChevronRight, CheckCircle2, Copy, Sparkles, Send } from "lucide-react";
import { BookingSubmission } from "../types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preFilledPainPoint?: string;
  preFilledRecommendation?: string;
  selectedSolutionTitle?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  preFilledPainPoint = "",
  preFilledRecommendation = "",
  selectedSolutionTitle = ""
}: BookingModalProps) {
  // Booking Form States
  const [step, setStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [employeeCount, setEmployeeCount] = useState<string>("1-10");
  const [painPoint, setPainPoint] = useState<string>(preFilledPainPoint || selectedSolutionTitle || "AI Agents & Intelligent assistants");
  const [meetingType, setMeetingType] = useState<string>("15-Min Strategy Discovery");

  // Sync state if trigger updates
  React.useEffect(() => {
    if (preFilledPainPoint) {
      setPainPoint(preFilledPainPoint);
    } else if (selectedSolutionTitle) {
      setPainPoint(selectedSolutionTitle);
    }
  }, [preFilledPainPoint, selectedSolutionTitle]);

  // Generate next 5 business dates dynamically
  const datesList = useMemo(() => {
    const list = [];
    const today = new Date();
    let current = new Date(today);

    while (list.length < 5) {
      current.setDate(current.getDate() + 1);
      // Skip Saturday and Sunday
      if (current.getDay() !== 0 && current.getDay() !== 6) {
        const option = {
          raw: current.toISOString().split("T")[0],
          dayName: current.toLocaleDateString("en-US", { weekday: "short" }),
          dayNum: current.getDate(),
          month: current.toLocaleDateString("en-US", { month: "short" }),
        };
        list.push(option);
      }
    }
    return list;
  }, []);

  // Initialize selected date to the first available date
  React.useEffect(() => {
    if (datesList.length > 0 && !selectedDate) {
      setSelectedDate(datesList[0].raw);
    }
  }, [datesList, selectedDate]);

  const slotsList = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

  // Set the first time slot by default
  React.useEffect(() => {
    if (!selectedSlot) {
      setSelectedSlot(slotsList[1]);
    }
  }, [selectedSlot]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !company) return;
    setStep(3); // Go to success confirmation screen
  };

  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return "";
    const [year, month, day] = selectedDate.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  }, [selectedDate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn" id="booking-modal-overlay">
      
      {/* Modal Container */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl w-full max-w-2xl relative overflow-hidden flex flex-col max-h-[90vh]" id="booking-modal-container">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-500 hover:text-white hover:bg-zinc-900 p-2 rounded-full transition-all duration-300 z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient Top Highlight */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-purple-500 via-[#DFBA73] to-blue-500" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-b from-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Modal content body scrolls if needed */}
        <div className="p-6 md:p-8 overflow-y-auto relative z-10">

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#DFBA73] uppercase bg-[#DFBA73]/10 px-2.5 py-1 rounded-full font-bold">
                  STEP 01/02 &bull; TIMING &amp; DISCOVERY
                </span>
                <h3 className="text-2xl font-heading font-semibold text-white tracking-tight mt-3">
                  Schedule Systems Consultation
                </h3>
                <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                  Select a preferred session format and timing. Principal Michael Tukman will review your system criteria before the call.
                </p>
              </div>

              {/* Consultation Format Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMeetingType("15-Min Strategy Discovery")}
                  className={`p-4 rounded-xl text-left border transition-all duration-300 cursor-pointer ${
                    meetingType === "15-Min Strategy Discovery"
                      ? "border-purple-500 bg-purple-500/5 text-white"
                      : "border-zinc-900 bg-zinc-900/30 text-zinc-400 hover:border-zinc-800"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-mono font-bold tracking-wider text-white">DISCOVERY BRIEF</span>
                  </div>
                  <span className="text-sm font-semibold block text-white">15-Min Consultation</span>
                  <p className="text-[11px] text-zinc-400 mt-1">High-level opportunities mapping &amp; scope screening.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setMeetingType("45-Min Systems Architecture Briefing")}
                  className={`p-4 rounded-xl text-left border transition-all duration-300 cursor-pointer ${
                    meetingType === "45-Min Systems Architecture Briefing"
                      ? "border-[#DFBA73] bg-[#DFBA73]/5 text-white"
                      : "border-zinc-900 bg-zinc-900/30 text-zinc-400 hover:border-zinc-800"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-[#DFBA73]" />
                    <span className="text-xs font-mono font-bold tracking-wider text-white">ARCH DIAGNOSIS</span>
                  </div>
                  <span className="text-sm font-semibold block text-white">45-Min Engineering Call</span>
                  <p className="text-[11px] text-zinc-400 mt-1">For serious teams requiring custom workflow review.</p>
                </button>
              </div>

              {/* Calendar Days */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-zinc-400 tracking-wider flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  SELECT DATE
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {datesList.map((dt) => (
                    <button
                      key={dt.raw}
                      type="button"
                      onClick={() => setSelectedDate(dt.raw)}
                      className={`py-3 px-1 rounded-xl text-center border transition-all duration-300 cursor-pointer flex flex-col justify-center items-center ${
                        selectedDate === dt.raw
                          ? "border-[#DFBA73] bg-[#DFBA73]/10 text-white"
                          : "border-zinc-900 bg-zinc-900/30 text-zinc-500 hover:text-white hover:border-zinc-800"
                      }`}
                    >
                      <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase">{dt.dayName}</span>
                      <span className="text-base font-heading font-bold my-1 text-white">{dt.dayNum}</span>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase">{dt.month}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Day Time slots */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-zinc-400 tracking-wider flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#DFBA73]" />
                  SELECT TIME SLOT (EASTERN STANDARD TIME)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {slotsList.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-1 rounded-lg text-center border text-xs font-mono transition-all duration-300 cursor-pointer ${
                        selectedSlot === slot
                          ? "border-[#DFBA73] bg-[#DFBA73]/10 text-[#DFBA73] font-bold"
                          : "border-zinc-900 bg-zinc-900/30 text-zinc-400 hover:text-white hover:border-zinc-800"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="pt-4 border-t border-zinc-900 flex justify-between items-center">
                <div className="text-left">
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase">SESSION SELECTED</span>
                  <span className="text-xs text-white font-medium">
                    {formattedSelectedDate} &bull; {selectedSlot}
                  </span>
                </div>
                
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!selectedDate || !selectedSlot}
                  className="py-3 px-6 rounded-xl font-mono text-xs font-bold tracking-widest bg-white text-black hover:bg-[#DFBA73] transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  NEXT: COMPANY INFORMATION
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#DFBA73] uppercase bg-[#DFBA73]/10 px-2.5 py-1 rounded-full font-bold">
                  STEP 02/02 &bull; CONTACT DETAILS
                </span>
                <h3 className="text-2xl font-heading font-semibold text-white tracking-tight mt-3">
                  Provide Operating Criteria
                </h3>
                <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                  Introduce your organization so we can arrive prepared with custom structural blueprints.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-400 tracking-wider flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#DFBA73]" />
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. William Vance"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#DFBA73]"
                  />
                </div>

                {/* Email address */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-400 tracking-wider flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#DFBA73]" />
                    WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. vance@company.com"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#DFBA73]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company Name */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-400 tracking-wider flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-[#DFBA73]" />
                    COMPANY NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Vance Construction"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#DFBA73]"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-400 tracking-wider flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#DFBA73]" />
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 555-0123"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#DFBA73]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Industry Classification */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-400 tracking-wider block">
                    INDUSTRY CATEGORY
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#DFBA73] appearance-none cursor-pointer"
                  >
                    <option value="">Choose Industry...</option>
                    <option value="Construction & Trades">Construction &amp; Trades</option>
                    <option value="Service Businesses">Service Businesses</option>
                    <option value="Professional Services">Professional Services</option>
                    <option value="Healthcare Organizations">Healthcare Organizations</option>
                    <option value="Retail & E-Commerce">Retail &amp; E-Commerce</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Real Estate">Real Estate</option>
                  </select>
                </div>

                {/* Team Size */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-400 tracking-wider block">
                    EMPLOYEE HEADCOUNT
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {["1-10", "11-50", "51-200", "200+"].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setEmployeeCount(size)}
                        className={`py-2 px-1 rounded-xl text-center border text-xs font-mono transition-all duration-300 cursor-pointer ${
                          employeeCount === size
                            ? "border-[#DFBA73] bg-[#DFBA73]/10 text-white font-bold"
                            : "border-zinc-900 bg-zinc-900/30 text-zinc-500 hover:text-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Core Pain Point / System Focus */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 tracking-wider block">
                  PRIMARY INTENDED SYSTEM FOCUS
                </label>
                <input
                  type="text"
                  value={painPoint}
                  onChange={(e) => setPainPoint(e.target.value)}
                  placeholder="e.g. Automating our follow-up SMS and centralizing CRM records"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Diagonal Assessment Warning */}
              {preFilledRecommendation && (
                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 text-xs text-purple-300 font-sans leading-relaxed">
                  <span className="font-mono text-[#DFBA73] font-bold block mb-1 uppercase tracking-widest text-[9px]">
                    ATTACHED ASSESSMENT DIAGNOSIS
                  </span>
                  {preFilledRecommendation}
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-4 border-t border-zinc-900 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-mono text-zinc-500 hover:text-white uppercase tracking-wider cursor-pointer transition-colors"
                >
                  &larr; BACK TO TIMING
                </button>

                <button
                  type="submit"
                  className="py-3.5 px-7 rounded-xl font-mono text-xs font-bold tracking-widest bg-emerald-500 text-black hover:bg-emerald-400 transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10"
                >
                  CONFIRM APPOINTMENT
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center py-4 animate-scaleUp">
              
              {/* Success Checkmark Circle */}
              <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto my-2 animate-pulse">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-[#DFBA73] uppercase font-bold">
                  APPOINTMENT CONFIRMED
                </span>
                <h3 className="text-2xl md:text-3xl font-heading font-semibold text-white tracking-tight">
                  Consultation Successfully Scheduled
                </h3>
                <p className="text-zinc-400 text-xs max-w-md mx-auto leading-relaxed">
                  An encrypted calendar invitation has been locked into Michael Tukman's queue. Operating blueprint analysis is initialized.
                </p>
              </div>

              {/* Details Receipt Badge */}
              <div className="bg-zinc-900/50 rounded-2xl border border-zinc-850 p-6 max-w-md mx-auto text-left space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Sync Type</span>
                  <span className="text-xs font-mono text-[#DFBA73] font-semibold">{meetingType}</span>
                </div>

                <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Consultant</span>
                  <span className="text-xs text-white">Michael Tukman (Founder &amp; Principal)</span>
                </div>

                <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Scheduled Time</span>
                  <span className="text-xs font-semibold text-white">
                    {formattedSelectedDate} @ {selectedSlot}
                  </span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Encrypted Bridge</span>
                  <span className="text-xs font-mono text-purple-400 font-semibold break-all text-right select-all">
                    meet.google.com/pmp-pxai-str
                  </span>
                </div>
              </div>

              {/* Technical Intake Brief Draft */}
              <div className="bg-zinc-950 rounded-xl border border-zinc-900 p-4 max-w-md mx-auto text-left space-y-2">
                <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-wider">
                  AUTOMATED INTAKE TELEMETRY OUTFLOW
                </span>
                <div className="text-[9px] font-mono text-zinc-400 leading-normal space-y-1 bg-black/60 p-3 rounded-lg border border-zinc-900 max-h-[110px] overflow-y-auto">
                  <p><span className="text-[#DFBA73]">TO:</span> info@palmpixelaiagency.com</p>
                  <p><span className="text-purple-400">SUBJECT:</span> New client briefing: {company}</p>
                  <p><span className="text-blue-400">LEAD:</span> {name} ({email})</p>
                  <p><span className="text-zinc-500">IND:</span> {industry || "Service Operations"} &bull; headcount {employeeCount}</p>
                  <p><span className="text-zinc-500">FOCUS:</span> {painPoint}</p>
                  {preFilledPainPoint && <p className="text-purple-300 font-light italic">Assessed Diagnostic Profile: {preFilledPainPoint}</p>}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-center max-w-md mx-auto">
                <button
                  type="button"
                  onClick={() => {
                    const briefText = `Sync Request:\nCompany: ${company}\nRepresented by: ${name}\nConsultation Format: ${meetingType}\nScheduled session date: ${formattedSelectedDate} at ${selectedSlot}\nPrimary focus is: ${painPoint}`;
                    navigator.clipboard.writeText(briefText);
                  }}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white transition-colors text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  COPY SYNC BRIEF
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-purple-500 text-white hover:bg-purple-600 transition-colors text-xs font-mono font-bold tracking-widest cursor-pointer shadow-lg shadow-purple-500/25"
                >
                  RETURN TO HOME
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
