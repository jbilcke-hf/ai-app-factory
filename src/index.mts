import express from 'express'
import { createSpace } from './createSpace.mts'
import { generateFiles } from './generateFiles.mts'

const app = express()
const port = 7860

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
    files = await generateFiles(`${req.query.prompt || ""}`, token)
    if (files.length) {
      console.log(`seems like we have ${files.length} files`)
      break
    }
  }

  console.log("files:", JSON.stringify(files, null, 2))

  await createSpace(files, token)

  res.write(JSON.stringify(files, null, 2))
  res.end()
})


app.listen(port, () => { console.log(`Open http://localhost:${port}`) })

