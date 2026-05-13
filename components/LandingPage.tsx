
import React, { useState, useEffect, useRef } from 'react';
import { 
    Activity, Trophy, Target, Brain, ArrowRight, Building2, Beaker, Clock, 
    TrendingDown, Check, Zap, Users, Database, Monitor, Search, X, ChevronRight, 
    ChevronLeft, Play, Calendar, Stethoscope, Maximize2, Minimize2, Wallet, 
    BarChart3, CheckCircle, Video, AlertTriangle, ShieldAlert, Layers, FileText,
    Lock, Swords, Gavel, Map, ChevronDown, Layout, DollarSign, RefreshCw, UserPlus,
    Cpu, Stethoscope as StethoscopeIcon, FileSpreadsheet, GraduationCap, Mic
} from 'lucide-react';
import { ViewType } from '../types';
import { TestDriveModal } from './TestDriveModal';
import ClutchAssessment from './ClutchAssessment';
import NTerpretAssessment from './NTerpretAssessment';
import TrustedTeams from './TrustedTeams';

interface LandingPageProps {
  onEnter: (orgName: string, initialView?: ViewType) => void;
}

// --- LOGO COMPONENT ---
const Logo = ({ className = "", size = "normal" }: { className?: string, size?: "small" | "normal" }) => {
    const height = size === "small" ? "h-8" : "h-10";
    
    return (
        <div className={`flex items-center select-none ${className}`}>
            <img 
                src="/white_logo_transparent_background - name only.PNG" 
                alt="NTANGIBLE" 
                className={`${height} w-auto object-contain`} 
            />
        </div>
    );
};

// --- ANIMATION HOOK ---
const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

const Reveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- SUB-COMPONENTS ---

const BookingModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
        <div className="w-full max-w-5xl h-[85vh] bg-[#0f1115] border border-gray-800 rounded-2xl relative shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-gray-800 flex justify-between items-center bg-[#0f1115]">
                <h2 className="text-xl font-bold text-white">Book A Coach Demo</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                    <X size={24} />
                </button>
            </div>
            <div className="w-full h-full bg-white">
                <iframe 
                    src="https://calendly.com/ntangible/30min" 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    title="Schedule Demo"
                    className="w-full h-full"
                ></iframe>
            </div>
        </div>
    </div>
);

const SampleReportModal = ({ onClose, onViewClutch, onViewNterpret }: { onClose: () => void, onViewClutch: () => void, onViewNterpret: () => void }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
        <div className="w-full max-w-lg bg-[#0f1115] border border-gray-800 rounded-2xl relative shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-gray-800 flex justify-between items-center bg-[#0f1115]">
                <h2 className="text-xl font-bold text-white">Select Sample Report</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                    <X size={24} />
                </button>
            </div>
            <div className="p-6 space-y-4">
                <button 
                    onClick={onViewClutch}
                    className="w-full group relative p-6 bg-[#181b21] hover:bg-[#22262e] border border-gray-800 hover:border-blue-500/50 rounded-xl transition-all text-left"
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-900/20 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <Activity size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Clutch Assessment</h3>
                        </div>
                        <ArrowRight size={18} className="text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors pl-[52px]">
                        See a sample player report - how a kid handles pressure on game day.
                    </p>
                </button>

                <button 
                    onClick={onViewNterpret}
                    className="w-full group relative p-6 bg-[#181b21] hover:bg-[#22262e] border border-gray-800 hover:border-purple-500/50 rounded-xl transition-all text-left"
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-900/20 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <Brain size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">NTerpret Assessment</h3>
                        </div>
                        <ArrowRight size={18} className="text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors pl-[52px]">
                        Explore a sample player profile - learning style, motivation, and how to coach them.
                    </p>
                </button>
            </div>
        </div>
    </div>
);

