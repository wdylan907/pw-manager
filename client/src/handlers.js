import config from './config'

const serverUrl = config.serverUrl
const axios = config.axios

let setView

const loginSubmit = async event => {
  event.preventDefault()
  const loginInfo = {
    username: event.target.username.value,
    password: event.target.password.value,
  }
  const res = await axios.post(`${serverUrl}/login`, loginInfo)
  setView(res.data)
}

export default loginSubmit
