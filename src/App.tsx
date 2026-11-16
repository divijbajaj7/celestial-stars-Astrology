/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Twitter, Globe, ChevronDown, ArrowUp } from 'lucide-react';
import { AstrologyPortal } from './components/AstrologyPortal';
import { AstrologerMarquee } from './components/AstrologerMarquee';
import { PlanetaryMovement } from './components/PlanetaryMovement';
import { AstrologyChatbot } from './components/AstrologyChatbot';

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [portalTab, setPortalTab] = useState<'kundli' | 'daily'>('kundli');

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
      videoRef.current.play().catch(() => {
        // Autoplay policy handled silently
      });
    }
  }, []);

  const openPortalWithTab = (tab: 'kundli' | 'daily') => {
    setPortalTab(tab);
    setIsPortalOpen(true);
  };

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black overflow-x-hidden relative font-sans">
      {/* HERO SECTION - Strictly Following Observe Design Spec */}
      <section id="hero-section" className="min-h-screen relative overflow-hidden flex flex-col justify-between">
        {/* Background Video */}
        <video
          ref={videoRef}
          id="hero-video"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          src="https://designerstephen.github.io/public-assets/videos/observe-hero.mp4"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
        />

        {/* Subtle ambient star layer fallback */}
        <div className="absolute inset-0 pointer-events-none -z-10 bg-black opacity-80" />

        {/* Navbar */}
        <nav className="relative z-20 px-6 py-6">
          <div className="liquid-glass rounded-full max-w-5xl mx-auto pl-6 pr-6 py-2.5 flex items-center justify-between">
            {/* Left group */}
            <div className="flex items-center gap-2">
              {/* Logo: ring resolving into solid arc & center star */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-6 h-6 text-white"
              >
                <path
                  d="M4.21 16.5 A9 9 0 0 1 16.5 4.21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M16.5 4.21 A9 9 0 0 1 19.79 16.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="2.4 2.3"
                />
                <path
                  d="M19.79 16.5 A9 9 0 0 1 4.21 16.5"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeDasharray="0.01 4.7"
                />
                <circle cx="12" cy="12" r="2.5" fill="currentColor" />
              </svg>
              <span className="font-semibold text-lg tracking-tight text-white select-none">
                Celestial Stars
              </span>

              {/* Navigation Links */}
              <div className="hidden md:flex gap-6 ml-8">
                <button
                  onClick={() => openPortalWithTab('kundli')}
                  className="text-white/90 hover:text-white text-sm font-medium transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center gap-1"
                >
                  <span className="text-xs">✨</span>
                  <span>Kundli Prediction</span>
                </button>
                <button
                  onClick={() => openPortalWithTab('daily')}
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  Daily Horoscopes
                </button>
                <button
                  onClick={() => scrollToElement('astrologers-section')}
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  Astrologers
                </button>
                <button
                  onClick={() => scrollToElement('planetary-section')}
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  Planetary Movement
                </button>
              </div>
            </div>

            {/* Right group: subtle astronomical indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-white/70 font-mono tracking-tight">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Transit: Harmonious Moon</span>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[6%] md:-translate-y-[10%]">
          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-instrument tracking-tight md:whitespace-nowrap mb-4 text-white"
            style={{
              textShadow:
                '0 0 72px rgba(0, 0, 0, 0.42), 0 4px 28px rgba(0, 0, 0, 0.28)'
            }}
          >
            Predict your future & <em className="italic">daily horoscopes</em>
          </h1>

          {/* Subline */}
          <p
            className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl md:whitespace-nowrap mb-10"
            style={{
              textShadow:
                '0 0 30px rgba(0, 0, 0, 0.32), 0 1px 10px rgba(0, 0, 0, 0.20)'
            }}
          >
            Predict your future and daily horoscopes with personalized cosmic insights.
          </p>

          {/* Main Action: Single button on main page - Get Started */}
          <div className="max-w-md w-full flex justify-center">
            <div className="liquid-glass rounded-full p-1.5 flex items-center justify-center">
              <button
                onClick={() => openPortalWithTab('kundli')}
                className="bg-white rounded-full px-9 py-3.5 text-black text-sm font-medium whitespace-nowrap hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Gentle scroll indicator pill */}
          <button
            onClick={() => scrollToElement('astrologers-section')}
            className="mt-8 liquid-glass rounded-full px-4 py-1.5 text-xs text-white/60 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <span>Explore Astrologers & Planetary Orbits</span>
            <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Social Row */}
        <div className="relative z-10 flex justify-center gap-4 pb-12">
          <button
            onClick={() => window.open('https://instagram.com', '_blank', 'noopener,noreferrer')}
            aria-label="Instagram"
            className="liquid-glass-circle w-14 h-14 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            <Instagram className="w-5 h-5 text-white/90" />
          </button>
          <button
            onClick={() => window.open('https://twitter.com', '_blank', 'noopener,noreferrer')}
            aria-label="Twitter / X"
            className="liquid-glass-circle w-14 h-14 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            <Twitter className="w-5 h-5 text-white/90" />
          </button>
          <button
            onClick={() => openPortalWithTab('daily')}
            aria-label="Cosmic Globe"
            className="liquid-glass-circle w-14 h-14 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            <Globe className="w-5 h-5 text-white/90" />
          </button>
        </div>
      </section>

      {/* SECTION 2: REAL ASTROLOGERS SCROLLING MARQUEE */}
      <div id="astrologers-section">
        <AstrologerMarquee />
      </div>

      {/* SECTION 3: PLANETARY MOVEMENT ANIMATION BELOW CURRENT PAGE */}
      <div id="planetary-section">
        <PlanetaryMovement />
      </div>

      {/* Minimal Monochrome Footer */}
      <footer className="relative z-10 py-10 px-6 border-t border-white/10 bg-black text-center text-xs text-white/50">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif-instrument text-lg text-white">Celestial Stars</span>
            <span>— Cosmic Horoscopes & Astrological Orrery</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToElement('hero-section')}
              className="text-white/80 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* Astrology Portal Interactive Modal */}
      <AstrologyPortal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        initialTab={portalTab}
      />

      {/* Astrology Chatbot Bottom-Right Corner Pop-Up */}
      <AstrologyChatbot />
    </div>
  );
}
