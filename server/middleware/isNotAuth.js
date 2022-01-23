function isNotAuth(req, res, next) {
  if (req.session.isAuth) {
    return res.redirect('/')
  }
  next()
}

module.exports = isNotAuth