// --- NIL SIMULATION COMPONENT ---
const NILSimulation = () => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "The Asset",
            content: (
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-600 shrink-0">
                            <UserPlus size={32} className="text-gray-400 sm:w-[40px] sm:h-[40px]" />
                        </div>
                        <div className="text-center sm:text-left">
                            <h4 className="text-xl sm:text-2xl font-bold text-white">Marcus J.</h4>
                            <p className="text-blue-400 font-mono uppercase tracking-widest text-xs sm:text-sm">U13 Tryout • Top Scorer</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-black/40 p-4 rounded border border-white/5">
                            <div className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider mb-1">Skill Score</div>
                            <div className="text-xl sm:text-2xl font-bold text-white">9.2/10</div>
                        </div>
                        <div className="bg-black/40 p-4 rounded border border-white/5">
                            <div className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider mb-1">Goals (Last Season)</div>
                            <div className="text-xl sm:text-2xl font-bold text-white">28</div>
                        </div>
                    </div>
                    <p className="text-gray-400 italic text-sm sm:text-lg leading-relaxed text-center sm:text-left">"The talent jumps off the field. But will he lift the team - or sink it?"</p>
                </div>
            )
        },
        {
            title: "The Ask",
            content: (
                <div className="space-y-6 sm:space-y-8 text-center py-4">
                    <div className="inline-block p-4 sm:p-6 bg-green-900/10 rounded-full border border-green-500/30 mb-2">
                        <DollarSign className="text-green-500 w-8 h-8 sm:w-12 sm:h-12" />
                    </div>
                    <div>
                        <h4 className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-2">1 Roster Spot</h4>
                        <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-[0.2em] font-bold">Elite Travel Team</p>
                    </div>
                    <div className="text-left bg-red-900/10 border border-red-900/30 p-4 sm:p-6 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle size={14} className="text-red-500" />
                            <span className="text-[10px] sm:text-xs font-bold text-red-400 uppercase tracking-widest">Locker Room Risk: High</span>
                        </div>
                        <p className="text-red-200 text-xs sm:text-sm">"Pick him and three current players might quit. Cut him and the parents will be in your inbox by Monday."</p>
                    </div>
                </div>
            )
        },
        {
            title: "Due Diligence",
            content: (
                <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="text-[10px] sm:text-sm text-gray-400 uppercase tracking-widest font-bold">Mental Profile</span>
                        <span className="text-[10px] sm:text-sm text-gray-400 uppercase tracking-widest font-bold">Score</span>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm sm:text-lg font-bold text-white">Resilience</span>
                                <span className="text-sm sm:text-lg font-mono font-bold text-red-500">38% (Low)</span>
                            </div>
                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full w-[38%] bg-red-600"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm sm:text-lg font-bold text-white">Coachability</span>
                                <span className="text-sm sm:text-lg font-mono font-bold text-red-500">24% (Poor)</span>
                            </div>
                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full w-[24%] bg-red-600"></div>
                            </div>
                        </div>

                        <div className="p-4 bg-yellow-900/10 border border-yellow-500/30 rounded-xl text-yellow-200">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle size={14} className="text-yellow-500" />
                                <span className="font-bold text-[10px] sm:text-xs uppercase tracking-wider">Heads-Up</span>
                            </div>
                            <p className="text-xs sm:text-sm">"Shuts down after a mistake. Resists feedback. Likely to clash with current captains."</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "The Verdict",
            content: (
                <div className="space-y-6 sm:space-y-8 text-center py-4">
                    <div className="inline-block p-4 sm:p-6 bg-gray-800/50 rounded-full border border-gray-600 mb-2">
                        <ShieldAlert className="text-white w-8 h-8 sm:w-12 sm:h-12" />
                    </div>
                    <div>
                        <h4 className="text-4xl sm:text-5xl font-black text-red-500 tracking-tighter mb-4 uppercase">PLACE ELSEWHERE</h4>
                        <p className="text-base sm:text-xl text-gray-300">Right kid. Wrong team - for now.</p>
                    </div>
                    <div className="bg-green-900/10 border border-green-500/30 p-4 sm:p-6 rounded-xl">
                        <div className="text-[10px] sm:text-xs text-green-400 uppercase tracking-widest mb-2 font-bold">The Win</div>
                        <div className="text-2xl sm:text-4xl font-bold text-white mb-2">Team Chemistry Saved</div>
                        <p className="text-xs sm:text-sm text-green-400/80">
                            Placed Marcus on a development squad with the right coach for his style. Six months later - coachability up 40%. Now he's ready.
                        </p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-8 md:py-0 flex flex-col justify-center min-h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Left Column: Context/Navigation */}
                <div className="space-y-6 sm:space-y-10 order-1 lg:order-1">
                     {/* Header */}
                     <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-full animate-in slide-in-from-left-4 fade-in duration-700">
                            <Activity size={14} className="text-blue-500" />
                            <span className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest">Tryout Intelligence</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-[0.9] animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">
                            The roster <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">Decision.</span>
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
                           Every tryout has one. The talented kid you're not sure about. See how NControl helps you decide - fast, fair, and with the whole team in mind.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300">
                        <div className="flex gap-2">
                            {steps.map((_, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setStep(idx)}
                                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${idx <= step ? 'bg-blue-600' : 'bg-gray-800'}`}
                                />
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => setStep(Math.max(0, step - 1))}
                                disabled={step === 0}
                                className="px-6 py-3 border border-white/10 rounded-lg hover:bg-white/5 text-xs font-bold text-white uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                Back
                            </button>
                            <button 
                                onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold text-white uppercase tracking-widest transition-colors shadow-lg shadow-blue-900/20"
                            >
                                {step === steps.length - 1 ? 'Restart Scenario' : 'Next Step'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Dynamic Content Display */}
                <div className="relative animate-in zoom-in-95 fade-in duration-1000 delay-300 order-2 lg:order-2">
                     {/* Content Box */}
                     <div className="bg-[#111] border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl min-h-[400px] sm:min-h-[450px] flex flex-col justify-center">
                         <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                             {step === 0 && <UserPlus size={100} />}
                             {step === 1 && <DollarSign size={100} />}
                             {step === 2 && <Activity size={100} />}
                             {step === 3 && <ShieldAlert size={100} />}
                         </div>
                         <div className="relative z-10">
                             <div key={step} className="animate-in fade-in slide-in-from-right-4 duration-500">
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8 border-b border-white/5 pb-4">
                                    {steps[step].title}
                                </h4>
                                {steps[step].content}
                            </div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

// --- PRICING + REVENUE CALCULATOR ---
const PricingCalculator = () => {
    const [players, setPlayers] = useState(100);
    const pricePerPlayer = 29;
    const revSharePerPlayer = 10;

    const clamped = Math.max(0, Math.min(1000, players));
    const orgRevShare = clamped * revSharePerPlayer;
    const netCost = clamped * (pricePerPlayer - revSharePerPlayer);

    const fmt = (n: number) => `$${n.toLocaleString('en-US')}`;

    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 scroll-mt-20" id="pricing">
            <Reveal>
                <div className="text-center mb-10 sm:mb-14">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-900/10">
                        <DollarSign size={12} className="text-green-400" />
                        <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Simple Pricing</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-4">
                        One flat rate.<br className="sm:hidden"/> <span className="text-green-400">$29 per player.</span>
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                        $29 per player, fully assessed. $10 comes back to your organization. Most clubs cover the rest through a single team fundraiser.
                    </p>
                </div>

                {/* Price cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-14">
                    <div className="bg-[#0f1115] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 opacity-5 pointer-events-none">
                            <Activity size={120} />
                        </div>
                        <p className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Per Player</p>
                        <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">$29</span>
                            <span className="text-gray-500 text-sm">/ test</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Full player profile, coach playbook, and ongoing dashboard access. Pay only for the kids you actually test.
                        </p>
                    </div>

                    <div className="bg-gradient-to-b from-green-900/20 to-black border border-green-500/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-[0_0_40px_rgba(34,197,94,0.1)]">
                        <div className="absolute -right-6 -top-6 opacity-10 pointer-events-none text-green-500">
                            <DollarSign size={120} />
                        </div>
                        <p className="text-[10px] sm:text-xs font-bold text-green-400 uppercase tracking-widest mb-3">Back To You</p>
                        <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">$10</span>
                            <span className="text-gray-500 text-sm">/ player</span>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Your organization keeps $10 of every $29 - effectively covering a large chunk of the program through a single team fundraiser.
                        </p>
                    </div>
                </div>

                {/* Fundraise callout */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 sm:p-6 mb-10 sm:mb-14 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-10 h-10 bg-green-500/15 rounded-lg flex items-center justify-center text-green-400 shrink-0">
                        <Wallet size={20} />
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] sm:text-xs font-bold text-green-400 uppercase tracking-widest mb-1">Cover the cost with one fundraiser</p>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                            A typical team raffle, sponsor night, or parent-and-coach dinner more than covers the $29 per player. Many partner organizations roll NTangible directly into their existing player-development fee - no new line item required.
                        </p>
                    </div>
                </div>

                {/* Calculator */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-5 sm:p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none hidden sm:block">
                        <BarChart3 size={180} />
                    </div>

                    <div className="relative z-10">
                        <div className="text-center mb-6 sm:mb-8">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Revenue Calculator</h3>
                            <p className="text-gray-500 text-sm">Drag the slider to see what your club could earn.</p>
                        </div>

                        {/* Player count */}
                        <div className="mb-8">
                            <div className="flex items-end justify-between mb-3">
                                <label className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">Players Tested</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        min={0}
                                        max={1000}
                                        value={clamped}
                                        onChange={(e) => setPlayers(parseInt(e.target.value || '0', 10))}
                                        className="w-24 sm:w-28 bg-black border border-white/10 rounded-lg px-3 py-2 text-right text-2xl sm:text-3xl font-black text-white tracking-tight focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <input
                                type="range"
                                min={0}
                                max={1000}
                                step={1}
                                value={clamped}
                                onChange={(e) => setPlayers(parseInt(e.target.value, 10))}
                                className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer accent-green-500"
                                style={{
                                    background: `linear-gradient(to right, #22c55e 0%, #22c55e ${(clamped/1000)*100}%, #1f2937 ${(clamped/1000)*100}%, #1f2937 100%)`
                                }}
                            />
                            <div className="flex justify-between mt-2 text-[10px] text-gray-600 font-mono">
                                <span>1</span><span>250</span><span>500</span><span>750</span><span>1,000</span>
                            </div>
                        </div>

                        {/* Result cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div className="bg-black/60 border border-white/10 rounded-2xl p-5 sm:p-6">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Net Cost (After Rev Share)</p>
                                <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">{fmt(netCost)}</p>
                                <p className="text-[11px] text-gray-500 mt-2">{clamped} × $19 - easily covered by a team fundraiser</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-900/30 to-black border border-green-500/40 rounded-2xl p-5 sm:p-6 shadow-[0_0_30px_rgba(34,197,94,0.12)] sm:transform sm:scale-[1.03]">
                                <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-2">Your Organization Gets Back</p>
                                <p className="text-3xl sm:text-4xl font-black text-green-400 tracking-tight">{fmt(orgRevShare)}</p>
                                <p className="text-[11px] text-green-200/60 mt-2">{clamped} × $10 returned to your org</p>
                            </div>
                        </div>

                        {/* Helper bar */}
                        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                            {[25, 50, 100, 250, 500, 1000].map(n => (
                                <button
                                    key={n}
                                    onClick={() => setPlayers(n)}
                                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all ${
                                        clamped === n
                                            ? 'bg-green-500 text-black shadow-lg shadow-green-500/20'
                                            : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {n} kids
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
};

// --- PRESENTATION MODE COMPONENT ---
const PresentationMode = ({ onClose, onBook }: { onClose: () => void, onBook: () => void }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 9; 

    const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
    const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const slides = [
        // Slide 1: The Blind Spot (Problem)
        <div className="h-full w-full overflow-y-auto overflow-x-hidden">
            <div className="min-h-full w-full flex items-center justify-center py-12 md:py-0">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-full animate-in slide-in-from-left-4 fade-in duration-700">
                            <AlertTriangle size={16} className="text-red-500" />
                            <span className="text-xs font-bold text-red-400 uppercase tracking-widest">The Coaching Gap</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black italic text-white tracking-tighter uppercase leading-[0.9] animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">
                            You see half <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">the kid.</span>
                        </h2>

                        <p className="text-sm md:text-lg text-gray-400 font-light leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
                            You track touches, goals, minutes, and skill drills. <br/>
                            But you don't see how a kid handles pressure, how they learn, or why they quit.
                            <br/><br/>
                            <span className="text-white font-bold">70% of kids leave youth sports by age 13. That's the half nobody's measuring.</span>
                        </p>
                    </div>

                    <div className="relative animate-in zoom-in-95 fade-in duration-1000 delay-300 mt-8 lg:mt-0">
                        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8 max-w-md mx-auto relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <FileText className="w-32 h-32" />
                            </div>
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <span className="text-gray-500 font-mono text-xs md:text-sm">CATEGORY</span>
                                    <span className="text-gray-500 font-mono text-xs md:text-sm">STATUS</span>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-900/30 rounded text-green-500"><Activity size={16} /></div>
                                            <span className="text-white font-bold text-sm sm:text-base">Skill Drills</span>
                                        </div>
                                        <span className="text-green-500 font-mono text-[10px] md:text-xs bg-green-900/20 px-2 py-1 rounded">MEASURED</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-900/30 rounded text-green-500"><Video size={16} /></div>
                                            <span className="text-white font-bold text-sm sm:text-base">Game Stats</span>
                                        </div>
                                        <span className="text-green-500 font-mono text-[10px] md:text-xs bg-green-900/20 px-2 py-1 rounded">MEASURED</span>
                                    </div>
                                    
                                    <div className="h-px bg-white/10 my-4"></div>

                                    <div className="flex items-center justify-between opacity-50">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-red-900/30 rounded text-red-500"><Brain size={16} /></div>
                                            <span className="text-white font-bold text-sm sm:text-base">Mental Strength</span>
                                        </div>
                                        <span className="text-red-500 font-mono text-[10px] md:text-xs bg-red-900/20 px-2 py-1 rounded">UNKNOWN</span>
                                    </div>
                                    <div className="flex items-center justify-between opacity-50">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-red-900/30 rounded text-red-500"><Users size={16} /></div>
                                            <span className="text-white font-bold text-sm sm:text-base">Coachability</span>
                                        </div>
                                        <span className="text-red-500 font-mono text-[10px] md:text-xs bg-red-900/20 px-2 py-1 rounded">UNKNOWN</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                                <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-xl uppercase tracking-widest shadow-2xl border border-red-400 rotate-[-10deg]">
                                    Blind Spot
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 2: The Advantage (Why This Wins)
        <div className="h-full w-full overflow-y-auto overflow-x-hidden">
            <div className="min-h-full w-full flex items-center justify-center py-12 md:py-0">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-12 text-center">
                    <div className="mb-8 animate-in slide-in-from-bottom-8 fade-in duration-700">
                        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-full mb-6">
                            <Zap size={16} className="text-blue-500" />
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">The Coach Edge</span>
                        </div>
                        <h2 className="text-3xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-none">
                            Coach the kid, <br/><span className="text-blue-500">not the position.</span>
                        </h2>
                        <p className="text-sm md:text-lg text-gray-400 max-w-3xl mx-auto mt-6 leading-relaxed">
                            Most coaches use the same approach for every kid on the field.
                            <br/>NControl gives you a <strong>simple profile</strong> for each player so you know exactly how to reach them.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center opacity-50 blur-[2px] hover:blur-0 hover:opacity-100 transition-all duration-500">
                            <h3 className="text-gray-500 font-bold uppercase tracking-widest mb-4">The Standard</h3>
                            <p className="text-xl md:text-2xl font-light text-gray-300">"He's a good kid. She's a bit shy."</p>
                            <div className="w-full h-px bg-white/10 my-6"></div>
                            <p className="text-red-400 font-mono text-sm uppercase">Subjective • Slow • Misses Quiet Kids</p>
                        </div>

                        <div className="bg-blue-900/20 border-2 border-blue-500 p-8 rounded-2xl flex flex-col items-center text-center shadow-[0_0_50px_rgba(37,99,235,0.2)] transform md:scale-105">
                            <h3 className="text-blue-400 font-bold uppercase tracking-widest mb-4">The NControl Edge</h3>
                            <p className="text-xl md:text-2xl font-bold text-white">"Visual learner. Resilient. Needs direct feedback."</p>
                            <div className="w-full h-px bg-blue-500/30 my-6"></div>
                            <p className="text-green-400 font-mono text-sm uppercase">Specific • Actionable • Backed By Data</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 3: The Financial Bleed (Agitation)
        <div className="h-full w-full overflow-y-auto overflow-x-hidden">
            <div className="min-h-full w-full flex items-center justify-center py-12 md:py-0">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="order-2 lg:order-1 relative animate-in zoom-in-95 fade-in duration-1000 delay-200">
                        <div className="bg-gradient-to-br from-red-900/10 to-black border border-red-500/30 p-8 md:p-10 rounded-3xl relative overflow-hidden">
                            <div className="absolute -right-10 -top-10 text-red-900/20">
                                <Wallet className="w-48 h-48" />
                            </div>
                            
                            <div className="relative z-10">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">The Cost Of A Family Leaving</h3>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Avg. Annual Club Dues</p>
                                        <p className="text-3xl md:text-4xl font-mono font-bold text-white">$2,800</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Avg. Player Lifetime (Years)</p>
                                        <p className="text-3xl md:text-4xl font-mono font-bold text-white">3.5</p>
                                    </div>
                                    <div className="pt-6 border-t border-white/10">
                                        <p className="text-red-400 text-xs uppercase tracking-widest mb-1 font-bold">Lost Revenue Per Family</p>
                                        <p className="text-5xl md:text-6xl font-mono font-black text-red-500">$9,800</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 space-y-8">
                        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-full animate-in slide-in-from-right-4 fade-in duration-700">
                            <TrendingDown size={16} className="text-red-500" />
                            <span className="text-xs font-bold text-red-400 uppercase tracking-widest">The Quiet Quit</span>
                        </div>

                        <h2 className="text-3xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-[0.9] animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">
                            Every kid who quits <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">costs you.</span>
                        </h2>

                        <p className="text-sm md:text-lg text-gray-400 font-light leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
                            When a player leaves your club because they "weren't having fun," you don't just lose dues - you lose siblings, referrals, and years of revenue. Each family walking away is nearly <span className="text-white font-bold">$10k</span> gone.
                            <br/><br/>
                            NControl flags shifts in a player's cognitive profile <em>before</em> they tell their parents they want to quit. Keep families. Build a community.
                        </p>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 4: NIL Capital Protection (Redesigned)
        <div className="h-full w-full overflow-y-auto overflow-x-hidden">
             <div className="min-h-full w-full flex items-center justify-center">
                 <NILSimulation />
             </div>
        </div>,

        // Slide 5: The DIFFERENTIATION / COMPETITOR Comparison (NEW)
        <div className="h-full w-full overflow-y-auto overflow-x-hidden">
            <div className="min-h-full w-full flex items-center justify-center py-12 md:py-0">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-12 text-center">
                    <div className="mb-12 animate-in slide-in-from-bottom-8 fade-in duration-700">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-6">
                            <Target size={16} className="text-white" />
                            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">The Competitive Landscape</span>
                        </div>
                        <h2 className="text-3xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-none mb-6">
                            Built for <br/><span className="text-blue-500">youth sports.</span>
                        </h2>
                        <p className="text-sm md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            We're not a generic personality quiz. We're not another team-admin tool.<br/>
                            We're the <strong>insight layer</strong> your coaches actually need.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8 fade-in delay-200">
                        
                        {/* Competitor 1: Cognitive Tests (Updated) */}
                        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all text-left flex flex-col h-full">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <FileSpreadsheet className="w-20 h-20" />
                            </div>
                            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6 text-gray-400 shrink-0">
                                <FileText size={24} />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-300 mb-2 uppercase tracking-wide">Generic Quizzes</h3>
                            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-4">Adult Personality Tests</p>
                            <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-grow">
                                Designed for corporate adults, then handed to a 13-year-old. The results don't translate to the field, the locker room, or how kids actually grow.
                            </p>
                            <div className="p-3 bg-red-900/10 border border-red-900/30 rounded text-red-400 text-xs font-bold uppercase tracking-wide flex items-center gap-2 mt-auto">
                                <X size={14} /> Not Built For Kids
                            </div>
                        </div>

                        {/* Competitor 2: Management Platforms (Updated) */}
                        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all text-left flex flex-col h-full">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Database className="w-20 h-20" />
                            </div>
                            <div className="w-12 h-12 bg-purple-900/20 rounded-lg flex items-center justify-center mb-6 text-purple-400 shrink-0">
                                <Layers size={24} />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-300 mb-2 uppercase tracking-wide">Team Admin Apps</h3>
                            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-4">TeamSnap • SportsEngine</p>
                            <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-grow">
                                Great for schedules, payments, and group chats. But silent on the things that actually grow a player - cognitive abilities, focus, and how they handle a tough game.
                            </p>
                            <div className="p-3 bg-yellow-900/10 border border-yellow-900/30 rounded text-yellow-500 text-xs font-bold uppercase tracking-wide flex items-center gap-2 mt-auto">
                                <AlertTriangle size={14} /> Logistics Only
                            </div>
                        </div>

                        {/* NControl */}
                        <div className="bg-gradient-to-b from-blue-900/20 to-black border border-blue-500 p-6 rounded-2xl relative overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.15)] transform md:-translate-y-4 text-left flex flex-col h-full">
                            <div className="absolute top-0 right-0 p-6 opacity-20 text-blue-500">
                                <Cpu className="w-20 h-20" />
                            </div>
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-900/50 shrink-0">
                                <Activity size={24} />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-2 uppercase tracking-wide">NControl</h3>
                            <p className="text-[10px] text-blue-300 font-mono uppercase tracking-widest mb-4">For Youth • Coach-Friendly • Actionable</p>
                            <p className="text-sm text-gray-300 leading-relaxed mb-6 flex-grow">
                                Built specifically for ages 13-18. A short, focused assessment gives every coach a complete cognitive profile for each player - and flags mental-strength shifts early.
                            </p>
                            <div className="p-3 bg-blue-900/30 border border-blue-500/50 rounded text-blue-200 text-xs font-bold uppercase tracking-wide flex items-center gap-2 mt-auto">
                                <Check size={14} /> The Whole Athlete
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>,

        // Slide 6: Force Multiplier (Sports Psych)
        <div className="h-full w-full overflow-y-auto overflow-x-hidden">
            <div className="min-h-full w-full flex items-center justify-center py-12 md:py-0">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 bg-purple-900/20 border border-purple-500/30 px-4 py-2 rounded-full animate-in slide-in-from-left-4 fade-in duration-700">
                            <Zap size={16} className="text-purple-400" />
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Force Multiplier</span>
                        </div>
                        <h2 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter text-white animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">
                            Catch quiet kids <br/>
                            <span className="text-purple-500">before they quit.</span>
                        </h2>
                        <p className="text-sm md:text-lg text-gray-300 leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
                            You can't be everywhere - and the kids whose mental strength is slipping aren't the ones telling you.
                            <br/><br/>
                            NControl is your <strong>early-warning system</strong>. We flag players who are pulling back, losing motivation, or struggling with pressure - so you can have the right conversation, before their parents call to pull them out.
                        </p>
                    </div>
                    
                    <div className="relative animate-in zoom-in-95 fade-in duration-1000 delay-300 mt-8 lg:mt-0">
                        <div className="bg-[#050505] border border-white/10 rounded-full aspect-square w-full max-w-md mx-auto relative flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent w-1/2 h-full origin-right animate-[spin_4s_linear_infinite] border-r border-purple-500/50"></div>
                            <div className="absolute inset-0 border border-white/5 rounded-full scale-75"></div>
                            <div className="absolute inset-0 border border-white/5 rounded-full scale-50"></div>
                            <div className="absolute inset-0 border border-white/5 rounded-full scale-25"></div>
                            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,1)]"></div>
                            <div className="absolute bottom-10 bg-black/80 border border-red-500/50 px-3 py-1 rounded text-red-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                                Alert: Cognitive Profile Shift
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 7: The Lock (Exclusivity)
        <div className="h-full w-full overflow-y-auto overflow-x-hidden">
            <div className="min-h-full w-full flex items-center justify-center py-12 md:py-0">
                <div className="w-full max-w-6xl mx-auto px-4 md:px-12 text-center">
                    <div className="mb-8 animate-in slide-in-from-bottom-8 fade-in duration-700">
                        <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-3 py-1.5 rounded-full mb-4">
                            <Lock size={14} className="text-yellow-500" />
                            <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">Regional Exclusivity</span>
                        </div>
                        <h2 className="text-3xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-none mb-4">
                            Be the only <br/><span className="text-yellow-500">club in town.</span>
                        </h2>
                        <p className="text-sm md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Families talk. When you're the only program with NControl, parents notice.
                            <br/>
                            <span className="text-white font-bold">Lock your region. Own the reputation.</span>
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-6 animate-in slide-in-from-bottom-8 fade-in delay-200">
                        <div className="bg-[#111] p-6 rounded-2xl border border-white/10 max-w-sm mx-auto w-full">
                            <div className="bg-red-500/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                                <X size={20} className="text-red-500 w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Open Market</h3>
                            <p className="text-gray-500 text-sm">
                                Standard license. The club across town can sign up too and pitch the same advantage to your families.
                            </p>
                        </div>
                        <div className="bg-gradient-to-b from-yellow-900/20 to-black p-6 rounded-2xl border border-yellow-500/50 max-w-sm shadow-[0_0_40px_rgba(234,179,8,0.2)] mx-auto w-full">
                            <div className="bg-yellow-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Lock size={20} className="text-black w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Regional Lock</h3>
                            <p className="text-yellow-200/70 text-sm">
                                We block competing clubs in your metro for your sport. You're the only program in the area with NControl.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 animate-in slide-in-from-bottom-8 fade-in delay-300">
                        <button 
                            onClick={onBook}
                            className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-1 flex items-center gap-2 mx-auto"
                        >
                            <Lock size={14} /> Check Region Availability
                        </button>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 8: Engagement Models (Pricing Tiers)
        <div className="h-full w-full overflow-y-auto overflow-x-hidden">
            <div className="min-h-full w-full flex items-center justify-center py-12 md:py-0">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-12 text-center">
                    <div className="mb-10 animate-in slide-in-from-bottom-8 fade-in duration-700">
                        <h2 className="text-3xl md:text-5xl font-black italic text-white mb-4 tracking-tighter uppercase">Simple, Fair Pricing</h2>
                        <p className="text-gray-400 text-sm md:text-base">$29 per player tested. $10 back to your organization. No seat licenses. No hidden fees.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Single Team */}
                        <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-2xl flex flex-col hover:border-white/30 transition-all duration-300 animate-in slide-in-from-bottom-8 fade-in delay-100 group text-left h-full">
                            <div className="mb-6">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest border border-gray-700 px-3 py-1 rounded-full group-hover:bg-white group-hover:text-black transition-colors">Coach</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Single Team</h3>
                            <p className="text-gray-500 text-sm mb-6 h-10">One coach. One team. Test every player and run smarter practices.</p>

                            <ul className="space-y-3 mb-6 flex-grow border-t border-white/5 pt-6">
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-white" /> <span className="font-bold text-white">$29</span> per player tested</li>
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-white" /> Full Player Profiles & Reports</li>
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-white" /> Coach Dashboard Access</li>
                            </ul>
                        </div>

                        {/* Preferred Teams */}
                        <div className="bg-gradient-to-b from-[#1a1a1a] to-black border border-blue-500 p-6 rounded-2xl flex flex-col relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(37,99,235,0.15)] animate-in slide-in-from-bottom-8 fade-in delay-200 text-left h-full">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</div>
                            <div className="mb-6">
                                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest border border-blue-500/30 px-3 py-1 rounded-full">Club / Org</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Club Partnership</h3>
                            <p className="text-gray-400 text-sm mb-6 h-10">For clubs and youth organizations - earn revenue on every player tested.</p>
                            <ul className="space-y-3 mb-6 flex-grow border-t border-white/10 pt-6">
                                <li className="flex items-center gap-3 text-sm text-white"><Check size={16} className="text-blue-400" /> <span className="font-bold">$29</span> per player tested</li>
                                <li className="flex items-center gap-3 text-sm text-white"><Check size={16} className="text-blue-400" /> <span className="font-bold">$10 back</span> to your organization</li>
                                <li className="flex items-center gap-3 text-sm text-white"><Check size={16} className="text-blue-400" /> Director Dashboard (All Teams)</li>
                                <li className="flex items-center gap-3 text-sm text-white"><Check size={16} className="text-blue-400" /> Priority Support & Onboarding</li>
                            </ul>
                        </div>

                        {/* Full Varsity Package */}
                        <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-2xl flex flex-col hover:border-purple-500/50 transition-all duration-300 animate-in slide-in-from-bottom-8 fade-in delay-300 group text-left h-full">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">Best Value</div>
                            <div className="mb-6">
                                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest border border-purple-500/30 px-3 py-1 rounded-full group-hover:bg-purple-500 group-hover:text-white transition-colors">Enterprise</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">League / Multi-Club</h3>
                            <p className="text-gray-500 text-sm mb-6 h-10">For leagues, networks of clubs, and large youth organizations.</p>
                            <ul className="space-y-3 mb-6 flex-grow border-t border-white/5 pt-6">
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-purple-500" /> Volume pricing on <strong>$29/player</strong></li>
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-purple-500" /> <strong>$10/player</strong> revenue share</li>
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-purple-500" /> League-Wide Director Dashboard</li>
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-purple-500" /> Regional Exclusivity Available</li>
                            </ul>
                            
                            <div className="mt-2 pt-6 border-t border-white/5">
                                <button 
                                    onClick={() => window.open('https://calendly.com/ntangible/30min', '_blank')}
                                    className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 group-hover:bg-purple-900/20 group-hover:border-purple-500/30"
                                >
                                    <Calendar size={14} className="text-gray-400 group-hover:text-purple-400" />
                                    Schedule Consultation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,

        // Slide 9: CTA (Close)
        <div className="h-full w-full overflow-y-auto overflow-x-hidden">
            <div className="min-h-full w-full flex items-center justify-center py-12 md:py-0">
                 <div className="w-full max-w-4xl mx-auto px-4 md:px-12 text-center">
                    <div className="mb-12 animate-in zoom-in-95 fade-in duration-700">
                        <Trophy size={60} className="text-yellow-500 mx-auto mb-8 drop-shadow-[0_0_30px_rgba(234,179,8,0.5)] w-20 h-20" />
                        <h2 className="text-3xl md:text-6xl font-black italic text-white mb-6 tracking-tighter leading-none">
                            COACH THE <br/> <span className="text-blue-500">WHOLE KID.</span>
                        </h2>
                    </div>
                    <p className="text-base md:text-xl text-gray-300 mb-12 max-w-2xl font-light mx-auto animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">
                        Talent gets them on the team. Mental strength keeps them in the sport. <br/>
                        <span className="text-white font-bold">Let's build that for every kid you coach.</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
                        <button 
                            onClick={onBook}
                            className="bg-white hover:bg-gray-200 text-black px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 flex items-center gap-3 justify-center"
                        >
                            Book A Demo <ArrowRight size={16} />
                        </button>
                        <button 
                            onClick={onClose}
                            className="border border-white/20 hover:bg-white/10 text-white px-10 py-6 rounded-full font-bold text-sm uppercase tracking-widest transition-all"
                        >
                            Close Presentation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ];

    return (
        <div className="fixed inset-0 z-[200] bg-black text-white flex flex-col h-[100dvh] animate-in fade-in duration-500">
            {/* Presentation Controls */}
            <div className="w-full p-6 flex justify-between items-center z-50 bg-black shrink-0 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <Logo className="text-white opacity-80" size="small" />
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full">
                    <Minimize2 size={20} />
                </button>
            </div>

            {/* Slide Content */}
            <div className="flex-grow relative overflow-hidden">
                {slides.map((slide, index) => (
                    <div 
                        key={index}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                            index === currentSlide ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 
                            index < currentSlide ? 'opacity-0 -translate-y-10 scale-95 pointer-events-none' : 
                            'opacity-0 translate-y-10 scale-95 pointer-events-none'
                        }`}
                    >
                        {slide}
                    </div>
                ))}
            </div>

            {/* Footer / Navigation */}
            <div className="p-8 flex items-center justify-between z-50 bg-gradient-to-t from-black via-black/80 to-transparent shrink-0">
                <div className="text-xs font-mono text-gray-500">
                    SLIDE {currentSlide + 1} / {totalSlides}
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={prevSlide} 
                        disabled={currentSlide === 0}
                        className="p-4 rounded-full border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={nextSlide}
                        disabled={currentSlide === totalSlides - 1}
                        className="p-4 rounded-full border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 h-1 bg-gray-900 w-full">
                    <div 
                        className="h-full bg-blue-600 transition-all duration-500 ease-out"
                        style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

// ... Rest of the file remains the same ...
// ... Main Landing Page Component ...

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Ref for Video Section
  const videoSectionRef = useRef<HTMLElement>(null);

  const scrollToVideo = () => {
    videoSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  // Modal States
  const [showTestDrive, setShowTestDrive] = useState(false);
  const [showClutchReport, setShowClutchReport] = useState(false);
  const [showNterpretReport, setShowNterpretReport] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  
  // Video Toggle State

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleEnter = (view?: ViewType) => {
    const finalName = 'NTANGIBLE';
    onEnter(finalName, view);
  };

  return (
    <div className={`min-h-screen bg-[#050505] text-white relative font-sans selection:bg-blue-500 selection:text-white flex flex-col scroll-smooth ${showClutchReport || showNterpretReport ? 'h-screen overflow-hidden' : 'overflow-y-auto overflow-x-hidden'}`}>

      {/* Background Grid & Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-900/10 blur-[120px] rounded-full opacity-30"></div>
         {/* Scanning Beam Animation */}
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-[scan_8s_ease-in-out_infinite]"></div>
      </div>

      {/* Header / Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 h-20 flex items-center justify-between backdrop-blur-md border-b border-white/5 bg-black/50">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleEnter()}>
             <Logo className="text-white" />
         </div>
         <div className="flex items-center gap-6">
             <button 
                onClick={() => setShowBooking(true)}
                className="bg-white text-black hover:bg-gray-200 px-4 sm:px-5 py-2 rounded font-bold text-[10px] sm:text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-white/10"
             >
                Book Demo
             </button>
         </div>
      </nav>

      {/* Main Content Container */}
      <div className="relative z-10 w-full pt-32 pb-20">
          
          {/* HERO SECTION */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-20 text-center relative">
              <div className={`transition-all duration-1000 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/10 mb-8 backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">Mental Scouting for Youth Athletes 13-18</span>
                  </div>
              </div>

              <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-black italic tracking-tight mb-8 leading-[0.95] pr-3 sm:pr-6 transition-all duration-1000 delay-100 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  COACH THE <br />
                  <span className="inline-block pr-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-white to-blue-200 animate-gradient">WHOLE ATHLETE</span>
              </h1>

              <p className={`text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed font-light transition-all duration-1000 delay-200 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  A 20-minute mental scouting report for every athlete 13-18. Coaches get an instant profile of how each player learns, leads, and performs under pressure.
              </p>

              {/* Main Action Buttons */}
              <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-6 sm:mb-8 max-w-md sm:max-w-none mx-auto transition-all duration-1000 delay-300 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                 <button
                    onClick={() => setShowBooking(true)}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 sm:px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] transform hover:-translate-y-1 flex items-center justify-center gap-3 group"
                 >
                    <Calendar size={18} className="text-blue-200 group-hover:text-white transition-colors" />
                    Book A Demo <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </button>

                 <button
                    onClick={scrollToVideo}
                    className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 sm:px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                 >
                    <Play size={18} /> Watch Demo
                 </button>

                 <button
                    onClick={() => handleEnter()}
                    className="hidden sm:inline-flex w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 sm:px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all items-center justify-center gap-3 group"
                 >
                    <Monitor size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                    Explore Dashboard
                 </button>
              </div>

              {/* Secondary Actions */}
              <div className={`flex flex-col sm:flex-row items-center justify-center gap-8 transition-all duration-1000 delay-500 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <button 
                    onClick={() => setShowTestDrive(true)}
                    className="flex items-center gap-2 text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors group"
                  >
                      <Beaker size={14} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                      Try Sample Assessments
                  </button>
                  
                  {/* Report Button (Triggers Modal) */}
                  <button 
                    onClick={() => setShowReportModal(true)}
                    className="flex items-center gap-2 text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors group"
                  >
                      <FileText size={14} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                      View Sample Player Reports
                  </button>
              </div>
          </section>

          {/* SOCIAL PROOF / TRUSTED TEAMS TICKER */}
          <div className="w-full mb-16 sm:mb-20">
              <TrustedTeams />
          </div>

          {/* FEATURED PARTNERS */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-20 sm:mb-24">
              <Reveal>
                  <div className="text-center mb-8 sm:mb-10">
                      <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10">
                          <Trophy size={12} className="text-yellow-400" />
                          <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-[0.25em]">Featured Partners</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
                          Powering elite youth events.
                      </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {/* Alliance Future Stars Series */}
                      <a
                          href="https://www.futurestarsseries.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative bg-gradient-to-br from-yellow-500/10 via-[#0f0f0f] to-black border border-yellow-500/30 hover:border-yellow-400/70 rounded-3xl p-6 sm:p-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(234,179,8,0.18)] overflow-hidden"
                      >
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.18),transparent_60%)] pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute -top-10 -right-10 opacity-[0.04] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
                              <Trophy size={180} />
                          </div>

                          <div className="relative z-10 flex flex-col items-center text-center min-h-[200px] sm:min-h-[240px] justify-center">
                              {/* Logo with text fallback */}
                              <div className="h-20 sm:h-24 flex items-center justify-center mb-5 sm:mb-6 w-full">
                                  <img
                                      src="/TeamLogos/AllianceFutureStarsSeries.png"
                                      alt="Alliance Future Stars Series"
                                      className="max-h-full max-w-[80%] object-contain drop-shadow-[0_0_30px_rgba(234,179,8,0.35)]"
                                      onError={(e) => {
                                          const img = e.currentTarget;
                                          const fallback = img.nextElementSibling as HTMLElement | null;
                                          img.style.display = 'none';
                                          if (fallback) fallback.style.display = 'flex';
                                      }}
                                  />
                                  <div className="hidden flex-col items-center justify-center w-full" style={{ display: 'none' }}>
                                      <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] text-yellow-300/80 mb-2">Alliance</div>
                                      <div className="text-2xl sm:text-3xl md:text-4xl font-black italic text-white tracking-tighter uppercase leading-none">
                                          Future Stars
                                      </div>
                                      <div className="text-xl sm:text-2xl md:text-3xl font-black italic text-yellow-400 tracking-tighter uppercase leading-none mt-1">
                                          Series
                                      </div>
                                  </div>
                              </div>

                              <p className="text-[10px] sm:text-xs font-bold text-yellow-400/80 uppercase tracking-[0.25em] mb-3">Premier Youth Baseball Showcase</p>
                              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xs">
                                  Every athlete invited to the Alliance Future Stars Series receives a full NTerpret Mental Scouting Report.
                              </p>

                              <div className="mt-6 inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold text-yellow-400/80 group-hover:text-yellow-300 uppercase tracking-widest transition-colors">
                                  Visit Site <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                              </div>
                          </div>
                      </a>

                      {/* Governor's Challenge */}
                      <a
                          href="https://www.governorschallenge.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative bg-gradient-to-br from-blue-500/10 via-[#0f0f0f] to-black border border-blue-500/30 hover:border-blue-400/70 rounded-3xl p-6 sm:p-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(59,130,246,0.18)] overflow-hidden"
                      >
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_60%)] pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute -top-10 -left-10 opacity-[0.04] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
                              <Gavel size={180} />
                          </div>

                          <div className="relative z-10 flex flex-col items-center text-center min-h-[200px] sm:min-h-[240px] justify-center">
                              <div className="h-20 sm:h-24 flex items-center justify-center mb-5 sm:mb-6 w-full">
                                  <img
                                      src="/TeamLogos/GovernorsChallenge.png"
                                      alt="Governor's Challenge"
                                      className="max-h-full max-w-[80%] object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                                      onError={(e) => {
                                          const img = e.currentTarget;
                                          const fallback = img.nextElementSibling as HTMLElement | null;
                                          img.style.display = 'none';
                                          if (fallback) fallback.style.display = 'flex';
                                      }}
                                  />
                                  <div className="hidden flex-col items-center justify-center w-full" style={{ display: 'none' }}>
                                      <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] text-blue-300/80 mb-2">The</div>
                                      <div className="text-2xl sm:text-3xl md:text-4xl font-black italic text-white tracking-tighter uppercase leading-none">
                                          Governor's
                                      </div>
                                      <div className="text-xl sm:text-2xl md:text-3xl font-black italic text-blue-400 tracking-tighter uppercase leading-none mt-1">
                                          Challenge
                                      </div>
                                  </div>
                              </div>

                              <p className="text-[10px] sm:text-xs font-bold text-blue-400/80 uppercase tracking-[0.25em] mb-3">National Youth Basketball Event</p>
                              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xs">
                                  Hundreds of athletes at the Governor's Challenge use NTangible to scout their mental game.
                              </p>

                              <div className="mt-6 inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold text-blue-400/80 group-hover:text-blue-300 uppercase tracking-widest transition-colors">
                                  Visit Site <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                              </div>
                          </div>
                      </a>
                  </div>

              </Reveal>
          </section>

          {/* PAIN SCENES */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
              <Reveal>
                  <div className="text-center mb-10 sm:mb-12">
                      <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-900/10">
                          <AlertTriangle size={12} className="text-red-400" />
                          <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Sound Familiar?</span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-4">
                          The moments <span className="text-red-400">no coach forgets.</span>
                      </h2>
                      <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                          These are the moments NTangible was built for - the ones your dashboard can't see and your spreadsheet can't fix.
                      </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                      <div className="bg-[#0f1115] border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-blue-500/40 transition-all">
                          <div className="w-10 h-10 bg-red-900/20 rounded-lg flex items-center justify-center text-red-400 mb-4">
                              <FileText size={20} />
                          </div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">8:14 AM Monday</p>
                          <h3 className="text-lg font-bold text-white mb-2 leading-snug">"Why didn't my daughter make the A team?"</h3>
                          <p className="text-sm text-gray-400 leading-relaxed">
                              You ran a 90-minute tryout. The parent expects a 30-minute answer. Without data, you sound like you guessed.
                          </p>
                      </div>
                      <div className="bg-[#0f1115] border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-blue-500/40 transition-all">
                          <div className="w-10 h-10 bg-red-900/20 rounded-lg flex items-center justify-center text-red-400 mb-4">
                              <Users size={20} />
                          </div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Mid-Season Text</p>
                          <h3 className="text-lg font-bold text-white mb-2 leading-snug">"I don't think coaching is for me."</h3>
                          <p className="text-sm text-gray-400 leading-relaxed">
                              A volunteer coach quits because they can't reach two kids on the roster. You're three games from a forfeit.
                          </p>
                      </div>
                      <div className="bg-[#0f1115] border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-blue-500/40 transition-all">
                          <div className="w-10 h-10 bg-red-900/20 rounded-lg flex items-center justify-center text-red-400 mb-4">
                              <TrendingDown size={20} />
                          </div>
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Board Meeting Slide</p>
                          <h3 className="text-lg font-bold text-white mb-2 leading-snug">"Why is our U15 retention down 22%?"</h3>
                          <p className="text-sm text-gray-400 leading-relaxed">
                              The kids who quit didn't fill out an exit survey. They just stopped showing up. The board wants a plan, not a guess.
                          </p>
                      </div>
                  </div>
              </Reveal>
          </section>

          {/* PARENT-FACING DIFFERENTIATION */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
              <Reveal>
                  <div className="bg-gradient-to-br from-blue-900/20 via-[#0a0f1c] to-black border border-blue-500/30 rounded-3xl p-6 sm:p-10 md:p-14 relative overflow-hidden">
                      <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
                          <Trophy size={260} />
                      </div>
                      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                          <div className="lg:col-span-3">
                              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-blue-500/40 bg-blue-500/10">
                                  <Zap size={12} className="text-blue-300" />
                                  <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">The Parent Conversation</span>
                              </div>
                              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-4 leading-[0.95]">
                                  Be the club <br className="hidden sm:block"/><span className="text-blue-400">parents brag about.</span>
                              </h2>
                              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                                  Every parent in your area is comparing clubs. Schedules, fees, win-loss records - it all blurs together.
                              </p>
                              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                                  What separates you is what you can <em>tell that parent at the tryout table</em>:
                              </p>
                              <div className="bg-black/50 border border-blue-500/30 rounded-2xl p-5 sm:p-6 mb-6">
                                  <p className="text-white text-base sm:text-lg leading-relaxed italic">
                                      "Every player on our roster gets a personalized cognitive profile so our coaches know exactly how to develop them. No other club in your area does this."
                                  </p>
                              </div>
                              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                                  That's the line that gets shared in the carpool group chat. That's why families don't leave.
                              </p>
                          </div>

                          <div className="lg:col-span-2 space-y-3">
                              <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                                      <Check size={16} />
                                  </div>
                                  <div>
                                      <p className="text-white text-sm font-bold mb-1">Concrete proof of player development</p>
                                      <p className="text-gray-500 text-xs leading-relaxed">Parents get clear language for how their kid is growing - not just stats.</p>
                                  </div>
                              </div>
                              <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                                      <Check size={16} />
                                  </div>
                                  <div>
                                      <p className="text-white text-sm font-bold mb-1">A reason to choose you over the rival club</p>
                                      <p className="text-gray-500 text-xs leading-relaxed">A tangible differentiator at tryouts, open houses, and registration.</p>
                                  </div>
                              </div>
                              <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                                      <Check size={16} />
                                  </div>
                                  <div>
                                      <p className="text-white text-sm font-bold mb-1">Defensible tryout decisions</p>
                                      <p className="text-gray-500 text-xs leading-relaxed">When parents ask "why this team?", you have an answer backed by data.</p>
                                  </div>
                              </div>
                              <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
                                      <Check size={16} />
                                  </div>
                                  <div>
                                      <p className="text-white text-sm font-bold mb-1">Word-of-mouth that does the marketing for you</p>
                                      <p className="text-gray-500 text-xs leading-relaxed">The kind of differentiation parents tell other parents about.</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </Reveal>
          </section>

          {/* HOW IT WORKS IN 30 DAYS */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
              <Reveal>
                  <div className="text-center mb-10 sm:mb-14">
                      <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/10">
                          <Calendar size={12} className="text-blue-400" />
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">How It Works</span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-4">
                          Live in your club <span className="text-blue-400">in 30 days.</span>
                      </h2>
                      <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                          No IT project. No clipboards. Three simple weeks from kickoff to full coach dashboards.
                      </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                      <div className="bg-[#0f1115] border border-white/10 rounded-2xl p-6 sm:p-7 relative overflow-hidden">
                          <div className="absolute top-4 right-4 text-5xl font-black text-white/5 select-none">01</div>
                          <div className="w-10 h-10 bg-blue-500/15 rounded-lg flex items-center justify-center text-blue-400 mb-4">
                              <Calendar size={20} />
                          </div>
                          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Week 1</p>
                          <h3 className="text-lg font-bold text-white mb-2 leading-snug">Kickoff & player invites</h3>
                          <p className="text-sm text-gray-400 leading-relaxed">
                              We meet with your director and head coaches, set up your NControl workspace, and send personalized assessment invites to every athlete - by phone or email.
                          </p>
                      </div>
                      <div className="bg-[#0f1115] border border-white/10 rounded-2xl p-6 sm:p-7 relative overflow-hidden">
                          <div className="absolute top-4 right-4 text-5xl font-black text-white/5 select-none">02</div>
                          <div className="w-10 h-10 bg-blue-500/15 rounded-lg flex items-center justify-center text-blue-400 mb-4">
                              <Brain size={20} />
                          </div>
                          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Week 2</p>
                          <h3 className="text-lg font-bold text-white mb-2 leading-snug">Athletes complete assessments</h3>
                          <p className="text-sm text-gray-400 leading-relaxed">
                              Each player takes the NTerpret Mental Scouting Report and Clutch Assessment from any phone or laptop. Roughly 20-30 minutes total - kids do it at home, on their own time.
                          </p>
                      </div>
                      <div className="bg-[#0f1115] border border-white/10 rounded-2xl p-6 sm:p-7 relative overflow-hidden">
                          <div className="absolute top-4 right-4 text-5xl font-black text-white/5 select-none">03</div>
                          <div className="w-10 h-10 bg-blue-500/15 rounded-lg flex items-center justify-center text-blue-400 mb-4">
                              <Monitor size={20} />
                          </div>
                          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Weeks 3-4</p>
                          <h3 className="text-lg font-bold text-white mb-2 leading-snug">Coach training + live dashboard</h3>
                          <p className="text-sm text-gray-400 leading-relaxed">
                              We train your coaching staff on how to read each profile, run a 1:1 with our team, and your NControl dashboard goes live with every player ready to coach.
                          </p>
                      </div>
                  </div>
              </Reveal>
          </section>

          {/* FOR FAMILIES */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
              <Reveal>
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden">
                      <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
                          <Users size={240} />
                      </div>
                      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                          <div>
                              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10">
                                  <UserPlus size={12} className="text-purple-400" />
                                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">For Families</span>
                              </div>
                              <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter text-white mb-4 leading-[0.95]">
                                  Built with parents <span className="text-purple-400">in mind.</span>
                              </h2>
                              <p className="text-gray-400 text-base leading-relaxed mb-4">
                                  Youth sports is a family decision. We designed the assessment experience so parents feel informed, not surveilled.
                              </p>
                              <p className="text-gray-400 text-sm leading-relaxed">
                                  Coaches see actionable insight on how each athlete learns and competes - never psychological labels, never anything that follows the kid outside your program.
                              </p>
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                              <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                                  <div className="w-9 h-9 bg-purple-500/15 rounded-lg flex items-center justify-center text-purple-400 shrink-0">
                                      <Lock size={16} />
                                  </div>
                                  <div>
                                      <p className="text-white text-sm font-bold mb-1">COPPA-aligned & age-appropriate</p>
                                      <p className="text-gray-500 text-xs leading-relaxed">Designed for athletes 13-18. Parental consent built into onboarding for every player.</p>
                                  </div>
                              </div>
                              <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                                  <div className="w-9 h-9 bg-purple-500/15 rounded-lg flex items-center justify-center text-purple-400 shrink-0">
                                      <ShieldAlert size={16} />
                                  </div>
                                  <div>
                                      <p className="text-white text-sm font-bold mb-1">Encrypted data, club-controlled</p>
                                      <p className="text-gray-500 text-xs leading-relaxed">Reports live inside your private NControl workspace. Never sold, never shared with third parties.</p>
                                  </div>
                              </div>
                              <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                                  <div className="w-9 h-9 bg-purple-500/15 rounded-lg flex items-center justify-center text-purple-400 shrink-0">
                                      <RefreshCw size={16} />
                                  </div>
                                  <div>
                                      <p className="text-white text-sm font-bold mb-1">Opt-out anytime, full data deletion</p>
                                      <p className="text-gray-500 text-xs leading-relaxed">Families can remove their athlete's profile at any time and we delete everything we have on them.</p>
                                  </div>
                              </div>
                              <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                                  <div className="w-9 h-9 bg-purple-500/15 rounded-lg flex items-center justify-center text-purple-400 shrink-0">
                                      <CheckCircle size={16} />
                                  </div>
                                  <div>
                                      <p className="text-white text-sm font-bold mb-1">Growth language, never diagnosis</p>
                                      <p className="text-gray-500 text-xs leading-relaxed">We measure how athletes learn, compete, and respond to pressure - not personality traits or clinical labels.</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </Reveal>
          </section>

          {/* PRODUCT TOUR VIDEO */}
          <section ref={videoSectionRef} className="max-w-5xl mx-auto px-4 sm:px-6 mb-24">
              <Reveal>
                <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/10">
                        <Play size={10} className="text-blue-400 fill-current" />
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">2-Minute Tour</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter text-white">See what your coaches will see.</h2>
                </div>

                <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/spKsM_5c0iM?autoplay=0&controls=1&rel=0&modestbranding=1"
                        title="NControl Product Tour"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    ></iframe>
                </div>
              </Reveal>
          </section>

          {/* PRICING + REVENUE CALCULATOR */}
          <PricingCalculator />

          {/* FINAL CTA */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <Reveal>
                <div className="p-12 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-md">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic text-white mb-4 sm:mb-6 tracking-tight leading-[1.05]">
                        Give every player <br className="hidden sm:block"/><span className="text-blue-500">an unfair advantage.</span>
                    </h2>
                    <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                        See exactly what your coaches will see. We'll walk through a sample player profile from your sport and show you how NTangible would fit into your next season - in 15 minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
                        <button
                            onClick={() => setShowBooking(true)}
                            className="bg-white hover:bg-gray-200 text-black px-8 sm:px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            <Calendar size={16} /> Book A 15-Min Call
                        </button>
                        <button
                            onClick={() => setShowReportModal(true)}
                            className="bg-transparent border border-white/20 hover:bg-white/10 text-white px-8 sm:px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                        >
                            <FileText size={16} /> See A Sample Report
                        </button>
                    </div>
                </div>
              </Reveal>
          </section>

      </div>

      {/* Footer Strip */}
      <footer className="relative z-10 w-full p-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest font-bold border-t border-white/5 bg-black/80 backdrop-blur-md">
          <div className="flex gap-6 mb-4 md:mb-0">
              <span>Secure Connection</span>
              <span>Encrypted Data</span>
              <span>COPPA Compliant</span>
          </div>
          <div>
              <span>© 2026 NTangible Inc.</span>
          </div>
      </footer>
      
      {/* Interactive Modals */}
      {showTestDrive && <TestDriveModal onClose={() => setShowTestDrive(false)} />}
      
      {showReportModal && (
        <SampleReportModal 
            onClose={() => setShowReportModal(false)}
            onViewClutch={() => {
                setShowReportModal(false);
                setShowClutchReport(true);
            }}
            onViewNterpret={() => {
                setShowReportModal(false);
                setShowNterpretReport(true);
            }}
        />
      )}

      {showClutchReport && (
        <ClutchAssessment onBack={() => setShowClutchReport(false)} />
      )}

      {showNterpretReport && (
        <NTerpretAssessment onBack={() => setShowNterpretReport(false)} />
      )}

      {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}

    </div>
  );
};

const DumbbellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6.5 6.5 11 11"/>
        <path d="m21 21-1-1"/>
        <path d="m3 3 1 1"/>
        <path d="m18 22 4-4"/>
        <path d="m2 6 4-4"/>
        <path d="m3 10 7-7"/>
        <path d="m14 21 7-7"/>
    </svg>
);

export default LandingPage;
