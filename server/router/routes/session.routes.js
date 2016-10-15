import express from 'express'
import createHandlers from '../../controllers/session.controller'

export default (db) => {
  const router = express.Router() // eslint-disable-line
  const handlers = createHandlers(db)

  router.get('/sessions', handlers.get)
  router.get('/sessions/:id', handlers.getId)

  router.post('/sessions', handlers.post)
  router.delete('/sessions/:id', handlers.remove)
  router.put('/sessions/:id', handlers.update)

  return router
}
