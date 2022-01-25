function isAuth(req, res, next) {
  if (req.session.isAuth) {
    return next()
  }
}

module.exports = isAuth
