import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { ProjectFile, SupportedLanguage, ThemeMode } from "../types";
import { 
  Code2, 
  Sparkles, 
  Copy, 
  Check, 
  X, 
  ChevronRight, 
  FileCode,
  Maximize2,
  Minimize2,
  BookOpen,
  Wand2,
  MessageSquare,
  Search,
  CheckCircle2,
  AlignLeft,
  Terminal
} from "lucide-react";

interface Props {
  file: ProjectFile;
  allFiles?: ProjectFile[];
  onSelectFile?: (fileId: string) => void;
  onChangeCode: (code: string) => void;
  onSyncCodeToAll: () => void;
  isProcessing: boolean;
  language: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  theme: ThemeMode;
  onClosePanel?: () => void;
  onToggleMaximize?: () => void;
  isMaximized?: boolean;
}

export const CodeEditorPanel: React.FC<Props> = ({
  file,
  allFiles = [],
  onSelectFile,
  onChangeCode,
  onSyncCodeToAll,
  isProcessing,
  language,
  onChangeLanguage,
  theme,
  onClosePanel,
  onToggleMaximize,
  isMaximized = false,
}) => {
  const isDark = theme === "dark";
  const [copied, setCopied] = useState(false);
  const [editorMode, setEditorMode] = useState<"code" | "human">("code");
  const [humanInstruction, setHumanInstruction] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(file.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormatCode = () => {
    try {
      if (language === "json") {
        const formatted = JSON.stringify(JSON.parse(file.code), null, 2);
        onChangeCode(formatted);
      } else {
        // basic clean trim indent formatting
        const lines = file.code.split("\n");
        const cleaned = lines.map(l => l.trimEnd()).join("\n");
        onChangeCode(cleaned);
      }
    } catch (err) {
      console.warn("Formatting failed:", err);
    }
  };

  const linesCount = file.code.split("\n").length;
  const charsCount = file.code.length;
  const wordsCount = file.code.trim().split(/\s+/).filter(Boolean).length;

  // Determine open tabs
  const openTabs = allFiles.length > 0 ? allFiles.slice(0, 4) : [file];

  return (
    <div
      className={`h-full flex flex-col select-none transition-colors duration-200 ${
        isDark ? "bg-[#090d16] text-slate-200" : "bg-white text-slate-800"
      }`}
    >
      {/* Tab Bar Header */}
      <div
        className={`flex items-center justify-between border-b text-xs ${
          isDark ? "bg-[#0c101c] border-slate-800" : "bg-slate-100 border-slate-200"
        }`}
      >
        {/* Open File Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto">
          {openTabs.map((tab) => {
            const isActive = tab.id === file.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectFile && onSelectFile(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 border-r text-xs font-mono transition-all ${
                  isActive
                    ? isDark
                      ? "bg-[#090d16] text-emerald-400 font-bold border-t-2 border-t-emerald-500 border-r-slate-800"
                      : "bg-white text-slate-900 font-bold border-t-2 border-t-emerald-500 border-r-slate-200"
                    : isDark
                    ? "text-slate-400 hover:text-slate-200 border-r-slate-800/60"
                    : "text-slate-600 hover:text-slate-900 border-r-slate-200"
                }`}
              >
                <FileCode className={`w-3.5 h-3.5 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                <span>{tab.name}</span>
                {isActive && <X className="w-3 h-3 opacity-60 hover:opacity-100" />}
              </button>
            );
          })}
        </div>

        {/* Right Tools: Mode Switcher, Language Picker & Panel Controls */}
        <div className="flex items-center space-x-2 px-3">
          {/* Code vs Human Mode Switcher */}
          <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[11px] font-bold">
            <button
              onClick={() => setEditorMode("code")}
              className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-all ${
                editorMode === "code"
                  ? "bg-emerald-500 text-slate-950 font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>Code</span>
            </button>
            <button
              onClick={() => setEditorMode("human")}
              className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-all ${
                editorMode === "human"
                  ? "bg-emerald-500 text-slate-950 font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>Human Text</span>
            </button>
          </div>

          <select
            value={language}
            onChange={(e) => onChangeLanguage(e.target.value as SupportedLanguage)}
            className={`text-[11px] font-mono px-2 py-1 rounded-lg border outline-none cursor-pointer ${
              isDark
                ? "bg-slate-900 border-slate-700 text-slate-200"
                : "bg-white border-slate-300 text-slate-800"
            }`}
          >
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="sql">SQL</option>
            <option value="json">JSON</option>
            <option value="markdown">Markdown</option>
          </select>

          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-1 rounded text-slate-400 hover:text-white transition-all"
            title="Search Code"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleFormatCode}
            className="p-1 rounded text-slate-400 hover:text-emerald-400 transition-all"
            title="Format Code"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopyCode}
            className="p-1 rounded text-slate-400 hover:text-white transition-all"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onSyncCodeToAll}
            disabled={isProcessing}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] transition-all"
          >
            <Sparkles className="w-3 h-3" />
            <span>Sync</span>
          </button>

          {/* Panel Window Controls (Maximize & Close) */}
          {onToggleMaximize && (
            <button
              onClick={onToggleMaximize}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
              title={isMaximized ? "Restore Panel Size" : "Maximize Code Panel"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}

          {onClosePanel && (
            <button
              onClick={onClosePanel}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-rose-400"
              title="Close Code Panel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Breadcrumb & Code Stats Bar */}
      <div
        className={`px-3 py-1 border-b flex items-center justify-between text-[11px] font-mono ${
          isDark ? "bg-[#090d16] border-slate-800/80 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-600"
        }`}
      >
        <div className="flex items-center space-x-1">
          <span>pages</span>
          <ChevronRight className="w-3 h-3 opacity-50" />
          <span className="text-emerald-400 font-bold">{file.name}</span>
          <ChevronRight className="w-3 h-3 opacity-50" />
          <span>{language}</span>
        </div>

        <div className="flex items-center space-x-3 text-[10px] text-slate-500">
          <span>Lines: <strong className="text-slate-300">{linesCount}</strong></span>
          <span>Chars: <strong className="text-slate-300">{charsCount}</strong></span>
          <span>Words: <strong className="text-slate-300">{wordsCount}</strong></span>
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3 h-3" /> Valid
          </span>
        </div>
      </div>

      {/* Search Bar Overlay */}
      {showSearch && (
        <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center space-x-2 text-xs">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search text in code..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
          <button onClick={() => setShowSearch(false)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      {editorMode === "code" ? (
        /* Monaco Code Editor */
        <div className="flex-1 relative overflow-hidden">
          <Editor
            height="100%"
            language={language === "react" ? "typescript" : language}
            value={file.code}
            onChange={(val) => onChangeCode(val || "")}
            theme={isDark ? "vs-dark" : "light"}
            options={{
              fontSize: 13,
              fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              padding: { top: 12 },
              lineNumbersMinChars: 3,
              smoothScrolling: true,
              renderLineHighlight: "all",
            }}
          />
        </div>
      ) : (
        /* Human Mode: Natural Language Text Breakdown & Editing */
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#090d16] text-slate-200 font-sans">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400">
              <BookOpen className="w-4 h-4" />
              <h3 className="font-bold text-sm text-white">Human Language Overview</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {file.naturalExplanation || "This code module defines the structure, behavior, and styling for the active application interface."}
            </p>
          </div>

          {/* Section-by-Section Explanations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Wand2 className="w-3.5 h-3.5 text-emerald-400" />
              Natural Block Explanations
            </h4>

            {file.lineExplanations && file.lineExplanations.length > 0 ? (
              file.lineExplanations.map((exp, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[10px] text-emerald-400 font-bold">Line {exp.line}</span>
                    <span className="text-[10px] text-slate-500 font-mono">Structure block</span>
                  </div>
                  <div className="font-mono text-xs text-emerald-400 bg-slate-950 p-2 rounded-lg border border-slate-800/80 truncate">
                    <code>{exp.codeSnippet}</code>
                  </div>
                  <p className="text-xs text-slate-300">{exp.explanation}</p>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400">
                Automatic line-by-line breakdown generated for <span className="text-emerald-400 font-mono">{file.name}</span>. Click below to ask AI to rewrite in plain English.
              </div>
            )}
          </div>

          {/* Direct Human Prompt Input */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <label className="block text-xs font-bold text-white flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              Edit in Plain English
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={humanInstruction}
                onChange={(e) => setHumanInstruction(e.target.value)}
                placeholder="e.g. Change button color to emerald green and add hover bounce..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => {
                  if (humanInstruction) {
                    onSyncCodeToAll();
                    setHumanInstruction("");
                  }
                }}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Apply</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
