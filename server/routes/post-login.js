const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      throw new Error('invalid credentials')
    }
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    )
    if (!correctPassword) {
      throw new Error('invalid credentials')
    }
    req.session.isAuth = true
    req.session.username = user.username
    res.statusCode = 200
    return res.json({ status: 0 })
  } catch (error) {
    next(error)
  }
})

module.exports = router
