import React, { useState, useEffect } from 'react'
import Dashboard from './views/dashboard'
import Login from './views/login'
import Registration from './views/registration'

function App(props) {
  const serverUrl = props.config.serverUrl
  const axios = props.config.axios

  const [view, setView] = useState('login')

  const loginSubmit = async event => {
    event.preventDefault()
    const loginInfo = {
      username: event.target.username.value,
      password: event.target.password.value,
    }
    const res = await axios.post(`${serverUrl}/login`, loginInfo)
    setView(res.data)
  }

  const registrationSubmit = async event => {
    event.preventDefault()
    if (event.target.password1.value === event.target.password2.value) {
      const userInfo = {
        username: event.target.username.value,
        password: event.target.password1.value,
      }
      const res = await axios.post(`${serverUrl}/register`, userInfo)
      if (res.data.status === 0) {
        event.target.username.value = ''
        event.target.password1.value = ''
        event.target.password2.value = ''
        console.log('success')
        setView('login')
      } else if (res.data.status === 1) {
        console.log('username already in use')
      }
    } else {
      console.log('passwords do not match')
    }
  }

  const router = (method, route, callback) => {
    return async () => {
      let res
      if (method === 'get') {
        res = await axios.get(`${serverUrl}/${route}`)
      }
      if (method === 'post') {
        res = await axios.post(`${serverUrl}/${route}`)
      }
      callback(res.data)
    }
  }

  const logout = router('post', 'logout', setView)
  const getUserData = router('get', 'user', console.log)
  const goToLogin = router('get', 'login', setView)
  const goToRegistration = router('get', 'register', setView)

  useEffect(() => {
    async function getView() {
      let res = await axios.get(serverUrl)
      setView(res.data)
    }
    getView()
  }, [])

  if (view === 'login') {
    return <Login link={goToRegistration} onSubmit={loginSubmit} />
  } else if (view === 'registration') {
    return <Registration link={goToLogin} onSubmit={registrationSubmit} />
  } else if (view === 'dashboard') {
    return <Dashboard data={getUserData} onClick={logout} />
  }
}

export default App
