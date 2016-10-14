import statusCodes from '../services/statusCodes'

export default (db) => ({ onGet, onGetId, onPost, onDelete, onPut }) => ({
  async get(_, res, next) {
    let result
    try {
      result = await onGet(db)()
    } catch (err) {
      next(err)
    }

    res.status(statusCodes.OK).json(result)
  },

  async getId(req, res, next) {
    let result
    try {
      result = await onGetId(db)(req.params.id)
    } catch (err) {
      next(err)
    }

    res.status(statusCodes.OK).json(result)
  },

  async post(req, res, next) {
    let result
    try {
      result = await onPost(db)(req.body)
    } catch (err) {
      next(err)
    }

    res.status(statusCodes.CREATED).json(result)
  },

  async remove(req, res, next) {
    let result
    try {
      result = await onDelete(db)(req.params.id)
    } catch (err) {
      next(err)
    }

    res.status(statusCodes.OK).json(result)
  },

  async update(req, res, next) {
    let result
    try {
      result = await onPut(db)(req.params.id, req.body)
    } catch (err) {
      next(err)
    }

    res.status(statusCodes.OK).json(result)
  },

})

