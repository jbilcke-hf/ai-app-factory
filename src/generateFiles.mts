import { HfInference } from '@huggingface/inference'
import { RepoFile } from './types.mts'
import { createLlamaCoderPrompt } from './createLlamaCoderPrompt.mts'
import { parseTutorial } from './parseTutorial.mts'
import { getGradioApp } from './getGradioApp.mts'
import { getStreamlitApp } from './getStreamlitApp.mts'
import { getWebApp } from './getWebApp.mts'
import { getReactApp } from './getReactApp.mts'
import { isStreamlitAppPrompt } from './isStreamlitAppPrompt.mts'
import { isPythonAppPrompt } from './isPythonAppPrompt.mts'
import { isGradioAppPrompt } from './isGradioAppPrompt.mts'
import { isWebAppPrompt } from './isWebAppPrompt.mts'
import { isReactAppPrompt } from './isReactAppPrompt.mts'

export const generateFiles = async (
  prompt: string,
  token: string,
  onProgress: (chunk: string) => boolean
  ) => {
  if (`${prompt}`.length < 2) {
    throw new Error(`prompt too short, please enter at least ${prompt} characters`)
  }

  const { prefix, files, instructions } =
    isWebAppPrompt(prompt)
    ? getWebApp(prompt)
    : isStreamlitAppPrompt(prompt)
    ? getStreamlitApp(prompt)
    : isGradioAppPrompt(prompt)
    ? getGradioApp(prompt)
    : isReactAppPrompt(prompt)
    ? getReactApp(prompt)
    : isPythonAppPrompt(prompt)
    ? getGradioApp(prompt)
    : getWebApp(prompt)

  const inputs = createLlamaCoderPrompt(instructions) + "\nSure! Here are the source files:\n" + prefix

  let isAbortedOrFailed = false

  let tutorial = prefix

  try {
    const hf = new HfInference(token)

    onProgress(prefix)

    for await (const output of hf.textGenerationStream({

      model: "meta-llama/Meta-Llama-3-70B-Instruct",
      // model: "codellama/CodeLlama-34b-Instruct-hf",
      // model: "ise-uiuc/Magicoder-CL-7B" // not supported by Hugging Face right now (no stream + max token is 250)

      inputs,
      parameters: {
        do_sample: true,

        // for  "codellama/CodeLlama-34b-Instruct-hf":
        //  `inputs` tokens + `max_new_tokens` must be <= 8192
        //  error: `inputs` must have less than 4096 tokens.

        // for  "tiiuae/falcon-180B-chat":
        //  `inputs` tokens + `max_new_tokens` must be <= 8192
        //  error: `inputs` must have less than 4096 tokens.

        // for Llama-3 it is 8192
        max_new_tokens: 7000, // 8192,
        temperature: 0.8,
        return_full_text: false,
      }
    })) {

      tutorial += output.token.text
      process.stdout.write(output.token.text)
      // res.write(output.token.text)
      if (
        tutorial.includes('<|end|>')
        || tutorial.includes('<|eot_id|>')
        || tutorial.includes('<|start_header_id|>assistant<|end_header_id|>')
        || tutorial.includes('</s>')
        || tutorial.includes('[ENDINSTRUCTION]')
        || tutorial.includes('[/TASK]')
        || tutorial.includes('<|assistant|>')) {
        tutorial = tutorial.replaceAll("</s>", "").replaceAll("<|end|>", "")
        break
      }
      if (!onProgress(output.token.text)) {
        console.log("aborting the LLM generation")
        isAbortedOrFailed = true
        break
      }
    }

  } catch (e) {
    isAbortedOrFailed = true
    console.log("failed:")
    console.log(e)
  } 
  
  if (isAbortedOrFailed) {
    console.log("the request was aborted, so we return an empty list")
    return []
  }

  console.log("analyzing the generated instructions..")
  const generatedFiles = parseTutorial(tutorial).map(({ filename, content }) => ({
    path: `${filename || ""}`.trim().replaceAll(" ", ""),
    content: `${content || ""}`
  } as RepoFile))
  .filter(res => res.path.length && res.content.length)

  return [...generatedFiles, ...files]
}