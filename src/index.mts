import express from 'express'
import { createSpace } from './createSpace.mts'
import { generateFiles } from './generateFiles.mts'

const app = express()
const port = 3000

const minPromptSize = 16 // if you change this, you will need to also change in public/index.html
const timeoutInSec = 15 * 60

console.log('timeout set to 30 minutes')

app.use(express.static('public'))

const pending: {
  total: number;
  queue: string[];
} = {
  total: 0,
  queue: [],
}
 
const endRequest = (id: string, reason: string) => {
  if (!id || !pending.queue.includes(id)) {
    return
  }
  
  pending.queue = pending.queue.filter(i => i !== id)
  console.log(`request ${id} ended (${reason})`)
}

app.get('/debug', (req, res) => {
  res.write(JSON.stringify({
    nbTotal: pending.total,
    nbPending: pending.queue.length,
    queue: pending.queue,
  }))
  res.end()
})

app.get('/app', async (req, res) => {
  if (`${req.query.prompt}`.length < minPromptSize) {
    res.write(`prompt too short, please enter at least ${minPromptSize} characters`)
    res.end()
    return
  }

  const token = `${req.query.token}`

  if (!token.startsWith("hf_")) {
    res.write(`the provided token seems to be invalid`)
    res.end()
    return
  }

  /*
  res.write(`<!doctype html>
  <script src="/markdown-to-html.js"></script>
  <div id="formatted-markdown"></div>
  <script>
  setInterval(
    function fn() {
      try {
        var input = document.getElementById("raw-markdown-stream")
        var output = document.getElementById("formatted-markdown")
        output.innerHTML = MarkdownToHtml.parse(input.innerHTML)
      } catch (err) {
        console.error(err)
      }
    },
    1000
  )
  </script>
  <div id="raw-markdown-stream" style="display: none">
  `)
  */

  const id = `${pending.total++}`
  console.log(`new request ${id}`)

  pending.queue.push(id)

  req.on('close', function() {
    endRequest(id, 'browser asked to end the connection')
  })

  setTimeout(() => {
    endRequest(id, `timed out after ${timeoutInSec}s`)
  }, timeoutInSec * 1000)

  let nbAttempts = 3

  let files = []

  while (nbAttempts-- > 0) {
    files = await generateFiles(
      `${req.query.prompt || ""}`,
      token,
      (chunk: string) => {
        res.write(chunk)

        // return true here as long as our request is still valid
        // but if the user disconnected, the id will be removed from the queue,
        // and we will return false, indicating to generateFiles that we should abort
        return pending.queue.includes(id)
      })
    if (files.length) {
      console.log(`seems like we have ${files.length} files`)
      break
    }
  }

  if (files.length > 0) {
    console.log("files:", JSON.stringify(files, null, 2))

    const spaceInfo = await createSpace(files, token)
    
    // Send the space URL back to the frontend
    if (spaceInfo && spaceInfo.username && spaceInfo.slug) {
      // Determine SDK type using the same logic as in createSpace.mts
      let sdk;
      if (files.some(file => file.path.includes("Dockerfile"))) {
        sdk = "docker";
      } else if (files.some(file => file.path.includes("app.py"))) {
        sdk = "streamlit";
      } else {
        sdk = "static";
      }
      
      // Only static SDK spaces use the static.hf.space domain
      const domain = sdk === "static" ? "static.hf.space" : "hf.space";
      const spaceUrl = `https://${spaceInfo.username}-${spaceInfo.slug}.${domain}`
      
      // Add clear markers and spacing to make the space URL easier to detect
      res.write(`\n\n<!-- SPACE URL MARKER -->\n<space-url>${spaceUrl}</space-url>\n<!-- END SPACE URL MARKER -->\n\n`)
      console.log(`Created ${sdk} space: ${spaceUrl}`)
    }
  }

  // res.write(JSON.stringify(files, null, 2))
  // res.write(`</div>`)
  res.end()
})


app.listen(port, () => { console.log(`Open http://localhost:${port}`) })

