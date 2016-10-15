import { notFound, actionFailed } from '../services/errors'

import { extractSession } from '../services/db'
import crudHandlers from '../services/crudHandlers'

const getSessions = (db) => () => new Promise(async (resolve, reject) => {
  try {
    const result = await db.Session.findAll({
      include: db.Session.RELATED_MODELS,
    })

    resolve(result.map(extractSession))
  } catch (err) {
    reject(err)
  }
})

const getSession = (db) => (id) => new Promise(async (resolve, reject) => {
  const result = await db.Session.findOne({
    where: { id },
    include: db.Session.RELATED_MODELS,
  })

  if (result) {
    resolve(extractSession(result))
  } else {
    reject(notFound('session'))
  }
})

const createSession = (db) => (session) => new Promise(async (resolve, reject) => {
  const createdSession = db.Session.build(session, {
    fields: db.Session.ALLOWED_TO_WRITE,
  })

  try {
    const course = await db.Course.findOne({ where: { id: session.course.id } })
    await createdSession.setCourse(course)
  } catch (err) {
    reject(notFound('course'))
    return
  }

  try {
    await createdSession.save()
    resolve({ id: createdSession.get('id') })
  } catch (err) {
    reject(actionFailed('create', 'session'))
  }
})

const removeSession = (db) => (id) => new Promise(async (resolve, reject) => {
  const removedSession = await db.Session.destroy({ where: { id } })

  if (removedSession) {
    resolve({ id })
  } else {
    reject(actionFailed('remove', 'session'))
  }
})

const updateSession = (db) => (id, session) => new Promise(async (resolve, reject) => {
  try {
    const updatedSession = await db.Session.update(session, {
      fields: db.Session.ALLOWED_TO_WRITE,
    })
    resolve(extractSession(updatedSession))
  } catch (err) {
    reject(actionFailed('update', 'session'))
  }
})

export default (db) => crudHandlers(db)({
  onGet: getSessions,
  onGetId: getSession,
  onPost: createSession,
  onDelete: removeSession,
  onPut: updateSession,
})
