import axios from 'axios'

axios.defaults.withCredentials = true

const serverUrl = 'http://localhost:5000'

const config = {
  serverUrl: serverUrl,
  axios: axios,
}

export default config
