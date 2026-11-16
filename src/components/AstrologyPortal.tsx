import React, { useState } from 'react';
import { ZODIAC_SIGNS, ZodiacSignInfo } from '../data/zodiacData';
import { KundliPredictionPane } from './KundliPredictionPane';
import { X, Sparkles, Moon, Sun, Compass, Share2, Check } from 'lucide-react';

interface AstrologyPortalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'kundli' | 'daily';
}

export const AstrologyPortal: React.FC<AstrologyPortalProps> = ({
  isOpen,
  onClose,
  initialTab = 'kundli'
}) => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSignInfo>(ZODIAC_SIGNS[0]);
  const [activeTab, setActiveTab] = useState<'kundli' | 'daily'>(initialTab);
  const [copied, setCopied] = useState(false);

  // Sync activeTab when initialTab changes
  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  if (!isOpen) return null;

  const handleShare = () => {
    const text = `Celestial Stars Horoscope for ${selectedSign.name} (${selectedSign.symbol}): ${selectedSign.todayHoroscope.overview}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="liquid-glass w-full max-w-6xl max-h-[92vh] rounded-3xl flex flex-col text-white overflow-hidden shadow-2xl relative"
        style={{
          boxShadow: '0 0 80px rgba(0, 0, 0, 0.95), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
        }}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="liquid-glass-circle w-10 h-10 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2
                className="font-serif-instrument text-2xl tracking-tight text-white"
                style={{ textShadow: '0 0 20px rgba(0,0,0,0.5)' }}
              >
                Celestial Stars <em className="italic">Portal</em>
              </h2>
              <p className="text-white/60 text-xs">
                Vedic Kundli prediction and daily cosmic horoscopes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close portal"
            className="liquid-glass-circle w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation - FIRST PANE ON LEFT IS KUNDLI PREDICTION */}
        <div className="px-6 pt-4 pb-2 border-b border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('kundli')}
            className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'kundli'
                ? 'bg-white text-black font-semibold shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>✨ Kundli Prediction</span>
          </button>
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'daily'
                ? 'bg-white text-black font-semibold shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            Daily Horoscope
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: KUNDLI PREDICTION (FIRST PANE ON LEFT) */}
          {activeTab === 'kundli' && (
            <div className="animate-in fade-in duration-200">
              <KundliPredictionPane />
            </div>
          )}

          {/* TAB 2: DAILY HOROSCOPE */}
          {activeTab === 'daily' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Zodiac Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-wider text-white/50 font-medium">
                    Choose Zodiac Constellation
                  </span>
                  <span className="text-xs text-white/80 font-mono">
                    {selectedSign.name} · {selectedSign.dates}
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
                  {ZODIAC_SIGNS.map((sign) => {
                    const isSelected = sign.id === selectedSign.id;
                    return (
                      <button
                        key={sign.id}
                        onClick={() => setSelectedSign(sign)}
                        title={`${sign.name} (${sign.dates})`}
                        className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white text-black scale-105 shadow-md'
                            : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-white/10'
                        }`}
                      >
                        <span className="text-lg leading-none mb-1 font-serif">{sign.symbol}</span>
                        <span className="text-[10px] tracking-tight font-medium truncate w-full text-center">
                          {sign.name.slice(0, 3)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sign Identity Header Card */}
              <div className="liquid-glass rounded-2xl p-5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="liquid-glass-circle w-16 h-16 rounded-full flex items-center justify-center text-3xl font-serif">
                    {selectedSign.symbol}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-serif-instrument tracking-tight">
                        {selectedSign.name}
                      </h3>
                      <span className="text-xs bg-white/10 px-2.5 py-0.5 rounded-full text-white/80 border border-white/10">
                        {selectedSign.element} Element
                      </span>
                      <span className="text-xs bg-white/10 px-2.5 py-0.5 rounded-full text-white/80 border border-white/10">
                        Planet: {selectedSign.rulingPlanet}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 mt-1">
                      Cosmic Alignment:{' '}
                      <span className="text-white/90 font-mono">
                        {selectedSign.todayHoroscope.cosmicAlignment}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-white/50">Stellar Energy</div>
                    <div className="text-xl font-mono font-bold text-white">
                      {selectedSign.todayHoroscope.energyScore}%
                    </div>
                  </div>
                  <button
                    onClick={handleShare}
                    className="liquid-glass-circle w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
                    title="Copy & share daily horoscope"
                  >
                    {copied ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Main Daily Forecast Card */}
              <div className="liquid-glass rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/50 mb-3">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Today's Cosmic Oracle</span>
                </div>
                <p
                  className="font-serif-instrument text-xl md:text-2xl leading-relaxed text-white/95"
                  style={{ textShadow: '0 0 24px rgba(0,0,0,0.4)' }}
                >
                  "{selectedSign.todayHoroscope.overview}"
                </p>

                {/* 3 Pillars: Love, Career, Spirituality */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-white/10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-white/60 font-medium">
                      <Moon className="w-3.5 h-3.5 text-white/80" />
                      <span>Love & Connections</span>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed">
                      {selectedSign.todayHoroscope.love}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-white/60 font-medium">
                      <Sun className="w-3.5 h-3.5 text-white/80" />
                      <span>Career & Purpose</span>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed">
                      {selectedSign.todayHoroscope.career}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-white/60 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-white/80" />
                      <span>Spiritual Essence</span>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed">
                      {selectedSign.todayHoroscope.spirituality}
                    </p>
                  </div>
                </div>

                {/* Lucky Numbers & Traits */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-white/5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-white/50">Lucky Numbers:</span>
                    <div className="flex gap-1.5">
                      {selectedSign.todayHoroscope.luckyNumbers.map((num) => (
                        <span key={num} className="font-mono bg-white/10 px-2 py-0.5 rounded-full text-white/90">
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <span>Key Archetypes:</span>
                    <span className="text-white/90">{selectedSign.traits.join(' · ')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
          <span>Vedic Kundli & Daily Horoscopes</span>
          <button
            onClick={onClose}
            className="text-white hover:underline text-xs cursor-pointer font-medium"
          >
            Return to Starfield
          </button>
        </div>
      </div>
    </div>
  );
};
