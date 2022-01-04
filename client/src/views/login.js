import React from 'react'

const Login = props => {
  const f = async event => {
    event.preventDefault()
    console.log(event.target.username.value)
  }
  return (
    <>
      <h3>login</h3>

      <form onSubmit={props.onSubmit}>
        username:
        <input name='username' />
        <br />
        password:
        <input name='password' type='password' />
        <br />
        <button type='submit'>submit</button>
      </form>

      <br />
      <br />

      <button onClick={props.link}>register</button>
    </>
  )
}

export default Login
