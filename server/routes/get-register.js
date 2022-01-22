const router = require('express').Router()
const isNotAuth = require('../middleware/isNotAuth')

router.get('/register', isNotAuth, (req, res) => {
  res.status(200).send('registration')
})

module.exports = router
