import React, { useState } from 'react';
import { ASTROLOGERS, AstrologerProfile } from '../data/astrologersData';
import { AstrologerModal } from './AstrologerModal';
import { Sparkles, Star, ChevronRight, Compass } from 'lucide-react';

export const AstrologerMarquee: React.FC = () => {
  const [selectedAstrologer, setSelectedAstrologer] = useState<AstrologerProfile | null>(null);

  // Split astrologers into two rows for a rich dual-row marquee experience
  const rowOne = [...ASTROLOGERS.slice(0, 4), ...ASTROLOGERS.slice(0, 4)];
  const rowTwo = [...ASTROLOGERS.slice(4), ...ASTROLOGERS.slice(4)];

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 overflow-hidden bg-black/60 border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-xs text-white/80 mb-4">
          <Compass className="w-3.5 h-3.5 text-white/70" />
          <span>Vetted Lineage & Global Astrological Guild</span>
        </div>

        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-serif-instrument tracking-tight text-white mb-3"
          style={{ textShadow: '0 0 60px rgba(0, 0, 0, 0.6), 0 3px 20px rgba(0, 0, 0, 0.4)' }}
        >
          Master Astrologers & <em className="italic">Star Readers</em>
        </h2>

        <p
          className="text-white/70 text-sm md:text-base max-w-xl mx-auto leading-relaxed"
          style={{ textShadow: '0 0 25px rgba(0, 0, 0, 0.4)' }}
        >
          Connect with world-renowned practitioners across Vedic Jyotish, Hellenistic, and Evolutionary cosmic traditions.
        </p>
      </div>

      {/* Marquee Row 1 - Scrolling Left */}
      <div className="relative w-full overflow-hidden mb-6 py-2">
        {/* Soft edge blur masks for continuous fading */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-left flex gap-5">
          {rowOne.map((astro, idx) => (
            <div
              key={`${astro.id}-row1-${idx}`}
              onClick={() => setSelectedAstrologer(astro)}
              className="liquid-glass w-[320px] sm:w-[360px] p-4 rounded-3xl flex-shrink-0 cursor-pointer group hover:bg-white/10 transition-all duration-300 border border-white/10 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div className="relative">
                  <img
                    src={astro.avatar}
                    alt={astro.name}
                    className="w-14 h-14 rounded-full object-cover grayscale contrast-125 border border-white/20 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-black" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-instrument text-lg tracking-tight text-white truncate group-hover:text-white">
                      {astro.name}
                    </h3>
                    <span className="text-[10px] font-mono text-white/90 flex items-center gap-0.5">
                      ★ {astro.rating}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 truncate">{astro.title}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">
                      {astro.tradition}
                    </span>
                    <span className="text-[10px] text-white/50">{astro.experienceYears}y exp</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-white/75 font-serif-instrument italic line-clamp-2 mb-3">
                "{astro.quote}"
              </p>

              <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                <span>{astro.readingsCount}+ readings</span>
                <span className="text-white group-hover:translate-x-1 transition-transform flex items-center gap-0.5 font-medium">
                  View Profile <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 - Scrolling Right */}
      <div className="relative w-full overflow-hidden py-2">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-right flex gap-5">
          {rowTwo.map((astro, idx) => (
            <div
              key={`${astro.id}-row2-${idx}`}
              onClick={() => setSelectedAstrologer(astro)}
              className="liquid-glass w-[320px] sm:w-[360px] p-4 rounded-3xl flex-shrink-0 cursor-pointer group hover:bg-white/10 transition-all duration-300 border border-white/10 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div className="relative">
                  <img
                    src={astro.avatar}
                    alt={astro.name}
                    className="w-14 h-14 rounded-full object-cover grayscale contrast-125 border border-white/20 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-black" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-instrument text-lg tracking-tight text-white truncate group-hover:text-white">
                      {astro.name}
                    </h3>
                    <span className="text-[10px] font-mono text-white/90 flex items-center gap-0.5">
                      ★ {astro.rating}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 truncate">{astro.title}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">
                      {astro.tradition}
                    </span>
                    <span className="text-[10px] text-white/50">{astro.experienceYears}y exp</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-white/75 font-serif-instrument italic line-clamp-2 mb-3">
                "{astro.quote}"
              </p>

              <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                <span>{astro.location}</span>
                <span className="text-white group-hover:translate-x-1 transition-transform flex items-center gap-0.5 font-medium">
                  View Profile <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal on click */}
      <AstrologerModal
        astrologer={selectedAstrologer}
        onClose={() => setSelectedAstrologer(null)}
      />
    </section>
  );
};
