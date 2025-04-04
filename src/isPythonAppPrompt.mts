export function isPythonAppPrompt(prompt: string) {
  const lowerCasePrompt = prompt.toLocaleLowerCase().trim()
  return (
    lowerCasePrompt.startsWith("code a python app") ||
    lowerCasePrompt.startsWith("make a python app") ||
    lowerCasePrompt.startsWith("build a python app") ||
    lowerCasePrompt.startsWith("create a python app") ||
    lowerCasePrompt.startsWith("a python app") ||
    lowerCasePrompt.startsWith("python app")
  )
}