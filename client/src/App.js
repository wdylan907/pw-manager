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
      console.log('useEffect()')
      console.log(res.data)
      setView(res.data)
    }
    getData()
  }, [])

  const handleLoginClick = async () => {
    console.log('click login')
    const loginInfo = {
      username: 'user2',
      password: 'pass',
    }
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

  if (view === 'login') {
    return <Login handleClick={handleLoginClick} />
  } else if (view === 'registration') {
    return <Registration />
  } else if (view === 'dashboard') {
    return <Dashboard handleClick={handleLogoutClick} />
  } else return <></>
}

export default App
