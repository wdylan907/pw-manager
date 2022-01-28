const app = require('./app')
const { port } = require('./util/config')

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
