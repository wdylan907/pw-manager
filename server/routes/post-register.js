const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.post('/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username })
    if (existingUser) {
      return res.json({ status: 1 })
    }
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
      username: req.body.username,
      passwordHash,
    })
    await newUser.save()
    return res.json({ status: 0 })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router