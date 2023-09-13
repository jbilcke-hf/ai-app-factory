import { alpine } from "./alpine.mts"
import { daisy } from "./daisy.mts"

export function getReactApp(prompt: string) {
  const prefix = `# In src/main.tsx:\n\`\`\``
  const instructions = [
    {
      role: "system",
      content: [
        `You are a TypeScript developer, expert at crafting NextJS and React applications, using TailwindCSS utility classes.`,
      ].filter(item => item).join("\n")
    },
    {
      role: "user",
      content: `Please write, file by file, the source code for a Next 12 application.

The app should be buildable when we call:

\`\`\`
npm install
npm run start
\`\`\`

And installable using a Dockerfile. Here is an example:

\`\`\`
FROM node:18
RUN useradd -o -u 1000 user
USER user
ENV HOME=/home/user \
PATH=/home/user/.local/bin:$PATH
WORKDIR $HOME/app
COPY --chown=user package*.json $HOME/app
RUN npm install
COPY --chown=user . $HOME/app
EXPOSE 7860
CMD [ "npm", "run", "start" ]
\`\`\`

Don't forget to write a valid package.json file!

Don't forget to write a README.md with the following header:
\`\`\`
---
license: apache-2.0
title: <APPNAME>
sdk: docker
emoji: 👨‍💻
colorFrom: yellow
colorTo: green
---
\`\`\`

Of course, you MUST replace <APPNAME> with a good app name!

The app is about: ${prompt}`,
    }
  ]

  return { prefix, instructions }
}