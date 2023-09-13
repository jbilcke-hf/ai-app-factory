import { alpine } from "./alpine.mts"
import { daisy } from "./daisy.mts"
import { dockerfile } from "./docker.mts"

export function getReactApp(prompt: string) {
  const prefix = `# In src/pages/index.tsx:\n\`\`\``
  const files = [
    {
      path: `Dockerfile`,
      content: dockerfile,
    }
  ]
  const instructions = [
    {
      role: "system",
      content: [
        `You are a TypeScript developer, expert at crafting NextJS and React applications, using TailwindCSS utility classes.`,
      ].filter(item => item).join("\n")
    },
    {
      role: "user",
      content: `Think step by step, you got this! Please write, file by file, the source code for a Next 12 application.
The app should be buildable when we run this in command line:
\`\`\`
npm install
npm run start
\`\`\`

The project will be deployed to Hugging Face, so it must include a README.md with the following YAML header:
\`\`\`
---
license: apache-2.0
title: <APPNAME>
sdk: docker
emoji: 👨‍💻
colorFrom: yellow
colorTo: green
---
\`\`\`

Important rules:
- you need to leave: "sdk: docker" as-is, but replace: "<APPNAME>" with an actual name, please.
- Don't forget to write a valid package.json file!

The app is about: ${prompt}.

Remember: don't forget to edit the README.me and a package.json file!`,
    }
  ]

  return { prefix, files, instructions }
}