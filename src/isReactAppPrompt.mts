export function isReactAppPrompt(prompt: string) {
  const lowerCasePrompt = prompt.toLocaleLowerCase().trim()
  return (
    lowerCasePrompt.startsWith("code a react") ||
    lowerCasePrompt.startsWith("make a react") ||
    lowerCasePrompt.startsWith("build a react") ||
    lowerCasePrompt.startsWith("create a react") ||
    lowerCasePrompt.startsWith("a react") ||
    lowerCasePrompt.startsWith("using react") ||
    lowerCasePrompt.startsWith("with react") ||
    lowerCasePrompt.startsWith("code a nextjs") ||
    lowerCasePrompt.startsWith("make a nextjs") ||
    lowerCasePrompt.startsWith("build a nextjs") ||
    lowerCasePrompt.startsWith("create a nextjs") ||
    lowerCasePrompt.startsWith("a nextjs") ||
    lowerCasePrompt.startsWith("using nextjs") ||
    lowerCasePrompt.startsWith("with nextjs") ||
    lowerCasePrompt.startsWith("code a next js") ||
    lowerCasePrompt.startsWith("make a next js") ||
    lowerCasePrompt.startsWith("build a next js") ||
    lowerCasePrompt.startsWith("create a next js") ||
    lowerCasePrompt.startsWith("a next js") ||
    lowerCasePrompt.startsWith("using next js") ||
    lowerCasePrompt.startsWith("with next js")
  )
}