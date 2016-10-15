import { db } from '../services/db'

import courseRoutes from './routes/course.routes'
import sessionRoutes from './routes/session.routes'

const routes = [
  courseRoutes,
  sessionRoutes,
]

export default (app) => routes.forEach(route => app.use('/api', route(db)))
