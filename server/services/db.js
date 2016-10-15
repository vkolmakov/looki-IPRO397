import Sequelize from 'sequelize'
import config from '../config'
import { hasProps } from './misc'

import user from '../models/user.model'
import session from '../models/session.model'
import course from '../models/course.model'

const sequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
  host: config.DB_HOST,
  port: config.DB_PORT,
  dialect: config.DB_DIALECT,
  logging: process.env.NODE_ENV !== 'production'
           ? msg => console.log(msg) // eslint-disable-line
           : false,
})

const User = user(sequelize, Sequelize)
const Session = session(sequelize, Sequelize)
const Course = course(sequelize, Sequelize)

Session.belongsToMany(User, { as: 'users', through: 'session_user' })
Course.hasOne(Session)
Session.belongsTo(Course)

User.belongsToMany(Session, { as: 'sessions', through: 'session_user' })
User.belongsToMany(Course, { as: 'courses', through: 'user_course' })

Course.ALLOWED_TO_WRITE = [
  'name',
]

Session.RELATED_MODELS = [
  { model: Course, as: 'course' },
]

Session.ALLOWED_TO_WRITE = [
  'date',
]

export const db = {
  connect() {
    return sequelize.sync(
      // {force:true}
    ).then(
      // eslint-disable-next-line
      console.log(`Connected to the database: ${config.DB_USERNAME}@${config.DB_HOST}`)
    )
  },

  User,
  Session,
  Course,
}

const extractItem = (allowedFields, customHandlers) => (sequelizeResource) => (
  allowedFields.reduce((result, fieldName) => {
    if (hasProps(customHandlers, fieldName)) {
      result[fieldName] = customHandlers[fieldName](sequelizeResource[fieldName]) // eslint-disable-line
    } else {
      result[fieldName] = sequelizeResource.get(fieldName) // eslint-disable-line
    }

    return result
  }, {})
)

export const extractCourse = extractItem(['id', 'name'])
export const extractSession = extractItem(['id', 'date', 'course'], { course: extractCourse })