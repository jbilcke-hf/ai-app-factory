import { v4 as uuidv4 } from "uuid"
import { createRepo, uploadFiles, whoAmI } from "@huggingface/hub"
import type { RepoDesignation, Credentials, HubApiError } from "@huggingface/hub"
import slugify from "slugify"

import { RepoFile } from "./types.mts"

export const createSpace = async (files: RepoFile[], token: string) => {

  const credentials: Credentials = { accessToken: token }

  const { name: username } = await whoAmI({ credentials })

  let slug = ``
  let title = ``
  const readme = files.find(p => p.path === "README.md")
  try {
    const matches = readme.content.match(/title: ([^\n]+)\n/)
    title = matches?.[1] || ""
    slug = (slugify as any)(title) as string
    if (!slug.length) {
      throw new Error("sluggification failed")
    }
  } catch (err) {
    slug = `sf-${uuidv4().slice(0, 3)}`
  }

  const repoName = `${username}/${slug}`

  const repo: RepoDesignation = { type: "space", name: repoName }
  console.log(`Creating space at ${repoName}${title ? ` (${title})` : ''}`)

  try {
    await createRepo({
      repo,
      credentials,
      license: "mit",
      sdk:
        files.some(file => file.path.includes("Dockerfile"))
          ? "docker"
        : files.some(file => file.path.includes("app.py"))
          ? "streamlit"
          : "static" // "streamlit" | "gradio" | "docker" | "static";
    });
  } catch (error) {
    // If the space already exists (409 Conflict), skip creation and just upload files
    const apiError = error as HubApiError;
    if (apiError.statusCode === 409) {
      console.log(`Space ${repoName} already exists, skipping creation and updating files...`);
    } else {
      // For other errors, rethrow
      throw error;
    }
  }

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
  
  // Return information about the created space
  return {
    username: username.toLowerCase(),
    slug: slug.toLowerCase(),
    title
  }
}