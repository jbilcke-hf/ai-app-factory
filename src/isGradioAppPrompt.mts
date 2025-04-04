export function isGradioAppPrompt(prompt: string) {
  const lowerCasePrompt = prompt.toLocaleLowerCase().trim()
  return (
    lowerCasePrompt.startsWith("code a gradio") ||
    lowerCasePrompt.startsWith("make a gradio") ||
    lowerCasePrompt.startsWith("build a gradio") ||
    lowerCasePrompt.startsWith("create a gradio") ||
    lowerCasePrompt.startsWith("a gradio") ||
    lowerCasePrompt.startsWith("using gradio") ||
    lowerCasePrompt.startsWith("with gradio")
  )
}