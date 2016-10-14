import { db } from '../services/db'

import courseRoutes from './routes/course.routes'

const routes = [
  courseRoutes,
]

export default app => routes.forEach(route => app.use('/api', route(db)))
