import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Sparkle {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
}

interface SparklesTextProps {
  /**
   * The text content to display (or via children)
   */
  text?: string;
  children?: React.ReactNode;
  /**
   * Additional classes for styling
   */
  className?: string;
  /**
   * Number of sparkles
   */
  sparklesCount?: number;
  /**
   * Colors for the sparkles
   */
  colors?: {
    first: string;
    second: string;
  };
  as?: React.ElementType;
}

const SparkleStar: React.FC<{
  color: string;
  scale: number;
  delay: number;
  lifespan: number;
}> = ({ color, scale, delay, lifespan }) => {
  return (
    <motion.svg
      className="pointer-events-none absolute z-20"
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{
        scale: [0, scale, 0],
        rotate: [0, 90, 180],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: lifespan,
        repeat: Infinity,
        repeatDelay: Math.random() * 1.5 + 0.5,
        delay,
        ease: "easeInOut",
      }}
      width="21"
      height="21"
      viewBox="0 0 21 21"
    >
      <path
        d="M9.826 1.48a1.2 1.2 0 0 1 2.348 0l1.246 6.326a1.2 1.2 0 0 0 .942.942l6.326 1.246a1.2 1.2 0 0 1 0 2.348l-6.326 1.246a1.2 1.2 0 0 0-.942.942l-1.246 6.326a1.2 1.2 0 0 1-2.348 0l-1.246-6.326a1.2 1.2 0 0 0-.942-.942L1.48 12.342a1.2 1.2 0 0 1 0-2.348l6.326-1.246a1.2 1.2 0 0 0 .942-.942L9.826 1.48Z"
        fill={color}
      />
    </motion.svg>
  );
};

export const SparklesText: React.FC<SparklesTextProps> = ({
  text,
  children,
  className = "",
  sparklesCount = 8,
  colors = { first: "#FFFFFF", second: "#FDE047" },
  as: Component = "span",
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generateSparkle = (): Sparkle => ({
      id: Math.random().toString(36).slice(2, 9),
      x: `${Math.random() * 105 - 2.5}%`,
      y: `${Math.random() * 110 - 5}%`,
      color: Math.random() > 0.5 ? colors.first : colors.second,
      delay: Math.random() * 1.5,
      scale: Math.random() * 0.7 + 0.5,
      lifespan: Math.random() * 1.2 + 1.2,
    });

    setSparkles(Array.from({ length: sparklesCount }, generateSparkle));
  }, [sparklesCount, colors.first, colors.second]);

  const content = text || children;

  return (
    <Component className={`relative inline-block ${className}`}>
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          style={{
            position: "absolute",
            left: sparkle.x,
            top: sparkle.y,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        >
          <SparkleStar
            color={sparkle.color}
            scale={sparkle.scale}
            delay={sparkle.delay}
            lifespan={sparkle.lifespan}
          />
        </span>
      ))}
      <span className="relative z-10">{content}</span>
    </Component>
  );
};

export default SparklesText;
