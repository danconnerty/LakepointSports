
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import {
    Activity, Brain, ArrowRight, Check, X, FileText, Monitor, ShieldCheck,
    Megaphone, RefreshCw, Mail, Database, Tv, Building2, Send, Trophy, LayoutGrid,
    Target, ClipboardList
} from 'lucide-react';
import { ViewType } from '../types';
import TrustedTeams from './TrustedTeams';

// These three are the heaviest components in the codebase (ClutchAssessment
// alone is 2,200+ LOC). They only render inside conditional modals, so we
// don't pay for them on the landing page paint.
const TestDriveModal = lazy(() =>
    import('./TestDriveModal').then(m => ({ default: m.TestDriveModal }))
);
const ClutchAssessment = lazy(() => import('./ClutchAssessment'));
const NTerpretAssessment = lazy(() => import('./NTerpretAssessment'));

interface LandingPageProps {
  onEnter: (orgName: string, initialView?: ViewType) => void;
}

// --- CO-BRANDED LOGO ---
const Logo = ({ className = "", size = "normal", showLabel = true }: { className?: string, size?: "small" | "normal", showLabel?: boolean }) => {
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
                src="/LakePoint.png"
                alt="LakePoint Sports"
                className={`${height} w-auto object-contain`}
            />
            {showLabel && (
                <span className="text-white font-semibold tracking-tight text-sm sm:text-base whitespace-nowrap">
                    LakePoint Sports
                </span>
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
                        See a sample report - how an athlete handles pressure when the game is on the line.
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
                        Explore a sample profile - learning style, motivation, and how to coach the athlete.
                    </p>
                </button>
            </div>
        </div>
    </div>
);

// --- ECONOMICS + REVENUE CALCULATOR ---
const PRICE = 10;
const LAKEPOINT_SHARE = 2;
const PARTNER_SHARE = 1;
const NTANGIBLE_SHARE = 7;
const AD_SPEND_INCREMENT = 50000;
const AD_SPEND_PER_INCREMENT = 10000;
const MAX_PROFILES = 250000;

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
    const totalToLakePoint = lakepointRev + adSpend;

    const fmt = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;
    const fmtCompact = (n: number) => n >= 1000 ? `${(n / 1000).toLocaleString('en-US')}k` : `${n}`;

    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32 scroll-mt-20" id="economics">
            {/* Header */}
            <div className="mb-12 sm:mb-16 max-w-2xl">
                <p className="text-sm font-medium text-blue-400 mb-3">The economics</p>
                <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.05] mb-4">
                    $10 a profile. Revenue on every one.
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                    A direct-to-consumer price point built to move across every LakePoint digital channel and partner property.
                    LakePoint and the originating partner earn on every profile sold - and at scale, NTangible reinvests
                    directly back into LakePoint ad spend.
                </p>
            </div>

            {/* The split model */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-10">
                <div className="bg-[#070707] p-6 sm:p-7">
                    <p className="text-3xl sm:text-4xl font-semibold text-blue-400 tracking-tight mb-1 tabular-nums">$2</p>
                    <p className="text-white text-base font-semibold mb-1">LakePoint Sports</p>
                    <p className="text-gray-500 text-sm leading-relaxed">Direct revenue share to LakePoint on every profile sold, across all channels.</p>
                </div>
                <div className="bg-[#070707] p-6 sm:p-7">
                    <p className="text-3xl sm:text-4xl font-semibold text-emerald-400 tracking-tight mb-1 tabular-nums">$1</p>
                    <p className="text-white text-base font-semibold mb-1">Originating partner</p>
                    <p className="text-gray-500 text-sm leading-relaxed">Paid to the specific LakePoint partner or property that drove the sale.</p>
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
                    <p className="text-5xl sm:text-6xl font-semibold text-white tracking-tight tabular-nums">{fmt(grossRevenue)}</p>
                    <p className="text-sm text-gray-500 mt-2 tabular-nums">{clamped.toLocaleString('en-US')} profiles &times; $10</p>
                </div>

                {/* Stacked split bar */}
                <div className="flex h-3 rounded-full overflow-hidden bg-white/5 mb-8">
                    <div className="bg-blue-500" style={{ width: '20%' }} title="LakePoint $2" />
                    <div className="bg-emerald-500" style={{ width: '10%' }} title="Partner $1" />
                    <div className="bg-white/30" style={{ width: '70%' }} title="NTangible $7" />
                </div>

                {/* Split results */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <div className="bg-[#070707] p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            <p className="text-sm font-medium text-blue-400">LakePoint rev share</p>
                        </div>
                        <p className="text-2xl sm:text-3xl font-semibold text-white tracking-tight tabular-nums">{fmt(lakepointRev)}</p>
                        <p className="text-sm text-gray-500 mt-1 tabular-nums">{clamped.toLocaleString('en-US')} &times; $2</p>
                    </div>
                    <div className="bg-[#070707] p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <p className="text-sm font-medium text-emerald-400">Partner rev share</p>
                        </div>
                        <p className="text-2xl sm:text-3xl font-semibold text-white tracking-tight tabular-nums">{fmt(partnerRev)}</p>
                        <p className="text-sm text-gray-500 mt-1 tabular-nums">{clamped.toLocaleString('en-US')} &times; $1</p>
                    </div>
                    <div className="bg-[#070707] p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-white/40" />
                            <p className="text-sm font-medium text-gray-400">NTangible</p>
                        </div>
                        <p className="text-2xl sm:text-3xl font-semibold text-white tracking-tight tabular-nums">{fmt(ntangibleRev)}</p>
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
                                ad-spend campaign run through LakePoint Sports.
                            </p>
                        </div>
                        <div className="sm:text-right shrink-0">
                            <p className="text-sm font-medium text-blue-400 mb-1">Committed ad spend</p>
                            <p className="text-4xl sm:text-5xl font-semibold text-white tracking-tight tabular-nums">{fmt(adSpend)}</p>
                            <p className="text-sm text-gray-500 mt-1 tabular-nums">
                                {milestones} &times; $10,000 milestone{milestones === 1 ? '' : 's'}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                        <div className="flex justify-between text-xs text-gray-500 mb-2 tabular-nums">
                            <span>{fmt(milestones * AD_SPEND_INCREMENT)} in revenue</span>
                            <span>Next campaign unlocks at {fmt(nextMilestoneRevenue)}</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progressToNext}%` }} />
                        </div>
                    </div>
                </div>

                {/* Total to LakePoint */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-xl overflow-hidden mt-8">
                    <div className="bg-[#070707] p-5 sm:p-6">
                        <p className="text-sm font-medium text-gray-500 mb-2">Total value to LakePoint Sports</p>
                        <p className="text-3xl sm:text-4xl font-semibold text-blue-400 tracking-tight tabular-nums">{fmt(totalToLakePoint)}</p>
                        <p className="text-sm text-gray-500 mt-2 tabular-nums">{fmt(lakepointRev)} rev share + {fmt(adSpend)} directed ad spend</p>
                    </div>
                    <div className="bg-[#070707] p-5 sm:p-6">
                        <p className="text-sm font-medium text-gray-500 mb-2">Total to LakePoint + partners</p>
                        <p className="text-3xl sm:text-4xl font-semibold text-white tracking-tight tabular-nums">{fmt(totalToLakePoint + partnerRev)}</p>
                        <p className="text-sm text-gray-500 mt-2 tabular-nums">Includes {fmt(partnerRev)} paid to originating partners</p>
                    </div>
                </div>

                <p className="text-xs text-gray-600 mt-6 leading-relaxed">
                    Illustrative model. Ad-spend milestones are calculated on gross program revenue in $50,000 increments.
                    Profiles retest every 6 months - recurring volume is not reflected in this snapshot.
                </p>
            </div>
        </section>
    );
};

// --- LAKEPOINT PARTNER PROPERTIES ---
const PARTNERS: { name: string; src: string; blurb: string }[] = [
    { name: 'PBR', src: '/PBR.png', blurb: 'Surfaced to the prospect pipeline already flowing through PBR.' },
    { name: 'RYZE Basketball', src: '/RYZE.png', blurb: 'Promoted across the RYZE Basketball event circuit.' },
    { name: 'Rally Volleyball', src: '/RallyVolleyball.png', blurb: 'Distributed through Rally’s club volleyball network.' },
    { name: 'NFL FLAG', src: '/NFLFlag.png', blurb: 'Activated with the national flag football audience.' },
];

const PartnerProperties = () => (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-20 sm:mb-24">
        <div className="mb-10 sm:mb-12 max-w-2xl">
            <p className="text-sm font-medium text-blue-400 mb-3">Partner properties</p>
            <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.05] mb-4">
                Built into every LakePoint property.
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
                The Mental Scouting Profile ships through the partner brands already running events across LakePoint
                - each one promotes it, and each one earns $1 on every profile it drives.
            </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {PARTNERS.map((p) => (
                <div key={p.name} className="bg-[#070707] p-5 sm:p-7 flex flex-col">
                    <div className="rounded-xl bg-white/[0.03] border border-white/5 h-24 sm:h-28 flex items-center justify-center px-5 mb-5">
                        <img
                            src={p.src}
                            alt={p.name}
                            loading="lazy"
                            className="max-h-12 sm:max-h-14 max-w-[150px] w-auto object-contain"
                        />
                    </div>
                    <p className="text-white text-base font-semibold mb-1">{p.name}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{p.blurb}</p>
                </div>
            ))}
        </div>
    </section>
);

// --- INSET TAB NAVIGATION ---
type TabId = 'offer' | 'assessments' | 'economics' | 'distribution';

const TABS: { id: TabId; label: string }[] = [
    { id: 'offer', label: 'The Offer' },
    { id: 'assessments', label: 'The Assessments' },
    { id: 'economics', label: 'The Economics' },
    { id: 'distribution', label: 'Distribution & Rollout' },
];

// --- MAIN LANDING PAGE ---
const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const videoSectionRef = useRef<HTMLElement>(null);
  const tabSectionRef = useRef<HTMLDivElement>(null);

  const [showTestDrive, setShowTestDrive] = useState(false);
  const [showClutchReport, setShowClutchReport] = useState(false);
  const [showNterpretReport, setShowNterpretReport] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('offer');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleEnter = (view?: ViewType) => {
    onEnter('LAKEPOINT SPORTS', view);
  };

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    requestAnimationFrame(() => {
      tabSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const renderTabPanel = () => {
    switch (activeTab) {
      case 'offer':
        return (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32">
              <div className="mb-12 sm:mb-16 max-w-2xl">
                  <p className="text-sm font-medium text-blue-400 mb-3">The offer</p>
                  <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.05] mb-4">
                      One integration. Every LakePoint property.
                  </h2>
                  <p className="text-lg text-gray-400 leading-relaxed">
                      NTangible builds and operates a LakePoint-branded mental performance profile that any LakePoint partner
                      or property can sell - backed by a free collegiate discovery dashboard that turns LakePoint into
                      the place college coaches come to find talent.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  <div className="bg-[#070707] p-7 sm:p-9">
                      <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
                          <ShieldCheck size={20} className="text-blue-400" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-3">LakePoint Mental Scouting Profile</h3>
                      <p className="text-base text-gray-400 leading-relaxed mb-5">
                          A verified digital profile measuring how an athlete performs under pressure - hosted on
                          LakePoint's official database and usable across every partner and property we build assessments for.
                      </p>
                      <ul className="space-y-2.5 border-t border-white/5 pt-5">
                          <li className="text-[15px] text-gray-300 leading-relaxed flex gap-2.5"><Check size={17} className="text-blue-400 shrink-0 mt-0.5" /> Full Clutch Factor&trade; + NTerpret&trade; reports</li>
                          <li className="text-[15px] text-gray-300 leading-relaxed flex gap-2.5"><Check size={17} className="text-blue-400 shrink-0 mt-0.5" /> Personalized drills to improve performance</li>
                          <li className="text-[15px] text-gray-300 leading-relaxed flex gap-2.5"><Check size={17} className="text-blue-400 shrink-0 mt-0.5" /> Verified recruiting status inside the LakePoint dashboard</li>
                      </ul>
                  </div>
                  <div className="bg-[#070707] p-7 sm:p-9">
                      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                          <Monitor size={20} className="text-emerald-400" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-3">LakePoint Collegiate Dashboard</h3>
                      <p className="text-base text-gray-400 leading-relaxed mb-5">
                          A free, web-based portal college coaches log into to discover LakePoint talent - and see which
                          athletes align with their coaching style.
                      </p>
                      <ul className="space-y-2.5 border-t border-white/5 pt-5">
                          <li className="text-[15px] text-gray-300 leading-relaxed flex gap-2.5"><Check size={17} className="text-emerald-400 shrink-0 mt-0.5" /> Free access for every college coach across properties</li>
                          <li className="text-[15px] text-gray-300 leading-relaxed flex gap-2.5"><Check size={17} className="text-emerald-400 shrink-0 mt-0.5" /> Searchable leaderboards of LakePoint athletes</li>
                          <li className="text-[15px] text-gray-300 leading-relaxed flex gap-2.5"><Check size={17} className="text-emerald-400 shrink-0 mt-0.5" /> Positions LakePoint as the recruiting front door</li>
                      </ul>
                  </div>
              </div>

              {/* THE RECRUITING EDGE */}
              <div className="mt-16 sm:mt-20 border-t border-white/10 pt-16 sm:pt-20">
                  <div className="mb-10 sm:mb-12 max-w-2xl">
                      <p className="text-sm font-medium text-emerald-400 mb-3">The recruiting edge</p>
                      <h3 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.08] mb-4">
                          The coaches' packet, made digital - and smarter.
                      </h3>
                      <p className="text-lg text-gray-400 leading-relaxed">
                          College coaches already come to LakePoint events for talent - and today they walk away
                          with a printed packet of players. The Collegiate Dashboard turns that packet into a live,
                          searchable database, and adds a recruiting signal no one else has.
                      </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-6 sm:mb-8">
                      <div className="bg-[#070707] p-7 sm:p-9">
                          <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5">
                              <ClipboardList size={20} className="text-gray-500" />
                          </div>
                          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-2">Today</p>
                          <h4 className="text-xl font-semibold text-white tracking-tight mb-4">The in-person paper packet</h4>
                          <ul className="space-y-2.5">
                              <li className="text-[15px] text-gray-400 leading-relaxed flex gap-2.5"><span className="text-gray-600 mt-0.5">-</span> Printed at the event, outdated the moment it's handed out</li>
                              <li className="text-[15px] text-gray-400 leading-relaxed flex gap-2.5"><span className="text-gray-600 mt-0.5">-</span> Limited to whoever happens to be in the room that weekend</li>
                              <li className="text-[15px] text-gray-400 leading-relaxed flex gap-2.5"><span className="text-gray-600 mt-0.5">-</span> Stat lines and measurables - nothing on how the athlete competes</li>
                          </ul>
                      </div>
                      <div className="bg-[#070707] p-7 sm:p-9">
                          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                              <Monitor size={20} className="text-emerald-400" />
                          </div>
                          <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-widest mb-2">With LakePoint</p>
                          <h4 className="text-xl font-semibold text-white tracking-tight mb-4">The live recruiting dashboard</h4>
                          <ul className="space-y-2.5">
                              <li className="text-[15px] text-gray-300 leading-relaxed flex gap-2.5"><Check size={17} className="text-emerald-400 shrink-0 mt-0.5" /> Logged into from anywhere, current the moment a profile updates</li>
                              <li className="text-[15px] text-gray-300 leading-relaxed flex gap-2.5"><Check size={17} className="text-emerald-400 shrink-0 mt-0.5" /> Every verified athlete across every LakePoint property, searchable</li>
                              <li className="text-[15px] text-gray-300 leading-relaxed flex gap-2.5"><Check size={17} className="text-emerald-400 shrink-0 mt-0.5" /> Full mental profile and coaching fit built into every athlete</li>
                          </ul>
                      </div>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/[0.08] to-transparent p-7 sm:p-9">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6">
                          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                              <Target size={22} className="text-emerald-400" />
                          </div>
                          <div>
                              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full mb-3">
                                  <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-widest">Exclusive to LakePoint</span>
                              </div>
                              <h4 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">The Coach-Player Alignment Index</h4>
                              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
                                  Every college coach sees which LakePoint athletes actually fit their coaching style and
                                  system - a recruiting signal that exists nowhere else. It's why coaches make
                                  LakePoint their first stop, and why athletes buy a profile to be seen.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
        );

      case 'assessments':
        return (
          <>
              <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32">
                  <div className="mb-12 sm:mb-16 max-w-2xl">
                      <p className="text-sm font-medium text-blue-400 mb-3">What powers the profile</p>
                      <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.05] mb-4">
                          Two reports. One complete profile.
                      </h2>
                      <p className="text-lg text-gray-400 leading-relaxed">
                          Every athlete completes both assessments in under 15 minutes from any phone. The reports live inside the
                          LakePoint dashboard - and athletes can share them with college coaches in one tap.
                      </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      {/* NTerpret Mental Scouting Report */}
                      <div className="bg-[#070707] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                          <div className="relative px-6 sm:px-8 pt-10 sm:pt-14 pb-8 sm:pb-10 flex items-end justify-center overflow-hidden bg-gradient-to-b from-blue-500/[0.08] via-transparent to-transparent min-h-[420px] sm:min-h-[520px]">
                              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] bg-blue-500/15 blur-[100px] rounded-full pointer-events-none" />
                              <img
                                  src="/NterpretMobile.png"
                                  alt="NTerpret Mental Scouting Report on mobile"
                                  loading="lazy"
                                  decoding="async"
                                  className="relative z-10 max-h-[420px] sm:max-h-[520px] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                              />
                          </div>
                          <div className="p-6 sm:p-8 border-t border-white/5">
                              <p className="text-[11px] font-semibold text-blue-400 uppercase tracking-[0.2em] mb-2">NTerpret<sup className="text-[8px] tracking-normal ml-0.5">&trade;</sup></p>
                              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-3">Mental Scouting Report</h3>
                              <p className="text-base text-gray-400 leading-relaxed mb-6">
                                  The complete cognitive profile - how each athlete learns, leads, communicates, and competes.
                                  The report college coaches now expect alongside the highlight tape.
                              </p>
                              <button
                                  onClick={() => setShowNterpretReport(true)}
                                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                              >
                                  <FileText size={14} /> View sample NTerpret report
                              </button>
                          </div>
                      </div>

                      {/* Clutch Factor Assessment */}
                      <div className="bg-[#070707] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                          <div className="relative px-6 sm:px-8 pt-10 sm:pt-14 pb-8 sm:pb-10 flex items-end justify-center overflow-hidden bg-gradient-to-b from-blue-500/[0.08] via-transparent to-transparent min-h-[420px] sm:min-h-[520px]">
                              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] bg-blue-500/15 blur-[100px] rounded-full pointer-events-none" />
                              <img
                                  src="/ClutchMobile.png"
                                  alt="Clutch Assessment on mobile"
                                  loading="lazy"
                                  decoding="async"
                                  className="relative z-10 max-h-[420px] sm:max-h-[520px] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                              />
                          </div>
                          <div className="p-6 sm:p-8 border-t border-white/5">
                              <p className="text-[11px] font-semibold text-blue-400 uppercase tracking-[0.2em] mb-2">Clutch Factor<sup className="text-[8px] tracking-normal ml-0.5">&trade;</sup></p>
                              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-3">Clutch Factor Assessment</h3>
                              <p className="text-base text-gray-400 leading-relaxed mb-6">
                                  A standardized Clutch Factor<sup className="text-[8px] ml-0.5">&trade;</sup> score that quantifies how an
                                  athlete responds when the game is on the line. Benchmarked and tracked year over year.
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
              </section>

              {/* METHODOLOGY / TED TALK */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                      <div className="lg:col-span-5">
                          <p className="text-sm font-medium text-blue-400 mb-3">The science</p>
                          <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.05] mb-5">
                              The TED Talk behind the method.
                          </h2>
                          <p className="text-lg text-gray-400 leading-relaxed mb-4">
                              NTangible's assessments are grounded in research on how athletes actually perform under pressure
                              - the work that started with this TED Talk.
                          </p>
                          <p className="text-base text-gray-500 leading-relaxed">
                              Watch the framework that powers every NTerpret Mental Scouting Report and Clutch Factor Assessment.
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

              {/* PRODUCT TOUR VIDEO */}
              <section ref={videoSectionRef} className="max-w-5xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32">
                  <div className="mb-8 max-w-2xl">
                      <p className="text-sm font-medium text-blue-400 mb-3">Product tour</p>
                      <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.05]">
                          See what athletes and coaches will use.
                      </h2>
                  </div>

                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
                      <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/spKsM_5c0iM?autoplay=0&controls=1&rel=0&modestbranding=1"
                          title="Product Tour"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                      ></iframe>
                  </div>
              </section>
          </>
        );

      case 'economics':
        return (
          <>
              <PricingCalculator />

              {/* MARQUEE: DIRECTED AD-SPEND / REINVESTMENT ENGINE */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32">
                  <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-500/[0.10] via-blue-500/[0.03] to-transparent p-6 sm:p-12">
                      <div className="max-w-2xl mb-10 sm:mb-12">
                          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full mb-4">
                              <Megaphone size={13} className="text-blue-400" />
                              <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-widest">The reinvestment engine</span>
                          </div>
                          <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.05] mb-4">
                              Every $50K in revenue buys LakePoint $10K of reach.
                          </h2>
                          <p className="text-lg text-gray-300 leading-relaxed">
                              The committed ad spend is the engine that gets this off the ground. NTangible doesn't just
                              pay a revenue share - for every <span className="text-white font-semibold">$50,000</span> in
                              gross program revenue, we put <span className="text-white font-semibold">$10,000</span> straight
                              back into a directed ad campaign run through LakePoint Sports. The program funds its own growth.
                          </p>
                      </div>

                      {/* Revenue-increment ladder */}
                      <p className="text-sm font-medium text-blue-400 mb-3">The increment ladder</p>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-10">
                          {[
                              { rev: '$50K', spend: '$10K' },
                              { rev: '$150K', spend: '$30K' },
                              { rev: '$500K', spend: '$100K' },
                              { rev: '$1M', spend: '$200K' },
                          ].map((step) => (
                              <div key={step.rev} className="bg-[#070707] p-5 sm:p-6">
                                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-2">Gross revenue</p>
                                  <p className="text-2xl sm:text-3xl font-semibold text-white tracking-tight tabular-nums mb-4">{step.rev}</p>
                                  <div className="flex items-center gap-2 text-blue-400">
                                      <ArrowRight size={15} className="shrink-0" />
                                      <p className="text-xl sm:text-2xl font-semibold tracking-tight tabular-nums">{step.spend}</p>
                                  </div>
                                  <p className="text-[11px] text-gray-500 mt-1">directed ad spend</p>
                              </div>
                          ))}
                      </div>

                      {/* The flywheel */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                          <div className="rounded-2xl border border-white/10 bg-[#070707] p-6">
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold mb-4">1</span>
                              <h4 className="text-white text-base font-semibold mb-2">Profiles sell</h4>
                              <p className="text-gray-500 text-sm leading-relaxed">Every $10 profile across LakePoint channels stacks toward the next $50K increment.</p>
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-[#070707] p-6">
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold mb-4">2</span>
                              <h4 className="text-white text-base font-semibold mb-2">NTangible reinvests</h4>
                              <p className="text-gray-500 text-sm leading-relaxed">Each increment triggers $10K of directed ad spend, run through LakePoint Sports.</p>
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-[#070707] p-6">
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold mb-4">3</span>
                              <h4 className="text-white text-base font-semibold mb-2">Reach compounds</h4>
                              <p className="text-gray-500 text-sm leading-relaxed">More reach drives more profiles - which triggers the next campaign. The loop tightens.</p>
                          </div>
                      </div>

                      <div className="mt-8 flex items-center gap-2 text-blue-300/80">
                          <RefreshCw size={14} className="shrink-0" />
                          <p className="text-sm">The more the program earns, the harder NTangible markets LakePoint.</p>
                      </div>
                  </div>
              </section>

              {/* RECURRING REVENUE */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32">
                  <div className="bg-[#070707] border border-white/10 rounded-2xl p-7 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      <div className="lg:col-span-7">
                          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full mb-5">
                              <RefreshCw size={13} className="text-blue-400" />
                              <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-widest">Recurring revenue funnel</span>
                          </div>
                          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.1] mb-4">
                              Every profile resets the clock.
                          </h2>
                          <p className="text-lg text-gray-400 leading-relaxed">
                              Every 6 months, NTangible sends an automatic retest email so athletes can update their Clutch Factor
                              score. Each retest is another $10 profile - another $2 to LakePoint and $1 to the partner.
                              The first year's volume is just the baseline.
                          </p>
                      </div>
                      <div className="lg:col-span-5">
                          <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                              <div className="bg-[#0a0a0a] p-5">
                                  <p className="text-3xl font-semibold text-white tracking-tight tabular-nums mb-1">6 mo</p>
                                  <p className="text-sm text-gray-500">Automatic retest cadence</p>
                              </div>
                              <div className="bg-[#0a0a0a] p-5">
                                  <p className="text-3xl font-semibold text-white tracking-tight tabular-nums mb-1">2&times;+</p>
                                  <p className="text-sm text-gray-500">Profiles per athlete, per year</p>
                              </div>
                              <div className="bg-[#0a0a0a] p-5">
                                  <p className="text-3xl font-semibold text-blue-400 tracking-tight tabular-nums mb-1">$3</p>
                                  <p className="text-sm text-gray-500">To LakePoint + partner, per retest</p>
                              </div>
                              <div className="bg-[#0a0a0a] p-5">
                                  <p className="text-3xl font-semibold text-white tracking-tight tabular-nums mb-1">$0</p>
                                  <p className="text-sm text-gray-500">Added cost to acquire the retest</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* INTEGRATION & ACTIVATION */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32">
                  <div className="mb-12 sm:mb-16 max-w-2xl">
                      <p className="text-sm font-medium text-blue-400 mb-3">The commitment</p>
                      <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.05] mb-4">
                          What NTangible brings to the table.
                      </h2>
                      <p className="text-lg text-gray-400 leading-relaxed">
                          Beyond the per-profile revenue share, NTangible commits to securing official-partner status and
                          reinvesting in LakePoint's reach.
                      </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                      <div className="bg-[#070707] p-7 sm:p-8">
                          <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
                              <Trophy size={20} className="text-blue-400" />
                          </div>
                          <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight mb-2">Official partner sponsorship</h3>
                          <p className="text-base text-gray-400 leading-relaxed">
                              NTangible commits to an annual sponsorship fee to secure "Official Partner" rights with LakePoint Sports.
                          </p>
                      </div>
                      <div className="bg-[#070707] p-7 sm:p-8">
                          <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
                              <Megaphone size={20} className="text-blue-400" />
                          </div>
                          <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight mb-2">Directed ad-spend campaigns</h3>
                          <p className="text-base text-gray-400 leading-relaxed">
                              For every $50,000 in gross program revenue, NTangible directs $10,000 into an ad-spend campaign run
                              through LakePoint - revenue compounds back into reach.
                          </p>
                      </div>
                      <div className="bg-[#070707] p-7 sm:p-8">
                          <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
                              <Database size={20} className="text-blue-400" />
                          </div>
                          <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight mb-2">Front-load data agreement</h3>
                          <p className="text-base text-gray-400 leading-relaxed">
                              Initial athlete data access from partners to seed the platform - structured as an annual
                              agreement to keep driving usage.
                          </p>
                      </div>
                  </div>
              </section>
          </>
        );

      case 'distribution':
        return (
          <>
              {/* DISTRIBUTION - EVERY LAKEPOINT CHANNEL */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32">
                  <div className="mb-12 sm:mb-16 max-w-2xl">
                      <p className="text-sm font-medium text-blue-400 mb-3">Distribution</p>
                      <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.05] mb-4">
                          Pushed hard across every channel you own.
                      </h2>
                      <p className="text-lg text-gray-400 leading-relaxed">
                          This is a direct-to-consumer product engineered for volume. It moves through LakePoint's own digital
                          footprint and every partner channel we build assessments for - no field staff, no clipboards.
                      </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                      <div className="bg-[#070707] p-6 sm:p-7">
                          <Mail size={20} className="text-blue-400 mb-4" />
                          <h3 className="text-white text-base font-semibold mb-2">Dedicated email blasts</h3>
                          <p className="text-gray-500 text-sm leading-relaxed">Multiple campaigns per year to LakePoint's main mailing list and every property list.</p>
                      </div>
                      <div className="bg-[#070707] p-6 sm:p-7">
                          <Building2 size={20} className="text-blue-400 mb-4" />
                          <h3 className="text-white text-base font-semibold mb-2">Partner channels</h3>
                          <p className="text-gray-500 text-sm leading-relaxed">Every LakePoint partner and property promotes the profile - and earns $1 on every sale they drive.</p>
                      </div>
                      <div className="bg-[#070707] p-6 sm:p-7">
                          <Tv size={20} className="text-blue-400 mb-4" />
                          <h3 className="text-white text-base font-semibold mb-2">On-campus signage</h3>
                          <p className="text-gray-500 text-sm leading-relaxed">Placement on WiFi landing pages and lobby screens across LakePoint venues.</p>
                      </div>
                      <div className="bg-[#070707] p-6 sm:p-7">
                          <Send size={20} className="text-blue-400 mb-4" />
                          <h3 className="text-white text-base font-semibold mb-2">Digital-only activation</h3>
                          <p className="text-gray-500 text-sm leading-relaxed">Everything ships through existing digital touchpoints - live without an operational lift.</p>
                      </div>
                  </div>
              </section>

              {/* FRONT-LOAD STRATEGY */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32">
                  <div className="mb-12 sm:mb-16 max-w-2xl">
                      <p className="text-sm font-medium text-blue-400 mb-3">The rollout</p>
                      <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.05] mb-4">
                          Front-load the leaderboards. Then open the doors.
                      </h2>
                      <p className="text-lg text-gray-400 leading-relaxed">
                          We seed the database with elite talent first, so the dashboard has real depth on day one - then
                          bring college coaches in to a platform that already works.
                      </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      <div className="bg-[#070707] border border-white/10 rounded-2xl p-7 sm:p-9">
                          <div className="flex items-baseline gap-3 mb-4">
                              <span className="text-blue-400 text-sm font-semibold tabular-nums">Phase 1</span>
                              <span className="text-sm text-gray-500 font-medium">Seed</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-3">Pre-fill the leaderboards</h3>
                          <p className="text-base text-gray-400 leading-relaxed">
                              NTangible runs free testing for roughly <span className="text-white font-medium">500 top athletes from each property</span>,
                              so every LakePoint leaderboard launches with credible, verified depth.
                          </p>
                      </div>
                      <div className="bg-[#070707] border border-white/10 rounded-2xl p-7 sm:p-9">
                          <div className="flex items-baseline gap-3 mb-4">
                              <span className="text-emerald-400 text-sm font-semibold tabular-nums">Phase 2</span>
                              <span className="text-sm text-gray-500 font-medium">Open</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-3">Open up college coach access</h3>
                          <p className="text-base text-gray-400 leading-relaxed">
                              Provide free dashboard access to <span className="text-white font-medium">college coaches across every property</span>.
                              Demand from coaches pulls athletes into paid profiles - the flywheel starts turning.
                          </p>
                      </div>
                  </div>
              </section>

              {/* DATA & TRUST */}
              <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                      <div className="lg:col-span-5">
                          <p className="text-sm font-medium text-blue-400 mb-3">Data &amp; trust</p>
                          <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.05] mb-5">
                              LakePoint-branded. LakePoint-controlled.
                          </h2>
                          <p className="text-lg text-gray-400 leading-relaxed mb-4">
                              The profile carries LakePoint's name and lives on LakePoint's official database. NTangible operates
                              it - LakePoint owns the relationship with its athletes.
                          </p>
                          <p className="text-base text-gray-500 leading-relaxed">
                              We measure how athletes learn, compete, and handle pressure - never psychological labels, never
                              anything that follows the athlete outside the platform.
                          </p>
                      </div>
                      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                          <div className="bg-[#070707] p-6">
                              <p className="text-white text-base font-semibold mb-2">Hosted on LakePoint's database</p>
                              <p className="text-gray-500 text-sm leading-relaxed">Verified profiles sit on the official campus database, branded as a LakePoint product.</p>
                          </div>
                          <div className="bg-[#070707] p-6">
                              <p className="text-white text-base font-semibold mb-2">COPPA-aligned</p>
                              <p className="text-gray-500 text-sm leading-relaxed">For athletes 13-18, with parental consent built into onboarding for every athlete.</p>
                          </div>
                          <div className="bg-[#070707] p-6">
                              <p className="text-white text-base font-semibold mb-2">Opt-out anytime</p>
                              <p className="text-gray-500 text-sm leading-relaxed">Families can remove an athlete's profile at any time. We delete everything we hold on them.</p>
                          </div>
                          <div className="bg-[#070707] p-6">
                              <p className="text-white text-base font-semibold mb-2">Growth, not diagnosis</p>
                              <p className="text-gray-500 text-sm leading-relaxed">We measure how athletes compete and handle pressure - not personality or clinical labels.</p>
                          </div>
                      </div>
                  </div>
              </section>
          </>
        );

      default:
        return null;
    }
  };

  const renderTabPager = () => {
    const currentIndex = TABS.findIndex((t) => t.id === activeTab);
    const nextTab = TABS[currentIndex + 1];

    if (nextTab) {
      return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <button
                onClick={() => handleTabChange(nextTab.id)}
                className="group w-full flex items-center justify-between gap-4 sm:gap-6 rounded-2xl border border-white/10 bg-[#070707] hover:border-blue-500/40 hover:bg-[#0a0b0f] p-6 sm:p-8 transition-all text-left"
            >
                <div>
                    <p className="text-[11px] font-semibold text-blue-400 uppercase tracking-widest mb-1.5">
                        Next &middot; {String(currentIndex + 2).padStart(2, '0')} of {String(TABS.length).padStart(2, '0')}
                    </p>
                    <p className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                        {nextTab.label}
                    </p>
                </div>
                <span className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-500 group-hover:bg-blue-400 text-white flex items-center justify-center transition-all group-hover:translate-x-0.5">
                    <ArrowRight size={22} />
                </span>
            </button>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-500/[0.08] to-transparent p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6">
              <div className="max-w-md">
                  <p className="text-[11px] font-semibold text-blue-300 uppercase tracking-widest mb-1.5">
                      That's the full proposal
                  </p>
                  <p className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                      You've seen every section. Let's make it official.
                  </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                  <button
                      onClick={() => handleTabChange('offer')}
                      className="inline-flex items-center justify-center text-gray-300 hover:text-white border border-white/10 hover:border-white/25 text-sm font-medium px-4 py-3 rounded-lg transition-colors"
                  >
                      Back to start
                  </button>
                  <button
                      onClick={() => setShowBooking(true)}
                      className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold px-5 py-3 rounded-lg transition-colors"
                  >
                      Book a call <ArrowRight size={15} />
                  </button>
              </div>
          </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-[#050505] text-white relative font-sans selection:bg-blue-500 selection:text-white flex flex-col scroll-smooth ${showClutchReport || showNterpretReport ? 'h-screen overflow-hidden' : 'overflow-y-auto overflow-x-hidden'}`}>

      <style>{`
        @keyframes lpTabFade {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .lp-tab-panel { animation: lpTabFade 0.35s ease-out; }
        .lp-no-scrollbar::-webkit-scrollbar { display: none; }
        .lp-no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Background ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full"></div>
      </div>

      {/* Header / Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 h-16 flex items-center justify-between backdrop-blur-md border-b border-white/5 bg-black/60">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleEnter()}>
              <Logo className="text-white" size="small" />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
              <button
                  onClick={() => setShowBooking(true)}
                  className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
              >
                  Book a call
              </button>
          </div>
      </nav>

      {/* Main Content Container */}
      <div className="relative z-10 w-full pt-28 sm:pt-32 pb-20">

          {/* HERO SECTION */}
          <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20 text-center relative">
              <div className={`flex justify-center mb-7 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'} transition-all duration-700`}>
                  <img
                      src="/LakePoint.png"
                      alt="LakePoint Sports"
                      className="h-20 sm:h-24 w-auto object-contain drop-shadow-[0_10px_40px_rgba(37,99,235,0.25)]"
                  />
              </div>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-8 ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                  <span className="inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                  <span className="text-[11px] font-medium text-gray-300 tracking-wide">Partnership Proposal &middot; NTangible &times; LakePoint Sports</span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight mb-6 leading-[1.02] text-white">
                  The LakePoint <span className="text-blue-400">Mental Scouting Profile.</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                  A verified digital profile that measures an athlete's mental performance - hosted on LakePoint's
                  official database, sold across every LakePoint channel and partner property for the price of a t-shirt.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 sm:mb-16 max-w-md sm:max-w-none mx-auto">
                 <button
                    onClick={() => setShowBooking(true)}
                    className="w-full sm:w-auto bg-blue-500 hover:bg-blue-400 text-white px-8 py-3.5 rounded-lg font-semibold text-base transition-colors flex items-center justify-center gap-2"
                 >
                    Book an integration call <ArrowRight size={16} />
                 </button>

                 <button
                    onClick={() => handleTabChange('economics')}
                    className="w-full sm:w-auto text-gray-300 hover:text-white px-8 py-3.5 rounded-lg font-medium text-base transition-colors flex items-center justify-center gap-2"
                 >
                    See the economics
                 </button>
              </div>

              {/* Secondary Actions */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8">
                  <button
                    onClick={() => setShowReportModal(true)}
                    className="text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-white/40"
                  >
                      See a sample profile
                  </button>
                  <button
                    onClick={() => setShowTestDrive(true)}
                    className="text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-white/40"
                  >
                      Try a sample assessment
                  </button>
                  <button
                    onClick={() => handleEnter()}
                    className="hidden sm:inline-flex text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-white/40"
                  >
                      Explore the LakePoint dashboard
                  </button>
              </div>
          </section>

          {/* SOCIAL PROOF / TRUSTED TEAMS TICKER */}
          <div className="w-full mb-16 sm:mb-20">
              <TrustedTeams />
          </div>

          {/* LAKEPOINT PARTNER PROPERTIES */}
          <PartnerProperties />

          {/* INSET TABBED SECTION */}
          <div className="mb-24 sm:mb-32">
              {/* Section navigator prompt */}
              <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-5 sm:mb-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-3">
                      <LayoutGrid size={13} className="text-blue-400" />
                      <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-widest">Explore the proposal</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-1.5">
                      Click through each section.
                  </h2>
                  <p className="text-base text-gray-400 leading-relaxed">
                      Pick a tab below - the content swaps in place, so there's no endless scrolling.
                  </p>
              </div>

              {/* Sticky inset tab bar */}
              <div
                  ref={tabSectionRef}
                  className="sticky top-16 z-40 scroll-mt-16 bg-[#070709]/90 backdrop-blur-xl border-y border-white/10 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.85)]"
              >
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                      <div className="overflow-x-auto lp-no-scrollbar">
                          <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-2xl border border-white/10 bg-white/[0.05]">
                              {TABS.map((t, i) => (
                                  <button
                                      key={t.id}
                                      onClick={() => handleTabChange(t.id)}
                                      className={`group shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-[13px] sm:text-sm font-semibold transition-all whitespace-nowrap ${
                                          activeTab === t.id
                                              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                              : 'text-gray-400 hover:text-white hover:bg-white/[0.07]'
                                      }`}
                                  >
                                      <span className={`text-[11px] font-bold tabular-nums ${activeTab === t.id ? 'text-blue-200' : 'text-gray-600 group-hover:text-gray-400'}`}>
                                          {String(i + 1).padStart(2, '0')}
                                      </span>
                                      {t.label}
                                  </button>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>

              {/* Active tab panel */}
              <div key={activeTab} className="lp-tab-panel pt-12 sm:pt-16">
                  {renderTabPanel()}
                  {renderTabPager()}
              </div>
          </div>

          {/* PULL QUOTE */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32">
              <figure className="border-l-2 border-blue-500 pl-6 sm:pl-8">
                  <blockquote className="text-2xl sm:text-3xl md:text-4xl text-white font-medium leading-snug tracking-tight mb-4">
                      "Full mental data plus college access - <span className="text-blue-400">for the price of a t-shirt.</span>"
                  </blockquote>
                  <figcaption className="text-sm text-gray-500">
                      The consumer offer that makes LakePoint the standard.
                  </figcaption>
              </figure>
          </section>

          {/* FINAL CTA */}
          <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32">
              <div className="border-t border-white/10 pt-16 sm:pt-20 text-center">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.05] mb-5">
                      Let's make it official.
                  </h2>
                  <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
                      We'll walk through the integration, the rollout plan, and the numbers behind the LakePoint Mental
                      Scouting Profile. 15 minutes, no slides.
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

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/10 bg-black/60 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
                  <div className="col-span-2 sm:col-span-1">
                      <Logo className="text-white opacity-90 mb-4" size="small" showLabel={false} />
                      <p className="text-sm text-gray-500 leading-relaxed">
                          An integration proposal for LakePoint Sports.
                      </p>
                  </div>
                  <div>
                      <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Proposal</p>
                      <ul className="space-y-2.5 text-sm">
                          <li><button onClick={() => handleTabChange('offer')} className="text-gray-400 hover:text-white transition-colors">The offer</button></li>
                          <li><button onClick={() => handleTabChange('economics')} className="text-gray-400 hover:text-white transition-colors">Economics</button></li>
                          <li><button onClick={() => handleTabChange('distribution')} className="text-gray-400 hover:text-white transition-colors">Distribution &amp; rollout</button></li>
                          <li><button onClick={() => handleEnter()} className="text-gray-400 hover:text-white transition-colors">LakePoint dashboard</button></li>
                      </ul>
                  </div>
                  <div>
                      <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Explore</p>
                      <ul className="space-y-2.5 text-sm">
                          <li><button onClick={() => setShowTestDrive(true)} className="text-gray-400 hover:text-white transition-colors">Sample assessments</button></li>
                          <li><button onClick={() => setShowReportModal(true)} className="text-gray-400 hover:text-white transition-colors">Sample profile</button></li>
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
                  <span>&copy; 2026 NTangible, Inc. - Proposal for LakePoint Sports</span>
                  <div className="flex gap-5">
                      <span>COPPA-aligned</span>
                      <span>Encrypted data</span>
                      <span>LakePoint-branded</span>
                  </div>
              </div>
          </div>
      </footer>

      {/* Interactive Modals */}
      <Suspense fallback={null}>
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
      </Suspense>

    </div>
  );
};

export default LandingPage;
