const NotAuthorizedError = require('../errors/NotAuthorizedError')

function isAuth(req, res, next) {
  if (req.session.isAuth) {
    return next()
  }
  throw new NotAuthorizedError()
}

module.exports = isAuth
