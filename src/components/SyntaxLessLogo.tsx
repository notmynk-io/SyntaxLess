import React from "react";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  showTagline?: boolean;
}

export const SyntaxLessLogo: React.FC<Props> = ({
  className = "",
  size = "md",
  showText = true,
  showTagline = false,
}) => {
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <div className={`flex items-center space-x-2.5 select-none ${className}`}>
      {/* Brand Mark Icon SVG */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]"
        >
          {/* Outer Green Left Bracket / Chevron */}
          <path
            d="M 35 22 L 15 50 L 35 78"
            stroke="#10b981"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Bottom Green Underline Cursor */}
          <line
            x1="18"
            y1="88"
            x2="38"
            y2="88"
            stroke="#10b981"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Curly Brackets in Center */}
          <text
            x="50"
            y="58"
            fill="#10b981"
            fontSize="28"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            &#123;&#125;
          </text>

          {/* Outer White Right Bracket / Chevron */}
          <path
            d="M 65 22 L 85 50 L 65 78"
            stroke="#ffffff"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Text + Tagline */}
      {showText && (
        <div className="flex flex-col">
          <div className={`font-black tracking-tight font-sans text-white flex items-center ${textSizes[size]}`}>
            Syntax<span className="text-emerald-400">Less</span>
          </div>
          {showTagline && (
            <div className="text-[9px] font-mono font-bold tracking-[0.2em] text-slate-400 uppercase">
              THINK IT. <span className="text-emerald-400">BUILD IT.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
