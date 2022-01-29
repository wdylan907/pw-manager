import axios from 'axios'

axios.defaults.withCredentials = true

const serverUrl = process.env.REACT_APP_SERVER_URL

const config = {
  serverUrl: serverUrl,
  axios: axios,
}

export default config
