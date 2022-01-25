const router = require('express').Router()
const User = require('../models/user')
const isAuth = require('../middleware/isAuth')

router.get('/user/', isAuth, async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.session.username })
    if (user) {
      res.status(200).json(user)
    } else {
      throw new Error('user does not exist')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
