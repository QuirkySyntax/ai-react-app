import fs from "fs";
import fetch from "node-fetch";

const prompt = process.argv[2];

async function generateCode() {

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
          content: "You are a React developer. Generate only React component code."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  const data = await response.json();
  const code = data.choices[0].message.content;

  fs.mkdirSync("src/pages", { recursive: true });

  fs.writeFileSync("src/pages/AIGenerated.tsx", code);
}

generateCode();
