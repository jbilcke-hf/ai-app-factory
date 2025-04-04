import { gradioDoc } from "./gradioDoc.mts"

export function getFlutterApp(prompt: string) {
  const prefix = "# In main.dart:\n```"

  const instructions = [
    {
      role: "system",
      content: [
        `You are a Dart developer, expert at crafting Flutter applications.
        You must generate valid Dart code. Don't forget the requirements.txt files!`,
        `Here is an example of a Flutter application:`,
        gradioDoc
      ].filter(item => item).join("\n")
    },
    {
      role: "user",
      content: `Please write, file by file, the source code for a Flutter project.
There is already a project with this structure:
- lib/main.dart
- pubspec.yaml
- cooking_llama.iml

DO NOT WRITE AN EXAMPLE! WRITE THE FULL CODE, NOT AN EXAMPLE.
You must not leave any TODO in the code.

Don't forget to write a README.md with the following header, or else you will be FIRED:
\`\`\`
---
license: apache-2.0
title: <app name>
sdk: docker
emoji: 👀
colorFrom: green
colorTo: blue
---
\`\`\`

The app is about: ${prompt}`,
    }
  ]

  return { prefix, files: [], instructions }
}