import React, { useState, useEffect } from "react";
import { Sparkles, Terminal, Database, Code2, Cpu, CheckCircle2 } from "lucide-react";
import { SyntaxLessLogo } from "./SyntaxLessLogo";

interface Props {
  onComplete: () => void;
}

export const Preloader: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Initializing AI Engine", icon: Cpu },
    { title: "Connecting to MongoDB Atlas Cluster", icon: Database },
    { title: "Parsing Tree-Sitter Code AST", icon: Code2 },
    { title: "Starting Development Server", icon: Terminal },
    { title: "Readying SyntaxLess Canvas", icon: Sparkles },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        const next = prev + 2;
        const stepIdx = Math.min(Math.floor((next / 100) * steps.length), steps.length - 1);
        setCurrentStep(stepIdx);
        return next;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const StepIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 bg-[#070b14] z-50 flex flex-col items-center justify-center p-6 text-white font-sans select-none overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#22e334]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-sm w-full space-y-8 text-center flex flex-col items-center">
        {/* Animated Brand Logo */}
        <div className="relative py-2">
          <SyntaxLessLogo size="xl" showTagline={true} />
        </div>

        {/* Dynamic Status Indicator */}
        <div className="w-full p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-[#22e334]">
              <StepIcon className="w-4 h-4 animate-bounce" />
              <span className="font-semibold">{steps[currentStep].title}</span>
            </div>
            <span className="font-mono font-bold text-slate-400">{progress}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
            <div
              className="bg-gradient-to-r from-[#22e334] via-emerald-400 to-green-300 h-full rounded-full transition-all duration-150 shadow-[0_0_12px_rgba(34,227,52,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* MongoDB & Engine Status */}
          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> MongoDB Atlas Online
            </span>
            <span>Vite Dev Server :3000</span>
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={onComplete}
          className="text-xs text-slate-500 hover:text-slate-300 transition-all underline underline-offset-4"
        >
          Skip Preloader
        </button>
      </div>
    </div>
  );
};
