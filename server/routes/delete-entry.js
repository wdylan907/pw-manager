const router = require('express').Router()
const User = require('../models/user')
const isAuth = require('../middleware/isAuth')

router.delete('/entry', isAuth, async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.session.username })
    const newVault = user.vault.filter(entry => {
      return entry._id.toString() !== req.body.id
    })
    user.vault = newVault
    await user.save()
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
