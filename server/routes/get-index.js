const router = require('express').Router()
const isAuth = require('../middleware/isAuth')

router.get('/', isAuth, (req, res) => {
  res.status(200).send('dashboard')
})

export { router as getIndexRouter }
