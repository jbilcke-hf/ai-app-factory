import { HfInference } from '@huggingface/inference'
import { RepoFile } from './types.mts'
import { createLlamaPrompt } from './createLlamaPrompt.mts'
import { streamlitDoc } from './streamlitDoc.mts'
import { parseTutorial } from './parseTutorial.mts'

const hf = new HfInference(process.env.HF_API_TOKEN)

export const generateFiles = async (prompt: string) => {
  if (`${prompt}`.length < 2) {
    throw new Error(`prompt too short, please enter at least ${prompt} characters`)
  }

  const prefix = "# In app.py:\n```"

  const inputs = createLlamaPrompt([
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

Please limit yourself to the following Python modules:
- numpy
- streamlit
- matplotlib

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

The Streamlit app is about: ${prompt}`,
    }
  ]) + "\nSure! Here are the source files:\n" + prefix

let tutorial = prefix

  try {
    for await (const output of hf.textGenerationStream({
      model: "codellama/CodeLlama-34b-Instruct-hf",
      inputs,
      parameters: {
        do_sample: true,

        // for  "codellama/CodeLlama-34b-Instruct-hf":
        //  `inputs` tokens + `max_new_tokens` must be <= 8192
        //  error: `inputs` must have less than 4096 tokens.
        max_new_tokens: 1150,
        return_full_text: false,
      }
    })) {

      tutorial += output.token.text
      process.stdout.write(output.token.text)
      // res.write(output.token.text)
      if (tutorial.includes('<|end|>') || tutorial.includes('<|assistant|>')) {
        break
      }
    }

  } catch (e) {
    console.log("failed:")
    console.log(e)
  } 
  
  console.log("analyzing the generated instructions..")
  const files = parseTutorial(tutorial).map(({ filename, content }) => ({
    path: `${filename || ""}`.trim(),
    content: `${content || ""}`
  } as RepoFile))
  .filter(res => res.path.length && res.content.length)

  return files
}