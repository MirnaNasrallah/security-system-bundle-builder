import cors from 'cors'
import express from 'express'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const port = process.env.PORT || 3001
const directory = path.dirname(fileURLToPath(import.meta.url))

app.use(cors())

app.get('/api/catalog', async (_request, response, next) => {
  try {
    const manifestPath = path.join(directory, 'data/catalog.json')
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
    const catalogPath = manifest.$source
      ? path.resolve(path.dirname(manifestPath), manifest.$source)
      : manifestPath
    const catalog = JSON.parse(await readFile(catalogPath, 'utf8'))
    response.json(catalog)
  } catch (error) {
    next(error)
  }
})

app.use((error, _request, response, _next) => {
  console.error(error)
  response.status(500).json({ error: 'Unable to load catalog.' })
})

app.listen(port, () => {
  console.log(`Catalog API listening on http://localhost:${port}`)
})
