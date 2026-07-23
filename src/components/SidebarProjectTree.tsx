import React, { useState, useRef } from "react";
import { Project, ProjectFile, SupportedLanguage, ThemeMode } from "../types";
import { 
  Folder, 
  FolderOpen,
  FileCode, 
  Plus, 
  Upload, 
  ChevronRight, 
  ChevronDown, 
  RefreshCw,
  FileText,
  FileUp,
  X
} from "lucide-react";

interface Props {
  project: Project;
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
  onImportCode: (filename: string, code: string, lang: SupportedLanguage) => void;
  theme: ThemeMode;
  onClosePanel?: () => void;
}

export const SidebarProjectTree: React.FC<Props> = ({
  project,
  activeFileId,
  onSelectFile,
  onImportCode,
  theme,
  onClosePanel,
}) => {

  const isDark = theme === "dark";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    pages: true,
    components: true,
    styles: true,
    assets: false,
    backend: true,
    database: true,
  });

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importFileName, setImportFileName] = useState("auth_service.js");
  const [importCodeSnippet, setImportCodeSnippet] = useState("");
  const [importLanguage, setImportLanguage] = useState<SupportedLanguage>("javascript");
  const [isDragOver, setIsDragOver] = useState(false);

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importFileName || !importCodeSnippet) return;
    onImportCode(importFileName, importCodeSnippet, importLanguage);
    setIsImportModalOpen(false);
    setImportCodeSnippet("");
  };

  const detectLanguage = (filename: string): SupportedLanguage => {
    const ext = filename.split(".").pop()?.toLowerCase();
    if (ext === "html" || ext === "htm") return "html";
    if (ext === "css") return "css";
    if (ext === "js" || ext === "jsx") return "javascript";
    if (ext === "ts" || ext === "tsx") return "typescript";
    if (ext === "py") return "python";
    if (ext === "sql") return "sql";
    if (ext === "json") return "json";
    if (ext === "md") return "markdown";
    return "javascript";
  };

  const processUploadedFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text !== undefined) {
          const lang = detectLanguage(file.name);
          onImportCode(file.name, text, lang);
        }
      };
      reader.readAsText(file);
    });
    setIsImportModalOpen(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processUploadedFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processUploadedFiles(e.dataTransfer.files);
    }
  };

  // Group files by path folder
  const groupedFiles = React.useMemo(() => {
    const groups: Record<string, ProjectFile[]> = {
      root: [],
    };

    project.files.forEach((file) => {
      const parts = file.path.split("/");
      if (parts.length > 1) {
        const folder = parts[0];
        if (!groups[folder]) groups[folder] = [];
        groups[folder].push(file);
      } else {
        groups.root.push(file);
      }
    });

    return groups;
  }, [project.files]);

  return (
    <aside
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={`w-60 flex flex-col border-r text-xs select-none transition-colors duration-200 relative ${
        isDark 
          ? "bg-[#0c101c] border-slate-800/80 text-slate-300" 
          : "bg-white border-slate-200 text-slate-800"
      }`}
    >
      {/* Hidden File Input for Native Pick */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        multiple
        className="hidden"
        accept=".html,.css,.js,.jsx,.ts,.tsx,.py,.sql,.json,.md,.txt,.svg"
      />

      {/* Drag Over Overlay Visual Indicator */}
      {isDragOver && (
        <div className="absolute inset-0 bg-emerald-500/20 border-2 border-dashed border-emerald-500 z-40 flex flex-col items-center justify-center p-4 text-center backdrop-blur-xs">
          <FileUp className="w-8 h-8 text-emerald-400 animate-bounce mb-2" />
          <span className="font-bold text-white text-xs">Drop files here to upload & edit</span>
        </div>
      )}

      {/* Explorer Header */}
      <div
        className={`p-3 border-b flex items-center justify-between font-bold uppercase tracking-wider text-[11px] ${
          isDark ? "bg-[#090d16] border-slate-800" : "bg-slate-50 border-slate-200"
        }`}
      >
        <span className={isDark ? "text-slate-200" : "text-slate-900"}>Explorer</span>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-all"
            title="Upload File From Device"
          >
            <Upload className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-all"
            title="Create New File"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          {onClosePanel && (
            <button
              onClick={onClosePanel}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-rose-400"
              title="Close Explorer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>


      {/* Project Folder Title */}
      <div
        className={`px-3 py-2 border-b flex items-center space-x-2 font-semibold text-xs ${
          isDark ? "bg-slate-900/40 border-slate-800/60 text-slate-300" : "bg-slate-100/60 border-slate-200 text-slate-800"
        }`}
      >
        <FolderOpen className="w-4 h-4 text-emerald-400" />
        <span className="truncate">{project.title}</span>
      </div>

      {/* File Tree Items */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {(Object.entries(groupedFiles) as [string, ProjectFile[]][]).map(([folderName, files]) => {
          if (folderName === "root") {
            return files.map((file) => (
              <RenderFileButton
                key={file.id}
                file={file}
                isActive={file.id === activeFileId}
                onSelectFile={onSelectFile}
                isDark={isDark}
              />
            ));
          }

          const isExpanded = !!expandedFolders[folderName];

          return (
            <div key={folderName} className="space-y-0.5">
              {/* Folder Toggle Header */}
              <button
                onClick={() => toggleFolder(folderName)}
                className={`w-full flex items-center space-x-1.5 px-1.5 py-1 rounded hover:bg-slate-800/40 text-left font-medium ${
                  isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                )}
                {isExpanded ? (
                  <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Folder className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span className="font-mono text-[11px]">{folderName}</span>
              </button>

              {/* Folder Children */}
              {isExpanded && (
                <div className="pl-4 space-y-0.5 border-l border-slate-800/40 ml-2">
                  {files.map((file) => (
                    <RenderFileButton
                      key={file.id}
                      file={file}
                      isActive={file.id === activeFileId}
                      onSelectFile={onSelectFile}
                      isDark={isDark}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Import / Create Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-emerald-400" />
                Create or Upload Code File
              </h3>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Quick Upload Drop Zone inside modal */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="p-4 border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl bg-slate-950/60 text-center cursor-pointer transition-all space-y-1"
            >
              <FileUp className="w-6 h-6 text-emerald-400 mx-auto" />
              <div className="font-bold text-xs text-slate-200">Click to upload file from your computer</div>
              <div className="text-[10px] text-slate-500">Supports .html, .css, .js, .ts, .py, .sql, .json, .md</div>
            </div>

            <form onSubmit={handleImportSubmit} className="space-y-3 text-xs pt-1">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Or Create New File (Filename)</label>
                <input
                  type="text"
                  value={importFileName}
                  onChange={(e) => setImportFileName(e.target.value)}
                  placeholder="e.g. auth_service.js"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Language</label>
                <select
                  value={importLanguage}
                  onChange={(e) => setImportLanguage(e.target.value as SupportedLanguage)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
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
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Initial Code</label>
                <textarea
                  value={importCodeSnippet}
                  onChange={(e) => setImportCodeSnippet(e.target.value)}
                  rows={4}
                  placeholder="Paste or write initial code..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 font-mono text-[11px] text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all"
                >
                  Create & Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
};

const RenderFileButton: React.FC<{
  file: ProjectFile;
  isActive: boolean;
  onSelectFile: (id: string) => void;
  isDark: boolean;
}> = ({ file, isActive, onSelectFile, isDark }) => {
  let fileColor = "text-amber-400";
  if (file.language === "html") fileColor = "text-orange-400";
  if (file.language === "css") fileColor = "text-emerald-400";
  if (file.language === "javascript" || file.language === "typescript") fileColor = "text-yellow-400";
  if (file.language === "python") fileColor = "text-blue-400";
  if (file.language === "sql") fileColor = "text-indigo-400";

  return (
    <button
      onClick={() => onSelectFile(file.id)}
      className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg font-mono text-[11px] transition-all text-left ${
        isActive
          ? isDark
            ? "bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30 shadow-sm"
            : "bg-emerald-500/20 text-slate-900 font-bold border border-emerald-500/50"
          : isDark
          ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      }`}
    >
      <FileCode className={`w-3.5 h-3.5 flex-shrink-0 ${fileColor}`} />
      <span className="truncate">{file.name}</span>
    </button>
  );
};

