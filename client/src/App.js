import React, { useState, useEffect } from 'react'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Registration from './views/Registration'
import config from './config'

function App() {
  const { serverUrl, axios } = config
  const [view, setView] = useState('login')

  const viewConfig = {
    axios: axios,
    serverUrl: serverUrl,
    setView: setView,
  }

  useEffect(() => {
    async function getView() {
      let res = await axios.get(serverUrl)
      setView(res.data)
    }
    getView()
  }, [axios, serverUrl])

  if (view === 'login') {
    return <Login config={viewConfig} />
  } else if (view === 'registration') {
    return <Registration config={viewConfig} />
  } else if (view === 'dashboard') {
    return <Dashboard config={viewConfig} />
  }
}

export default App
