import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ProjectFile, VisualNode, VisualEdge, ThemeMode } from "../types";
import { CustomFlowNode } from "./CustomFlowNode";
import { 
  Workflow, 
  Sparkles, 
  Plus, 
  RotateCcw, 
  LayoutGrid, 
  MousePointer, 
  Type, 
  Square, 
  Image as ImageIcon, 
  Box, 
  CreditCard, 
  Compass, 
  Server, 
  Database, 
  GitCommit, 
  Repeat,
  Maximize2,
  Minimize2,
  X 
} from "lucide-react";

const nodeTypes = {
  customNode: CustomFlowNode,
};

interface Props {
  file: ProjectFile;
  onSyncVisualToCode: (nodes: VisualNode[], edges: VisualEdge[]) => void;
  isProcessing: boolean;
  theme: ThemeMode;
  onClosePanel?: () => void;
  onToggleMaximize?: () => void;
  isMaximized?: boolean;
}

export const VisualEditorPanel: React.FC<Props> = ({
  file,
  onSyncVisualToCode,
  isProcessing,
  theme,
  onClosePanel,
  onToggleMaximize,
  isMaximized = false,
}) => {

  const isDark = theme === "dark";

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Default initial nodes matching the reference screenshot (Hero Section -> Features, Products, Categories -> Footer)
  const defaultNodes: Node[] = [
    {
      id: "node-hero",
      type: "customNode",
      position: { x: 280, y: 30 },
      data: {
        title: "Hero Section",
        description: "Headline, Subheadline, Button (Shop Now), Image",
        nodeType: "ui_element",
        codeSnippet: "<section class='hero'>",
      },
    },
    {
      id: "node-features",
      type: "customNode",
      position: { x: 80, y: 220 },
      data: {
        title: "Features Section",
        description: "Fast Delivery, Authenticity, Secure Checkout",
        nodeType: "ui_element",
        codeSnippet: "<section class='features'>",
      },
    },
    {
      id: "node-products",
      type: "customNode",
      position: { x: 280, y: 220 },
      data: {
        title: "Products Section",
        description: "E-Commerce Product Cards Grid",
        nodeType: "ui_element",
        codeSnippet: "<div class='product-grid'>",
      },
    },
    {
      id: "node-categories",
      type: "customNode",
      position: { x: 480, y: 220 },
      data: {
        title: "Categories",
        description: "Filter tag pills",
        nodeType: "ui_element",
        codeSnippet: "<ul class='category-pills'>",
      },
    },
    {
      id: "node-footer",
      type: "customNode",
      position: { x: 280, y: 380 },
      data: {
        title: "Footer",
        description: "Copyrights and quick links",
        nodeType: "ui_element",
        codeSnippet: "<footer class='footer'>",
      },
    },
  ];

  const defaultEdges: Edge[] = [
    { id: "e1", source: "node-hero", target: "node-features", animated: true },
    { id: "e2", source: "node-hero", target: "node-products", animated: true },
    { id: "e3", source: "node-hero", target: "node-categories", animated: true },
    { id: "e4", source: "node-products", target: "node-footer", animated: true },
  ];

  useEffect(() => {
    if (file.nodes && file.nodes.length > 0) {
      setNodes(file.nodes as Node[]);
    } else {
      setNodes(defaultNodes);
    }

    if (file.edges && file.edges.length > 0) {
      setEdges(file.edges as Edge[]);
    } else {
      setEdges(defaultEdges);
    }
  }, [file.id, file.nodes, file.edges, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const handleAddPaletteNode = (type: string, title: string) => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: "customNode",
      position: { x: 300, y: 150 },
      data: {
        title: title,
        description: `${type} logic block`,
        nodeType: type as any,
        codeSnippet: `<${type.toLowerCase()} />`,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const paletteTools = [
    { id: "select", label: "Select", icon: MousePointer },
    { id: "text", label: "Text", icon: Type },
    { id: "button", label: "Button", icon: Square },
    { id: "image", label: "Image", icon: ImageIcon },
    { id: "container", label: "Container", icon: Box },
    { id: "card", label: "Card", icon: CreditCard },
    { id: "nav", label: "Nav", icon: Compass },
    { id: "api", label: "API Call", icon: Server },
    { id: "db", label: "Database", icon: Database },
    { id: "condition", label: "Condition", icon: GitCommit },
    { id: "loop", label: "Loop", icon: Repeat },
  ];

  return (
    <div
      className={`h-full flex flex-col select-none transition-colors duration-200 ${
        isDark ? "bg-[#090d16] text-slate-200" : "bg-slate-50 text-slate-800"
      }`}
    >
      {/* Panel Header */}
      <div
        className={`px-3 py-2 border-b flex items-center justify-between text-xs font-bold ${
          isDark ? "bg-[#0c101c] border-slate-800" : "bg-white border-slate-200"
        }`}
      >
        <div className="flex items-center space-x-2">
          <Workflow className="w-4 h-4 text-emerald-400" />
          <span className={isDark ? "text-white" : "text-slate-900"}>Visual Editor</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onSyncVisualToCode(nodes as any, edges as any)}
            disabled={isProcessing}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] transition-all"
          >
            <Sparkles className="w-3 h-3" />
            <span>Sync Diagram</span>
          </button>

          {onToggleMaximize && (
            <button
              onClick={onToggleMaximize}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
              title={isMaximized ? "Restore Size" : "Maximize Panel"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}

          {onClosePanel && (
            <button
              onClick={onClosePanel}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-rose-400"
              title="Close Panel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>


      {/* Main Canvas Body with Left Palette Bar */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Visual Tools Palette */}
        <div
          className={`w-32 border-r p-2 space-y-1 text-[11px] overflow-y-auto ${
            isDark ? "bg-[#090d16] border-slate-800/80" : "bg-white border-slate-200"
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1 py-1">
            Palette
          </div>
          {paletteTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => handleAddPaletteNode(tool.id, tool.label)}
                className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-left font-medium transition-all ${
                  isDark
                    ? "text-slate-300 hover:text-white hover:bg-slate-800/60"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-emerald-400" />
                <span className="truncate">{tool.label}</span>
              </button>
            );
          })}
        </div>

        {/* React Flow Visual Canvas */}
        <div className="flex-1 h-full relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            className={isDark ? "bg-[#090d16]" : "bg-slate-100"}
          >
            <Controls className={isDark ? "fill-slate-200 bg-slate-900 border-slate-800" : ""} />
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} color={isDark ? "#1e293b" : "#cbd5e1"} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};
