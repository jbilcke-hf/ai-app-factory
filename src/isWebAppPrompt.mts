export function isWebAppPrompt(prompt: string) {
  const lowerCasePrompt = prompt.toLocaleLowerCase().trim()
  return (
    lowerCasePrompt.startsWith("code a web") ||
    lowerCasePrompt.startsWith("code an app") ||
    lowerCasePrompt.startsWith("code a app") ||
    lowerCasePrompt.startsWith("make a web") ||
    lowerCasePrompt.startsWith("make an app") ||
    lowerCasePrompt.startsWith("build a web") ||
    lowerCasePrompt.startsWith("build an app") ||
    lowerCasePrompt.startsWith("create a web") ||
    lowerCasePrompt.startsWith("create an app")
  )
}
