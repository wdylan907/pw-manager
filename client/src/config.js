const server_url = 'http://localhost:5000'

const axiosConfig = axios => {
  axios.defaults.withCredentials = true
}

module.exports = { server_url, axiosConfig }
