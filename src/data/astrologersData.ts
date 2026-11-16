export interface AstrologerProfile {
  id: string;
  name: string;
  title: string;
  specialty: string;
  tradition: 'Vedic' | 'Hellenistic' | 'Psychological' | 'Evolutionary' | 'Synastry' | 'Horary';
  experienceYears: number;
  readingsCount: number;
  rating: number;
  avatar: string;
  location: string;
  quote: string;
  bio: string;
  services: string[];
}

export const ASTROLOGERS: AstrologerProfile[] = [
  {
    id: 'elena-vance',
    name: 'Dr. Elena Vance',
    title: 'Hellenistic Master & Predictive Astrologer',
    specialty: 'Time Lords, Solar Returns & Natal Transits',
    tradition: 'Hellenistic',
    experienceYears: 18,
    readingsCount: 4200,
    rating: 4.99,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    location: 'Athens & Oxford',
    quote: 'The planets do not decree your fate; they provide the cosmic score to which your soul improvises.',
    bio: 'Former classical historian at Oxford who dedicated two decades to translating ancient Hellenistic astrological papyri. Elena bridges ancient astronomical rigor with psychological empowerment.',
    services: ['Natal Chart Deep Dive', 'Predictive Annual Solar Return', 'Major Life Transition Timing']
  },
  {
    id: 'aarav-sharma',
    name: 'Pandit Aarav Sharma',
    title: 'Vedic Jyotish & Karmic Cartographer',
    specialty: 'D9 Navamsha, Dasha Cycles & Remedial Gems',
    tradition: 'Vedic',
    experienceYears: 24,
    readingsCount: 6800,
    rating: 4.98,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    location: 'Varanasi & London',
    quote: 'Every transit carries a seed of dharma; understand your planetary seasons and conflict dissolves.',
    bio: 'Third-generation Vedic astrologer trained in classical Parashara Jyotish. Known for uncanny precision regarding career transitions and spiritual milestones.',
    services: ['Vedic Birth Chart (Kundali)', 'Mahadasha & Antardasha Mapping', 'Karmic Remedial Astrology']
  },
  {
    id: 'celeste-moreno',
    name: 'Celeste Moreno',
    title: 'Evolutionary Astrologer & Soul Guide',
    specialty: 'Pluto Complexes, Lunar Nodes & Past-Life Lineage',
    tradition: 'Evolutionary',
    experienceYears: 12,
    readingsCount: 2900,
    rating: 4.97,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    location: 'Santa Fe, NM',
    quote: 'Your birth chart is the blueprint of what your soul came here to resolve and transcend.',
    bio: 'Pioneering evolutionary astrologer exploring the evolutionary intent of the South and North Nodes. Her sessions are deeply transformative and intuitive.',
    services: ['Lunar Node Destiny Reading', 'Pluto Evolution Analysis', 'Chiron Healing Blueprint']
  },
  {
    id: 'julian-thorne',
    name: 'Julian Thorne',
    title: 'Synastry & Relationship Astrologer',
    specialty: 'Composite Charts, Asteroids & Relational Dynamics',
    tradition: 'Synastry',
    experienceYears: 15,
    readingsCount: 3500,
    rating: 4.99,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    location: 'Montreal & Paris',
    quote: 'Love is not an accident of chemistry; it is the geometric alignment of two celestial tapestries.',
    bio: 'Specializing exclusively in romantic, familial, and business partnerships. Julian synthesizes synastry overlays with composite charts to illuminate interpersonal contracts.',
    services: ['Synastry Partnership Overlay', 'Composite Relationship Chart', 'Timing for Marriages & Mergers']
  },
  {
    id: 'maya-lin',
    name: 'Maya Lin, MA',
    title: 'Psychological Astrologer & Archetypal Analyst',
    specialty: 'Jungian Depth Archetypes, Shadow Work & Midheavens',
    tradition: 'Psychological',
    experienceYears: 14,
    readingsCount: 3100,
    rating: 4.96,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    location: 'San Francisco, CA',
    quote: 'Until you make the unconscious planetary energies conscious, they will direct your life and you will call it destiny.',
    bio: 'Holds a Master’s in Jungian Psychology. Maya translates celestial symbols into practical psychological tools for self-actualization, creative unlock, and vocational purpose.',
    services: ['Jungian Archetype Chart Reading', 'Vocational Midheaven Calling', 'Shadow Integration Session']
  },
  {
    id: 'seraphina-kouris',
    name: 'Seraphina Kouris',
    title: 'Horary Astrologer & Cosmic Timing Specialist',
    specialty: 'Answering Urgent Questions via Exact Moment Astrology',
    tradition: 'Horary',
    experienceYears: 16,
    readingsCount: 4400,
    rating: 4.98,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    location: 'Vienna & Zurich',
    quote: 'Ask the question only when your heart is truly ready; the sky answers the moment of genuine inquiry.',
    bio: 'Renowned expert in traditional Horary astrology — the art of casting charts for the exact moment a pressing question is conceived to deliver direct, clear answers.',
    services: ['Horary Question Consultation', 'Electional Timing for Launches', 'Property & Location Relocation']
  },
  {
    id: 'gabriel-mercier',
    name: 'Gabriel Mercier',
    title: 'Mundane & Financial Astro-Economist',
    specialty: 'Planetary Cycles, Global Trends & Wealth Houses',
    tradition: 'Hellenistic',
    experienceYears: 20,
    readingsCount: 5100,
    rating: 4.97,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    location: 'Geneva & New York',
    quote: 'Millionaires do not use astrology; billionaires do.',
    bio: 'Advises entrepreneurs and institutions on macro planetary cycles, Jupiter-Saturn synodic periods, and personal 2nd/8th house wealth alignments.',
    services: ['Wealth & Abundance House Audit', 'Corporate Founding Timing', 'Multi-Year Macro Cycle Strategy']
  },
  {
    id: 'zara-al-mansoor',
    name: 'Zara Al-Mansoor',
    title: 'Celestial Cartography & Astro-Locality Guide',
    specialty: 'Astrocartography, Planetary Lines & Relocation',
    tradition: 'Evolutionary',
    experienceYears: 11,
    readingsCount: 2600,
    rating: 4.98,
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    location: 'Dubai & Barcelona',
    quote: 'Changing your geographic coordinate changes which planetary chords are struck in your life.',
    bio: 'Certified Astro*Carto*Graphy master. Helps seekers discover which cities activate love (Venus lines), career prominence (Sun/Jupiter lines), or deep study (Mercury lines).',
    services: ['World Astrocartography Map', 'Relocation Horizon Analysis', 'Travel & Retreat Destination Finder']
  }
];
