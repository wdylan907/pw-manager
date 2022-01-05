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

  if (view === 'login') {
    return <Login serverUrl={serverUrl} axios={axios} setView={setView} />
  } else if (view === 'registration') {
    return (
      <Registration serverUrl={serverUrl} axios={axios} setView={setView} />
    )
  } else if (view === 'dashboard') {
    return <Dashboard serverUrl={serverUrl} axios={axios} setView={setView} />
  }
}

export default App
