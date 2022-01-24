const router = require('express').Router()

router.post('/logout', (req, res, next) => {
  req.session.destroy(error => {
    if (error) {
      next(error)
    }
    res.redirect('/login')
  })
})

module.exports = router
