import axios from 'axios'

axios.defaults.withCredentials = true

const serverUrl = 'http://localhost:5000'

export default {
  serverUrl: serverUrl,
  axios: axios,
}
