import React from 'react';

interface SpinnerProps {
  color?: string;
  size?: number;
  className?: string;
}

export function Spinner({
  className,
  size = 50,
  color = '#006EDF',
}: SpinnerProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        stroke={color}
        fill="none"
        strokeWidth="5"
      />

      <style jsx>{`
        .spinner {
          display: inline-block;
          animation: rotate 2s linear infinite;
          z-index: 2;
        }

        .path {
          stroke-linecap: round;
          animation: dash 1.5s ease-in-out infinite;
        }

        @keyframes rotate {
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes dash {
          0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
          }
        }
      `}</style>
    </svg>
  );
}

export default Spinner;
