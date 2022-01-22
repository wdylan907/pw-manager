const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    )
    if (!user || !correctPassword) {
      return res.json({ status: 1 })
    }
    req.session.isAuth = true
    req.session.username = user.username
    return res.json({ status: 0 })
  } catch (error) {
    console.log(error)
    return res.json({ status: 2 })
  }
})

export { router as postLoginRouter }
