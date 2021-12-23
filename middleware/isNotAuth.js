function isNotAuth(req, res, next) {
  if (req.session.isAuth) {
    console.log('not for logged in users')
    return res.redirect('/')
  }
  next()
}

module.exports = isNotAuth
