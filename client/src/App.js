import React, { useState, useEffect } from 'react'
import Dashboard from './views/dashboard'
import Login from './views/login'
import Registration from './views/registration'
import config from './config'

function App() {
  const serverUrl = config.serverUrl
  const axios = config.axios

  const [view, setView] = useState('login')
  const [userData, setUserData] = useState('')

  useEffect(() => {
    async function getView() {
      let res = await axios.get(serverUrl)
      setView(res.data)
    }
    getView()
  }, [])

  const loginSubmit = async event => {
    event.preventDefault()
    const loginInfo = {
      username: event.target.username.value,
      password: event.target.password.value,
    }
    const res = await axios.post(`${serverUrl}/login`, loginInfo)
    if (res.data.status === 0) {
      const obj = await axios.get(`${serverUrl}/user`)
      setUserData(obj.data)
      setView('dashboard')
    } else {
      console.log('invalid login')
    }
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

  // const getUserData = async () => {
  //   const res = await axios.get(`${serverUrl}/user`)
  //   const data = res.data
  //   console.log('app', data)
  //   return data
  // }

  if (view === 'login') {
    return <Login link={goToRegistration} onSubmit={loginSubmit} />
  } else if (view === 'registration') {
    return <Registration link={goToLogin} onSubmit={registrationSubmit} />
  } else if (view === 'dashboard') {
    return <Dashboard data={userData} onClick={logout} />
  }
}

export default App
