# SyntaxLess — Intent-First, AI-Native Web IDE

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-emerald.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.0-38BDF8.svg)](https://tailwindcss.com/)

> **Think It. Build It.**
> **SyntaxLess** is an intent-first, AI-native Integrated Development Environment (IDE) that bridges abstract human logic, visual flow graphs, and production code into a seamlessly synchronized dynamic canvas.

---

## 🌟 Overview

Traditional IDEs force developers to treat raw text syntax as the sole source of truth. **SyntaxLess** decouples software engineering intent from rigid syntax constraints. It converts three distinct programming representations into a unified AST (Abstract Syntax Tree) model in real time:

1. **Natural Language / Intent:** Describe what you want to build in plain human instructions.
2. **Visual Flow Graph:** Manipulate logic visually through interactive, drag-and-drop nodes using React Flow.
3. **Source Code:** Standard, full-featured code editor supporting HTML, CSS, JavaScript, TypeScript, Python, SQL, and JSON.

Any modification in one panel instantly propagates across the entire environment.

---

## ✨ Key Features

### 🔄 1. Bidirectional Real-Time Sync Engine
* **Tri-Panel View:** Simultaneously view and edit Code, Visual Node Diagrams, and Live Execution Output.
* **Instant Propagation:** Changes made in the visual node graph update the underlying code and live preview in real time without manual builds.

### 🎨 2. Visual Logic Editor
* **Node-Based Architecture:** Built on `@xyflow/react` for smooth canvas pan, zoom, custom node creation, and edge linking.
* **Custom AST Nodes:** Visual representation of HTML UI structures, API endpoints, database models, state handlers, and utility functions.
* **Component Palette:** Quick drag-and-drop visual nodes (Hero Sections, Navbar, API Endpoints, MongoDB Models, Authentication).

### 📝 3. Intelligent Code & Human Editor
* **Dual Editing Modes:**
  * **Code Mode:** Monospace syntax-highlighted editor with line numbering, multi-file tab switching, search/replace, and auto-formatting.
  * **Human Mode:** Translates code blocks into plain-English explanations line by line for fast comprehension and modification.
* **Multi-Language Support:** Full preview support for HTML/CSS/JS, Python terminal execution emulator, SQL query inspector, and JSON validator.

### 🍃 4. MongoDB Atlas Integration
* **Cloud Database Configurator:** Direct connection interface for MongoDB Atlas URIs (`mongodb+srv://...`).
* **Connection Tester:** Real-time ping testing and cluster verification.
* **Auth & User Management:** User sign-in, registration, and active cluster status monitoring.

### 📁 5. Workspace & Project Management
* **Multi-File Explorer:** File tree navigation, file creation, and drag-and-drop file imports from local device.
* **Preset Templates:** Pre-loaded multi-file starter projects:
  * *E-Commerce Web App* (HTML/CSS/JS)
  * *Python Data Analytics Pipeline*
  * *Express & MongoDB Microservice API*

### 🛠️ 6. Built-in AI Assistant & Architecture Suite
* **AI Chatbot Drawer:** Context-aware AI assistant to generate code snippets, fix bugs, and refactor code.
* **System Architecture Blueprint Modal:** Full documentation covering AST parser design, synchronization protocol, database schemas, and engineering roadmap.

---

## 🚀 Quick Start

### Prerequisites
* **Node.js** v18+ or higher
* **npm** or **yarn** / **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/syntaxless-ide.git
   cd syntaxless-ide
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000` (or `http://localhost:5173`) to launch SyntaxLess.

---

## 💻 Tech Stack

| Domain | Technology / Library |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS v4, Lucide React Icons |
| **Node Graph Visualization** | `@xyflow/react` (React Flow) |
| **Animation & UX** | Lucide Icons, Custom CSS Glassmorphic Panels |
| **Database Integration** | MongoDB Atlas Cloud Connection Simulator |

---

## 📁 Project Structure

```
syntaxless-ide/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── AIAssistantDrawer.tsx    # Slide-out AI chat panel
│   │   ├── AIChatPanel.tsx          # Dedicated AI code generation tab
│   │   ├── ArchitectureDocModal.tsx  # System architecture & specs modal
│   │   ├── AuthModal.tsx             # User auth & MongoDB Atlas config
│   │   ├── CodeEditorPanel.tsx      # Multi-file tabbed code editor
│   │   ├── CustomFlowNode.tsx       # React Flow custom AST node renderer
│   │   ├── Header.tsx               # Primary toolbar & panel toggles
│   │   ├── LeftSidebarNav.tsx       # Primary navigation bar
│   │   ├── LivePreviewPanel.tsx     # Multi-mode runtime preview (HTML/Python/SQL)
│   │   ├── Preloader.tsx            # App boot loading screen
│   │   ├── SidebarProjectTree.tsx   # Project file explorer & drop-zone
│   │   ├── StatusBar.tsx            # IDE status bar with copyright footer
│   │   ├── SyntaxLessLogo.tsx       # Branded SVG logo component
│   │   └── VisualEditorPanel.tsx    # Interactive node canvas
│   ├── data/
│   │   └── sampleProjects.ts        # Built-in sample workspace templates
│   ├── types.ts                     # TypeScript interfaces & types
│   ├── App.tsx                      # Main IDE application wrapper
│   └── main.tsx                     # React root entry point
├── index.html                       # Base HTML shell
├── package.json                     # Dependencies and scripts
└── README.md                        # Documentation
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + B` / `Cmd + B` | Toggle File Explorer Sidebar |
| `Ctrl + E` / `Cmd + E` | Toggle Code Editor |
| `Ctrl + H` / `Cmd + H` | Toggle AI Chat Panel |
| `Ctrl + M` / `Cmd + M` | Toggle Visual Flow Diagram |
| `Ctrl + P` / `Cmd + P` | Toggle Live Preview |
| `Ctrl + S` / `Cmd + S` | Trigger Workspace Manual Sync |
| `Ctrl + L` / `Cmd + L` | Quick Clear / Reset Canvas |

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

**SyntaxLess IDE**  
Created with ❤️ by **Mayank Kumar Gupta**  
*Copyright © 2026. All rights reserved.*

</div>
