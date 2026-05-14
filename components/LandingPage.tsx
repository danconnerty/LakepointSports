
import React, { useState, useEffect, useRef } from 'react';
import {
    Activity, Brain, ArrowRight, ArrowLeft, Check, X, FileText, Monitor, ShieldCheck,
    Megaphone, RefreshCw, Mail, Database, Tv, Building2, Send, Trophy
} from 'lucide-react';
import { ViewType } from '../types';
import { TestDriveModal } from './TestDriveModal';
import ClutchAssessment from './ClutchAssessment';
import NTerpretAssessment from './NTerpretAssessment';
import TrustedTeams from './TrustedTeams';

interface LandingPageProps {
  onEnter: (orgName: string, initialView?: ViewType) => void;
}

// --- CO-BRANDED LOGO ---
const Logo = ({ className = "", size = "normal" }: { className?: string, size?: "small" | "normal" }) => {
    const height = size === "small" ? "h-7" : "h-9";

    return (
        <div className={`flex items-center gap-2.5 select-none ${className}`}>
            <img
                src="/white_logo_transparent_background - name only.PNG"
                alt="NTangible"
                className={`${height} w-auto object-contain`}
            />
            <span className="text-white/25 text-lg font-light leading-none">&times;</span>
            <img
                src="/Lakepoint.png"
                alt="Lakepoint Sports"
                className={`${height} w-auto object-contain`}
            />
            <span className="text-white font-semibold tracking-tight text-sm sm:text-base whitespace-nowrap">
                Lakepoint Sports
            </span>
        </div>
    );
};

// --- PROPERTY LOGO BAND ---
const PropertyLogo = ({ src, mark }: { src: string; mark: string }) => {
    const [errored, setErrored] = useState(false);

    return (
        <div className="h-24 flex items-center justify-center border-b border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent px-6">
            {errored ? (
                <span className="text-xl font-bold text-white tracking-widest">{mark}</span>
            ) : (
                <img
                    src={src}
                    alt={mark}
                    onError={() => setErrored(true)}
                    className="max-h-14 max-w-[72%] w-auto object-contain"
                />
            )}
        </div>
    );
};

// --- BOOKING MODAL ---
const BookingModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
        <div className="w-full max-w-5xl h-[85vh] bg-[#0f1115] border border-gray-800 rounded-2xl relative shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-gray-800 flex justify-between items-center bg-[#0f1115]">
                <h2 className="text-xl font-bold text-white">Book An Integration Call</h2>
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
                    title="Schedule Integration Call"
                    className="w-full h-full"
                ></iframe>
            </div>
        </div>
    </div>
);

// --- SAMPLE REPORT MODAL ---
const SampleReportModal = ({ onClose, onViewClutch, onViewNterpret }: { onClose: () => void, onViewClutch: () => void, onViewNterpret: () => void }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
        <div className="w-full max-w-lg bg-[#0f1115] border border-gray-800 rounded-2xl relative shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-gray-800 flex justify-between items-center bg-[#0f1115]">
                <h2 className="text-xl font-bold text-white">Inside The Profile</h2>
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
                            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Clutch Factor Assessment</h3>
                        </div>
                        <ArrowRight size={18} className="text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors pl-[52px]">
                        See a sample report &mdash; how an athlete handles pressure when the game is on the line.
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
                            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">NTerpret Mental Scouting Report</h3>
                        </div>
                        <ArrowRight size={18} className="text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors pl-[52px]">
                        Explore a sample profile &mdash; learning style, motivation, and how to coach the athlete.
                    </p>
                </button>
            </div>
        </div>
    </div>
);

// --- ECONOMICS MODEL ---
const PRICE = 10;
const LAKEPOINT_SHARE = 2;
const PARTNER_SHARE = 1;
const NTANGIBLE_SHARE = 7;
const AD_SPEND_INCREMENT = 50000;
const AD_SPEND_PER_INCREMENT = 10000;
const MAX_PROFILES = 250000;

const fmtMoney = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;

