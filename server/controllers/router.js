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
      console.log('invalid username or password')
      return res.json({ status: 1 })
    }
    req.session.isAuth = true
    req.session.username = user.username
    console.log(`logging on user ${user.username}`)
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
  const user = req.session.username
  req.session.destroy(err => {
    if (err) throw err
    console.log(`user ${user} logged out`)
    res.redirect('/login')
  })
})

router.get('/user/', isAuth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.username })
    console.log(user)
    res.json(user)
  } catch (error) {
    console.log(user)
  }
})

router.post('/entry', isAuth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.username })
    user.vault.push({ label: req.body.label })
    await user.save()
    console.log(`entry for ${req.body.label} added`)
    res.json(user)
  } catch (error) {
    console.log(error)
  }
})

router.post('/entry/:id', isAuth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.username })
    const entry = user.vault.id(req.body.id)
    entry.fields.set(req.body.fieldLabel, req.body.fieldContent)
    await user.save()
    console.log(user)
    res.json(user)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
