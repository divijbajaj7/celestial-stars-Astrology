import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, FastForward, Sparkles, Compass, Eye, Info } from 'lucide-react';

interface PlanetConfig {
  name: string;
  symbol: string;
  archetype: string;
  rulingSign: string;
  astrologicalMeaning: string;
  radius: number; // orbital radius in px (scaled)
  size: number; // planet display radius
  speed: number; // orbital speed multiplier
  color: string;
  glowColor: string;
  currentSign: string;
  degree: string;
  hasRing?: boolean;
  hasMoon?: boolean;
}

const PLANETS: PlanetConfig[] = [
  {
    name: 'Mercury',
    symbol: '☿',
    archetype: 'The Messenger of the Gods',
    rulingSign: 'Gemini & Virgo',
    astrologicalMeaning: 'Mental agility, commerce, intellectual transmission, and synchronicities.',
    radius: 48,
    size: 3.5,
    speed: 0.040,
    color: '#e2e8f0',
    glowColor: 'rgba(255, 255, 255, 0.4)',
    currentSign: 'Aquarius',
    degree: '14°22\''
  },
  {
    name: 'Venus',
    symbol: '♀',
    archetype: 'The Principle of Attraction',
    rulingSign: 'Taurus & Libra',
    astrologicalMeaning: 'Aesthetic balance, romantic resonance, sensory delight, and moral value.',
    radius: 74,
    size: 5,
    speed: 0.026,
    color: '#f8fafc',
    glowColor: 'rgba(255, 255, 255, 0.5)',
    currentSign: 'Pisces',
    degree: '28°04\''
  },
  {
    name: 'Earth',
    symbol: '♁',
    archetype: 'The Sovereign Living Temple',
    rulingSign: 'Gaia Sphere',
    astrologicalMeaning: 'Physical grounding, tangible manifestation, and conscious incarnation.',
    radius: 104,
    size: 5.5,
    speed: 0.018,
    color: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.6)',
    currentSign: 'Libra',
    degree: '18°45\'',
    hasMoon: true
  },
  {
    name: 'Mars',
    symbol: '♂',
    archetype: 'The Sacred Initiator',
    rulingSign: 'Aries & Scorpio',
    astrologicalMeaning: 'Primal willpower, courage, physical stamina, and righteous boundaries.',
    radius: 136,
    size: 4.5,
    speed: 0.012,
    color: '#e2e8f0',
    glowColor: 'rgba(255, 255, 255, 0.4)',
    currentSign: 'Cancer',
    degree: '04°19\''
  },
  {
    name: 'Jupiter',
    symbol: '♃',
    archetype: 'The Greater Benefic',
    rulingSign: 'Sagittarius & Pisces',
    astrologicalMeaning: 'Cosmic abundance, philosophical expansion, luck, and spiritual growth.',
    radius: 180,
    size: 9,
    speed: 0.007,
    color: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.7)',
    currentSign: 'Gemini',
    degree: '21°33\''
  },
  {
    name: 'Saturn',
    symbol: '♄',
    archetype: 'The Master of Time & Karma',
    rulingSign: 'Capricorn & Aquarius',
    astrologicalMeaning: 'Architectural discipline, maturation, healthy limits, and enduring legacy.',
    radius: 226,
    size: 7.5,
    speed: 0.004,
    color: '#f1f5f9',
    glowColor: 'rgba(255, 255, 255, 0.5)',
    currentSign: 'Pisces',
    degree: '12°10\'',
    hasRing: true
  },
  {
    name: 'Uranus',
    symbol: '♅',
    archetype: 'The Divine Awakening',
    rulingSign: 'Aquarius',
    astrologicalMeaning: 'Radical quantum shifts, visionary inspiration, and liberation from dogma.',
    radius: 268,
    size: 6,
    speed: 0.0025,
    color: '#e2e8f0',
    glowColor: 'rgba(255, 255, 255, 0.4)',
    currentSign: 'Taurus',
    degree: '25°50\''
  },
  {
    name: 'Neptune',
    symbol: '♆',
    archetype: 'The Ocean of Transmutation',
    rulingSign: 'Pisces',
    astrologicalMeaning: 'Psychic dissolution, transcendental dreams, empathy, and ethereal music.',
    radius: 308,
    size: 5.8,
    speed: 0.0016,
    color: '#cbd5e1',
    glowColor: 'rgba(255, 255, 255, 0.35)',
    currentSign: 'Pisces',
    degree: '27°18\''
  }
];

