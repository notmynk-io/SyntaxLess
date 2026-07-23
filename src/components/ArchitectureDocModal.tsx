import React, { useState } from "react";
import { 
  X, 
  Layers, 
  Cpu, 
  Database, 
  RefreshCw, 
  Sparkles, 
  FileCode, 
  ShieldCheck, 
  TrendingUp, 
  Globe, 
  BookOpen, 
  Terminal, 
  CheckCircle2 
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureDocModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "sync_engine" | "ast_parser" | "db_design" | "ai_prompts" | "roadmap"
  >("overview");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col text-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-bold">
              <BookOpen className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                SyntaxLess — Production Architecture & Engineering Specification
              </h2>
              <p className="text-xs text-slate-400">Senior Architect Blueprint for Next-Gen Intent-First IDE</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Spec Category Tabs */}
        <div className="bg-slate-950/60 border-b border-slate-800 px-4 py-2 flex items-center space-x-2 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeTab === "overview"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            1. System Overview & Tech Stack
          </button>
          <button
            onClick={() => setActiveTab("sync_engine")}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeTab === "sync_engine"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            2. Tri-Directional Sync Pipeline
          </button>
          <button
            onClick={() => setActiveTab("ast_parser")}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeTab === "ast_parser"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            3. AST-Based Parsing Engine
          </button>
          <button
            onClick={() => setActiveTab("db_design")}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeTab === "db_design"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            4. Database & Storage Architecture
          </button>
          <button
            onClick={() => setActiveTab("ai_prompts")}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeTab === "ai_prompts"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            5. Prompt Engineering Strategy
          </button>
          <button
            onClick={() => setActiveTab("roadmap")}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeTab === "roadmap"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            6. Scalability & Future Roadmap
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300">
          {activeTab === "overview" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-400" />
                1. System Architecture & Core Technology Stack
              </h3>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="text-slate-300 leading-relaxed">
                  SyntaxLess is designed as an <strong>Intent-First, AI-Native IDE</strong>. Traditional IDEs treat text syntax as the primary source of truth. SyntaxLess decouples abstract software intent from syntax by converting all three representations (Natural Language, Visual Node Graph, and Source Code) into a unified internal AST representation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider">Frontend Stack</h4>
                  <ul className="text-xs space-y-1.5 text-slate-300 font-mono">
                    <li>• <strong>React 19 + TypeScript</strong> for reactive UI state</li>
                    <li>• <strong>@xyflow/react</strong> for graph visualization & drag-and-drop node editing</li>
                    <li>• <strong>Monaco Editor</strong> (@monaco-editor/react) for multi-language IDE syntax</li>
                    <li>• <strong>Tailwind CSS</strong> for high-density, accessible dark design</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-blue-400 text-xs uppercase tracking-wider">Backend & AI Stack</h4>
                  <ul className="text-xs space-y-1.5 text-slate-300 font-mono">
                    <li>• <strong>Express / Node.js Server</strong> hosting proxy endpoints</li>
                    <li>• <strong>@google/genai SDK</strong> with model <code>gemini-3.6-flash</code></li>
                    <li>• <strong>Tree-sitter AST parser</strong> bindings for multi-language grammar trees</li>
                    <li>• <strong>Server-side API key isolation</strong> via <code>process.env.GEMINI_API_KEY</code></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "sync_engine" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-cyan-400" />
                2. Tri-Directional Synchronization Engine Pipeline
              </h3>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-cyan-300">
                  [Natural Language Edit] ──► [Gemini Intent Resolver] ──► [AST Normalizer] ──► [Source Code + Visual Graph]
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-indigo-300">
                  [Visual Graph Node Edit] ──► [Node-to-AST Compiler] ──► [Code Generator] ──► [Natural Explanation Sync]
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-blue-300">
                  [Direct Code Edit] ──► [Tree-Sitter Grammar Parser] ──► [AST Synced Event] ──► [Diagram & Explanation Refresh]
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                <h4 className="font-bold text-white">Event Loop Synchronization Invariant</h4>
                <p>
                  To prevent circular synchronization infinite loops, the synchronization engine utilizes an event-debounced transactional token system. Whenever an edit originates from any side, a unique <code>syncToken</code> is stamped. Subscriptions only execute if the <code>syncToken</code> is fresh, guaranteeing deterministic convergence.
                </p>
              </div>
            </div>
          )}

          {activeTab === "ast_parser" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-cyan-400" />
                3. Multi-Language AST Grammar Parser Engine
              </h3>

              <p className="text-xs text-slate-300">
                SyntaxLess parses source code into language-agnostic Intermediate AST Nodes:
              </p>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 whitespace-pre">
{`interface StandardASTNode {
  id: string;
  type: "condition" | "loop" | "variable" | "function" | "api_call" | "db_op";
  label: string;
  sourceRange: { startLine: number; endLine: number };
  children?: StandardASTNode[];
  metadata: Record<string, any>;
}`}
              </div>
            </div>
          )}

          {activeTab === "db_design" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-400" />
                4. Database Schema Design (PostgreSQL / Firestore)
              </h3>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre">
{`CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE project_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  file_path VARCHAR(512) NOT NULL,
  language VARCHAR(50) NOT NULL,
  source_code TEXT NOT NULL,
  natural_explanation TEXT,
  ast_nodes_json JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
              </div>
            </div>
          )}

          {activeTab === "ai_prompts" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                5. System Prompts & Temperature Engineering
              </h3>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                <p><strong>Model Selection:</strong> <code>gemini-3.6-flash</code> for high-speed, structured JSON code transformations and natural language code explanations.</p>
                <p><strong>Config Rules:</strong> <code>temperature: 0.2</code> for deterministic code generation and strict <code>responseMimeType: "application/json"</code> validation.</p>
              </div>
            </div>
          )}

          {activeTab === "roadmap" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                6. Production Scalability & Future Roadmap
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-emerald-400">Phase 1 (Current Build)</h4>
                  <p>Tri-directional synchronization, Monaco editor, React Flow visual diagrams, multi-level explanations, AI assistant quick tools.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-cyan-400">Phase 2 (Enterprise Roadmap)</h4>
                  <p>Cloud repository auto-sync, WebAssembly local Tree-sitter parsing worker, multi-user real-time collaborative canvas via WebSockets.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
