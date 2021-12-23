import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  axios.defaults.withCredentials = true

  async function getData() {
    let res = await axios.get(`http://localhost:5000/`)
    console.log(res.data)
  }

  async function login() {
    getData()
    const req = {
      username: 'user2',
      password: 'pass',
    }
    await axios.post('http://localhost:5000/login', req)
    getData()
  }

  login()

  return <p>test</p>
}

export default App
