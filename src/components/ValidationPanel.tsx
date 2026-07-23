import React from "react";
import { ValidationIssue } from "../types";
import { ShieldCheck, AlertTriangle, XCircle, Info, Sparkles, CheckCircle2 } from "lucide-react";

interface Props {
  issues: ValidationIssue[];
  onQuickFix: (issue: ValidationIssue) => void;
  isValidating: boolean;
}

export const ValidationPanel: React.FC<Props> = ({
  issues,
  onQuickFix,
  isValidating,
}) => {
  return (
    <div className="bg-slate-950 border-t border-slate-800 p-3 text-slate-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">Validation & Logic Guard</span>
        </div>

        <span className="text-[10px] font-mono text-slate-400">
          {isValidating ? "Analyzing logic..." : issues.length === 0 ? "No issues detected ✓" : `${issues.length} warnings/errors`}
        </span>
      </div>

      {issues.length === 0 ? (
        <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>All checks passed! Code syntax is valid, logic flow is clean, and edge cases are handled.</span>
        </div>
      ) : (
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {issues.map((issue, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border flex items-start justify-between text-xs space-x-3 ${
                issue.severity === "error"
                  ? "bg-rose-950/30 border-rose-500/40 text-rose-200"
                  : "bg-amber-950/30 border-amber-500/40 text-amber-200"
              }`}
            >
              <div className="flex items-start space-x-2">
                {issue.severity === "error" ? (
                  <XCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    {issue.message}
                    {issue.line && (
                      <span className="text-[10px] font-mono px-1.5 rounded bg-slate-900 border border-slate-700">
                        Line {issue.line}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] opacity-90 mt-0.5">{issue.suggestion}</p>
                </div>
              </div>

              <button
                onClick={() => onQuickFix(issue)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[10px] transition-all flex-shrink-0"
              >
                <Sparkles className="w-3 h-3" />
                <span>Quick Fix</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
