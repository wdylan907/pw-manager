import React from 'react'

const dashboard = props => {
  props.data()
  return (
    <>
      <h3>dashboard</h3>
      <button onClick={props.handleClick}>logout</button>
    </>
  )
}

export default dashboard
