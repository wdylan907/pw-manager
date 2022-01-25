const router = require('express').Router()

router.get('/', (req, res) => {
  res.status(200).send('index')
})

module.exports = router
