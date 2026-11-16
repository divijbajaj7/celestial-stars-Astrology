import React from 'react';

interface VedicKundliChartProps {
  name: string;
  dob: string;
  lagnaName?: string;
  rashiName?: string;
}

export const VedicKundliChart: React.FC<VedicKundliChartProps> = ({
  name,
  dob,
  lagnaName = 'Mesha Lagna',
  rashiName = 'Aries'
}) => {
  return (
    <div className="liquid-glass rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-3 text-xs">
        <span className="text-[10px] uppercase tracking-wider text-white/50 font-mono">
          Janam Kundli (Lagna Chart D1)
        </span>
        <span className="text-white/80 font-mono text-[11px]">
          {lagnaName} · {rashiName}
        </span>
      </div>

      {/* Classical North Indian Vedic Diamond Chart SVG */}
      <div className="relative w-full max-w-[320px] aspect-square">
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full text-white/80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Boundary Square */}
          <rect
            x="4"
            y="4"
            width="292"
            height="292"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            rx="8"
          />

          {/* Diagonals */}
          <line x1="4" y1="4" x2="296" y2="296" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="296" y1="4" x2="4" y2="296" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />

          {/* Inner Diamond (Kendra Houses) */}
          <polygon
            points="150,4 296,150 150,296 4,150"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            fill="rgba(255, 255, 255, 0.02)"
          />

          {/* House Labels / Roman / Vedic Numerals */}
          {/* 1st House (Lagna - Top Center Diamond) */}
          <text x="150" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="600">
            H1 (Lagna)
          </text>
          <text x="150" y="105" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
            {lagnaName.slice(0, 5)} · Surya
          </text>

          {/* 2nd House (Top Left Triangle) */}
          <text x="80" y="45" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
            H2
          </text>
          <text x="80" y="62" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
            Dhana
          </text>

          {/* 3rd House (Upper Left Corner) */}
          <text x="35" y="80" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
            H3
          </text>
          <text x="35" y="98" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
            Bhrata
          </text>

          {/* 4th House (Center Left Diamond) */}
          <text x="80" y="150" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="10" fontWeight="600">
            H4 (Sukha)
          </text>
          <text x="80" y="168" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">
            Chandra
          </text>

          {/* 5th House (Lower Left Corner) */}
          <text x="35" y="220" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
            H5
          </text>
          <text x="35" y="238" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
            Putra
          </text>

          {/* 6th House (Bottom Left Triangle) */}
          <text x="80" y="260" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
            H6
          </text>
          <text x="80" y="278" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
            Ripu
          </text>

          {/* 7th House (Bottom Center Diamond) */}
          <text x="150" y="225" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="10" fontWeight="600">
            H7 (Kalatra)
          </text>
          <text x="150" y="245" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">
            Shukra
          </text>

          {/* 8th House (Bottom Right Triangle) */}
          <text x="220" y="260" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
            H8
          </text>
          <text x="220" y="278" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
            Ayur
          </text>

          {/* 9th House (Lower Right Corner) */}
          <text x="265" y="220" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
            H9
          </text>
          <text x="265" y="238" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
            Dharma
          </text>

          {/* 10th House (Center Right Diamond) */}
          <text x="220" y="150" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="10" fontWeight="600">
            H10 (Karma)
          </text>
          <text x="220" y="168" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">
            Guru
          </text>

          {/* 11th House (Upper Right Corner) */}
          <text x="265" y="80" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
            H11
          </text>
          <text x="265" y="98" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
            Labha
          </text>

          {/* 12th House (Top Right Triangle) */}
          <text x="220" y="45" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
            H12
          </text>
          <text x="220" y="62" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
            Vyaya
          </text>
        </svg>
      </div>

      <div className="mt-3 text-[11px] text-white/50 text-center">
        Native: <span className="text-white/80">{name}</span> · DOB: <span className="text-white/80">{dob}</span>
      </div>
    </div>
  );
};
