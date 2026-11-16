import React, { useState } from 'react';
import { SparklesText } from "@/registry/magicui/sparkles-text";
import { VedicKundliChart } from './VedicKundliChart';
import {
  Sparkles,
  Heart,
  Coins,
  Users,
  Compass,
  Calendar,
  Clock,
  MapPin,
  User,
  Copy,
  Check,
  RotateCcw,
  AlertCircle,
  FileText,
  ShieldCheck,
  Flower2
} from 'lucide-react';

interface ParsedKundli {
  overview: string;
  health: string;
  wealth: string;
  career: string;
  relationships: string;
  remedies: string;
  rawText: string;
}

export const KundliPredictionPane: React.FC = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('06:30');
  const [pob, setPob] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [reading, setReading] = useState<ParsedKundli | null>(null);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'markdown'>('cards');

  const loadingSteps = [
    'Validating birth coordinates & ephemeris...',
    'Erecting Janam Kundli D1 Lagna chart...',
    'Analyzing Kendra & Trikona house placements...',
    'Evaluating planetary aspects & Mahadasha cycles...',
    'Synthesizing Health, Wealth, Career, Relationships & Remedies...'
  ];

  const parseKundliResponse = (text: string): ParsedKundli => {
    const extractSection = (headingRegex: RegExp, nextHeadingRegex: RegExp): string => {
      const match = text.match(headingRegex);
      if (!match) return '';
      const startIndex = match.index! + match[0].length;
      const sub = text.slice(startIndex);
      const nextMatch = sub.match(nextHeadingRegex);
      const endIndex = nextMatch ? nextMatch.index! : sub.length;
      return sub.slice(0, endIndex).trim();
    };

    const overview = extractSection(/###?\s*Kundli Overview/i, /###?\s*Health Predictions/i);
    const health = extractSection(/###?\s*Health Predictions/i, /###?\s*Wealth Predictions/i);
    const wealth = extractSection(/###?\s*Wealth Predictions/i, /###?\s*Career Predictions/i);
    const career = extractSection(/###?\s*Career Predictions/i, /###?\s*Relationship Predictions/i);
    const relationships = extractSection(/###?\s*Relationship Predictions/i, /###?\s*Suggested Remedies/i);
    const remedies = extractSection(/###?\s*Suggested Remedies/i, /$/);

    return {
      overview: overview || text.slice(0, 300),
      health: health || 'Vitality supported by mindful daily pacing, hydration, and gentle breathwork.',
      wealth: wealth || 'Disciplined long-term compounding and skill-based investments bring steady prosperity.',
      career: career || 'Strategic leadership and analytical foresight position you for major professional elevation.',
      relationships: relationships || 'Deep mutual loyalty and authentic communication foster enduring harmony.',
      remedies: remedies || 'Daily meditation, wearing auspicious colors, and charitable seva align planetary karma.',
      rawText: text
    };
  };

  const handlePredictKundli = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !dob || !pob) {
      setError('Please provide Name, Date of Birth (DOB), and Place of Birth.');
      return;
    }

    setLoading(true);
    setError(null);
    setNotice(null);
    setReading(null);

    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % loadingSteps.length;
      setLoadingStep(step);
    }, 1200);

    try {
      const res = await fetch('/api/predict-kundli', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, dob, tob, pob })
      });

      const data = await res.json();
      clearInterval(interval);

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate Kundli prediction.');
      }

      if (data.notice) {
        setNotice(data.notice);
      }

      const parsed = parseKundliResponse(data.reading || '');
      setReading(parsed);
    } catch (err: any) {
      clearInterval(interval);
      let errMsg = err?.message || 'Error connecting to astrological prediction service.';
      try {
        if (errMsg.includes('{"error":')) {
          const jsonStart = errMsg.indexOf('{');
          const parsedErr = JSON.parse(errMsg.slice(jsonStart));
          if (parsedErr?.error?.message) {
            errMsg = parsedErr.error.message;
          }
        }
      } catch {
        // keep fallback
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!reading) return;
    navigator.clipboard.writeText(reading.rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setReading(null);
    setError(null);
    setNotice(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* LEFT PANE - KUNDLI INPUTS & SPARKLE CTA BUTTON */}
      <div className="lg:col-span-5 space-y-5">
        <div className="liquid-glass rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="liquid-glass-circle w-11 h-11 rounded-full flex items-center justify-center text-lg font-serif">
              ॐ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-instrument text-2xl tracking-tight text-white">
                  Kundli <em className="italic">Prediction</em>
                </h3>
                <span className="text-[10px] uppercase font-mono tracking-wider bg-white/10 px-2 py-0.5 rounded-full text-white/90 border border-white/15">
                  Vedic Janam
                </span>
              </div>
              <p className="text-white/60 text-xs mt-0.5">
                Enter birth details to generate full Vedic planetary reading
              </p>
            </div>
          </div>

          {notice && (
            <div className="p-3 rounded-2xl bg-white/5 border border-white/15 flex items-start gap-2 text-xs text-white/80">
              <AlertCircle className="w-4 h-4 text-white/90 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{notice}</span>
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-2xl bg-red-950/30 border border-red-500/30 text-xs text-red-200">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handlePredictKundli} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs text-white/80 mb-1.5 flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5 text-white/60" />
                <span>Name *</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Maya Sterling"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
              />
            </div>

            {/* Select DOB */}
            <div>
              <label className="block text-xs text-white/80 mb-1.5 flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-white/60" />
                <span>Select Date of Birth (DOB) *</span>
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
              />
            </div>

            {/* Time of Birth */}
            <div>
              <label className="block text-xs text-white/80 mb-1.5 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-white/60" />
                <span>Time of Birth (TOB)</span>
              </label>
              <input
                type="time"
                value={tob}
                onChange={(e) => setTob(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
              />
              <span className="text-[10px] text-white/40 mt-1 block">
                Leave default or enter solar birth time.
              </span>
            </div>

            {/* Place of Birth */}
            <div>
              <label className="block text-xs text-white/80 mb-1.5 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-white/60" />
                <span>Place of Birth (City, Country) *</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. San Francisco, USA or Mumbai, India"
                value={pob}
                onChange={(e) => setPob(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
              />
            </div>

            {/* Sample Button */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => {
                  setName('Aria Varma');
                  setDob('1997-11-18');
                  setTob('08:45');
                  setPob('Varanasi, India');
                }}
                className="text-[11px] text-white/50 hover:text-white underline cursor-pointer"
              >
                Auto-fill Sample (Aria · Nov 18, 1997)
              </button>
            </div>

            {/* PREDICT KUNDLI BUTTON WITH SPARKLE TEXT */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-semibold rounded-full py-4 px-6 text-sm tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl disabled:opacity-75 disabled:pointer-events-none group"
              >
                {loading ? (
                  <div className="flex items-center gap-2.5 text-xs">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span className="font-medium truncate max-w-[240px]">
                      {loadingSteps[loadingStep]}
                    </span>
                  </div>
                ) : (
                  <SparklesText
                    className="text-black font-semibold text-sm tracking-wide"
                    sparklesCount={7}
                    colors={{ first: '#18181B', second: '#CA8A04' }}
                  >
                    Predict Kundli
                  </SparklesText>
                )}
              </button>
            </div>
          </form>

          {/* Feature highlights footer */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-white/70" />
              <span>Vedic Ephemeris Verified</span>
            </span>
            <span className="font-mono text-white/70">D1 Lagna Chart</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANE - JANAM KUNDLI PREDICTIONS & CHART */}
      <div className="lg:col-span-7 space-y-5">
        {loading ? (
          /* LOADING PROGRESSIVE STATE */
          <div className="liquid-glass rounded-3xl p-10 border border-white/15 flex flex-col items-center justify-center text-center space-y-5 min-h-[480px]">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-white/10 border-t-white animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center font-serif text-2xl text-white">
                ॐ
              </div>
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="font-serif-instrument text-2xl tracking-tight text-white">
                Calculating Janam Kundli
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-mono">
                {loadingSteps[loadingStep]}
              </p>
            </div>

            <div className="flex gap-1.5 pt-2">
              {loadingSteps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === loadingStep ? 'bg-white scale-125' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : reading ? (
          /* PREDICTIONS RENDERED */
          <div className="space-y-5 animate-in fade-in duration-300">
            {/* Header / Actions Card */}
            <div className="liquid-glass rounded-3xl p-5 border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-white/50">
                  Calculated Janam Kundli
                </span>
                <h3 className="font-serif-instrument text-2xl tracking-tight text-white mt-0.5">
                  Vedic Astrological Reading for <em className="italic">{name}</em>
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode(viewMode === 'cards' ? 'markdown' : 'cards')}
                  className="px-3 py-1.5 rounded-full border border-white/20 text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {viewMode === 'cards' ? 'Raw View' : 'Card View'}
                </button>
                <button
                  onClick={handleCopy}
                  className="liquid-glass-circle w-9 h-9 rounded-full flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
                  title="Copy Reading"
                >
                  {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleReset}
                  className="liquid-glass-circle w-9 h-9 rounded-full flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
                  title="New Kundli"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Vedic Diamond Chart Visualizer */}
            <VedicKundliChart name={name} dob={dob} />

            {/* 6 Sections Display */}
            {viewMode === 'cards' ? (
              <div className="space-y-4">
                {/* 1. Kundli Overview */}
                <div className="liquid-glass rounded-2xl p-5 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-white">
                    <FileText className="w-4 h-4 text-white/80" />
                    <h4 className="font-serif-instrument text-xl tracking-tight">Kundli Overview</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed whitespace-pre-line">
                    {reading.overview}
                  </p>
                </div>

                {/* 2. Health Predictions & 3. Wealth Predictions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Health */}
                  <div className="liquid-glass rounded-2xl p-5 border border-white/10 space-y-2 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                        <Heart className="w-3.5 h-3.5 text-rose-300" />
                      </div>
                      <h4 className="font-serif-instrument text-lg tracking-tight">Health Predictions</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                      {reading.health}
                    </p>
                  </div>

                  {/* Wealth */}
                  <div className="liquid-glass rounded-2xl p-5 border border-white/10 space-y-2 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                        <Coins className="w-3.5 h-3.5 text-amber-300" />
                      </div>
                      <h4 className="font-serif-instrument text-lg tracking-tight">Wealth Predictions</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                      {reading.wealth}
                    </p>
                  </div>
                </div>

                {/* 4. Career Predictions & 5. Relationship Predictions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Career */}
                  <div className="liquid-glass rounded-2xl p-5 border border-white/10 space-y-2 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <Compass className="w-3.5 h-3.5 text-cyan-300" />
                      </div>
                      <h4 className="font-serif-instrument text-lg tracking-tight">Career Predictions</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                      {reading.career}
                    </p>
                  </div>

                  {/* Relationships */}
                  <div className="liquid-glass rounded-2xl p-5 border border-white/10 space-y-2 hover:bg-white/[0.08] transition-colors">
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                        <Users className="w-3.5 h-3.5 text-purple-300" />
                      </div>
                      <h4 className="font-serif-instrument text-lg tracking-tight">Relationship Predictions</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                      {reading.relationships}
                    </p>
                  </div>
                </div>

                {/* 6. Suggested Remedies */}
                <div className="liquid-glass rounded-2xl p-5 border border-white/20 bg-white/[0.04] space-y-2.5">
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <Flower2 className="w-3.5 h-3.5 text-emerald-300" />
                    </div>
                    <h4 className="font-serif-instrument text-xl tracking-tight">Suggested Remedies</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed whitespace-pre-line">
                    {reading.remedies}
                  </p>
                </div>
              </div>
            ) : (
              <div className="liquid-glass rounded-2xl p-6 border border-white/10 font-sans text-xs leading-relaxed text-white/90 whitespace-pre-wrap">
                {reading.rawText}
              </div>
            )}
          </div>
        ) : (
          /* WAITING PREVIEW STATE */
          <div className="liquid-glass rounded-3xl p-8 border border-white/10 flex flex-col items-center justify-center text-center space-y-5 min-h-[440px]">
            <div className="liquid-glass-circle w-16 h-16 rounded-full flex items-center justify-center text-3xl font-serif">
              ✨
            </div>

            <div className="space-y-2 max-w-sm">
              <h3 className="font-serif-instrument text-3xl tracking-tight text-white">
                Awaiting Birth Coordinates
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Enter your Name, Date of Birth, Time of Birth, and Birth Place in the left pane. Click <strong className="text-white">Predict Kundli</strong> to generate your Janam Kundli chart and Vedic predictions.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full max-w-xs pt-2 text-[10px] text-white/50 font-mono">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">12 Houses</div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">9 Grahas</div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">Mahadashas</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
