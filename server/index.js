import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import { setupWebpackMiddleware, serveStaticFiles } from '../build/utils'
import config from './config'
import setupRouter from './router'

import { db } from './services/db'

(async () => {
  const app = express()
  const port = process.env.PORT || config.PORT

  await db.connect()

  const isDevClient = !['nodemon', 'production'].find(env => env === process.env.NODE_ENV)

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

