export const notFound = (item) => ({
  status: 404,
  message: `${item} not found.`,
})

export const actionFailed = (action, item, description = '') => ({
  status: 422,
  message: `${action} ${item} failed. ${description}`,
})

export const genericError = (message, status) => ({
  status,
  message,
})
