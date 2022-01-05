import { useState, useEffect } from 'react'
import Entry from './components/Entry'

const Dashboard = props => {
  const { serverUrl, axios } = props.config
  const [userData, setUserData] = useState('')

  useEffect(() => {
    async function getData() {
      const obj = await axios.get(`${serverUrl}/user`)
      setUserData(obj.data)
      console.log(obj.data)
    }
    getData()
  }, [axios, serverUrl])

  if (userData) {
    return (
      <>
        <h3>dashboard</h3>
        {userData.username}
        <br />
        <br />
        {userData.vault.map(obj => {
          return <Entry key={obj.id} label={obj.label} />
        })}
        <br />
        <br />
        <button onClick={props.onClick}>logout</button>
      </>
    )
  } else return null
}

export default Dashboard
