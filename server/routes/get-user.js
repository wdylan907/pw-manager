const router = require('express').Router()
const User = require('../models/user')
const isAuth = require('../middleware/isAuth')

router.get('/user/', isAuth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.username })
    res.status(200).json(user)
  } catch (error) {
    console.log(user)
  }
})

module.exports = router
