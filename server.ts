import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize GoogleGenAI client lazily or safely
function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in process.env");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// 1. Explanation Endpoint
app.post("/api/gemini/explain", async (req, res) => {
  try {
    const { code, language, level = "Beginner" } = req.body;
    const ai = getAiClient();

    const prompt = `You are Natural Code's AI Explanation Engine. Explain the following ${language || "TypeScript"} code for a user with a ${level} understanding of programming.
    
    Target Audience Level: ${level}
    - Beginner: Use everyday analogies, avoid dense jargon, explain line-by-line what the logic accomplishes in plain simple English.
    - Intermediate: Focus on logic flow, data structures, state management, and scope.
    - Expert: Focus on algorithmic complexity, memory management, potential edge cases, design patterns, and performance optimizations.

    Code:
    \`\`\`${language || "typescript"}
    ${code}
    \`\`\`

    Return a valid JSON object with:
    {
      "summary": "High-level plain English summary of what this code does",
      "lineByLine": [
        { "line": 1, "codeSnippet": "...", "explanation": "..." }
      ],
      "keyConcepts": ["concept1", "concept2"],
      "suggestedImprovements": ["suggestion1"]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/gemini/explain:", error);
    res.status(500).json({ error: error.message || "Failed to generate explanation" });
  }
});

// 2. Natural Language Edit Endpoint (Command to Code + Visual + Explanation)
app.post("/api/gemini/natural-edit", async (req, res) => {
  try {
    const { currentCode, instruction, language = "typescript", currentFile = "main.ts" } = req.body;
    const ai = getAiClient();

    const prompt = `You are Natural Code's Tri-Directional Synchronization Engine.
    The user wants to modify the software using a natural language instruction.

    Instruction: "${instruction}"
    Current File: ${currentFile} (${language})
    Current Code:
    \`\`\`${language}
    ${currentCode}
    \`\`\`

    Your task:
    1. Update the code according to the natural language instruction. Maintain valid, functional code.
    2. Provide a plain English explanation of what changes were made.
    3. Breakdown the updated code into structured logic nodes for the Visual Flow Editor.
    
    Node types can be: 'start', 'condition', 'loop', 'variable', 'function', 'api_call', 'db_op', 'ui_element', 'action', 'return'.

    Return a JSON object matching this schema:
    {
      "updatedCode": "Complete modified source code string",
      "explanation": "Clear explanation of how the code changed based on user intent",
      "nodes": [
        {
          "id": "node-1",
          "type": "customNode",
          "position": { "x": 100, "y": 100 },
          "data": { "title": "Condition Check", "description": "Check if user is 18 or older", "nodeType": "condition", "codeSnippet": "if (age >= 18)" }
        }
      ],
      "edges": [
        { "id": "e1-2", "source": "node-1", "target": "node-2", "label": "True" }
      ],
      "changesSummary": ["Added age check condition", "Updated display message"]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/gemini/natural-edit:", error);
    res.status(500).json({ error: error.message || "Failed to process natural edit" });
  }
});

// 3. Visual Node Edit to Code Endpoint
app.post("/api/gemini/visual-to-code", async (req, res) => {
  try {
    const { nodes, edges, language = "typescript", originalCode = "" } = req.body;
    const ai = getAiClient();

    const prompt = `You are Natural Code's Visual-to-Code Synchronizer.
    The user modified visual logic nodes in the Visual Flow Editor.

    Visual Nodes JSON:
    ${JSON.stringify(nodes, null, 2)}

    Edges JSON:
    ${JSON.stringify(edges, null, 2)}

    Original Code Context:
    \`\`\`${language}
    ${originalCode}
    \`\`\`

    Generate the complete, valid ${language} source code that represents this modified visual flow diagram.
    Also return an updated natural language description.

    Return JSON:
    {
      "code": "Generated source code string",
      "explanation": "Natural language summary of the logic represented by the visual nodes"
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/gemini/visual-to-code:", error);
    res.status(500).json({ error: error.message || "Failed to sync visual to code" });
  }
});

// 4. Code to Visual AST Nodes Endpoint
app.post("/api/gemini/code-to-visual", async (req, res) => {
  try {
    const { code, language = "typescript" } = req.body;
    const ai = getAiClient();

    const prompt = `Convert the following ${language} code into a clean, structured set of Visual Logic Nodes and Edges for a flow chart editor.
    
    Code:
    \`\`\`${language}
    ${code}
    \`\`\`

    Types of nodes: 'start', 'condition', 'loop', 'variable', 'function', 'api_call', 'db_op', 'ui_element', 'action', 'return'.

    Return JSON:
    {
      "nodes": [
        {
          "id": "node-1",
          "type": "customNode",
          "position": { "x": 100, "y": 100 },
          "data": { "title": "Start", "description": "Start execution", "nodeType": "start", "codeSnippet": "// entry point" }
        }
      ],
      "edges": [
        { "id": "e1-2", "source": "node-1", "target": "node-2", "label": "Next" }
      ],
      "explanation": "High level explanation of the visual flow"
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/gemini/code-to-visual:", error);
    res.status(500).json({ error: error.message || "Failed to parse code to visual" });
  }
});

// 5. AI Assistant Quick Actions (Refactor, Fix Bug, Generate Tests, Convert Language, Doc)
app.post("/api/gemini/assistant-action", async (req, res) => {
  try {
    const { action, code, language = "typescript", targetLanguage } = req.body;
    const ai = getAiClient();

    let taskInstruction = "";
    if (action === "refactor") {
      taskInstruction = "Refactor this code for readability, performance, and best practices. Maintain identical functionality.";
    } else if (action === "fix_bugs") {
      taskInstruction = "Identify potential bugs or logical edge cases in this code, fix them, and explain what was fixed.";
    } else if (action === "generate_tests") {
      taskInstruction = "Write comprehensive unit tests (e.g. Vitest / Jest / PyTest depending on language) for this code.";
    } else if (action === "generate_docs") {
      taskInstruction = "Generate complete JSDoc / Docstring documentation and an architectural README summary for this code.";
    } else if (action === "convert_language") {
      taskInstruction = `Convert this code from ${language} to ${targetLanguage || "Python"}. Ensure idiomatically correct code in the target language.`;
    } else {
      taskInstruction = "Analyze this code and suggest improvements.";
    }

    const prompt = `You are Natural Code's Senior AI Developer Assistant.
    Action: ${action}
    Instruction: ${taskInstruction}

    Source Code (${language}):
    \`\`\`${language}
    ${code}
    \`\`\`

    Return JSON:
    {
      "outputCode": "Resulting code string",
      "explanation": "Detailed step-by-step description of what was done",
      "highlights": ["Key change 1", "Key change 2"]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/gemini/assistant-action:", error);
    res.status(500).json({ error: error.message || "Failed assistant action" });
  }
});

// 6. Validation & Logic Warning Engine
app.post("/api/gemini/validate", async (req, res) => {
  try {
    const { code, language = "typescript" } = req.body;
    const ai = getAiClient();

    const prompt = `Analyze the following ${language} code for syntax errors, logical bugs, missing checks, or performance flaws.
    Return beginner-friendly plain English descriptions of any issues with suggested fixes.

    Code:
    \`\`\`${language}
    ${code}
    \`\`\`

    Return JSON:
    {
      "isValid": boolean,
      "issues": [
        {
          "severity": "error" | "warning" | "info",
          "line": number,
          "message": "Beginner friendly explanation of the bug",
          "suggestion": "How to fix it in plain English"
        }
      ]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/gemini/validate:", error);
    res.status(500).json({ error: error.message || "Validation failed" });
  }
});

// Start Express Server with Vite integration
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Natural Code Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
