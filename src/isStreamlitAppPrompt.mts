export function isStreamlitAppPrompt(prompt: string) {
  const lowerCasePrompt = prompt.toLocaleLowerCase().trim()
  return (
    lowerCasePrompt.startsWith("code a streamlit") ||
    lowerCasePrompt.startsWith("make a streamlit") ||
    lowerCasePrompt.startsWith("build a streamlit") ||
    lowerCasePrompt.startsWith("create a streamlit") ||
    lowerCasePrompt.startsWith("a streamlit") ||
    lowerCasePrompt.startsWith("using streamlit") ||
    lowerCasePrompt.startsWith("with streamlit")
  )
}