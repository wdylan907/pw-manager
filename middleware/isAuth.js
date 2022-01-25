function isAuth(req, res, next) {
  if (req.session.isAuth) {
    return next()
  }
  throw new Error('not authorized')
}

module.exports = isAuth
