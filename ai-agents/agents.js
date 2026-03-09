import fs from "fs";
import path from "path";
import { execSync } from "child_process";


const task = process.argv[2];

function getRepoStructure(dir, depth = 3) {
  if (depth === 0) return [];

  const items = fs.readdirSync(dir);
  let structure = [];

  for (const item of items) {
    if (item === "node_modules" || item === ".git") continue;

    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      structure.push(`${fullPath}/`);
      structure = structure.concat(getRepoStructure(fullPath, depth - 1));
    } else {
      structure.push(fullPath);
    }
  }

  return structure;
}



function detectDependencies(code) {
  const deps = [];

  if (code.includes("react-router-dom")) {
    deps.push("react-router-dom");
  }

  if (code.includes("axios")) {
    deps.push("axios");
  }

  if (code.includes("lodash")) {
    deps.push("lodash");
  }

  if (deps.length > 0) {
    console.log("Installing dependencies:", deps.join(", "));
    execSync(`npm install ${deps.join(" ")}`, { stdio: "inherit" });
  }
}


async function generateCode() {

  const repoStructure = getRepoStructure("src").join("\n");

//   const systemPrompt = `
// You are a senior React developer working on a Vite + React project.

// Current project structure:

// ${repoStructure}

// Your task:
// ${task}

// Rules:
// - Create or modify files as needed
// - Follow the existing project structure
// - Update App.tsx if necessary
// - Return files using the format:

// FILE: path/to/file
// <code>

// FILE: path/to/file
// <code>
// `;

  const systemPrompt = `
You are a senior React developer working on a Vite + React project.

Current project structure:

${repoStructure}

Task:
${task}

IMPORTANT RULES:

Return ONLY files.
Do NOT explain anything.
Do NOT add text before or after.

Always follow this format strictly:

FILE: path/to/file
<code>

FILE: path/to/file
<code>

If the feature needs UI, create a page in src/pages.

If necessary update:
src/App.tsx
to render the new page.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt
        }
      ]
    })
  });

  const data = await response.json();

 if (!data.choices || !data.choices[0]) {
    console.log("AI returned invalid response");
    return;
  }
  
  const output = data.choices[0].message.content;
  const cleaned = output
  .replace(/```[a-z]*/g, "")
  .replace(/```/g, "")
  .trim();
  const files = cleaned.split("FILE:");

  files.forEach(section => {

    if (!section.trim()) return;

    const lines = section.trim().split("\n");
    const filePath = lines.shift().trim();

      // Prevent AI writing weird paths
    if (!filePath.startsWith("src") && !filePath.startsWith("public")) {
      console.log("Skipping invalid path:", filePath);
      return;
    }

    const code = lines.join("\n");

    const dir = path.dirname(filePath);

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, code);

    console.log("Created/Updated:", filePath);

  });

}

generateCode();
