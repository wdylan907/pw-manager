const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const isAuth = require('../middleware/isAuth')
const isNotAuth = require('../middleware/isNotAuth')

router.get('/', isAuth, (req, res) => {
  res.send('dashboard')
})

router.get('/login', isNotAuth, (req, res) => {
  res.send('login')
})

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

router.get('/register', isNotAuth, (req, res) => {
  res.send('registration')
})

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

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
    res.redirect('/login')
  })
})

router.get('/user/', isAuth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.username })
    res.json(user)
  } catch (error) {
    console.log(user)
  }
})

router.post('/entry', isAuth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.username })
    const newEntry = {
      label: req.body.label,
      username: req.body.username,
      password: req.body.password,
    }
    user.vault.push(newEntry)
    await user.save()
    res.json(user)
  } catch (error) {
    console.log(error)
  }
})

router.post('/update-entry', isAuth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.username })
    const entries = user.vault.filter(entry => {
      return entry._id.toString() !== req.body.id
    })
    newEntry = {
      label: req.body.label,
      username: req.body.username,
      password: req.body.password,
    }
    entries.push(newEntry)
    user.vault = entries
    await user.save()
    res.json(user)
  } catch (error) {
    console.log(error)
  }
})

router.delete('/delete-entry', isAuth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.username })
    const newVault = user.vault.filter(entry => {
      return entry._id.toString() !== req.body.id
    })
    user.vault = newVault
    await user.save()
    res.json(user)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
