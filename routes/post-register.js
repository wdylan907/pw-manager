const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.post('/register', async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username })
    if (existingUser) {
      throw new Error('username in use')
    }
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
      username: req.body.username,
      passwordHash,
    })
    await newUser.save()
    return res.status(201).json({ code: 0 })
  } catch (error) {
    next(error)
  }
})

module.exports = router
