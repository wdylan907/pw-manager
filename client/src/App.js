import React, { useState, useEffect } from 'react'
import axios from 'axios'
const config = require('./config')

function App() {
  axios.defaults.withCredentials = true

  async function getData() {
    let res = await axios.get(config.server_url)
    console.log(res.data)
  }

  async function login() {
    getData()
    const req = {
      username: 'user2',
      password: 'pass',
    }
    await axios.post(`${config.server_url}/login`, req)
    getData()
  }

  login()

  return <p>test</p>
}

export default App
