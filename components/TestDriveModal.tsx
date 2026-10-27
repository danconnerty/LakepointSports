
import React, { useState } from 'react';
import { X, ChevronRight, Activity, ArrowLeft, ExternalLink } from 'lucide-react';

const SPORTS = [
    { id: 'baseball', label: 'Baseball' },
    { id: 'mbb', label: 'Basketball (Mens)' },
    { id: 'wbb', label: 'Basketball (Womens)' },
    { id: 'football', label: 'Football' },
    { id: 'mgolf', label: 'Golf (Mens)' },
    { id: 'wgolf', label: 'Golf (Womens)' },
    { id: 'hockey', label: 'Hockey (Mens)' },
    { id: 'whockey', label: 'Hockey (Womens)' },
    { id: 'mvb', label: 'Indoor Volleyball (Mens)' },
    { id: 'wvb', label: 'Indoor Volleyball (Womens)' },
    { id: 'softball', label: 'Softball' },
    { id: 'msoc', label: 'Soccer (Mens)' },
    { id: 'wsoc', label: 'Soccer (Womens)' },
];

const SPORT_LINKS: Record<string, string> = {
    baseball: 'https://portal.ntangible.co/register/baseballdemo',
    mbb: 'https://portal.ntangible.co/register/demobasketball',
    wbb: 'https://portal.ntangible.co/register/wbasketballdemo',
    football: 'https://portal.ntangible.co/register/footballdemo',
    mgolf: 'https://portal.ntangible.co/register/8963c8054d013cc8d22c709a',
    wgolf: 'https://portal.ntangible.co/register/531bea6fd7b3dd4fac63673a',
    hockey: 'https://portal.ntangible.co/register/hockeydemo',
    whockey: 'https://portal.ntangible.co/register/07b9b3171f853d818ed6f710',
    mvb: 'https://portal.ntangible.co/register/mvolleyballdemo',
    wvb: 'https://portal.ntangible.co/register/wvolleyballdemo',
    softball: 'https://portal.ntangible.co/register/softballdemo',
    msoc: 'https://portal.ntangible.co/register/msoccerdemo',
    wsoc: 'https://portal.ntangible.co/register/wsoccerdemo'
};

interface TestDriveModalProps {
    onClose: () => void;
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({ onClose }) => {
    const [selectedSport, setSelectedSport] = useState<{id: string, label: string} | null>(null);

    const handleOpenTest = () => {
        if (!selectedSport) return;
        
        const url = SPORT_LINKS[selectedSport.id];
        if (url) {
            window.open(url, '_blank');
        } else {
            alert("Configuration error: Links not found for this sport.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-4xl bg-[#0f1115] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-800 flex justify-between items-center bg-[#0f1115]">
                    <div className="flex items-center gap-4">
                        {selectedSport && (
                            <button 
                                onClick={() => setSelectedSport(null)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                        )}
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                {selectedSport ? selectedSport.label : 'Select Sport'}
                            </h2>
                            <p className="text-sm text-gray-400">
                                {selectedSport ? 'One assessment, two reports.' : 'Choose a sport to access testing links.'}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar bg-[#0f1115]">
                    {!selectedSport ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {SPORTS.map((sport) => (
                                <button
                                    key={sport.id}
                                    onClick={() => setSelectedSport(sport)}
                                    className="flex items-center justify-between p-4 bg-[#181b21] hover:bg-[#22262e] border border-gray-800 hover:border-blue-500/30 rounded-xl transition-all group text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-800 rounded-lg text-gray-400 group-hover:text-blue-400 group-hover:bg-blue-900/20 transition-colors">
                                            <Activity size={18} />
                                        </div>
                                        <span className="font-semibold text-gray-200 group-hover:text-white transition-colors">
                                            {sport.label}
                                        </span>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-600 group-hover:text-gray-300 transition-colors" />
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4 max-w-3xl mx-auto">
                            
                            {/* Test Card - Clutch Factor + NTerpret */}
                            <button 
                                onClick={handleOpenTest}
                                className="w-full group relative p-6 bg-[#181b21] hover:bg-[#22262e] border border-gray-800 hover:border-blue-500/50 rounded-xl transition-all cursor-pointer text-left"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-900/20 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                            <Activity size={20} />
                                        </div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Clutch Factor™ + NTerpret™ Assessment</h3>
                                        <span className="ml-2 px-2 py-0.5 bg-green-900/20 text-green-400 border border-green-900/30 text-[10px] font-bold uppercase rounded tracking-wider">
                                            Active
                                        </span>
                                    </div>
                                    <ExternalLink size={18} className="text-gray-500 group-hover:text-white transition-colors" />
                                </div>
                                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors pl-[52px]">
                                    One assessment, two reports. Your Clutch Factor™ scores how you perform in high-leverage moments on a 1,000-point scale. Your NTerpret™ mental scouting report shows how you learn, communicate, and compete.
                                </p>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
