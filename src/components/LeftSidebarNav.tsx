import React from "react";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Compass, 
  MessageSquare, 
  Zap, 
  Boxes, 
  Image, 
  GitBranch, 
  Database, 
  Server, 
  CloudUpload, 
  BookOpen, 
  Settings, 
  Sparkles,
  Zap as BoltIcon
} from "lucide-react";
import { ThemeMode } from "../types";

interface Props {
  activeNav: string;
  onSelectNav: (nav: string) => void;
  theme: ThemeMode;
}

export const LeftSidebarNav: React.FC<Props> = ({ activeNav, onSelectNav, theme }) => {
  const isDark = theme === "dark";

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "explorer", label: "Explorer", icon: Compass },
    { id: "ai_chat", label: "AI Chat", icon: MessageSquare },
    { id: "visual_editor", label: "Visual Editor", icon: Zap },
    { id: "components", label: "Components", icon: Boxes },
    { id: "assets", label: "Assets", icon: Image },
    { id: "database", label: "Database", icon: Database },
    { id: "api", label: "API", icon: Server },
    { id: "deploy", label: "Deploy", icon: CloudUpload },
    { id: "documentation", label: "Documentation", icon: BookOpen },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`w-52 flex flex-col justify-between border-r select-none transition-colors duration-200 z-20 ${
        isDark 
          ? "bg-[#090d16] border-slate-800/80 text-slate-300" 
          : "bg-slate-50 border-slate-200 text-slate-700"
      }`}
    >
      {/* Navigation Links */}
      <div className="p-2 space-y-0.5 overflow-y-auto flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectNav(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? isDark
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold"
                    : "bg-emerald-500/20 text-slate-900 border border-emerald-500/50 font-bold"
                  : isDark
                  ? "text-slate-400 hover:text-slate-200 hover:bg-slate-900/80"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "opacity-70"}`} />
                <span>{item.label}</span>
              </div>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
