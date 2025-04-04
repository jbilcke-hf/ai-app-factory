import { streamlitDoc } from "./streamlitDoc.mts";

export function getStreamlitApp(prompt: string) {
  const prefix = "# In app.py:\n```"

  const instructions = [
    {
      role: "system",
      content: [
        `You are a Python developer, expert at crafting Streamlit applications to deploy to Hugging Face.`,
        `Here is an extract from the Streamlit documentation:`,
        streamlitDoc
      ].filter(item => item).join("\n")
    },
    {
      role: "user",
      content: `Please write, file by file, the source code for a Streamlit app.

DO NOT WRITE AN EXAMPLE! WRITE THE FULL CODE, NOT AN EXAMPLE.
You must not leave any TODO in the code.

You MUST use the following Python modules:
- torch (version 2.6.0)
- accelerate (version 1.6.0)

You are free to use (if necessary) the following Python modules. In tha case, don't specify a version, just use them as-is so it uses the latest one. Make sure to add them to the requirements.txt:
- numpy
- matplotlib
- diffusers
- transformers
- huggingface_hub

Don't forget to write a README.md with the following header:
\`\`\`
---
license: apache-2.0
title: <app name>
sdk: streamlit
emoji: 👀
colorFrom: green
colorTo: blue
---
\`\`\`

The app is about: ${prompt}`,
    }
  ]

  return { prefix, files: [], instructions }
}