export type ExplanationLevel = "Beginner" | "Intermediate" | "Expert";

export type ThemeMode = "dark" | "light";

export type SupportedLanguage = 
  | "typescript" 
  | "javascript" 
  | "python" 
  | "html" 
  | "css" 
  | "sql" 
  | "react" 
  | "json"
  | "markdown"
  | "cpp" 
  | "java";

export interface LineExplanation {
  line: number;
  codeSnippet: string;
  explanation: string;
}

export interface VisualNodeData {
  title: string;
  description: string;
  nodeType?: "start" | "condition" | "loop" | "variable" | "function" | "api_call" | "db_op" | "ui_element" | "action" | "return";
  codeSnippet?: string;
  params?: Record<string, string | number | boolean>;
  onChange?: (key: string, value: any) => void;
  [key: string]: any;
}

export interface VisualNode {
  id: string;
  type: string;
  label: string;
  description: string;
  data: VisualNodeData;
  position: { x: number; y: number };
}

export interface VisualEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  language: SupportedLanguage;
  code: string;
  naturalExplanation: string;
  lineExplanations?: LineExplanation[];
  nodes?: VisualNode[];
  edges?: VisualEdge[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "Web App" | "Backend API" | "Data Science" | "Database SQL" | "Algorithms";
  files: ProjectFile[];
  activeFileId: string;
}

export interface ValidationIssue {
  severity: "error" | "warning" | "info";
  line?: number;
  message: string;
  suggestion: string;
}

export type ViewLayout = "tri_split" | "visual_focus" | "code_focus" | "natural_focus" | "preview_focus";

export interface AssistantMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  codeSnippet?: string;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}
