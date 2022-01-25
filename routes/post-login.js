const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const InvalidCredentialsError = require('../errors/InvalidCredentialsError')

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      throw new InvalidCredentialsError()
    }
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    )
    if (!correctPassword) {
      throw new InvalidCredentialsError()
    }
    req.session.isAuth = true
    req.session.username = user.username
    return res.status(200).json({})
  } catch (error) {
    next(error)
  }
})

module.exports = router
