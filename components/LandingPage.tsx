
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
                <h2 className="text-xl font-bold text-white">Schedule Strategy Audit</h2>
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
                        View a comprehensive sample report analyzing performance under pressure.
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
                        Explore the behavioral and cognitive profile sample report.
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
                            <p className="text-blue-400 font-mono uppercase tracking-widest text-xs sm:text-sm">Transfer Portal QB • 5-Star</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-black/40 p-4 rounded border border-white/5">
                            <div className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider mb-1">Passing Yards</div>
                            <div className="text-xl sm:text-2xl font-bold text-white">3,200</div>
                        </div>
                        <div className="bg-black/40 p-4 rounded border border-white/5">
                            <div className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider mb-1">Touchdowns</div>
                            <div className="text-xl sm:text-2xl font-bold text-white">28</div>
                        </div>
                    </div>
                    <p className="text-gray-400 italic text-sm sm:text-lg leading-relaxed text-center sm:text-left">"Your Collective has raised the capital. The talent is undeniable. But is he a cultural fit?"</p>
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
                        <h4 className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-2">$750,000</h4>
                        <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-[0.2em] font-bold">Annual NIL Package</p>
                    </div>
                    <div className="text-left bg-red-900/10 border border-red-900/30 p-4 sm:p-6 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle size={14} className="text-red-500" />
                            <span className="text-[10px] sm:text-xs font-bold text-red-400 uppercase tracking-widest">Capital Risk: Extreme</span>
                        </div>
                        <p className="text-red-200 text-xs sm:text-sm">"This is 40% of your remaining NIL budget. A miss here prevents you from signing 3 defensive starters."</p>
                    </div>
                </div>
            )
        },
        {
            title: "Due Diligence",
            content: (
                <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="text-[10px] sm:text-sm text-gray-400 uppercase tracking-widest font-bold">Psychometric Audit</span>
                        <span className="text-[10px] sm:text-sm text-gray-400 uppercase tracking-widest font-bold">Score</span>
                    </div>
                    
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm sm:text-lg font-bold text-white">Clutch Factor</span>
                                <span className="text-sm sm:text-lg font-mono font-bold text-red-500">382 (Low)</span>
                            </div>
                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full w-[38%] bg-red-600"></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm sm:text-lg font-bold text-white">Alignment Score</span>
                                <span className="text-sm sm:text-lg font-mono font-bold text-red-500">24% (Poor)</span>
                            </div>
                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full w-[24%] bg-red-600"></div>
                            </div>
                        </div>
                        
                        <div className="p-4 bg-yellow-900/10 border border-yellow-500/30 rounded-xl text-yellow-200">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle size={14} className="text-yellow-500" />
                                <span className="font-bold text-[10px] sm:text-xs uppercase tracking-wider">Risk Alert</span>
                            </div>
                            <p className="text-xs sm:text-sm">"High conflict potential with staff. Low resilience under pressure. Data suggests 'Front-Runner' mentality."</p>
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
                        <h4 className="text-4xl sm:text-5xl font-black text-red-500 tracking-tighter mb-4 uppercase">PASS</h4>
                        <p className="text-base sm:text-xl text-gray-300">Investment Rejected.</p>
                    </div>
                    <div className="bg-green-900/10 border border-green-500/30 p-4 sm:p-6 rounded-xl">
                        <div className="text-[10px] sm:text-xs text-green-400 uppercase tracking-widest mb-2 font-bold">Capital Protection</div>
                        <div className="text-2xl sm:text-4xl font-bold text-white mb-2">$750,000 SAVED</div>
                        <p className="text-xs sm:text-sm text-green-400/80">
                            Reallocated funds to sign 3 high-alignment starters (Clutch &gt; 800). Locker room culture preserved.
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
                            <span className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest">NIL Intelligence</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-[0.9] animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">
                            The $750k <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">Decision.</span>
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
                           Your Collective has raised the money. Now you have to make the <strong>right</strong> decision. See how NControl helps you validate the "Intangibles" before you wire the funds.
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
                            <span className="text-xs font-bold text-red-400 uppercase tracking-widest">The Data Gap</span>
                        </div>
                        
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black italic text-white tracking-tighter uppercase leading-[0.9] animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">
                            Your Scouting Report is <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">50% Empty.</span>
                        </h2>
                        
                        <p className="text-sm md:text-lg text-gray-400 font-light leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
                            You spend millions on scholarships based on physical metrics (Speed, Strength, Skill). <br/>
                            But you lose games on mental metrics (Resilience, Adaptability, Culture Fit).
                            <br/><br/>
                            <span className="text-white font-bold">Why are you betting your job on the half of the report you can't see?</span>
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
                                            <span className="text-white font-bold text-sm sm:text-base">Physicals</span>
                                        </div>
                                        <span className="text-green-500 font-mono text-[10px] md:text-xs bg-green-900/20 px-2 py-1 rounded">MEASURED</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-900/30 rounded text-green-500"><Video size={16} /></div>
                                            <span className="text-white font-bold text-sm sm:text-base">Game Film</span>
                                        </div>
                                        <span className="text-green-500 font-mono text-[10px] md:text-xs bg-green-900/20 px-2 py-1 rounded">MEASURED</span>
                                    </div>
                                    
                                    <div className="h-px bg-white/10 my-4"></div>

                                    <div className="flex items-center justify-between opacity-50">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-red-900/30 rounded text-red-500"><Brain size={16} /></div>
                                            <span className="text-white font-bold text-sm sm:text-base">Resilience</span>
                                        </div>
                                        <span className="text-red-500 font-mono text-[10px] md:text-xs bg-red-900/20 px-2 py-1 rounded">UNKNOWN</span>
                                    </div>
                                    <div className="flex items-center justify-between opacity-50">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-red-900/30 rounded text-red-500"><Users size={16} /></div>
                                            <span className="text-white font-bold text-sm sm:text-base">Culture Fit</span>
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
                            <Swords size={16} className="text-blue-500" />
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Asymmetric Warfare</span>
                        </div>
                        <h2 className="text-3xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-none">
                            Information <br/><span className="text-blue-500">Superiority.</span>
                        </h2>
                        <p className="text-sm md:text-lg text-gray-400 max-w-3xl mx-auto mt-6 leading-relaxed">
                            Your competitors are still recruiting based on "vibes" and "gut feeling." 
                            <br/>You are recruiting based on <strong>psychometric probability.</strong>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center opacity-50 blur-[2px] hover:blur-0 hover:opacity-100 transition-all duration-500">
                            <h3 className="text-gray-500 font-bold uppercase tracking-widest mb-4">The Standard</h3>
                            <p className="text-xl md:text-2xl font-light text-gray-300">"He seems like a good kid."</p>
                            <div className="w-full h-px bg-white/10 my-6"></div>
                            <p className="text-red-400 font-mono text-sm uppercase">Subjective • Biased • High Risk</p>
                        </div>

                        <div className="bg-blue-900/20 border-2 border-blue-500 p-8 rounded-2xl flex flex-col items-center text-center shadow-[0_0_50px_rgba(37,99,235,0.2)] transform md:scale-105">
                            <h3 className="text-blue-400 font-bold uppercase tracking-widest mb-4">The NControl Edge</h3>
                            <p className="text-xl md:text-2xl font-bold text-white">"Clutch Factor: 894 (Top 1%)."</p>
                            <div className="w-full h-px bg-blue-500/30 my-6"></div>
                            <p className="text-green-400 font-mono text-sm uppercase">Objective • Predictive • Validated</p>
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
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">The Cost of Attrition</h3>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Scholarship + Resources (1 Year)</p>
                                        <p className="text-3xl md:text-4xl font-mono font-bold text-white">$65,000</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Recruiting Cost Replacement</p>
                                        <p className="text-3xl md:text-4xl font-mono font-bold text-white">$12,500</p>
                                    </div>
                                    <div className="pt-6 border-t border-white/10">
                                        <p className="text-red-400 text-xs uppercase tracking-widest mb-1 font-bold">Total Sunk Cost Per Transfer</p>
                                        <p className="text-5xl md:text-6xl font-mono font-black text-red-500">$77,500</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 space-y-8">
                        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-full animate-in slide-in-from-right-4 fade-in duration-700">
                            <TrendingDown size={16} className="text-red-500" />
                            <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Budget Killer</span>
                        </div>
                        
                        <h2 className="text-3xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-[0.9] animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">
                            The Transfer Portal <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">Tax.</span>
                        </h2>
                        
                        <p className="text-sm md:text-lg text-gray-400 font-light leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
                            Roster retention is the new recruiting. Every time a player transfers out because they "didn't fit the culture," your department burns nearly <span className="text-white font-bold">$80k</span> in sunk costs.
                            <br/><br/>
                            NControl identifies "Flight Risks" before they sign the LOI. Stop recruiting rentals. Start recruiting residents.
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
                            Why NControl <br/><span className="text-blue-500">Stands Alone.</span>
                        </h2>
                        <p className="text-sm md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            We are not a generic personality test. We are not a replacement for your staff.<br/> 
                            We are the <strong>intelligence layer</strong> they are missing.
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
                            <h3 className="text-lg md:text-xl font-bold text-gray-300 mb-2 uppercase tracking-wide">Cognitive Tests</h3>
                            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-4">DISC • Wonderlic • RYZER • S2</p>
                            <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-grow">
                                Static snapshots. They measure raw aptitude or personality preference, but lack the daily context of your specific locker room culture.
                            </p>
                            <div className="p-3 bg-red-900/10 border border-red-900/30 rounded text-red-400 text-xs font-bold uppercase tracking-wide flex items-center gap-2 mt-auto">
                                <X size={14} /> Zero Cultural Context
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
                            <h3 className="text-lg md:text-xl font-bold text-gray-300 mb-2 uppercase tracking-wide">Management Ops</h3>
                            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-4">Teamworks • TeamGenius • Kitman</p>
                            <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-grow">
                                Incredible for logistics, scheduling, and physical injury tracking. But they are blind to the mental attributes that determine game-day performance.
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
                            <p className="text-[10px] text-blue-300 font-mono uppercase tracking-widest mb-4">Predictive • Scalable • Specific</p>
                            <p className="text-sm text-gray-300 leading-relaxed mb-6 flex-grow">
                                Continuous, passive monitoring of mental readiness. We identify the "At-Risk" athletes <em>before</em> they spiral.
                            </p>
                            <div className="p-3 bg-blue-900/30 border border-blue-500/50 rounded text-blue-200 text-xs font-bold uppercase tracking-wide flex items-center gap-2 mt-auto">
                                <Check size={14} /> Total Visibility
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
                            The Smoke Detector for <br/>
                            <span className="text-purple-500">Your Sports Psych.</span>
                        </h2>
                        <p className="text-sm md:text-lg text-gray-300 leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
                            Your Sports Psychologist is an elite surgeon, but they are outnumbered 500:1. They can't be in every locker room at once.
                            <br/><br/>
                            NControl acts as the <strong>always-on monitoring system</strong>. We flag the "at-risk" athletes before they spiral, sending your staff to put out the fire exactly where it's burning.
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
                                Alert: Roster Alignment Drop
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
                            <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">Territorial Rights</span>
                        </div>
                        <h2 className="text-3xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-none mb-4">
                            Deny Your <br/><span className="text-yellow-500">Rivals.</span>
                        </h2>
                        <p className="text-sm md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            This data is a weapon. You don't want it used against you.
                            <br/>
                            <span className="text-white font-bold">We offer Conference Exclusivity contracts.</span>
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-6 animate-in slide-in-from-bottom-8 fade-in delay-200">
                        <div className="bg-[#111] p-6 rounded-2xl border border-white/10 max-w-sm mx-auto w-full">
                            <div className="bg-red-500/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                                <X size={20} className="text-red-500 w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Open Market</h3>
                            <p className="text-gray-500 text-sm">
                                Standard license. Your rivals can access the same insights and recruit the same "high-fit" athletes.
                            </p>
                        </div>
                        <div className="bg-gradient-to-b from-yellow-900/20 to-black p-6 rounded-2xl border border-yellow-500/50 max-w-sm shadow-[0_0_40px_rgba(234,179,8,0.2)] mx-auto w-full">
                            <div className="bg-yellow-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Lock size={20} className="text-black w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Conference Lock</h3>
                            <p className="text-yellow-200/70 text-sm">
                                We block sales to any other team in your conference for your sport. You own the intelligence advantage.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 animate-in slide-in-from-bottom-8 fade-in delay-300">
                        <button 
                            onClick={onBook}
                            className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-1 flex items-center gap-2 mx-auto"
                        >
                            <Lock size={14} /> Check Conference Availability
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
                        <h2 className="text-3xl md:text-5xl font-black italic text-white mb-4 tracking-tighter uppercase">Engagement Models</h2>
                        <p className="text-gray-400 text-sm md:text-base">Scalable solutions. No seat licenses. Consistent enterprise-grade reporting for every tier.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Single Team */}
                        <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-2xl flex flex-col hover:border-white/30 transition-all duration-300 animate-in slide-in-from-bottom-8 fade-in delay-100 group text-left h-full">
                            <div className="mb-6">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest border border-gray-700 px-3 py-1 rounded-full group-hover:bg-white group-hover:text-black transition-colors">Pilot</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Single Team</h3>
                            <p className="text-gray-500 text-sm mb-6 h-10">Proof of concept for a Head Coach looking to audit culture.</p>
                            
                            <ul className="space-y-3 mb-6 flex-grow border-t border-white/5 pt-6">
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-white" /> Full Roster Assessment</li>
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-white" /> <span className="font-bold text-white">Unlimited</span> Recruiting</li>
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-white" /> Comprehensive Reports</li>
                            </ul>
                        </div>

                        {/* Preferred Teams */}
                        <div className="bg-gradient-to-b from-[#1a1a1a] to-black border border-blue-500 p-6 rounded-2xl flex flex-col relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(37,99,235,0.15)] animate-in slide-in-from-bottom-8 fade-in delay-200 text-left h-full">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</div>
                            <div className="mb-6">
                                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest border border-blue-500/30 px-3 py-1 rounded-full">4-Team Bundle</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Preferred Teams</h3>
                            <p className="text-gray-400 text-sm mb-6 h-10">Select any 4 varsity programs to pilot the system.</p>
                            <ul className="space-y-3 mb-6 flex-grow border-t border-white/10 pt-6">
                                <li className="flex items-center gap-3 text-sm text-white"><Check size={16} className="text-blue-400" /> <span className="font-bold">Full Access</span> for 4 Teams</li>
                                <li className="flex items-center gap-3 text-sm text-white"><Check size={16} className="text-blue-400" /> <span className="font-bold">Unlimited</span> Recruiting</li>
                                <li className="flex items-center gap-3 text-sm text-white"><Check size={16} className="text-blue-400" /> Comprehensive Reports</li>
                                <li className="flex items-center gap-3 text-sm text-white"><Check size={16} className="text-blue-400" /> Priority Support</li>
                            </ul>
                        </div>

                        {/* Full Varsity Package */}
                        <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-2xl flex flex-col hover:border-purple-500/50 transition-all duration-300 animate-in slide-in-from-bottom-8 fade-in delay-300 group text-left h-full">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">Best Value</div>
                            <div className="mb-6">
                                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest border border-purple-500/30 px-3 py-1 rounded-full group-hover:bg-purple-500 group-hover:text-white transition-colors">Department</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Full Varsity Package</h3>
                            <p className="text-gray-500 text-sm mb-6 h-10">Every major sport we cover. Locked-in pricing as we expand to 20+ sports.</p>
                            <ul className="space-y-3 mb-6 flex-grow border-t border-white/5 pt-6">
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-purple-500" /> <span className="font-bold">Unlimited</span> Teams (All Sports)</li>
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-purple-500" /> <span className="font-bold">Unlimited</span> Recruiting</li>
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-purple-500" /> AD Master Dashboard</li>
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check size={16} className="text-purple-500" /> Future Sport Access (2026)</li>
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
                            CLAIM YOUR <br/> <span className="text-blue-500">EDGE.</span>
                        </h2>
                    </div>
                    <p className="text-base md:text-xl text-gray-300 mb-12 max-w-2xl font-light mx-auto animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100">
                        The difference between a good season and a championship isn't physical. It's mental. <br/>
                        <span className="text-white font-bold">Stop guessing. Start measuring.</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
                        <button 
                            onClick={onBook}
                            className="bg-white hover:bg-gray-200 text-black px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 flex items-center gap-3 justify-center"
                        >
                            Schedule Strategy Audit <ArrowRight size={16} />
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
  const [showPresentation, setShowPresentation] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  
  // Video Toggle State
  const [activeVideo, setActiveVideo] = useState<'platform' | 'recruiting'>('platform');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleEnter = (view?: ViewType) => {
    const finalName = 'NTANGIBLE';
    onEnter(finalName, view);
  };

  return (
    <div className={`min-h-screen bg-[#050505] text-white relative font-sans selection:bg-blue-500 selection:text-white flex flex-col scroll-smooth ${showPresentation || showClutchReport || showNterpretReport ? 'h-screen overflow-hidden' : 'overflow-y-auto overflow-x-hidden'}`}>
      
      {/* Presentation Mode Overlay */}
      {showPresentation && (
          <PresentationMode onClose={() => setShowPresentation(false)} onBook={() => { setShowPresentation(false); setShowBooking(true); }} />
      )}

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
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">Moneyball for Mental Performance</span>
                  </div>
              </div>

              <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-black italic tracking-tighter mb-8 leading-[0.9] transition-all duration-1000 delay-100 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  QUANTIFY THE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-white to-blue-200 animate-gradient">INTANGIBLES</span>
              </h1>

              <p className={`text-base sm:text-lg md:text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light transition-all duration-1000 delay-200 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  Stop guessing on character. Start measuring it. <br className="hidden md:block" />
                  NControl gives Athletic Directors at every level — NCAA, JUCO, NAIA, Prep Academies — a unified dashboard to audit the mental readiness of their rosters.
              </p>

              {/* Main Action Buttons */}
              <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 transition-all duration-1000 delay-300 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                 <button 
                    onClick={() => handleEnter()}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] transform hover:-translate-y-1 flex flex-col items-center justify-center group"
                 >
                    <div className="flex items-center gap-3 font-black text-sm uppercase tracking-widest">
                        <Monitor size={18} className="text-blue-200 group-hover:text-white transition-colors" />
                        Launch Interactive Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <span className="text-[9px] font-medium text-blue-100 normal-case tracking-normal opacity-80 mt-0.5">(Best experienced on desktop)</span>
                 </button>
                 
                 <button 
                    onClick={scrollToVideo}
                    className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                 >
                    <Play size={18} /> Watch Demo
                 </button>

                 <button 
                    onClick={() => setShowPresentation(true)}
                    className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                 >
                    <Maximize2 size={18} /> Interactive Briefing
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
          <div className="w-full mb-20">
              <TrustedTeams />
          </div>

          {/* COMPETITIVE ADVANTAGE / TESTIMONIAL SECTION */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
              <Reveal>
                  <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                          <Swords size={200} />
                      </div>
                      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                          <div className="order-2 lg:order-1">
                              <div className="inline-flex items-center gap-2 text-yellow-500 border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                                  <Gavel size={14} />
                                  <span>The AD's Perspective</span>
                              </div>
                              <h2 className="text-4xl md:text-5xl font-black italic text-white mb-6 tracking-tighter uppercase leading-none">
                                  Don't just compete. <br/>
                                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-200">Dominate.</span>
                              </h2>
                              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                  Athletic Directors like <span className="text-white font-bold">Jeff Curtis (Northwood University)</span> use NControl to eliminate the guesswork. While rivals gamble on "potential", you recruit on validated psychometric probability.
                              </p>
                              
                              <div className="space-y-4">
                                  <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5">
                                      <div className="w-10 h-10 bg-red-900/20 text-red-500 rounded-full flex items-center justify-center shrink-0">
                                          <X size={20} />
                                      </div>
                                      <div>
                                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">The Old Way</p>
                                          <p className="text-white font-medium">"Recruiting based on vibes and highlight reels."</p>
                                      </div>
                                  </div>
                                  <div className="flex items-center gap-4 bg-blue-900/10 p-4 rounded-xl border border-blue-500/30">
                                      <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/50">
                                          <Check size={20} />
                                      </div>
                                      <div>
                                          <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">The NControl Edge</p>
                                          <p className="text-white font-bold">"Data-driven roster construction that wins."</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="order-1 lg:order-2 flex justify-center">
                              <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-2xl bg-black border border-white/10 overflow-hidden shadow-2xl group z-20">
                                  <iframe 
                                      width="100%" 
                                      height="100%" 
                                      src="https://www.youtube.com/embed/xVD3_NtfdHQ?rel=0&modestbranding=1&controls=1&playsinline=1&loop=1&playlist=xVD3_NtfdHQ" 
                                      title="Northwood University Testimonial" 
                                      style={{ border: 0 }}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                      allowFullScreen
                                      className="absolute inset-0 w-full h-full"
                                  ></iframe>
                                  
                                  {/* Optional overlay for styling (border glow), ensuring pointer events don't block controls */}
                                  <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"></div>
                              </div>
                              {/* Background Glow */}
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[600px] bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-[60px] -z-10 rounded-full opacity-50"></div>
                          </div>
                      </div>
                  </div>
              </Reveal>
          </section>

          {/* AD INTELLIGENCE SUITE (USE CASES) */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
              <Reveal>
                  <div className="text-center mb-12">
                      <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white mb-4">AD Intelligence Suite</h2>
                      <p className="text-gray-400">Two powerful engines to drive your department forward.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {/* Roster Optimization Card */}
                    <div className="bg-[#0f1115] border border-white/10 p-8 rounded-2xl relative overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
                        <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
                            <Users size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-blue-900/20 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-all">
                                <Layout size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Roster Intelligence</h3>
                            <p className="text-gray-400 leading-relaxed mb-6 min-h-[48px]">
                                Stop coaching in the dark. Give your staff the "User Manual" for every athlete on the roster to accelerate development.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-sm text-gray-300">
                                    <CheckCircle size={16} className="text-blue-500 mt-0.5 shrink-0" />
                                    <span>Optimize lineups based on <strong>Clutch Factor</strong> reliability.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-300">
                                    <CheckCircle size={16} className="text-blue-500 mt-0.5 shrink-0" />
                                    <span>Accelerate growth with <strong>Learning Style</strong> customization.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-300">
                                    <CheckCircle size={16} className="text-blue-500 mt-0.5 shrink-0" />
                                    <span>Prevent conflicts via <strong>Communication Style</strong> matching.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Recruiting & NIL Card */}
                    <div className="bg-[#0f1115] border border-white/10 p-8 rounded-2xl relative overflow-hidden group hover:border-green-500/50 transition-all duration-300">
                        <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
                            <DollarSign size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-green-900/20 rounded-xl flex items-center justify-center mb-6 text-green-400 group-hover:text-green-300 group-hover:scale-110 transition-all">
                                <Target size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Recruiting & NIL</h3>
                            <p className="text-gray-400 leading-relaxed mb-6 min-h-[48px]">
                                De-risk your biggest investments. Filter prospects by character and alignment before you commit resources.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-sm text-gray-300">
                                    <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                                    <span>Avoid "culture killers" disguised by good stats.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-300">
                                    <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                                    <span>Verify <strong>Coach Alignment</strong> before the official visit.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-300">
                                    <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                                    <span>Protect your NIL budget with psychometric due diligence.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                  </div>
              </Reveal>
          </section>

          {/* SCIENTIFIC FOUNDATION */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
              <Reveal>
                  <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                          <Brain size={200} />
                      </div>
                      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                          <div>
                              <div className="inline-flex items-center gap-2 text-blue-500 border border-blue-500/30 bg-blue-500/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                                  <Mic size={14} />
                                  <span>The Methodology</span>
                              </div>
                              <h2 className="text-3xl md:text-4xl font-black italic text-white mb-6 tracking-tighter uppercase leading-none">
                                  CEO Dan Connerty on <br/>
                                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-white">Measuring Intangibles.</span>
                              </h2>
                              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                  Watch NControl CEO Dan Connerty discuss the process and exactly what we are trying to measure in this deep dive into the psychology of performance. This TED Talk explores the psychological mechanisms behind "Clutch" performance and Mental Toughness.
                              </p>
                              
                              <div className="space-y-4">
                                  <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5">
                                      <div className="w-10 h-10 bg-blue-900/20 text-blue-500 rounded-full flex items-center justify-center shrink-0">
                                          <Brain size={20} />
                                      </div>
                                      <div>
                                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">The Concept</p>
                                          <p className="text-white font-medium">"Measuring the Invisible: The Science of Clutch"</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="relative group cursor-pointer">
                              <div className="aspect-video rounded-2xl bg-black border border-white/10 overflow-hidden shadow-2xl relative">
                                  <iframe 
                                      width="100%" 
                                      height="100%" 
                                      src="https://www.youtube.com/embed/SmXZSYEnau0" 
                                      title="Dr. Sean Richardson TED Talk" 
                                      frameBorder="0" 
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                      allowFullScreen
                                      className="absolute inset-0"
                                  ></iframe>
                              </div>
                          </div>
                      </div>
                  </div>
              </Reveal>
          </section>

          {/* VIDEO DEMO SECTION */}
          <section ref={videoSectionRef} className="max-w-5xl mx-auto px-4 sm:px-6 mb-24">
              <Reveal>
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/10">
                        <Play size={10} className="text-blue-400 fill-current" />
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Product Tour</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">See NControl In Action</h2>
                </div>

                {/* Video Tabs */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                    <button 
                        onClick={() => setActiveVideo('platform')}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                            activeVideo === 'platform' 
                            ? 'bg-white text-black shadow-lg shadow-white/20' 
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        Platform Overview
                    </button>
                    <button 
                        onClick={() => setActiveVideo('recruiting')}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                            activeVideo === 'recruiting' 
                            ? 'bg-white text-black shadow-lg shadow-white/20' 
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        Recruiting Engine
                    </button>
                </div>
                
                {/* Video Container */}
                <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group bg-black">
                    {activeVideo === 'platform' ? (
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/spKsM_5c0iM?autoplay=0&controls=1&rel=0&modestbranding=1" 
                            title="NControl Product Demo" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="absolute inset-0 w-full h-full animate-in fade-in duration-500"
                        ></iframe>
                    ) : (
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/NMKUJfjI_HQ?autoplay=0&controls=1&rel=0&modestbranding=1" 
                            title="Recruiting Dashboard Demo" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="absolute inset-0 w-full h-full animate-in fade-in duration-500"
                        ></iframe>
                    )}
                </div>
                
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm max-w-2xl mx-auto min-h-[40px]">
                        {activeVideo === 'platform' 
                            ? "In this 2-minute overview, see how we quantify the 'Intangibles' — Clutch Factor, Resilience, and Coachability — to give Athletic Directors a unified dashboard for auditing roster readiness."
                            : "The cost of a bad transfer is too high. See how NControl allows you to filter the transfer portal by 'Mental Alignment'. See how to identify players who fit your specific coaching style before you sign them."
                        }
                    </p>
                </div>
              </Reveal>
          </section>

          {/* FINAL CTA */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <Reveal>
                <div className="p-12 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-md">
                    <h2 className="text-4xl font-black italic text-white mb-6 tracking-tight">READY TO <span className="text-blue-500">WIN?</span></h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto font-light">
                        Join elite programs using NControl to build championship cultures and maximize roster efficiency.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button 
                            onClick={() => setShowBooking(true)}
                            className="bg-white hover:bg-gray-200 text-black px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transform hover:-translate-y-1"
                        >
                            Schedule Strategy Audit
                        </button>
                        <button 
                            onClick={() => setShowPresentation(true)}
                            className="bg-transparent border border-white/20 hover:bg-white/10 text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all"
                        >
                            View Presentation
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
