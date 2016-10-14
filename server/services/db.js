import Sequelize from 'sequelize'
import config from '../config'

import user from '../models/user.model'
import session from '../models/session.model'
import course from '../models/course.model'

const sequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
  host: config.DB_HOST,
  port: config.DB_PORT,
  dialect: config.DB_DIALECT,
})

const User = user(sequelize, Sequelize)
const Session = session(sequelize, Sequelize)
const Course = course(sequelize, Sequelize)

export const db = {
  connect() {
    return sequelize.sync()
  },

  User,
  Session,
  Course,
}

export const extractItem = (allowedFields) => (sequelizeResource) => (
  allowedFields.reduce((result, fieldName) => {
    result[fieldName] = sequelizeResource.get(fieldName) // eslint-disable-line
    return result
  }, {})
)
