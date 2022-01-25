const router = require('express').Router()
const User = require('../models/user')
const isAuth = require('../middleware/isAuth')

router.put('/entry/:id', isAuth, async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.session.username })
    const entries = user.vault.filter(entry => {
      return entry._id.toString() !== req.params.id
    })
    newEntry = {
      label: req.body.label,
      username: req.body.username,
      password: req.body.password,
    }
    entries.push(newEntry)
    user.vault = entries
    await user.save()
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
