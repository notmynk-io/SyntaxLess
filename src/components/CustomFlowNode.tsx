import React from "react";
import { Handle, Position } from "@xyflow/react";
import { VisualNodeData } from "../types";
import { GitBranch, Repeat, Variable, Code2, Globe, Database, LayoutGrid, Play, ArrowRight, CheckCircle2 } from "lucide-react";

interface Props {
  data: VisualNodeData;
  selected?: boolean;
}

export const CustomFlowNode: React.FC<Props> = ({ data, selected }) => {
  const getNodeColor = (type?: string) => {
    switch (type) {
      case "condition":
        return {
          bg: "bg-amber-950/40 border-amber-500/50 text-amber-300",
          badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
          icon: GitBranch,
        };
      case "loop":
        return {
          bg: "bg-purple-950/40 border-purple-500/50 text-purple-300",
          badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
          icon: Repeat,
        };
      case "variable":
        return {
          bg: "bg-blue-950/40 border-blue-500/50 text-blue-300",
          badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
          icon: Variable,
        };
      case "api_call":
        return {
          bg: "bg-cyan-950/40 border-cyan-500/50 text-cyan-300",
          badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
          icon: Globe,
        };
      case "db_op":
        return {
          bg: "bg-emerald-950/40 border-emerald-500/50 text-emerald-300",
          badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
          icon: Database,
        };
      case "ui_element":
        return {
          bg: "bg-pink-950/40 border-pink-500/50 text-pink-300",
          badge: "bg-pink-500/20 text-pink-300 border-pink-500/30",
          icon: LayoutGrid,
        };
      case "start":
        return {
          bg: "bg-indigo-950/40 border-indigo-500/50 text-indigo-300",
          badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
          icon: Play,
        };
      case "action":
        return {
          bg: "bg-teal-950/40 border-teal-500/50 text-teal-300",
          badge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
          icon: CheckCircle2,
        };
      default:
        return {
          bg: "bg-slate-900 border-slate-700 text-slate-200",
          badge: "bg-slate-800 text-slate-300 border-slate-700",
          icon: Code2,
        };
    }
  };

  const style = getNodeColor(data.nodeType);
  const IconComponent = style.icon;

  return (
    <div
      className={`min-w-[220px] max-w-[320px] rounded-xl border p-3.5 shadow-2xl backdrop-blur-md transition-all ${
        style.bg
      } ${selected ? "ring-2 ring-emerald-400 border-emerald-400 shadow-emerald-500/20" : ""}`}
    >
      <Handle type="target" position={Position.Left} className="!bg-emerald-400 !w-3 !h-3 !border-2 !border-slate-900" />
      
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className={`p-1.5 rounded-lg border ${style.badge}`}>
            <IconComponent className="w-4 h-4" />
          </div>
          <span className="font-semibold text-xs tracking-tight text-white">{data.title}</span>
        </div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider border ${style.badge}`}>
          {data.nodeType || "logic"}
        </span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed mb-2.5">{data.description}</p>

      {data.codeSnippet && (
        <div className="bg-slate-950/80 p-2 rounded-md border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto whitespace-pre">
          {data.codeSnippet}
        </div>
      )}

      <Handle type="source" position={Position.Right} className="!bg-emerald-400 !w-3 !h-3 !border-2 !border-slate-900" />
    </div>
  );
};
