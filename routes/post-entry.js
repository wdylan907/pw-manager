const router = require('express').Router()
const User = require('../models/user')
const isAuth = require('../middleware/isAuth')

router.post('/entry', isAuth, async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.session.username })
    const newEntry = {
      label: req.body.label,
      username: req.body.username,
      password: req.body.password,
    }
    user.vault.push(newEntry)
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
