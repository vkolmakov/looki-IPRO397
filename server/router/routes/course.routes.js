import express from 'express'
import createHandlers from '../../controllers/course.controller'

export default (db) => {
  const router = express.Router() // eslint-disable-line
  const handlers = createHandlers(db)

  router.get('/courses', handlers.get)
  router.get('/courses/:id', handlers.getId)

  router.post('/courses', handlers.post)
  router.delete('/courses/:id', handlers.remove)
  router.put('/courses/:id', handlers.update)

  return router
}
