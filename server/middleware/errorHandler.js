export const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  next(error)
}
