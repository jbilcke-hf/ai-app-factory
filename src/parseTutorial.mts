export function parseTutorial(text: string): Array<{ filename: string; content: string }> {
  const result: { filename: string; content: string; }[] = [];
  const regex = /# In (?:the )?(.*):\n```(?:\w+\n)?([\s\S]*?)```/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
      result.push({
          filename: match[1],
          content: match[2].trim(),
      });
  }
  return result;
}