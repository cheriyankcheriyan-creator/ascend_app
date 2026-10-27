import React from 'react';

interface AscendLogoProps {
  className?: string;
  size?: number;
  showSparkle?: boolean;
}

/**
 * Ascend Logo: A determined figure taking their first courageous step onto a rising staircase.
 * Symbolizes student potential, taking that crucial first step in career and college discovery.
 */
export const AscendLogo: React.FC<AscendLogoProps> = ({
  className = 'w-6 h-6',
  size,
  showSparkle = true,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      width={size}
      height={size}
      className={className}
      aria-label="Ascend Logo - Taking the first step on the staircase"
    >
      {/* Background Star / Spark of aspiration at the top of the staircase */}
      {showSparkle && (
        <path
          d="M 28 4 L 28.8 6.2 L 31 7 L 28.8 7.8 L 28 10 L 27.2 7.8 L 25 7 L 27.2 6.2 Z"
          fill="#FBBF24"
          className="animate-pulse"
        />
      )}

      {/* The Ascending Staircase */}
      <path
        d="M 2 28 H 14 V 22.5 H 19.5 V 17 H 25 V 11.5 H 30"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Subtle depth / shadow accents under each stair riser */}
      <path
        d="M 14 28 V 22.5 M 19.5 28 V 17 M 25 28 V 11.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.25"
      />

      {/* The Figure: Head */}
      <circle
        cx="8.5"
        cy="7.5"
        r="2.4"
        fill="currentColor"
      />

      {/* The Figure: Torso leaning forward with momentum */}
      <path
        d="M 8.8 10.2 L 8.2 17.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* The Figure: Back arm balancing behind */}
      <path
        d="M 8.8 11.5 L 5 14.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* The Figure: Forward arm reaching toward the ascent */}
      <path
        d="M 8.8 11.5 L 12.5 13.5 L 15 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* The Figure: Planted back leg on the ground */}
      <path
        d="M 8.2 17.5 L 5.8 22.5 L 4.5 28"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* The Figure: Forward leg taking the FIRST STEP up onto the first stair (hovering / landing on the step at y=22.5) */}
      <path
        d="M 8.2 17.5 L 12.2 19.8 L 14.6 22.2 L 16.2 22.5"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Subtle motion dash beneath the stepping foot */}
      <path
        d="M 11.5 24.5 L 13.5 24.5"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
    </svg>
  );
};
