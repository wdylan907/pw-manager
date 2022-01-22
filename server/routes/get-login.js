const router = require('express').Router()
const isNotAuth = require('../middleware/isNotAuth')

router.get('/login', isNotAuth, (req, res) => {
  res.status(200).send('login')
})

export { router as getLoginRouter }
