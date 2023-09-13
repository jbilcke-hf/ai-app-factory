export function isPythonAppPrompt(prompt: string) {
  const lowerCasePrompt = prompt.toLocaleLowerCase()
  return lowerCasePrompt.includes("python")
     || lowerCasePrompt.includes("streamlit")
     || lowerCasePrompt.includes("gradio")
}