import { HfInference } from '@huggingface/inference'
import { RepoFile } from './types.mts'
import { createLlamaPrompt } from './createLlamaPrompt.mts'
import { parseTutorial } from './parseTutorial.mts'
import { getPythonApp} from './getPythonApp.mts'
import { getWebApp } from './getWebApp.mts'
import { isPythonAppPrompt } from './isPythonAppPrompt.mts'

export const generateFiles = async (prompt: string, token: string) => {
  if (`${prompt}`.length < 2) {
    throw new Error(`prompt too short, please enter at least ${prompt} characters`)
  }

  const { prefix, instructions } =
    isPythonAppPrompt(prompt)
    ? getPythonApp(prompt)
    : getWebApp(prompt)

  const inputs = createLlamaPrompt(instructions) + "\nSure! Here are the source files:\n" + prefix

let tutorial = prefix

  try {
    const hf = new HfInference(token)

    for await (const output of hf.textGenerationStream({
      // model: "tiiuae/falcon-180B-chat",
      model: "codellama/CodeLlama-34b-Instruct-hf",
      inputs,
      parameters: {
        do_sample: true,

        // for  "codellama/CodeLlama-34b-Instruct-hf":
        //  `inputs` tokens + `max_new_tokens` must be <= 8192
        //  error: `inputs` must have less than 4096 tokens.

        // for  "tiiuae/falcon-180B-chat":
        //  `inputs` tokens + `max_new_tokens` must be <= 8192
        //  error: `inputs` must have less than 4096 tokens.
        max_new_tokens: 4096,
        return_full_text: false,
      }
    })) {

      tutorial += output.token.text
      process.stdout.write(output.token.text)
      // res.write(output.token.text)
      if (tutorial.includes('<|end|>')
      || tutorial.includes('[ENDINSTRUCTION]')
      || tutorial.includes('[/TASK]')
      || tutorial.includes('<|assistant|>')) {
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