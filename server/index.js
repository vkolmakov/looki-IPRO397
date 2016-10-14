import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import { setupWebpackMiddleware, serveStaticFiles } from '../build/utils'
import setupRouter from './router'

import { db } from './services/db'

(async () => {
  const app = express()
  const port = process.env.PORT || 3000

  await db.connect()

  const isDevClient = process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'nodemon'

  app.use(bodyParser.json())
  setupRouter(app)

  if (isDevClient) {
    setupWebpackMiddleware(app)
  } else {
    app.use(express.static(path.join(__dirname, '../dist')))
    serveStaticFiles(app)
  }

  app.listen(port, () => console.log(`Running on ${port}`)) // eslint-disable-line
})()

