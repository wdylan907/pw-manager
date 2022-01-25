import React, { useState, useEffect } from 'react'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Registration from './views/Registration'
import config from './config'

function App() {
  const [view, setView] = useState('login')
  const [encryptionKey, setEncryptionKey] = useState('')

  const { serverUrl, axios } = config

  useEffect(() => {
    const logout = async () => {
      await axios.post(`${serverUrl}/logout`)
    }
    logout()
  }, [axios, serverUrl])

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
    return (
      <Dashboard
        config={viewConfig}
        encryptionKey={encryptionKey}
        view={view}
      />
    )
  }
}

export default App
