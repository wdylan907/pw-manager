import axios from 'axios'

axios.defaults.withCredentials = true

//const serverUrl = 'http://localhost:5000'
const serverUrl = 'http://blooming-anchorage-99953.herokuapp.com'

const config = {
  serverUrl: serverUrl,
  axios: axios,
}

export default config
