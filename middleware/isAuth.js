function isAuth(req, res, next) {
  if (req.session.isAuth) {
    return next()
  }
  console.log('for logged in users only')
  res.redirect('/login')
}

module.exports = isAuth
