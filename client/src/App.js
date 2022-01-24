import React, { useState, useEffect } from 'react'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Registration from './views/Registration'
import axios from 'axios'

function App() {
  const [view, setView] = useState('login')
  const [encryptionKey, setEncryptionKey] = useState('')

  useEffect(() => {
    async function getView() {
      let res = await axios.get(serverUrl)
      setView(res.data)
    }
    getView()
  }, [axios, serverUrl])

  useEffect(() => {
    const logout = async () => {
      const res = await axios.post(`${serverUrl}/logout`)
      setView(res.data)
    }
    logout()
  }, [])

  axios.defaults.withCredentials = true

  const serverUrl = 'http://localhost:5000'

  const viewConfig = {
    axios,
    serverUrl,
    setView,
  }

  if (view === 'login') {
    return <Login config={viewConfig} setEncryptionKey={setEncryptionKey} />
  } else if (view === 'registration') {
    return <Registration config={viewConfig} />
  } else if (view === 'dashboard') {
    return <Dashboard config={viewConfig} encryptionKey={encryptionKey} />
  }
}

export default App
