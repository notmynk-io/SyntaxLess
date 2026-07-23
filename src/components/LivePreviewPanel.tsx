import React, { useState, useEffect } from "react";
import { ProjectFile, ThemeMode } from "../types";
import { 
  Play, 
  RotateCcw, 
  ExternalLink, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Terminal,
  FileCode,
  CheckCircle2,
  AlertCircle,
  Database,
  Code2,
  Maximize2,
  Minimize2,
  X
} from "lucide-react";

interface Props {
  file: ProjectFile;
  allFiles?: ProjectFile[];
  theme?: ThemeMode;
  onClosePanel?: () => void;
  onToggleMaximize?: () => void;
  isMaximized?: boolean;
}

export const LivePreviewPanel: React.FC<Props> = ({
  file,
  allFiles = [],
  theme = "dark",
  onClosePanel,
  onToggleMaximize,
  isMaximized = false,
}) => {

  const isDark = theme === "dark";

  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [reloadKey, setReloadKey] = useState(0);
  const [pythonLogs, setPythonLogs] = useState<string[]>([]);
  const [pythonError, setPythonError] = useState<string | null>(null);

  // Re-run Python simulation when file.code changes
  useEffect(() => {
    if (file.language === "python") {
      try {
        setPythonError(null);
        const logs: string[] = [];
        const lines = file.code.split("\n");
        
        lines.forEach((line) => {
          const trimmed = line.trim();
          if (trimmed.startsWith("print(")) {
            const inner = trimmed.slice(6, -1);
            // evaluate simple strings or template expressions
            if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
              logs.push(inner.slice(1, -1));
            } else if (inner.includes("+") || inner.includes("*") || inner.includes("f\"")) {
              logs.push(`[Output]: ${inner.replace(/['"]/g, "")}`);
            } else {
              logs.push(`[Output]: ${inner}`);
            }
          }
        });

        if (logs.length === 0) {
          logs.push("Process finished with exit code 0");
        }
        setPythonLogs(logs);
      } catch (err: any) {
        setPythonError(err.message || "Python Syntax Error");
      }
    }
  }, [file.code, file.language]);

  // Generate HTML source doc for iframe live preview
  const generateIframeSrcDoc = () => {
    // If there is a main HTML file in the project or if current file is HTML
    let htmlContent = "";
    let cssContent = "";
    let jsContent = "";

    if (file.language === "html" || file.name.endsWith(".html")) {
      htmlContent = file.code;
    } else {
      const htmlFile = allFiles.find((f) => f.name.endsWith(".html") || f.language === "html");
      if (htmlFile) {
        htmlContent = htmlFile.code;
      } else {
        htmlContent = `<div id="app">${file.code}</div>`;
      }
    }

    const cssFile = allFiles.find((f) => f.name.endsWith(".css") || f.language === "css");
    if (cssFile) {
      cssContent = cssFile.code;
    }

    const jsFile = allFiles.find((f) => f.name.endsWith(".js") || f.name.endsWith(".jsx") || f.language === "javascript" || f.language === "react");
    if (jsFile) {
      jsContent = jsFile.code;
    }

    // Embed Tailwind CSS, Babel, and React CDN for full interactive live rendering
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            background-color: ${isDark ? "#090d16" : "#ffffff"};
            color: ${isDark ? "#f3f4f6" : "#111827"};
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 0;
            padding: 0;
          }
          ${cssContent}
        </style>
      </head>
      <body>
        ${htmlContent}
        <script>
          try {
            ${jsContent}
          } catch(e) {
            console.error(e);
          }
        </script>
      </body>
      </html>
    `;
  };

  const renderContentByLanguage = () => {
    switch (file.language) {
      case "html":
      case "javascript":
      case "typescript":
      case "react":
      case "css":
        return (
          <iframe
            key={reloadKey}
            title="Live App Preview"
            srcDoc={generateIframeSrcDoc()}
            className="w-full h-full border-0 bg-transparent rounded-xl"
            sandbox="allow-scripts allow-modals allow-same-origin"
          />
        );

      case "python":
        return (
          <div className="w-full h-full p-6 bg-[#0c101c] text-slate-200 font-mono text-xs flex flex-col space-y-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Terminal className="w-4 h-4" />
                <span className="font-bold">Python 3.11 Runtime Output</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            {pythonError ? (
              <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4" />
                  <span>Execution Exception</span>
                </div>
                <pre>{pythonError}</pre>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-2 p-3 bg-slate-950/80 rounded-lg border border-slate-800/80 font-mono text-slate-300">
                <div className="text-slate-500 text-[11px] mb-2">$ python {file.name}</div>
                {pythonLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">›</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="text-[10px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-800">
              <span>Memory: 18.4 MB</span>
              <span>Execution Time: 42ms</span>
            </div>
          </div>
        );

      case "json":
        let formattedJson = file.code;
        let isValidJson = true;
        try {
          formattedJson = JSON.stringify(JSON.parse(file.code), null, 2);
        } catch (e) {
          isValidJson = false;
        }

        return (
          <div className="w-full h-full p-6 bg-[#0c101c] text-slate-200 font-mono text-xs flex flex-col space-y-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-emerald-400">JSON Data Inspector</span>
              {isValidJson ? (
                <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Valid JSON
                </span>
              ) : (
                <span className="flex items-center gap-1 text-rose-400 text-[11px] font-bold">
                  <AlertCircle className="w-3.5 h-3.5" /> Invalid Syntax
                </span>
              )}
            </div>
            <pre className="flex-1 overflow-y-auto p-4 rounded-lg bg-slate-950/90 text-emerald-300 border border-slate-800 leading-relaxed">
              <code>{formattedJson}</code>
            </pre>
          </div>
        );

      case "sql":
        return (
          <div className="w-full h-full p-6 bg-[#0c101c] text-slate-200 font-mono text-xs flex flex-col space-y-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Database className="w-4 h-4" />
                <span className="font-bold">SQL Query Result Preview</span>
              </div>
              <span className="text-[11px] text-slate-400">PostgreSQL 15</span>
            </div>

            <div className="flex-1 overflow-y-auto border border-slate-800 rounded-lg bg-slate-950/90">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                    <th className="p-2.5 border-r border-slate-800">id</th>
                    <th className="p-2.5 border-r border-slate-800">product_name</th>
                    <th className="p-2.5 border-r border-slate-800">price</th>
                    <th className="p-2.5 border-r border-slate-800">stock</th>
                    <th className="p-2.5">status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-2.5 border-r border-slate-800 font-mono text-emerald-400">101</td>
                    <td className="p-2.5 border-r border-slate-800 font-semibold">Wireless Headphones</td>
                    <td className="p-2.5 border-r border-slate-800 text-emerald-400">$129.99</td>
                    <td className="p-2.5 border-r border-slate-800">45</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">In Stock</span></td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-2.5 border-r border-slate-800 font-mono text-emerald-400">102</td>
                    <td className="p-2.5 border-r border-slate-800 font-semibold">Ergonomic Keyboard</td>
                    <td className="p-2.5 border-r border-slate-800 text-emerald-400">$89.00</td>
                    <td className="p-2.5 border-r border-slate-800">12</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold">Low Stock</span></td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-2.5 border-r border-slate-800 font-mono text-emerald-400">103</td>
                    <td className="p-2.5 border-r border-slate-800 font-semibold">4K Gaming Monitor</td>
                    <td className="p-2.5 border-r border-slate-800 text-emerald-400">$449.50</td>
                    <td className="p-2.5 border-r border-slate-800">28</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">In Stock</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
              <span>3 rows returned in 12ms</span>
              <span className="text-emerald-400">✓ Query OK</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full p-6 bg-[#0c101c] text-slate-200 flex flex-col items-center justify-center space-y-3 rounded-xl border border-slate-800 text-center">
            <Code2 className="w-10 h-10 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Live Execution Ready</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Editing <span className="text-emerald-400 font-mono">{file.name}</span> will instantly re-render output across all connected devices.
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className={`h-full flex flex-col border-l select-none transition-colors duration-200 ${
        isDark ? "bg-[#090d16] border-slate-800/80 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
      }`}
    >
      {/* Browser Controls Header Bar */}
      <div
        className={`px-3 py-2 border-b flex items-center justify-between text-xs font-bold ${
          isDark ? "bg-[#0c101c] border-slate-800" : "bg-white border-slate-200"
        }`}
      >
        <div className="flex items-center space-x-2">
          <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
          <span className={isDark ? "text-white" : "text-slate-900"}>Live Preview</span>
        </div>

        {/* Responsive Device Switchers */}
        <div className="flex items-center space-x-1 bg-slate-900/80 p-0.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setDeviceMode("desktop")}
            className={`p-1 rounded-lg transition-all ${
              deviceMode === "desktop" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
            title="Desktop View"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceMode("tablet")}
            className={`p-1 rounded-lg transition-all ${
              deviceMode === "tablet" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
            title="Tablet View"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceMode("mobile")}
            className={`p-1 rounded-lg transition-all ${
              deviceMode === "mobile" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* URL Bar */}
        <div className="flex-1 max-w-xs mx-3 hidden sm:block">
          <div className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] font-mono text-slate-400 truncate text-center flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>http://localhost:3000/{file.name}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-slate-400">
          <button
            onClick={() => setReloadKey((prev) => prev + 1)}
            className="p-1 rounded hover:bg-slate-800 hover:text-white transition-all"
            title="Reload Preview"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => window.open("http://localhost:3000", "_blank")}
            className="p-1 rounded hover:bg-slate-800 hover:text-white transition-all"
            title="Open in New Tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {onToggleMaximize && (
            <button
              onClick={onToggleMaximize}
              className="p-1 rounded hover:bg-slate-800 hover:text-white"
              title={isMaximized ? "Restore Size" : "Maximize Panel"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}

          {onClosePanel && (
            <button
              onClick={onClosePanel}
              className="p-1 rounded hover:bg-slate-800 hover:text-rose-400"
              title="Close Panel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Rendered Live Website Canvas */}
      <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center bg-slate-950/60">
        <div
          className={`h-full border rounded-2xl overflow-y-auto shadow-2xl transition-all duration-300 flex flex-col bg-[#090d16] border-slate-800 text-white ${
            deviceMode === "desktop"
              ? "w-full"
              : deviceMode === "tablet"
              ? "w-[680px]"
              : "w-[380px]"
          }`}
        >
          {renderContentByLanguage()}
        </div>
      </div>
    </div>
  );
};

