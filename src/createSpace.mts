import { v4 as uuidv4 } from "uuid"
import { createRepo, uploadFiles, whoAmI } from "@huggingface/hub"
import type { RepoDesignation, Credentials } from "@huggingface/hub"

import { RepoFile } from "./types.mts"

export const createSpace = async (files: RepoFile[]) => {
  
  const repoId = `space-factory-${uuidv4().slice(0, 4)}`
  const repoName = `jbilcke-hf/${repoId}`

  const repo: RepoDesignation = { type: "space", name: repoName }
  const credentials: Credentials = { accessToken: process.env.HF_API_TOKEN }

  const { name: username } = await whoAmI({ credentials })
  console.log("me: ", username)

  console.log("repo:", JSON.stringify(repo, null, 2))

  await createRepo({
    repo,
    credentials,
    license: "mit",
    sdk:
      files.some(file => file.path.includes("app.py"))
        ? "streamlit"
        : "static" // "streamlit" | "gradio" | "docker" | "static";
  });

  console.log("uploading files..")
  await uploadFiles({
    repo,
    credentials,
    files: files.map(file => ({
      path: file.path,
      content: new Blob([ file.content ])
    })),
  });

  console.log("upload done!")

  // TODO we should keep track of the repo and delete it after 30 min
  // or delete it if we reached 20 repos
  // await deleteRepo({ repo, credentials })
}