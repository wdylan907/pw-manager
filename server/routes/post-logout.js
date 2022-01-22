const router = require('express').Router()

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
    res.redirect('/login')
  })
})

export { router as postLogoutRouter }
