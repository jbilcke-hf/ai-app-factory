import { alpine } from "./alpine.mts"

export function getWebApp(prompt: string) {
  const prefix = "# In index.html:\n```"

  const instructions = [
    {
      role: "system",
      content: [
        `You are a JavaScript developer, expert at crafting applications using AlpineJS, DaisyUI and Tailwind.`,
        `Here is an extract from the alpine documentation:`,
        alpine
      ].filter(item => item).join("\n")
    },
    {
      role: "user",
      content: `Please write, file by file, the source code for a HTML JS app.

Remember, these library importats are mandatory:
- AlpineJS (use "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js")
- DaisyUI (use "https://cdn.jsdelivr.net/npm/daisyui@3.1.6/dist/full.css")
- Tailwind (use "https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio")

But you can optionally also load those:
- Three.js (use "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.156.1/three.min.js")

The rest should be written using vanilla javascript

Don't forget to write a README.md with the following header:
\`\`\`
---
license: apache-2.0
title: <app name>
sdk: static
emoji: 👨‍💻
colorFrom: yellow
colorTo: green
---
\`\`\`

The app is about: ${prompt}`,
    }
  ]

  return { prefix, instructions }
}