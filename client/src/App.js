import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dashboard from './views/dashboard'
import Login from './views/login'
import Registration from './views/registration'
const config = require('./config')

function App() {
  config.axiosConfig(axios)

  const [view, setView] = useState('login')

  useEffect(() => {
    async function getData() {
      let res = await axios.get(config.server_url)
      setView(res.data)
    }
    getData()
  }, [])

  const handleLoginClick = async event => {
    event.preventDefault()
    console.log('click login')
    const loginInfo = {
      username: event.target.username.value,
      password: event.target.password.value,
    }
    console.log(`${config.server_url}/login`)
    const res = await axios.post(`${config.server_url}/login`, loginInfo)
    console.log(res.data)
    setView(res.data)
  }

  const handleLogoutClick = async () => {
    console.log('click logout')
    const res = await axios.post(`${config.server_url}/logout`)
    console.log(res.data)
    setView(res.data)
  }

  const goToRegistration = async () => {
    const res = await axios.get(`${config.server_url}/register`)
    setView(res.data)
  }

  const goToLogin = async () => {
    const res = await axios.get(`${config.server_url}/login`)
    setView(res.data)
  }

  if (view === 'login') {
    return <Login link={goToRegistration} handleClick={handleLoginClick} />
  } else if (view === 'registration') {
    return <Registration link={goToLogin} />
  } else if (view === 'dashboard') {
    return <Dashboard handleClick={handleLogoutClick} />
  } else return <Login handleClick={handleLoginClick} />
}

export default App