const ZODIAC_RING = [
  '♈ Aries', '♉ Taurus', '♊ Gemini', '♋ Cancer',
  '♌ Leo', '♍ Virgo', '♎ Libra', '♏ Scorpio',
  '♐ Sag', '♑ Cap', '♒ Aqua', '♓ Pisces'
];

export const PlanetaryMovement: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetConfig>(PLANETS[4]); // default Jupiter
  const [showOrbits, setShowOrbits] = useState(true);

  // Store continuous angle states
  const anglesRef = useRef<{ [key: string]: number }>({
    Mercury: 0.4,
    Venus: 1.8,
    Earth: 3.2,
    Mars: 4.5,
    Jupiter: 0.9,
    Saturn: 2.3,
    Uranus: 5.1,
    Neptune: 3.7
  });

  const moonAngleRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = rect.width;
      const height = rect.height;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Scale factor for responsive viewports
      const scale = Math.min(width, height) / 720;

      // Draw faint Zodiac boundary ring
      const zodiacRadius = 340 * scale;
      ctx.beginPath();
      ctx.arc(centerX, centerY, zodiacRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw 12 Zodiac sector labels around the boundary
      ctx.font = `${Math.max(9, 11 * scale)}px system-ui, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ZODIAC_RING.forEach((sign, i) => {
        const angle = (i * Math.PI) / 6 - Math.PI / 2;
        const lx = centerX + Math.cos(angle) * (zodiacRadius + 16 * scale);
        const ly = centerY + Math.sin(angle) * (zodiacRadius + 16 * scale);
        ctx.fillText(sign, lx, ly);
      });

      // Central Sun (The Core Radiant Star)
      const sunPulse = Math.sin(Date.now() * 0.002) * 1.5;
      const sunRadius = (16 + sunPulse) * scale;

      // Sun halo glow
      const sunGradient = ctx.createRadialGradient(
        centerX, centerY, 2 * scale,
        centerX, centerY, 45 * scale
      );
      sunGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      sunGradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.5)');
      sunGradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.15)');
      sunGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, 45 * scale, 0, Math.PI * 2);
      ctx.fillStyle = sunGradient;
      ctx.fill();

      // Sun core
      ctx.beginPath();
      ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Update and Draw Planets
      PLANETS.forEach((planet) => {
        const orbitR = planet.radius * scale;

        // Draw Orbit Path
        if (showOrbits) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, orbitR, 0, Math.PI * 2);
          const isSelected = selectedPlanet.name === planet.name;
          ctx.strokeStyle = isSelected
            ? 'rgba(255, 255, 255, 0.4)'
            : 'rgba(255, 255, 255, 0.07)';
          ctx.lineWidth = isSelected ? 1.5 : 1;
          if (!isSelected) {
            ctx.setLineDash([2, 4]);
          } else {
            ctx.setLineDash([]);
          }
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Increment angle if playing
        if (isPlaying) {
          anglesRef.current[planet.name] += planet.speed * speedMultiplier;
        }

        const angle = anglesRef.current[planet.name];
        const px = centerX + Math.cos(angle) * orbitR;
        const py = centerY + Math.sin(angle) * orbitR;
        const pSize = Math.max(2.5, planet.size * scale);

        // Planet Glow
        ctx.beginPath();
        ctx.arc(px, py, pSize * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = planet.glowColor;
        ctx.fill();

        // If Saturn, draw rings
        if (planet.hasRing) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(0.45);
          ctx.beginPath();
          ctx.ellipse(0, 0, pSize * 2.6, pSize * 0.9, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.lineWidth = 1.2 * scale;
          ctx.stroke();
          ctx.restore();
        }

        // Planet Body
        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();

        // If Earth, draw Moon
        if (planet.hasMoon) {
          if (isPlaying) {
            moonAngleRef.current += 0.08 * speedMultiplier;
          }
          const moonDist = 12 * scale;
          const mx = px + Math.cos(moonAngleRef.current) * moonDist;
          const my = py + Math.sin(moonAngleRef.current) * moonDist;

          ctx.beginPath();
          ctx.arc(mx, my, 1.5 * scale, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.fill();
        }

        // Selected Planet Target Indicator
        if (selectedPlanet.name === planet.name) {
          ctx.beginPath();
          ctx.arc(px, py, (pSize + 6) * scale, 0, Math.PI * 2);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.2;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Planet label
          ctx.font = `600 ${Math.max(10, 11 * scale)}px system-ui, sans-serif`;
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.fillText(
            `${planet.symbol} ${planet.name}`,
            px,
            py - (pSize + 10) * scale
          );
        }
      });

      ctx.restore();
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying, speedMultiplier, selectedPlanet, showOrbits]);

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 bg-black border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] blur-[140px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-xs text-white/80 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-white/70" />
          <span>Real-Time Astrological Orbital Orrery</span>
        </div>

        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-serif-instrument tracking-tight text-white mb-3"
          style={{ textShadow: '0 0 60px rgba(0, 0, 0, 0.6), 0 3px 20px rgba(0, 0, 0, 0.4)' }}
        >
          Live Planetary <em className="italic">Movement</em>
        </h2>

        <p
          className="text-white/70 text-sm md:text-base max-w-xl mx-auto leading-relaxed"
          style={{ textShadow: '0 0 25px rgba(0, 0, 0, 0.4)' }}
        >
          Observe the celestial clockwork governing our solar sphere. Track planetary transits and their harmonic resonance on human consciousness.
        </p>
      </div>

      {/* Orrery Canvas & Info Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Canvas Column */}
        <div className="lg:col-span-8 liquid-glass rounded-3xl p-4 sm:p-6 border border-white/10 relative overflow-hidden flex flex-col items-center">
          {/* Top Controls Overlay */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-2 z-20">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="liquid-glass-circle w-9 h-9 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
                title={isPlaying ? 'Pause Celestial Motion' : 'Resume Celestial Motion'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
              </button>

              <div className="liquid-glass rounded-full px-2.5 py-1 flex items-center gap-1.5 text-xs text-white/80">
                <span>Speed:</span>
                {[0.5, 1, 5, 15].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setSpeedMultiplier(spd)}
                    className={`px-2 py-0.5 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                      speedMultiplier === spd
                        ? 'bg-white text-black font-semibold'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOrbits(!showOrbits)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  showOrbits
                    ? 'bg-white/15 border-white/20 text-white'
                    : 'bg-transparent border-white/10 text-white/50'
                }`}
              >
                {showOrbits ? 'Orbits Visible' : 'Orbits Hidden'}
              </button>
            </div>
          </div>

          {/* Interactive Simulation Canvas */}
          <div className="w-full aspect-square max-h-[580px] relative flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-crosshair"
            />
          </div>

          {/* Bottom Quick-Select Planet Pills */}
          <div className="w-full flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3 border-t border-white/10">
            <span className="text-[10px] uppercase text-white/40 tracking-wider mr-1 whitespace-nowrap">
              Focus:
            </span>
            {PLANETS.map((planet) => {
              const active = selectedPlanet.name === planet.name;
              return (
                <button
                  key={planet.name}
                  onClick={() => setSelectedPlanet(planet)}
                  className={`px-3 py-1 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? 'bg-white text-black font-medium shadow-md'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <span className="font-serif">{planet.symbol}</span>
                  <span>{planet.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Planet Deep-Dive Inspector Card */}
        <div className="lg:col-span-4 liquid-glass rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="liquid-glass-circle w-12 h-12 rounded-full flex items-center justify-center text-2xl font-serif">
                {selectedPlanet.symbol}
              </div>
              <div>
                <h3 className="font-serif-instrument text-2xl tracking-tight text-white">
                  {selectedPlanet.name}
                </h3>
                <p className="text-xs text-white/60">{selectedPlanet.archetype}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-white/50">Current Transit</div>
              <div className="text-xs font-mono font-semibold text-white">
                {selectedPlanet.currentSign} {selectedPlanet.degree}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                Astrological Principle
              </span>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                {selectedPlanet.astrologicalMeaning}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-white/50 block">Ruler Of</span>
                <span className="text-xs font-medium text-white/90">{selectedPlanet.rulingSign}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-white/50 block">Orbital Frequency</span>
                <span className="text-xs font-mono text-white/90 font-semibold">{selectedPlanet.speed * 1000} rad/cy</span>
              </div>
            </div>
          </div>

          <div className="liquid-glass rounded-2xl p-4 border border-white/10 bg-white/5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-white/60 font-semibold uppercase tracking-wider">
              <Info className="w-3.5 h-3.5 text-white/80" />
              <span>Personal Cosmic Integration</span>
            </div>
            <p className="text-xs font-serif-instrument italic text-white/90 text-sm leading-relaxed">
              "When {selectedPlanet.name} transverses {selectedPlanet.currentSign}, your subconscious invites you to align with {selectedPlanet.archetype.toLowerCase()}. Ground your actions in awareness."
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('hero-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-white text-black font-semibold rounded-full py-3 text-xs tracking-wider uppercase hover:scale-[1.01] transition-transform cursor-pointer"
            >
              Get Personalized Horoscope For {selectedPlanet.name}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
