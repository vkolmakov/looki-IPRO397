import { notFound, actionFailed } from '../services/errors'

import { extractItem } from '../services/db'
import crudHandlers from '../services/crudHandlers'

const ALLOWED_TO_WRITE = ['name']
const ALLOWED_TO_READ = ['name', 'id']
const extractCourse = extractItem(ALLOWED_TO_READ)

const getCourses = (db) => () => new Promise(async (resolve, reject) => {
  try {
    const result = await db.Course.findAll({})
    resolve(result.map(extractCourse))
  } catch (err) {
    reject(err)
  }
})

const getCourse = (db) => (id) => new Promise(async (resolve, reject) => {
  const result = await db.Course.findOne({ where: { id } })

  if (result) {
    resolve(extractCourse(result))
  } else {
    reject(notFound())
  }
})

const createCourse = (db) => (course) => new Promise(async (resolve, reject) => {
  const createdCourse = await db.Course.build(course, {
    fields: ALLOWED_TO_WRITE,
  })

  try {
    await createdCourse.save()
    resolve(extractCourse(createdCourse))
  } catch (err) {
    reject(actionFailed('create', 'course'))
  }
})

const removeCourse = (db) => (id) => new Promise(async (resolve, reject) => {
  const removedCourse = await db.Course.destroy({ where: { id } })

  if (removedCourse) {
    resolve({ id })
  } else {
    reject(actionFailed('remove', 'course'))
  }
})

const updateCourse = (db) => (id, course) => new Promise(async (resolve, reject) => {
  try {
    const updatedCourse = await db.Course.update(course, {
      fields: ALLOWED_TO_WRITE,
    })
    resolve(extractCourse(updatedCourse))
  } catch (err) {
    reject(actionFailed('update', 'course'))
  }
})

export default db => crudHandlers(db)({
  onGet: getCourses,
  onGetId: getCourse,
  onPost: createCourse,
  onDelete: removeCourse,
  onPut: updateCourse,
})