// --- ECONOMICS + REVENUE CALCULATOR ---
const PricingCalculator = () => {
    const [profiles, setProfiles] = useState(25000);

    const clamped = Math.max(0, Math.min(MAX_PROFILES, Number.isFinite(profiles) ? profiles : 0));

    const grossRevenue = clamped * PRICE;
    const lakepointRev = clamped * LAKEPOINT_SHARE;
    const partnerRev = clamped * PARTNER_SHARE;
    const ntangibleRev = clamped * NTANGIBLE_SHARE;

    const milestones = Math.floor(grossRevenue / AD_SPEND_INCREMENT);
    const adSpend = milestones * AD_SPEND_PER_INCREMENT;
    const nextMilestoneRevenue = (milestones + 1) * AD_SPEND_INCREMENT;
    const progressToNext = grossRevenue === 0 ? 0 : ((grossRevenue % AD_SPEND_INCREMENT) / AD_SPEND_INCREMENT) * 100;
    const totalToLakepoint = lakepointRev + adSpend;

    const fmtCompact = (n: number) => n >= 1000 ? `${(n / 1000).toLocaleString('en-US')}k` : `${n}`;

    return (
        <div>
            {/* The split model */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-10">
                <div className="bg-[#070707] p-6 sm:p-7">
                    <p className="text-3xl sm:text-4xl font-semibold text-blue-400 tracking-tight mb-1 tabular-nums">$2</p>
                    <p className="text-white text-base font-semibold mb-1">Lakepoint Sports</p>
                    <p className="text-gray-500 text-sm leading-relaxed">Direct revenue share to Lakepoint on every profile sold, across all channels.</p>
                </div>
                <div className="bg-[#070707] p-6 sm:p-7">
                    <p className="text-3xl sm:text-4xl font-semibold text-emerald-400 tracking-tight mb-1 tabular-nums">$1</p>
                    <p className="text-white text-base font-semibold mb-1">Originating partner</p>
                    <p className="text-gray-500 text-sm leading-relaxed">Paid to the property that drove the sale &mdash; PBR, RYZE, Rally, NFL Flag, or any property you add.</p>
                </div>
                <div className="bg-[#070707] p-6 sm:p-7">
                    <p className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-1 tabular-nums">$7</p>
                    <p className="text-white text-base font-semibold mb-1">NTangible</p>
                    <p className="text-gray-500 text-sm leading-relaxed">Covers assessment delivery, hosting, the collegiate dashboard, and the directed ad-spend commitment.</p>
                </div>
            </div>

            {/* Calculator card */}
            <div className="bg-[#070707] border border-white/10 rounded-2xl p-6 sm:p-10">
                <div className="mb-6 sm:mb-8">
                    <p className="text-sm text-gray-500 font-medium mb-1">Revenue calculator</p>
                    <p className="text-base text-gray-400">Drag to model the integration at scale.</p>
                </div>

                {/* Slider */}
                <div className="mb-10">
                    <div className="flex items-end justify-between mb-3 gap-4">
                        <label className="text-sm font-medium text-gray-400">
                            Profiles sold <span className="text-gray-600">(@ $10 each)</span>
                        </label>
                        <input
                            type="number"
                            min={0}
                            max={MAX_PROFILES}
                            value={clamped}
                            onChange={(e) => setProfiles(parseInt(e.target.value || '0', 10))}
                            className="w-32 sm:w-44 bg-black border border-white/10 rounded-lg px-3 py-2 text-right text-2xl sm:text-3xl font-semibold text-white tracking-tight tabular-nums focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={MAX_PROFILES}
                        step={500}
                        value={clamped}
                        onChange={(e) => setProfiles(parseInt(e.target.value, 10))}
                        className="w-full h-1.5 bg-gray-800 rounded-full appearance-none cursor-pointer accent-blue-500"
                        style={{
                            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(clamped / MAX_PROFILES) * 100}%, #1f2937 ${(clamped / MAX_PROFILES) * 100}%, #1f2937 100%)`
                        }}
                    />
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                        {[5000, 10000, 25000, 50000, 100000, 250000].map(n => (
                            <button
                                key={n}
                                onClick={() => setProfiles(n)}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors tabular-nums ${
                                    clamped === n ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {fmtCompact(n)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gross revenue */}
                <div className="mb-6">
                    <p className="text-sm font-medium text-gray-500 mb-2">Gross program revenue</p>
                    <p className="text-5xl sm:text-6xl font-semibold text-white tracking-tight tabular-nums">{fmtMoney(grossRevenue)}</p>
                    <p className="text-sm text-gray-500 mt-2 tabular-nums">{clamped.toLocaleString('en-US')} profiles &times; $10</p>
                </div>

                {/* Stacked split bar */}
                <div className="flex h-3 rounded-full overflow-hidden bg-white/5 mb-8">
                    <div className="bg-blue-500" style={{ width: '20%' }} title="Lakepoint $2" />
                    <div className="bg-emerald-500" style={{ width: '10%' }} title="Partner $1" />
                    <div className="bg-white/30" style={{ width: '70%' }} title="NTangible $7" />
                </div>

                {/* Split results */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <div className="bg-[#070707] p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            <p className="text-sm font-medium text-blue-400">Lakepoint rev share</p>
                        </div>
                        <p className="text-2xl sm:text-3xl font-semibold text-white tracking-tight tabular-nums">{fmtMoney(lakepointRev)}</p>
                        <p className="text-sm text-gray-500 mt-1 tabular-nums">{clamped.toLocaleString('en-US')} &times; $2</p>
                    </div>
                    <div className="bg-[#070707] p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <p className="text-sm font-medium text-emerald-400">Partner rev share</p>
                        </div>
                        <p className="text-2xl sm:text-3xl font-semibold text-white tracking-tight tabular-nums">{fmtMoney(partnerRev)}</p>
                        <p className="text-sm text-gray-500 mt-1 tabular-nums">{clamped.toLocaleString('en-US')} &times; $1</p>
                    </div>
                    <div className="bg-[#070707] p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-white/40" />
                            <p className="text-sm font-medium text-gray-400">NTangible</p>
                        </div>
                        <p className="text-2xl sm:text-3xl font-semibold text-white tracking-tight tabular-nums">{fmtMoney(ntangibleRev)}</p>
                        <p className="text-sm text-gray-500 mt-1 tabular-nums">{clamped.toLocaleString('en-US')} &times; $7</p>
                    </div>
                </div>

                {/* Directed ad-spend commitment */}
                <div className="mt-8 rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-500/[0.08] to-transparent p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                        <div className="max-w-md">
                            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full mb-3">
                                <Megaphone size={13} className="text-blue-400" />
                                <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-widest">Directed ad-spend commitment</span>
                            </div>
                            <p className="text-base text-gray-300 leading-relaxed">
                                For every <span className="text-white font-semibold">$50,000</span> in gross program revenue,
                                NTangible commits <span className="text-white font-semibold">$10,000</span> to a directed
                                ad-spend campaign run through Lakepoint Sports.
                            </p>
                        </div>
                        <div className="sm:text-right shrink-0">
                            <p className="text-sm font-medium text-blue-400 mb-1">Committed ad spend</p>
                            <p className="text-4xl sm:text-5xl font-semibold text-white tracking-tight tabular-nums">{fmtMoney(adSpend)}</p>
                            <p className="text-sm text-gray-500 mt-1 tabular-nums">
                                {milestones} &times; $10,000 milestone{milestones === 1 ? '' : 's'}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                        <div className="flex justify-between text-xs text-gray-500 mb-2 tabular-nums">
                            <span>{fmtMoney(milestones * AD_SPEND_INCREMENT)} in revenue</span>
                            <span>Next campaign unlocks at {fmtMoney(nextMilestoneRevenue)}</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progressToNext}%` }} />
                        </div>
                    </div>
                </div>

                {/* Total to Lakepoint */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-xl overflow-hidden mt-8">
                    <div className="bg-[#070707] p-5 sm:p-6">
                        <p className="text-sm font-medium text-gray-500 mb-2">Total value to Lakepoint Sports</p>
                        <p className="text-3xl sm:text-4xl font-semibold text-blue-400 tracking-tight tabular-nums">{fmtMoney(totalToLakepoint)}</p>
                        <p className="text-sm text-gray-500 mt-2 tabular-nums">{fmtMoney(lakepointRev)} rev share + {fmtMoney(adSpend)} directed ad spend</p>
                    </div>
                    <div className="bg-[#070707] p-5 sm:p-6">
                        <p className="text-sm font-medium text-gray-500 mb-2">Total to Lakepoint + partners</p>
                        <p className="text-3xl sm:text-4xl font-semibold text-white tracking-tight tabular-nums">{fmtMoney(totalToLakepoint + partnerRev)}</p>
                        <p className="text-sm text-gray-500 mt-2 tabular-nums">Includes {fmtMoney(partnerRev)} paid to originating partners</p>
                    </div>
                </div>

                <p className="text-xs text-gray-600 mt-6 leading-relaxed">
                    Illustrative model. Ad-spend milestones are calculated on gross program revenue in $50,000 increments.
                </p>
            </div>

            {/* Recurring revenue strip */}
            <div className="mt-8 bg-[#070707] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex-1">
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full mb-3">
                        <RefreshCw size={13} className="text-blue-400" />
                        <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-widest">Recurring revenue funnel</span>
                    </div>
                    <p className="text-base text-gray-400 leading-relaxed">
                        Every 6 months, NTangible sends an automatic retest email so athletes can update their Clutch Factor
                        score. Each retest is another $10 profile &mdash; another $2 to Lakepoint, $1 to the partner. The
                        numbers above are year-one volume, before retests compound.
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-px bg-white/5 border border-white/10 rounded-xl overflow-hidden shrink-0">
                    <div className="bg-[#0a0a0a] p-4 text-center">
                        <p className="text-2xl font-semibold text-white tabular-nums">6 mo</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">Retest cadence</p>
                    </div>
                    <div className="bg-[#0a0a0a] p-4 text-center">
                        <p className="text-2xl font-semibold text-white tabular-nums">2&times;+</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">Profiles / athlete / yr</p>
                    </div>
                    <div className="bg-[#0a0a0a] p-4 text-center">
                        <p className="text-2xl font-semibold text-blue-400 tabular-nums">$3</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">To Lakepoint + partner</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SECTION NAV CONFIG ---
const SECTION_LINKS = [
    { id: 'offer', label: 'The Offer' },
    { id: 'properties', label: 'Properties' },
    { id: 'economics', label: 'Economics' },
    { id: 'rollout', label: 'Rollout' },
    { id: 'ask', label: 'The Ask' },
];

const PROPERTIES = [
    {
        name: 'PBR Baseball',
        sport: 'Baseball',
        mark: 'PBR',
        src: '/PBR.png',
        angle: 'The showcase pipeline already runs on data. The mental profile is the piece the highlight reel can’t show — and college coaches are already asking for it.',
    },
    {
        name: 'RYZE Basketball',
        sport: 'Basketball',
        mark: 'RYZE',
        src: '/RYZE.png',
        angle: 'Year-round hoops development and exposure events. Every RYZE athlete carries a verified mental profile into the recruiting conversation.',
    },
    {
        name: 'Rally Volleyball',
        sport: 'Volleyball',
        mark: 'Rally',
        src: '/RallyVolleyball.png',
        angle: 'One of the fastest-growing recruiting markets in the country. Be first to give every Rally athlete a mental scouting profile.',
    },
    {
        name: 'NFL Flag Football',
        sport: 'Flag Football',
        mark: 'NFL Flag',
        src: '/NFLFlag.png',
        angle: 'Massive youth participation and a fast-rising recruiting profile — a huge top-of-funnel audience for a low-cost, high-trust digital product.',
    },
];

// --- MAIN LANDING PAGE ---
const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [view, setView] = useState<'proposal' | 'why'>('proposal');
  const [activeSection, setActiveSection] = useState<string>('offer');
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  const [showTestDrive, setShowTestDrive] = useState(false);
  const [showClutchReport, setShowClutchReport] = useState(false);
  const [showNterpretReport, setShowNterpretReport] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Scroll-spy for the sticky section nav
  useEffect(() => {
    if (view !== 'proposal') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    SECTION_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [view]);

  // Handle deferred scroll after switching back from the "Why it works" view
  useEffect(() => {
    if (view === 'proposal' && pendingScroll) {
      const el = document.getElementById(pendingScroll);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setPendingScroll(null);
    }
  }, [view, pendingScroll]);

  const handleEnter = (initialView?: ViewType) => {
    onEnter('LAKEPOINT SPORTS', initialView);
  };

  const goToSection = (id: string) => {
    if (view === 'proposal') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setPendingScroll(id);
      setView('proposal');
    }
  };

  const openWhy = () => {
    setView('why');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Illustrative hero scenario @ 25,000 profiles
  const SCENARIO_PROFILES = 25000;
  const scenarioLakepoint = SCENARIO_PROFILES * LAKEPOINT_SHARE;
  const scenarioAdSpend = Math.floor((SCENARIO_PROFILES * PRICE) / AD_SPEND_INCREMENT) * AD_SPEND_PER_INCREMENT;
  const scenarioTotal = scenarioLakepoint + scenarioAdSpend;

  return (
    <div className={`min-h-screen bg-[#050505] text-white relative font-sans selection:bg-blue-500 selection:text-white flex flex-col scroll-smooth ${showClutchReport || showNterpretReport ? 'h-screen overflow-hidden' : 'overflow-y-auto overflow-x-hidden'}`}>

      {/* Background ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full"></div>
      </div>

      {/* Header / Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 h-16 flex items-center justify-between backdrop-blur-md border-b border-white/5 bg-black/70">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => goToSection('offer')}>
              <Logo className="text-white" size="small" />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
              <button
                  onClick={() => handleEnter()}
                  className="hidden sm:inline-flex text-sm font-medium text-gray-400 hover:text-white transition-colors px-3 py-2"
              >
                  Dashboard
              </button>
              <button
                  onClick={() => setShowBooking(true)}
                  className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
              >
                  Book a call
              </button>
          </div>
      </nav>

      {/* Sticky section nav */}
      <div className="fixed top-16 left-0 right-0 z-40 w-full backdrop-blur-md border-b border-white/5 bg-black/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center gap-1 overflow-x-auto no-scrollbar">
              {SECTION_LINKS.map((s) => (
                  <button
                      key={s.id}
                      onClick={() => goToSection(s.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                          view === 'proposal' && activeSection === s.id
                              ? 'bg-white/10 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                      {s.label}
                  </button>
              ))}
              <div className="w-px h-4 bg-white/10 mx-1.5 shrink-0" />
              <button
                  onClick={() => (view === 'why' ? setView('proposal') : openWhy())}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                      view === 'why' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                  Why it works
              </button>
          </div>
      </div>

      {/* ================= PROPOSAL VIEW ================= */}
      {view === 'proposal' && (
      <div className="relative z-10 w-full pt-36 sm:pt-40 pb-20">

          {/* HERO */}
          <section id="offer" className="max-w-5xl mx-auto px-4 sm:px-6 mb-20 sm:mb-28 text-center relative scroll-mt-32">
              <div className={`flex justify-center mb-7 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'} transition-all duration-700`}>
                  <img
                      src="/Lakepoint.png"
                      alt="Lakepoint Sports"
                      className="h-20 sm:h-24 w-auto object-contain drop-shadow-[0_10px_40px_rgba(37,99,235,0.25)]"
                  />
              </div>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-8 ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                  <span className="inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                  <span className="text-[11px] font-medium text-gray-300 tracking-wide">Partnership Proposal &middot; NTangible &times; Lakepoint Sports</span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight mb-6 leading-[1.02] text-white">
                  A new revenue line <span className="text-blue-400">across every Lakepoint property.</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                  NTangible builds and runs the Lakepoint Mental Scouting Profile &mdash; a $10 verified digital profile
                  sold across your channels and partners. You earn on every one. We do the building, hosting, and selling.
              </p>

              {/* Headline revenue scenario */}
              <div className="max-w-3xl mx-auto mb-10">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                      <div className="bg-[#070707] p-5">
                          <p className="text-2xl sm:text-3xl font-semibold text-blue-400 tracking-tight tabular-nums">{fmtMoney(scenarioLakepoint)}</p>
                          <p className="text-xs text-gray-500 mt-1">Lakepoint rev share</p>
                      </div>
                      <div className="bg-[#070707] p-5">
                          <p className="text-2xl sm:text-3xl font-semibold text-blue-400 tracking-tight tabular-nums">{fmtMoney(scenarioAdSpend)}</p>
                          <p className="text-xs text-gray-500 mt-1">Directed ad spend</p>
                      </div>
                      <div className="bg-[#070707] p-5">
                          <p className="text-2xl sm:text-3xl font-semibold text-white tracking-tight tabular-nums">{fmtMoney(scenarioTotal)}+</p>
                          <p className="text-xs text-gray-500 mt-1">Total to Lakepoint, year one</p>
                      </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">
                      Illustrative &mdash; 25,000 profiles across your properties, before retests compound.
                  </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md sm:max-w-none mx-auto">
                 <button
                    onClick={() => setShowBooking(true)}
                    className="w-full sm:w-auto bg-blue-500 hover:bg-blue-400 text-white px-8 py-3.5 rounded-lg font-semibold text-base transition-colors flex items-center justify-center gap-2"
                 >
                    Book an integration call <ArrowRight size={16} />
                 </button>
                 <button
                    onClick={() => goToSection('economics')}
                    className="w-full sm:w-auto text-gray-300 hover:text-white px-8 py-3.5 rounded-lg font-medium text-base transition-colors flex items-center justify-center gap-2"
                 >
                    See the economics
                 </button>
              </div>
          </section>

          {/* WHAT IT IS */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32">
              <div className="mb-12 sm:mb-16 max-w-2xl">
                  <p className="text-sm font-medium text-blue-400 mb-3">What it is</p>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.1] mb-4">
                      One integration. Two Lakepoint-branded products.
                  </h2>
                  <p className="text-lg text-gray-400 leading-relaxed">
                      A profile athletes pay for, and a free dashboard that makes Lakepoint the place college coaches come
                      to find talent. Curious how the assessments work? <button onClick={openWhy} className="text-blue-400 hover:text-blue-300 underline underline-offset-2">See "Why it works."</button>
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  <div className="bg-[#070707] p-7 sm:p-9">
                      <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
                          <ShieldCheck size={20} className="text-blue-400" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-3">Lakepoint Mental Scouting Profile</h3>
                      <p className="text-base text-gray-400 leading-relaxed mb-5">
                          A $10 verified digital profile measuring how an athlete performs under pressure &mdash; hosted on
                          Lakepoint's official database, usable across every property.
                      </p>
                      <ul className="space-y-2.5 border-t border-white/5 pt-5">
                          <li className="text-[15px] text-gray-300 leading-relaxed flex gap-2.5"><Check size={17} className="text-blue-400 shrink-0 mt-0.5" /> Full Clutch Factor&trade; + NTerpret&trade; reports</li>
                          <li className="text-[15px] text-gray-300 leading-relaxed flex gap-2.5"><Check size={17} className="text-blue-400 shrink-0 mt-0.5" /> Personalized drills to improve performance</li>
                          <li className="text-[15px] text-gray-300 leading-relaxed flex gap-2.5"><Check size={17} className="text-blue-400 shrink-0 mt-0.5" /> Verified recruiting status in the Lakepoint dashboard</li>
                      </ul>
                  </div>
                  <div className="bg-[#070707] p-7 sm:p-9">
                      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                          <Monitor size={20} className="text-emerald-400" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-3">Lakepoint Collegiate Dashboard</h3>
                      <p className="text-base text-gray-400 leading-relaxed mb-5">
                          A free portal college coaches log into to discover Lakepoint talent &mdash; the demand engine that
                          pulls athletes into paid profiles.
                      </p>
                      <ul className="space-y-2.5 border-t border-white/5 pt-5">
                          <li className="text-[15px] text-gray-300 leading-relaxed flex gap-2.5"><Check size={17} className="text-emerald-400 shrink-0 mt-0.5" /> Free access for every college coach across properties</li>
                          <li className="text-[15px] text-gray-300 leading-relaxed flex gap-2.5"><Check size={17} className="text-emerald-400 shrink-0 mt-0.5" /> Searchable leaderboards of Lakepoint athletes</li>
                          <li className="text-[15px] text-gray-300 leading-relaxed flex gap-2.5"><Check size={17} className="text-emerald-400 shrink-0 mt-0.5" /> Positions Lakepoint as the recruiting front door</li>
                      </ul>
                  </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  <button onClick={() => setShowReportModal(true)} className="text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-white/40">
                      See a sample profile
                  </button>
                  <button onClick={() => handleEnter()} className="text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-white/40">
                      Explore the Lakepoint dashboard
                  </button>
              </div>
          </section>

          {/* PROPERTIES */}
          <section id="properties" className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32 scroll-mt-32">
              <div className="mb-12 sm:mb-16 max-w-2xl">
                  <p className="text-sm font-medium text-blue-400 mb-3">The properties</p>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.1] mb-4">
                      Every property is a revenue surface.
                  </h2>
                  <p className="text-lg text-gray-400 leading-relaxed">
                      PBR Baseball, RYZE Basketball, Rally Volleyball, and NFL Flag Football already move thousands of
                      recruiting-focused athletes a year. Each one promotes the profile to its audience &mdash; and earns
                      $1 on every sale it drives.
                  </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
                  {PROPERTIES.map((p) => (
                      <div key={p.name} className="bg-[#070707] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                          <PropertyLogo src={p.src} mark={p.mark} />
                          <div className="p-6 sm:p-7 flex flex-col flex-grow">
                              <div className="flex items-center justify-between mb-3 gap-3">
                                  <h3 className="text-lg font-semibold text-white tracking-tight">{p.name}</h3>
                                  <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">{p.sport}</span>
                              </div>
                              <p className="text-[15px] text-gray-400 leading-relaxed flex-grow">{p.angle}</p>
                              <div className="mt-5 pt-5 border-t border-white/5">
                                  <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                                      <Check size={12} /> $1 per profile to {p.mark}
                                  </span>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>

              <div className="bg-[#070707] border border-dashed border-white/15 rounded-2xl p-6 sm:p-7">
                  <h3 className="text-base font-semibold text-white mb-1">Every property you add becomes another revenue surface.</h3>
                  <p className="text-sm text-gray-500">We build assessments for any sport &mdash; new Lakepoint properties plug into the exact same split, with no additional integration work.</p>
              </div>
          </section>

          {/* ECONOMICS */}
          <section id="economics" className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32 scroll-mt-32">
              <div className="mb-12 sm:mb-16 max-w-2xl">
                  <p className="text-sm font-medium text-blue-400 mb-3">The economics</p>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.1] mb-4">
                      $10 a profile. Revenue on every one.
                  </h2>
                  <p className="text-lg text-gray-400 leading-relaxed">
                      A direct-to-consumer price point built to move at volume. Lakepoint and the originating partner earn
                      on every profile sold &mdash; and at scale, NTangible reinvests directly into Lakepoint ad spend.
                  </p>
              </div>
              <PricingCalculator />
          </section>

          {/* ROLLOUT */}
          <section id="rollout" className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32 scroll-mt-32">
              <div className="mb-12 sm:mb-16 max-w-2xl">
                  <p className="text-sm font-medium text-blue-400 mb-3">The rollout</p>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.1] mb-4">
                      Front-load the leaderboards. Then push it everywhere.
                  </h2>
                  <p className="text-lg text-gray-400 leading-relaxed">
                      We seed the database with elite talent first, open it to college coaches, then run distribution
                      across every channel you own. Digital-only &mdash; no field staff, no clipboards.
                  </p>
              </div>

              {/* Phases */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
                  <div className="bg-[#070707] border border-white/10 rounded-2xl p-7 sm:p-9">
                      <div className="flex items-baseline gap-3 mb-4">
                          <span className="text-blue-400 text-sm font-semibold">Phase 1</span>
                          <span className="text-sm text-gray-500 font-medium">Seed</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white tracking-tight mb-3">Pre-fill the leaderboards</h3>
                      <p className="text-base text-gray-400 leading-relaxed">
                          NTangible runs free testing for roughly <span className="text-white font-medium">500 top athletes per property</span>,
                          so every Lakepoint leaderboard launches with credible, verified depth.
                      </p>
                  </div>
                  <div className="bg-[#070707] border border-white/10 rounded-2xl p-7 sm:p-9">
                      <div className="flex items-baseline gap-3 mb-4">
                          <span className="text-emerald-400 text-sm font-semibold">Phase 2</span>
                          <span className="text-sm text-gray-500 font-medium">Open &amp; sell</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white tracking-tight mb-3">Open coach access, then sell</h3>
                      <p className="text-base text-gray-400 leading-relaxed">
                          Free dashboard access goes out to <span className="text-white font-medium">college coaches across every property</span>.
                          Their demand pulls athletes into paid profiles &mdash; the flywheel starts turning.
                      </p>
                  </div>
              </div>

              {/* Distribution channels */}
              <p className="text-sm font-medium text-gray-500 mb-4">Distribution runs across every channel you own</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  <div className="bg-[#070707] p-6">
                      <Mail size={20} className="text-blue-400 mb-4" />
                      <h3 className="text-white text-base font-semibold mb-2">Dedicated email blasts</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">Multiple campaigns a year to Lakepoint's main list and every property list.</p>
                  </div>
                  <div className="bg-[#070707] p-6">
                      <Building2 size={20} className="text-blue-400 mb-4" />
                      <h3 className="text-white text-base font-semibold mb-2">Partner channels</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">PBR, RYZE, Rally, and NFL Flag each promote the profile &mdash; and earn $1 on every sale.</p>
                  </div>
                  <div className="bg-[#070707] p-6">
                      <Tv size={20} className="text-blue-400 mb-4" />
                      <h3 className="text-white text-base font-semibold mb-2">On-campus signage</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">Placement on WiFi landing pages and lobby screens across Lakepoint venues.</p>
                  </div>
                  <div className="bg-[#070707] p-6">
                      <Send size={20} className="text-blue-400 mb-4" />
                      <h3 className="text-white text-base font-semibold mb-2">Digital-only activation</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">Everything ships through existing digital touchpoints &mdash; no operational lift.</p>
                  </div>
              </div>
          </section>

          {/* THE ASK */}
          <section id="ask" className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32 scroll-mt-32">
              <div className="mb-12 sm:mb-16 max-w-2xl">
                  <p className="text-sm font-medium text-blue-400 mb-3">The ask</p>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.1] mb-4">
                      An easy yes.
                  </h2>
                  <p className="text-lg text-gray-400 leading-relaxed">
                      NTangible carries the build, the cost, and the risk. Lakepoint provides reach. Here's exactly what
                      each side commits.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {/* NTangible commits */}
                  <div className="bg-[#070707] border border-blue-500/30 rounded-2xl p-7 sm:p-9">
                      <h3 className="text-xl font-semibold text-white tracking-tight mb-1">What NTangible commits</h3>
                      <p className="text-sm text-gray-500 mb-6">We build it, host it, and sell it.</p>
                      <ul className="space-y-3.5">
                          {[
                              'Builds and operates the Lakepoint-branded profile + collegiate dashboard',
                              '$2 per profile to Lakepoint, $1 per profile to the originating partner',
                              'Directed ad spend: $10,000 per $50,000 of revenue, run through Lakepoint',
                              'Annual official-partner sponsorship fee',
                              'Free front-load testing (~500 athletes per property) to seed leaderboards',
                              'Automatic 6-month retest funnel — recurring revenue at no added cost',
                          ].map((item) => (
                              <li key={item} className="text-[15px] text-gray-300 leading-relaxed flex gap-3">
                                  <Check size={18} className="text-blue-400 shrink-0 mt-0.5" /> {item}
                              </li>
                          ))}
                      </ul>
                  </div>

                  {/* Lakepoint commits */}
                  <div className="bg-[#070707] border border-white/10 rounded-2xl p-7 sm:p-9">
                      <h3 className="text-xl font-semibold text-white tracking-tight mb-1">What Lakepoint commits</h3>
                      <p className="text-sm text-gray-500 mb-6">Reach you already have. No staffing, no spend.</p>
                      <ul className="space-y-3.5">
                          {[
                              'Dedicated email blasts to the main list, a few times a year',
                              'Intros to partner properties (PBR, RYZE, Rally, NFL Flag) to extend distribution',
                              'Initial athlete data access to front-load — structured as an annual agreement',
                              'Optional: signage on WiFi landing pages and lobby screens',
                              'Official-partner rights for NTangible',
                          ].map((item) => (
                              <li key={item} className="text-[15px] text-gray-300 leading-relaxed flex gap-3">
                                  <Check size={18} className="text-gray-500 shrink-0 mt-0.5" /> {item}
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>

              {/* Close */}
              <div className="mt-10 border-t border-white/10 pt-14 sm:pt-16 text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight leading-[1.05] mb-5">
                      Let's make it official.
                  </h2>
                  <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
                      Digital-only. We build it, we run it, we drive it. 15 minutes to walk the VP of Partnerships through
                      the integration, the rollout, and the numbers.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md sm:max-w-none mx-auto">
                      <button
                          onClick={() => setShowBooking(true)}
                          className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3.5 rounded-lg font-semibold text-base transition-colors flex items-center justify-center gap-2"
                      >
                          Book a 15-min call <ArrowRight size={16} />
                      </button>
                      <button
                          onClick={() => setShowReportModal(true)}
                          className="text-gray-300 hover:text-white px-8 py-3.5 rounded-lg font-medium text-base transition-colors flex items-center justify-center gap-2"
                      >
                          See a sample profile
                      </button>
                  </div>
              </div>
          </section>

      </div>
      )}

      {/* ================= WHY IT WORKS VIEW ================= */}
      {view === 'why' && (
      <div className="relative z-10 w-full pt-36 sm:pt-40 pb-20">

          <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
              <button
                  onClick={() => setView('proposal')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors mb-8"
              >
                  <ArrowLeft size={16} /> Back to the proposal
              </button>
              <p className="text-sm font-medium text-blue-400 mb-3">Why it works</p>
              <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.05] mb-4 max-w-3xl">
                  The product behind the profile.
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
                  Optional reading &mdash; the science, the assessments, and the data handling behind the Lakepoint Mental
                  Scouting Profile. None of it is required to say yes; it's here when the VP wants the detail.
              </p>
          </section>

          {/* Two assessments */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32">
              <div className="mb-12 sm:mb-16 max-w-2xl">
                  <p className="text-sm font-medium text-blue-400 mb-3">The assessments</p>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.1] mb-4">
                      Two reports. One complete profile.
                  </h2>
                  <p className="text-lg text-gray-400 leading-relaxed">
                      Every athlete completes both in under 15 minutes from any phone. The reports live in the Lakepoint
                      dashboard and can be shared with college coaches in one tap.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="bg-[#070707] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                      <div className="relative px-6 sm:px-8 pt-10 sm:pt-14 pb-8 sm:pb-10 flex items-end justify-center overflow-hidden bg-gradient-to-b from-blue-500/[0.08] via-transparent to-transparent min-h-[420px] sm:min-h-[520px]">
                          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] bg-blue-500/15 blur-[100px] rounded-full pointer-events-none" />
                          <img
                              src="/NterpretMobile.png"
                              alt="NTerpret Mental Scouting Report on mobile"
                              className="relative z-10 max-h-[420px] sm:max-h-[520px] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                          />
                      </div>
                      <div className="p-6 sm:p-8 border-t border-white/5">
                          <p className="text-[11px] font-semibold text-blue-400 uppercase tracking-[0.2em] mb-2">NTerpret<sup className="text-[8px] tracking-normal ml-0.5">&trade;</sup></p>
                          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-3">Mental Scouting Report</h3>
                          <p className="text-base text-gray-400 leading-relaxed mb-6">
                              The complete cognitive profile &mdash; how each athlete learns, leads, communicates, and competes.
                          </p>
                          <button
                              onClick={() => setShowNterpretReport(true)}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                          >
                              <FileText size={14} /> View sample NTerpret report
                          </button>
                      </div>
                  </div>

                  <div className="bg-[#070707] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                      <div className="relative px-6 sm:px-8 pt-10 sm:pt-14 pb-8 sm:pb-10 flex items-end justify-center overflow-hidden bg-gradient-to-b from-blue-500/[0.08] via-transparent to-transparent min-h-[420px] sm:min-h-[520px]">
                          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] bg-blue-500/15 blur-[100px] rounded-full pointer-events-none" />
                          <img
                              src="/ClutchMobile.png"
                              alt="Clutch Assessment on mobile"
                              className="relative z-10 max-h-[420px] sm:max-h-[520px] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                          />
                      </div>
                      <div className="p-6 sm:p-8 border-t border-white/5">
                          <p className="text-[11px] font-semibold text-blue-400 uppercase tracking-[0.2em] mb-2">Clutch Factor<sup className="text-[8px] tracking-normal ml-0.5">&trade;</sup></p>
                          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-3">Clutch Factor Assessment</h3>
                          <p className="text-base text-gray-400 leading-relaxed mb-6">
                              A standardized score for how an athlete responds when the game is on the line. Benchmarked and
                              tracked year over year.
                          </p>
                          <button
                              onClick={() => setShowClutchReport(true)}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                          >
                              <FileText size={14} /> View sample Clutch report
                          </button>
                      </div>
                  </div>
              </div>

              <div className="mt-6">
                  <button onClick={() => setShowTestDrive(true)} className="text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-white/40">
                      Try a sample assessment yourself
                  </button>
              </div>
          </section>

          {/* Methodology / TED */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                  <div className="lg:col-span-5">
                      <p className="text-sm font-medium text-blue-400 mb-3">The science</p>
                      <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.1] mb-5">
                          The TED Talk behind the method.
                      </h2>
                      <p className="text-lg text-gray-400 leading-relaxed mb-4">
                          NTangible's assessments are grounded in research on how athletes actually perform under pressure
                          &mdash; the work that started with this TED Talk.
                      </p>
                      <p className="text-base text-gray-500 leading-relaxed">
                          The framework that powers every NTerpret Mental Scouting Report and Clutch Factor Assessment.
                      </p>
                  </div>
                  <div className="lg:col-span-7">
                      <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
                          <iframe
                              width="100%"
                              height="100%"
                              src="https://www.youtube.com/embed/SmXZSYEnau0?rel=0&modestbranding=1"
                              title="TED Talk - The Science of Mental Performance"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full"
                          ></iframe>
                      </div>
                  </div>
              </div>
          </section>

          {/* Colleges in the network */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-20 sm:mb-24">
              <p className="text-sm font-medium text-blue-400 mb-3 px-0">In the network</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.1] mb-8 max-w-2xl">
                  College programs already on the platform.
              </h2>
          </section>
          <div className="w-full mb-24 sm:mb-32">
              <TrustedTeams />
          </div>

          {/* Data & trust */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                  <div className="lg:col-span-5">
                      <p className="text-sm font-medium text-blue-400 mb-3">Data &amp; trust</p>
                      <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.1] mb-5">
                          Lakepoint-branded. Lakepoint-controlled.
                      </h2>
                      <p className="text-lg text-gray-400 leading-relaxed mb-4">
                          The profile carries Lakepoint's name and lives on Lakepoint's official database. NTangible operates
                          it &mdash; Lakepoint owns the relationship with its athletes.
                      </p>
                      <p className="text-base text-gray-500 leading-relaxed">
                          We measure how athletes learn, compete, and handle pressure &mdash; never psychological labels.
                      </p>
                  </div>
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                      <div className="bg-[#070707] p-6">
                          <p className="text-white text-base font-semibold mb-2">Hosted on Lakepoint's database</p>
                          <p className="text-gray-500 text-sm leading-relaxed">Verified profiles sit on the official campus database, branded as a Lakepoint product.</p>
                      </div>
                      <div className="bg-[#070707] p-6">
                          <p className="text-white text-base font-semibold mb-2">COPPA-aligned</p>
                          <p className="text-gray-500 text-sm leading-relaxed">For athletes 13-18, with parental consent built into onboarding.</p>
                      </div>
                      <div className="bg-[#070707] p-6">
                          <p className="text-white text-base font-semibold mb-2">Opt-out anytime</p>
                          <p className="text-gray-500 text-sm leading-relaxed">Families can remove an athlete's profile at any time. We delete everything we hold.</p>
                      </div>
                      <div className="bg-[#070707] p-6">
                          <p className="text-white text-base font-semibold mb-2">Growth, not diagnosis</p>
                          <p className="text-gray-500 text-sm leading-relaxed">We measure how athletes compete and handle pressure &mdash; not personality or clinical labels.</p>
                      </div>
                  </div>
              </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 sm:px-6">
              <button
                  onClick={() => setView('proposal')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                  <ArrowLeft size={16} /> Back to the proposal
              </button>
          </section>

      </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/10 bg-black/60 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
                  <div className="col-span-2 sm:col-span-1">
                      <Logo className="text-white opacity-90 mb-4" size="small" />
                      <p className="text-sm text-gray-500 leading-relaxed">
                          An integration proposal for Lakepoint Sports.
                      </p>
                  </div>
                  <div>
                      <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Proposal</p>
                      <ul className="space-y-2.5 text-sm">
                          <li><button onClick={() => goToSection('offer')} className="text-gray-400 hover:text-white transition-colors">The offer</button></li>
                          <li><button onClick={() => goToSection('properties')} className="text-gray-400 hover:text-white transition-colors">Properties</button></li>
                          <li><button onClick={() => goToSection('economics')} className="text-gray-400 hover:text-white transition-colors">Economics</button></li>
                          <li><button onClick={() => goToSection('ask')} className="text-gray-400 hover:text-white transition-colors">The ask</button></li>
                      </ul>
                  </div>
                  <div>
                      <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Explore</p>
                      <ul className="space-y-2.5 text-sm">
                          <li><button onClick={openWhy} className="text-gray-400 hover:text-white transition-colors">Why it works</button></li>
                          <li><button onClick={() => setShowReportModal(true)} className="text-gray-400 hover:text-white transition-colors">Sample profile</button></li>
                          <li><button onClick={() => handleEnter()} className="text-gray-400 hover:text-white transition-colors">Lakepoint dashboard</button></li>
                      </ul>
                  </div>
                  <div>
                      <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Talk to us</p>
                      <ul className="space-y-2.5 text-sm">
                          <li><button onClick={() => setShowBooking(true)} className="text-gray-400 hover:text-white transition-colors">Book a call</button></li>
                          <li><a href="https://calendly.com/ntangible/30min" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Contact NTangible</a></li>
                      </ul>
                  </div>
              </div>
              <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-600">
                  <span>&copy; 2026 NTangible, Inc. &mdash; Proposal for Lakepoint Sports</span>
                  <div className="flex gap-5">
                      <span>COPPA-aligned</span>
                      <span>Encrypted data</span>
                      <span>Lakepoint-branded</span>
                  </div>
              </div>
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

export default LandingPage;
