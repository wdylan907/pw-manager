const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      res.statusCode = 401
      return res.json({ status: 1 })
    }
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    )
    if (!correctPassword) {
      res.statusCode = 401
      return res.json({ status: 1 })
    }
    req.session.isAuth = true
    req.session.username = user.username
    res.statusCode = 200
    return res.json({ status: 0 })
  } catch (error) {
    console.log(error)
    res.statusCode = 401
    return res.json({ status: 2 })
  }
})

module.exports = router
