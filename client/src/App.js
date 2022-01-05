import React, { useState, useEffect } from 'react'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Registration from './views/Registration'
import config from './config'

function App() {
  const { serverUrl, axios } = config

  const [view, setView] = useState('login')

  useEffect(() => {
    async function getView() {
      let res = await axios.get(serverUrl)
      setView(res.data)
    }
    getView()
  }, [axios, serverUrl])

  const loginSubmit = async event => {
    event.preventDefault()
    const loginInfo = {
      username: event.target.elements[0].value,
      password: event.target.elements[1].value,
    }
    const res = await axios.post(`${serverUrl}/login`, loginInfo)
    if (res.data.status === 0) {
      setView('dashboard')
    } else {
      console.log('invalid login')
    }
  }

  const registrationSubmit = async event => {
    event.preventDefault()
    if (event.target.elements[1].value === event.target.elements[2].value) {
      const userInfo = {
        username: event.target.elements[0].value,
        password: event.target.elements[1].value,
      }
      const res = await axios.post(`${serverUrl}/register`, userInfo)
      if (res.data.status === 0) {
        event.target.elements[0].value = ''
        event.target.elements[1].value = ''
        event.target.elements[2].value = ''
        console.log('success')
        setView('login')
      } else if (res.data.status === 1) {
        console.log('username already in use')
      }
    } else {
      console.log('passwords do not match')
    }
  }

  const router = (method, route) => {
    return async () => {
      let res
      if (method === 'get') {
        res = await axios.get(`${serverUrl}/${route}`)
      }
      if (method === 'post') {
        res = await axios.post(`${serverUrl}/${route}`)
      }
      setView(res.data)
      return res.data
    }
  }

  const logout = router('post', 'logout')
  const goToLogin = router('get', 'login')
  const goToRegistration = router('get', 'register')

  if (view === 'login') {
    return <Login link={goToRegistration} onSubmit={loginSubmit} />
  } else if (view === 'registration') {
    return <Registration link={goToLogin} onSubmit={registrationSubmit} />
  } else if (view === 'dashboard') {
    return <Dashboard config={config} onClick={logout} />
  }
}

export default App
