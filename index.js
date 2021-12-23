const express = require('express')
const session = require('express-session')
const bcrypt = require('bcrypt')
const User = require('./user')
const mongoConfig = require('./mongo-config')

mongoConfig.connect()

const app = express()
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: mongoConfig.store,
  })
)
app.use(express.json())

app.get('/', isAuth, (req, res) => {
  res.send('landing')
})

app.get('/login', isNotAuth, (req, res) => {
  res.send('login')
})

app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    )
    if (!user || !correctPassword) {
      console.log('invalid username or password')
      return res.redirect('/login')
    }
    req.session.isAuth = true
    req.session.username = user.username
    console.log(`logging on user: ${user.username}`)
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

app.get('/register', isNotAuth, (req, res) => {
  res.send('registration')
})

app.post('/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username })
    if (existingUser) {
      console.log('username in use')
      return res.redirect('/register')
    }
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
      username: req.body.username,
      passwordHash,
    })
    await newUser.save()
    console.log(newUser.username, passwordHash)
  } catch (error) {
    console.log(error)
  }
})

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
    res.redirect('/login')
  })
})

app.post('/entry', isAuth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.username })
    console.log(user)
    user.vault.push({ label: req.body.label })
    await user.save()
    console.log('entry added')
  } catch (error) {
    console.log(error)
  }
})

app.get('/user/:id', async (req, res) => {
  const id = req.body.id
  const user = await User.findById(id)
  console.log(user)
  res.json(user)
})

app.post('/entry/:entryId', async (req, res) => {
  const id = req.body.id
  const user = await User.findById(id)
  const entryId = req.body.entryId
  const entry = user.vault.id(entryId)
  entry.fields.set(req.body.fieldLabel, req.body.fieldContent)
  await user.save()
  console.log(user)
  res.json(user)
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})

function isAuth(req, res, next) {
  if (req.session.isAuth) {
    return next()
  }
  console.log('for logged in users only')
  res.redirect('/login')
}

function isNotAuth(req, res, next) {
  if (req.session.isAuth) {
    console.log('not for logged in users')
    return res.redirect('/')
  }
  next()
}
