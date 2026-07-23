/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Project, 
  ProjectFile, 
  ExplanationLevel, 
  ViewLayout, 
  VisualNode, 
  VisualEdge, 
  AssistantMessage,
  SupportedLanguage,
  ThemeMode,
  User 
} from "./types";
import { SAMPLE_PROJECTS } from "./data/sampleProjects";
import { Header } from "./components/Header";
import { LeftSidebarNav } from "./components/LeftSidebarNav";
import { SidebarProjectTree } from "./components/SidebarProjectTree";
import { CodeEditorPanel } from "./components/CodeEditorPanel";
import { AIChatPanel } from "./components/AIChatPanel";
import { VisualEditorPanel } from "./components/VisualEditorPanel";
import { LivePreviewPanel } from "./components/LivePreviewPanel";
import { StatusBar } from "./components/StatusBar";
import { ArchitectureDocModal } from "./components/ArchitectureDocModal";
import { Preloader } from "./components/Preloader";
import { AuthModal } from "./components/AuthModal";
import { 
  FolderTree, 
  Code2, 
  MessageSquareText, 
  Workflow, 
  Play, 
  RotateCcw,
  Sparkles
} from "lucide-react";

export default function App() {
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [activeNav, setActiveNav] = useState<string>("explorer");

  const [projects, setProjects] = useState<Project[]>(SAMPLE_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState<string>(SAMPLE_PROJECTS[0].id);
  const [activeFileId, setActiveFileId] = useState<string>(SAMPLE_PROJECTS[0].files[0].id);

  const [activeLayout, setActiveLayout] = useState<ViewLayout>("tri_split");
  const [explanationLevel, setExplanationLevel] = useState<ExplanationLevel>("Beginner");
  
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isArchDocsOpen, setIsArchDocsOpen] = useState<boolean>(false);

  // User Auth & MongoDB Atlas state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("natcode_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Dynamic Workspace Panel Visibility & Maximize States
  const [showExplorer, setShowExplorer] = useState<boolean>(true);
  const [showEditor, setShowEditor] = useState<boolean>(true);
  const [showAiChat, setShowAiChat] = useState<boolean>(true);
  const [showVisualEditor, setShowVisualEditor] = useState<boolean>(true);
  const [showLivePreview, setShowLivePreview] = useState<boolean>(true);
  
  const [maximizedPanel, setMaximizedPanel] = useState<"editor" | "aiChat" | "visualEditor" | "livePreview" | null>(null);

  const [chatHistory, setChatHistory] = useState<AssistantMessage[]>([
    {
      id: "msg-user-1",
      sender: "user",
      text: "Create a hero section with headline, subheadline and a call to action button.",
      timestamp: "10:30 AM"
    },
    {
      id: "msg-ai-1",
      sender: "ai",
      text: "I've created a modern hero section for you with:\n\nYou can customize the content, colors and styles as needed.",
      codeSnippet: `hero section created
<section class="hero">
  <div class="container">
    <div class="content">
      <h1>Best Deals for You</h1>
      <p>Discover amazing products at unbeatable prices.</p>
      <button class="btn primary">Shop Now</button>
    </div>
  </div>
</section>`,
      timestamp: "10:30 AM"
    }
  ]);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];
  const activeFile = activeProject.files.find((f) => f.id === activeFileId) || activeProject.files[0];

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    localStorage.removeItem("natcode_user");
    setCurrentUser(null);
    setIsAuthModalOpen(false);
  };

  // Toggle Panel helper
  const handleTogglePanel = (panel: "showExplorer" | "showEditor" | "showAiChat" | "showVisualEditor" | "showLivePreview") => {
    switch (panel) {
      case "showExplorer":
        setShowExplorer((prev) => !prev);
        break;
      case "showEditor":
        setShowEditor((prev) => !prev);
        break;
      case "showAiChat":
        setShowAiChat((prev) => !prev);
        break;
      case "showVisualEditor":
        setShowVisualEditor((prev) => !prev);
        break;
      case "showLivePreview":
        setShowLivePreview((prev) => !prev);
        break;
    }
  };

  // Reset all panels to visible
  const handleResetPanels = () => {
    setShowExplorer(true);
    setShowEditor(true);
    setShowAiChat(true);
    setShowVisualEditor(true);
    setShowLivePreview(true);
    setMaximizedPanel(null);
  };

  // Update active file
  const updateActiveFile = (updates: Partial<ProjectFile>) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) => {
        if (p.id === activeProjectId) {
          return {
            ...p,
            files: p.files.map((f) => {
              if (f.id === activeFileId) {
                return { ...f, ...updates };
              }
              return f;
            }),
          };
        }
        return p;
      })
    );
  };

  // Visual Diagram to Code Sync Handler
  const handleSyncVisualToCode = async (nodes: VisualNode[], edges: VisualEdge[]) => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/gemini/visual-to-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nodes,
          edges,
          language: activeFile.language,
          originalCode: activeFile.code,
        }),
      });

      const data = await res.json();
      if (data.code) {
        updateActiveFile({
          code: data.code,
          nodes,
          edges,
        });
      }
    } catch (err) {
      console.error("Error syncing visual to code:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Source Code to All Sync Handler
  const handleSyncCodeToAll = async () => {
    setIsSyncing(true);
    try {
      const visRes = await fetch("/api/gemini/code-to-visual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: activeFile.code,
          language: activeFile.language,
        }),
      });
      const visData = await visRes.json();

      updateActiveFile({
        nodes: visData.nodes || activeFile.nodes,
        edges: visData.edges || activeFile.edges,
      });
    } catch (err) {
      console.error("Error syncing code to all:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Send Chat Message
  const handleSendChatMessage = async (msgText: string) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setChatHistory((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: "user",
        text: msgText,
        timestamp: timeNow,
      },
    ]);

    setIsSyncing(true);
    try {
      const res = await fetch("/api/gemini/natural-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentCode: activeFile.code,
          instruction: msgText,
          language: activeFile.language,
          currentFile: activeFile.name,
        }),
      });

      const data = await res.json();
      if (data.updatedCode) {
        updateActiveFile({ code: data.updatedCode });
      }

      setChatHistory((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: data.explanation || `Updated ${activeFile.name} according to your request.`,
          codeSnippet: data.updatedCode || undefined,
          timestamp: timeNow,
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Import New File
  const handleImportCode = (filename: string, code: string, lang: SupportedLanguage) => {
    const newFile: ProjectFile = {
      id: `file-${Date.now()}`,
      name: filename,
      path: `src/${filename}`,
      language: lang,
      code,
      naturalExplanation: "Custom imported file module.",
      nodes: [],
      edges: [],
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === activeProjectId) {
          return {
            ...p,
            files: [...p.files, newFile],
            activeFileId: newFile.id,
          };
        }
        return p;
      })
    );
    setActiveFileId(newFile.id);
  };

  const handleSelectNav = (navId: string) => {
    setActiveNav(navId);

    switch (navId) {
      case "dashboard":
        handleResetPanels();
        break;
      case "projects": {
        const currentIndex = projects.findIndex((p) => p.id === activeProjectId);
        const nextProject = projects[(currentIndex + 1) % projects.length];
        if (nextProject) {
          setActiveProjectId(nextProject.id);
          setActiveFileId(nextProject.files[0].id);
        }
        break;
      }
      case "ai_chat":
        setShowAiChat(true);
        break;
      case "visual_editor":
        setShowVisualEditor(true);
        break;
      case "settings":
        toggleTheme();
        break;
      case "documentation":
        setIsArchDocsOpen(true);
        break;
      default:
        break;
    }
  };

  const isDark = theme === "dark";

  return (
    <div className={`h-screen w-screen flex flex-col font-sans overflow-hidden ${isDark ? "bg-[#090d16]" : "bg-slate-100"}`}>
      {/* Animated Splash Preloader */}
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      {/* Top Header Navigation */}
      <Header
        projects={projects}
        activeProject={activeProject}
        onSelectProject={(p) => {
          setActiveProjectId(p.id);
          setActiveFileId(p.files[0].id);
        }}
        activeLayout={activeLayout}
        onChangeLayout={setActiveLayout}
        explanationLevel={explanationLevel}
        onChangeLevel={setExplanationLevel}
        isSyncing={isSyncing}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenArchDocs={() => setIsArchDocsOpen(true)}
        onTriggerSync={handleSyncCodeToAll}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        panelStates={{ showExplorer, showEditor, showAiChat, showVisualEditor, showLivePreview }}
        onTogglePanel={handleTogglePanel}
        onResetPanels={handleResetPanels}
      />

      {/* Main Multi-Panel Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Leftmost Sidebar Navigation Icons */}
        <LeftSidebarNav
          activeNav={activeNav}
          onSelectNav={handleSelectNav}
          theme={theme}
        />

        {/* Project File Explorer Tree Panel */}
        {showExplorer && (
          <SidebarProjectTree
            project={activeProject}
            activeFileId={activeFile.id}
            onSelectFile={setActiveFileId}
            onImportCode={handleImportCode}
            theme={theme}
            onClosePanel={() => setShowExplorer(false)}
          />
        )}

        {/* Central Workspace Canvas Grid */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-950 relative">
          {/* If a panel is maximized, render full screen */}
          {maximizedPanel ? (
            <div className="flex-1 h-full w-full overflow-hidden">
              {maximizedPanel === "editor" && (
                <CodeEditorPanel
                  file={activeFile}
                  allFiles={activeProject.files}
                  onSelectFile={setActiveFileId}
                  onChangeCode={(code) => updateActiveFile({ code })}
                  onSyncCodeToAll={handleSyncCodeToAll}
                  isProcessing={isSyncing}
                  language={activeFile.language}
                  onChangeLanguage={(lang) => updateActiveFile({ language: lang })}
                  theme={theme}
                  onClosePanel={() => setMaximizedPanel(null)}
                  onToggleMaximize={() => setMaximizedPanel(null)}
                  isMaximized={true}
                />
              )}
              {maximizedPanel === "aiChat" && (
                <AIChatPanel
                  file={activeFile}
                  chatHistory={chatHistory}
                  onSendChatMessage={handleSendChatMessage}
                  isProcessing={isSyncing}
                  theme={theme}
                  onClosePanel={() => setMaximizedPanel(null)}
                  onToggleMaximize={() => setMaximizedPanel(null)}
                  isMaximized={true}
                />
              )}
              {maximizedPanel === "visualEditor" && (
                <VisualEditorPanel
                  file={activeFile}
                  onSyncVisualToCode={handleSyncVisualToCode}
                  isProcessing={isSyncing}
                  theme={theme}
                  onClosePanel={() => setMaximizedPanel(null)}
                  onToggleMaximize={() => setMaximizedPanel(null)}
                  isMaximized={true}
                />
              )}
              {maximizedPanel === "livePreview" && (
                <LivePreviewPanel
                  file={activeFile}
                  allFiles={activeProject.files}
                  theme={theme}
                  onClosePanel={() => setMaximizedPanel(null)}
                  onToggleMaximize={() => setMaximizedPanel(null)}
                  isMaximized={true}
                />
              )}
            </div>
          ) : (
            /* Multi-panel Grid Layout */
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-x divide-y divide-slate-800/80 overflow-hidden">
              {/* Top Left (Code Editor Panel) */}
              {showEditor && (
                <div className={`${showAiChat ? "lg:col-span-8" : "lg:col-span-12"} ${showVisualEditor || showLivePreview ? "h-[50%]" : "h-full"} lg:h-full flex flex-col overflow-hidden`}>
                  <CodeEditorPanel
                    file={activeFile}
                    allFiles={activeProject.files}
                    onSelectFile={setActiveFileId}
                    onChangeCode={(code) => updateActiveFile({ code })}
                    onSyncCodeToAll={handleSyncCodeToAll}
                    isProcessing={isSyncing}
                    language={activeFile.language}
                    onChangeLanguage={(lang) => updateActiveFile({ language: lang })}
                    theme={theme}
                    onClosePanel={() => setShowEditor(false)}
                    onToggleMaximize={() => setMaximizedPanel("editor")}
                  />
                </div>
              )}

              {/* Top Right (AI Chatbot Panel) */}
              {showAiChat && (
                <div className={`${showEditor ? "lg:col-span-4" : "lg:col-span-12"} ${showVisualEditor || showLivePreview ? "h-[50%]" : "h-full"} lg:h-full flex flex-col overflow-hidden`}>
                  <AIChatPanel
                    file={activeFile}
                    chatHistory={chatHistory}
                    onSendChatMessage={handleSendChatMessage}
                    isProcessing={isSyncing}
                    theme={theme}
                    onClosePanel={() => setShowAiChat(false)}
                    onToggleMaximize={() => setMaximizedPanel("aiChat")}
                  />
                </div>
              )}

              {/* Bottom Left (Visual Flow Editor Panel) */}
              {showVisualEditor && (
                <div className={`${showLivePreview ? "lg:col-span-6" : "lg:col-span-12"} h-[320px] lg:h-full flex flex-col overflow-hidden border-t border-slate-800`}>
                  <VisualEditorPanel
                    file={activeFile}
                    onSyncVisualToCode={handleSyncVisualToCode}
                    isProcessing={isSyncing}
                    theme={theme}
                    onClosePanel={() => setShowVisualEditor(false)}
                    onToggleMaximize={() => setMaximizedPanel("visualEditor")}
                  />
                </div>
              )}

              {/* Bottom Right (Live App Preview Panel) */}
              {showLivePreview && (
                <div className={`${showVisualEditor ? "lg:col-span-6" : "lg:col-span-12"} h-[320px] lg:h-full flex flex-col overflow-hidden border-t border-slate-800`}>
                  <LivePreviewPanel
                    file={activeFile}
                    allFiles={activeProject.files}
                    theme={theme}
                    onClosePanel={() => setShowLivePreview(false)}
                    onToggleMaximize={() => setMaximizedPanel("livePreview")}
                  />
                </div>
              )}
            </div>
          )}

          {/* Floating Reopen Panel Floating Dock (If any panels are closed) */}
          {(!showExplorer || !showEditor || !showAiChat || !showVisualEditor || !showLivePreview) && !maximizedPanel && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-slate-900/90 border border-slate-700/80 rounded-2xl px-4 py-2 flex items-center space-x-3 shadow-2xl backdrop-blur-md text-xs">
              <span className="text-slate-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Closed Panels:
              </span>
              <div className="flex items-center space-x-1.5">
                {!showExplorer && (
                  <button
                    onClick={() => setShowExplorer(true)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 font-bold transition-all flex items-center gap-1"
                  >
                    <FolderTree className="w-3 h-3" /> Reopen Explorer
                  </button>
                )}
                {!showEditor && (
                  <button
                    onClick={() => setShowEditor(true)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 font-bold transition-all flex items-center gap-1"
                  >
                    <Code2 className="w-3.5 h-3" /> Reopen Editor
                  </button>
                )}
                {!showAiChat && (
                  <button
                    onClick={() => setShowAiChat(true)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 font-bold transition-all flex items-center gap-1"
                  >
                    <MessageSquareText className="w-3 h-3" /> Reopen AI Chat
                  </button>
                )}
                {!showVisualEditor && (
                  <button
                    onClick={() => setShowVisualEditor(true)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 font-bold transition-all flex items-center gap-1"
                  >
                    <Workflow className="w-3 h-3" /> Reopen Visual
                  </button>
                )}
                {!showLivePreview && (
                  <button
                    onClick={() => setShowLivePreview(true)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 font-bold transition-all flex items-center gap-1"
                  >
                    <Play className="w-3 h-3" /> Reopen Preview
                  </button>
                )}
                <button
                  onClick={handleResetPanels}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                  title="Reset All"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Global Status Bar */}
      <StatusBar theme={theme} isSyncing={isSyncing} />

      {/* System Architecture Specifications Modal */}
      <ArchitectureDocModal
        isOpen={isArchDocsOpen}
        onClose={() => setIsArchDocsOpen(false)}
      />

      {/* MongoDB Atlas Login & User Account Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(user) => setCurrentUser(user)}
        onLogout={handleLogout}
      />
    </div>
  );
}
