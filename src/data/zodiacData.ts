export interface ZodiacSignInfo {
  id: string;
  name: string;
  symbol: string;
  dates: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  rulingPlanet: string;
  traits: string[];
  todayHoroscope: {
    overview: string;
    love: string;
    career: string;
    spirituality: string;
    luckyNumbers: number[];
    cosmicAlignment: string;
    energyScore: number;
  };
  futurePrediction: {
    transit: string;
    timeline: string;
    insight: string;
    stellarAdvice: string;
  };
}

export const ZODIAC_SIGNS: ZodiacSignInfo[] = [
  {
    id: 'aries',
    name: 'Aries',
    symbol: '♈',
    dates: 'Mar 21 – Apr 19',
    element: 'Fire',
    rulingPlanet: 'Mars',
    traits: ['Courageous', 'Pioneering', 'Passionate'],
    todayHoroscope: {
      overview: 'Mars aligns with the rising node, igniting your ambition. Trust the sudden instinct you felt at dawn; the celestial path clears before decisive steps.',
      love: 'An unspoken bond deepens through quiet vulnerability. Allow your shield to lower tonight.',
      career: 'A breakthrough in ongoing negotiations is catalyzed by your clarity of vision.',
      spirituality: 'Meditate under the evening sky. Channel your primal fire into focused patience.',
      luckyNumbers: [7, 19, 42],
      cosmicAlignment: 'Mars Sextile Ascendant',
      energyScore: 94
    },
    futurePrediction: {
      transit: 'Upcoming Mars Transit in First House',
      timeline: 'Next 14 Days',
      insight: 'A catalytic cycle begins. You will be invited to step into leadership where others have hesitated.',
      stellarAdvice: 'Initiate without fear, but temper urgency with cosmic rhythm.'
    }
  },
  {
    id: 'taurus',
    name: 'Taurus',
    symbol: '♉',
    dates: 'Apr 20 – May 20',
    element: 'Earth',
    rulingPlanet: 'Venus',
    traits: ['Steadfast', 'Sensual', 'Architect of Value'],
    todayHoroscope: {
      overview: 'Venus casts a golden aura across your second house. Earthly stability and beauty weave together, bringing tranquility to unsettled matters.',
      love: 'Sensory gestures speak louder than rhetoric. Share quiet presence and nourishing rituals.',
      career: 'Financial instincts are sharpened under current lunar aspects; long-term seeds begin sprouting.',
      spirituality: 'Anchor your barefoot connection to the earth. Stability is your spiritual conduit.',
      luckyNumbers: [4, 16, 33],
      cosmicAlignment: 'Venus Trine Lunar Node',
      energyScore: 91
    },
    futurePrediction: {
      transit: 'Jupiter Harmonizing Natal Venus',
      timeline: 'Next 30 Days',
      insight: 'Material prosperity coincides with inner emotional peace. An opportunity to build lasting sanctuary arrives.',
      stellarAdvice: 'Hold fast to your core values while opening doors to generous abundance.'
    }
  },
  {
    id: 'gemini',
    name: 'Gemini',
    symbol: '♊',
    dates: 'May 21 – Jun 20',
    element: 'Air',
    rulingPlanet: 'Mercury',
    traits: ['Inquisitive', 'Quick-silver', 'Illuminator'],
    todayHoroscope: {
      overview: 'Mercury radiates through high celestial angles, accelerating synchronicities. Words you speak carry unexpected manifestation weight today.',
      love: 'A stimulating intellectual conversation sparks electric chemistry with someone close.',
      career: 'Collaborative ideas spark rapidly. Document insights before they dissipate into ether.',
      spirituality: 'Quiet the mental chatter with conscious breathwork; listen to the spaces between thoughts.',
      luckyNumbers: [3, 15, 27],
      cosmicAlignment: 'Mercury Conjunct Celestial Midheaven',
      energyScore: 89
    },
    futurePrediction: {
      transit: 'Mercurial Solar Return Matrix',
      timeline: 'Next 21 Days',
      insight: 'Dual threads of your life converge into a unified purpose. A long-pondered crossroad chooses you.',
      stellarAdvice: 'Focus your curious energy into singular devotion.'
    }
  },
  {
    id: 'cancer',
    name: 'Cancer',
    symbol: '♋',
    dates: 'Jun 21 – Jul 22',
    element: 'Water',
    rulingPlanet: 'Moon',
    traits: ['Intuitive', 'Protective', 'Lunar Empath'],
    todayHoroscope: {
      overview: 'The Moon moves through a reflective water trine, amplifying your psychic reception. Your gut perception about a distant matter is accurate.',
      love: 'Emotional waters run profound. A moment of genuine empathy heals an old subtle friction.',
      career: 'Rely on emotional intelligence over spreadsheets today; your instinct knows what numbers conceal.',
      spirituality: 'Water rituals and nighttime stargazing replenish your spirit completely.',
      luckyNumbers: [2, 11, 29],
      cosmicAlignment: 'Waxing Moon in Harmonious Trine',
      energyScore: 96
    },
    futurePrediction: {
      transit: 'Lunar Eclipse Influx Cycle',
      timeline: 'Next 18 Days',
      insight: 'You are completing a pivotal emotional metamorphosis. What once drained you now fuels your inner sovereign self.',
      stellarAdvice: 'Protect your sacred space while extending graceful compassion.'
    }
  },
  {
    id: 'leo',
    name: 'Leo',
    symbol: '♌',
    dates: 'Jul 23 – Aug 22',
    element: 'Fire',
    rulingPlanet: 'Sun',
    traits: ['Radiant', 'Regal', 'Generous Heart'],
    todayHoroscope: {
      overview: 'The solar sphere bathes your presence in warm magnetic gravity. Authenticity without pretense draws admiration and open doors.',
      love: 'Express appreciation without reservation; your warmth acts as an anchor for those around you.',
      career: 'Creative courage commands the room. Present your boldest vision with measured poise.',
      spirituality: 'Remember that the Sun illuminates all without draining itself; nurture your inner spark.',
      luckyNumbers: [1, 9, 21],
      cosmicAlignment: 'Solar Apex Illumination',
      energyScore: 97
    },
    futurePrediction: {
      transit: 'Solar Crown Conjunction',
      timeline: 'Next 25 Days',
      insight: 'A creative or professional magnum opus reaches full maturity. Recognition from revered figures is slated.',
      stellarAdvice: 'Shine without apology, but share the spotlight with those who supported your journey.'
    }
  },
  {
    id: 'virgo',
    name: 'Virgo',
    symbol: '♍',
    dates: 'Aug 23 – Sep 22',
    element: 'Earth',
    rulingPlanet: 'Mercury',
    traits: ['Discerning', 'Architect of Order', 'Devoted Healer'],
    todayHoroscope: {
      overview: 'The cosmic lens focuses on refinement and clarity. Subtle adjustments made in your daily flow yield exponential peace.',
      love: 'Thoughtful gestures of service carry sacred devotion. Notice who pays attention to the small details.',
      career: 'Flawless discernment catches an oversight that saves invaluable resources and time.',
      spirituality: 'Order in your external sanctuary brings sanctuary to your internal spirit.',
      luckyNumbers: [5, 14, 23],
      cosmicAlignment: 'Mercury Sextile Saturn',
      energyScore: 92
    },
    futurePrediction: {
      transit: 'Planetary Alignment in 6th House',
      timeline: 'Next 16 Days',
      insight: 'A period of mastery and renewed vitality. Systems you put in place now become your enduring foundation.',
      stellarAdvice: 'Release perfectionism; embrace divine unfolding.'
    }
  },
  {
    id: 'libra',
    name: 'Libra',
    symbol: '♎',
    dates: 'Sep 23 – Oct 22',
    element: 'Air',
    rulingPlanet: 'Venus',
    traits: ['Harmonious', 'Diplomatic', 'Seeker of Beauty'],
    todayHoroscope: {
      overview: 'Celestial scales achieve pristine equilibrium. You possess the uncommon grace to mediate tension into creative resonance.',
      love: 'Reciprocity blooms. A partnership clarifies its shared horizon and commitments.',
      career: 'Design, aesthetic balance, and contracts are strongly favored under current planetary skies.',
      spirituality: 'Silence is the music of balance. Dedicate twenty minutes to stillness.',
      luckyNumbers: [6, 18, 30],
      cosmicAlignment: 'Venus Sextile Neptune',
      energyScore: 90
    },
    futurePrediction: {
      transit: 'Equinoctial Venus Transit',
      timeline: 'Next 28 Days',
      insight: 'New alliances will form that elevate both your soul’s path and outer prosperity.',
      stellarAdvice: 'Trust your innate aesthetic and moral compass above external chatter.'
    }
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    symbol: '♏',
    dates: 'Oct 23 – Nov 21',
    element: 'Water',
    rulingPlanet: 'Pluto & Mars',
    traits: ['Alchemical', 'Penetrating Insight', 'Mystic'],
    todayHoroscope: {
      overview: 'Deep undercurrents reveal hidden truths. Your intuition penetrates veils effortlessly; observe without showing your hand prematurely.',
      love: 'Intimacy demands total honesty. Stripping away superficial pretense opens transcendental closeness.',
      career: 'Strategic leverage is yours. Play the long chess game; the outcome favors patient depth.',
      spirituality: 'Embrace transformation like the serpent shedding skin. The old version of you has completed its duty.',
      luckyNumbers: [8, 13, 26],
      cosmicAlignment: 'Pluto-Mercury Trine',
      energyScore: 95
    },
    futurePrediction: {
      transit: 'Scorpionic Plutonian Rebirth Gate',
      timeline: 'Next 20 Days',
      insight: 'A profound turning point releases a dormant wellspring of personal power and sovereignty.',
      stellarAdvice: 'Surrender control over minor ripples to claim mastery over tidal shifts.'
    }
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    symbol: '♐',
    dates: 'Nov 22 – Dec 21',
    element: 'Fire',
    rulingPlanet: 'Jupiter',
    traits: ['Visionary', 'Seeker of Truth', 'Expansive'],
    todayHoroscope: {
      overview: 'Jupiter broadens your horizon with unexpected synchronicity. An intellectual or spiritual quest beckons you beyond familiar shores.',
      love: 'Spontaneous adventure rekindles passion. Plan an escape under the open stars.',
      career: 'Think globally; an unconventional perspective you propose gains traction with visionaries.',
      spirituality: 'Your faith in the cosmos is rewarded with direct signposts and synchronicities today.',
      luckyNumbers: [9, 12, 36],
      cosmicAlignment: 'Jupiter Trine Radiant Sun',
      energyScore: 93
    },
    futurePrediction: {
      transit: 'Jupiterian Horizon Awakening',
      timeline: 'Next 35 Days',
      insight: 'A quantum leap in wisdom, travel, or education shifts how you perceive your destiny forever.',
      stellarAdvice: 'Aim your arrow at the highest star and let the cosmos calculate the trajectory.'
    }
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    symbol: '♑',
    dates: 'Dec 22 – Jan 19',
    element: 'Earth',
    rulingPlanet: 'Saturn',
    traits: ['Monumental', 'Disciplined Sovereign', 'Master Builder'],
    todayHoroscope: {
      overview: 'Saturnian resilience bestows unshakeable authority. What you build during this cosmic phase is destined to withstand the test of time.',
      love: 'Loyalty and quiet dedication speak volumes. Honor the promises that anchor your life.',
      career: 'Executive precision yields respect. A long-term ambition begins locking into reality.',
      spirituality: 'Discipline is sacred devotion. Recognize the holy structure of daily devotion.',
      luckyNumbers: [10, 22, 44],
      cosmicAlignment: 'Saturn Sextile Midheaven',
      energyScore: 91
    },
    futurePrediction: {
      transit: 'Saturnian Crown Ingress',
      timeline: 'Next 40 Days',
      insight: 'Years of quiet labor culminate in milestone recognition and solid structural independence.',
      stellarAdvice: 'Trust your endurance; mountaintops are conquered one steady stride at a time.'
    }
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    symbol: '♒',
    dates: 'Jan 20 – Feb 18',
    element: 'Air',
    rulingPlanet: 'Uranus & Saturn',
    traits: ['Futurist', 'Rebel Innovator', 'Universal Mind'],
    todayHoroscope: {
      overview: 'Uranus electrifies higher cognition. You perceive patterns and solutions decades before the collective catches up.',
      love: 'Freedom and companionship find harmonious alignment. Cherish individuality within union.',
      career: 'Pioneering technology, community networks, and avant-garde ideas receive celestial backing.',
      spirituality: 'Connect with the universal collective consciousness. You are a conduit for future light.',
      luckyNumbers: [11, 17, 39],
      cosmicAlignment: 'Uranus Trine Mercury',
      energyScore: 96
    },
    futurePrediction: {
      transit: 'Aquarian Golden Transit Cycle',
      timeline: 'Next 22 Days',
      insight: 'An unorthodox venture or community movement coalesces around your vision.',
      stellarAdvice: 'Never dilute your eccentricity to fit conventional expectations.'
    }
  },
  {
    id: 'pisces',
    name: 'Pisces',
    symbol: '♓',
    dates: 'Feb 19 – Mar 20',
    element: 'Water',
    rulingPlanet: 'Neptune & Jupiter',
    traits: ['Mystic Dreamer', 'Infinite Compassion', 'Poet of the Stars'],
    todayHoroscope: {
      overview: 'Neptune dissolves the boundaries between physical reality and astral insight. Pay close attention to waking synchronicities and nocturnal dreams.',
      love: 'Spiritual soulmate resonance is heightened. Connect through music, art, and silent knowing.',
      career: 'Artistic and humanitarian pursuits receive celestial blessing; let imagination guide execution.',
      spirituality: 'You stand at the ocean of all that is. Meditate with water and soft cosmic frequencies.',
      luckyNumbers: [12, 24, 48],
      cosmicAlignment: 'Neptune Conjunct Radiant Moon',
      energyScore: 94
    },
    futurePrediction: {
      transit: 'Neptunian Transcendence Portal',
      timeline: 'Next 19 Days',
      insight: 'A spiritual awakening elevates your creative expression into timeless territory.',
      stellarAdvice: 'Trust the current without clinging to the shore.'
    }
  }
];

export const COSMIC_AFFIRMATIONS = [
  "The stars impel, they do not compel; your sovereign will shapes destiny.",
  "What is destined for you will orbit toward you when your frequency aligns.",
  "In the quiet of the celestial sphere, the next revelation is already written.",
  "You are made of stardust, vibrating to the harmonic resonance of the cosmos."
];
