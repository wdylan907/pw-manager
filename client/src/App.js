import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dashboard from './views/dashboard'
import Login from './views/login'
import Registration from './views/registration'
const config = require('./config')

function App() {
  config.axiosConfig(axios)

  const [view, setView] = useState('login')

  const handleLoginClick = async event => {
    event.preventDefault()
    const loginInfo = {
      username: event.target.username.value,
      password: event.target.password.value,
    }
    const res = await axios.post(`${config.server_url}/login`, loginInfo)
    setView(res.data)
  }

  const handleRegistrationClick = async event => {
    event.preventDefault()
    if (event.target.password1.value === event.target.password2.value) {
      const userInfo = {
        username: event.target.username.value,
        password: event.target.password1.value,
      }
      const res = await axios.post(`${config.server_url}/register`, userInfo)
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

  const handleLogoutClick = async () => {
    const res = await axios.post(`${config.server_url}/logout`)
    setView(res.data)
  }

  const getUserData = async () => {
    const res = await axios.get(`${config.server_url}/user`)
    console.log(res.data)
  }

  const goTo = view => {
    return async () => {
      const res = await axios.get(`${config.server_url}/${view}`)
      setView(res.data)
    }
  }

  useEffect(() => {
    async function getView() {
      let res = await axios.get(config.server_url)
      setView(res.data)
    }
    getView()
  }, [])

  if (view === 'login') {
    return <Login link={goTo('register')} onSubmit={handleLoginClick} />
  } else if (view === 'registration') {
    return (
      <Registration link={goTo('login')} onSubmit={handleRegistrationClick} />
    )
  } else if (view === 'dashboard') {
    return <Dashboard data={getUserData} handleClick={handleLogoutClick} />
  } else return <Login handleClick={handleLoginClick} />
}

export default App
