import express from 'express'
import path from 'path'

import { setupWebpackMiddleware, serveStaticFiles } from '../build/utils'

const app = express()
const port = process.env.PORT || 3000

const isDev = process.env.NODE_ENV !== 'production'

if (isDev) {
  setupWebpackMiddleware(app)
} else {
  app.use(express.static(path.join(__dirname, '../dist')))
  serveStaticFiles(app)
}

app.listen(port, () => console.log(`Running on ${port}`))
