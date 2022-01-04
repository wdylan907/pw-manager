import React from 'react'

const registration = props => {
  return (
    <>
      <h3>register</h3>
      <form>
        username:
        <input />
        <br />
        password:
        <input type='password' />
        <br />
        repeat password:
        <input type='password' />
        <br />
        <button type='submit'>submit</button>
      </form>
      <br />
      <br />
      <button onClick={props.link}>login</button>
    </>
  )
}

export default registration
