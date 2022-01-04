const dashboard = props => {
  const d = props.data
  console.log(d)
  return (
    <>
      <h3>dashboard</h3>
      <button onClick={props.onClick}>logout</button>
    </>
  )
}

export default dashboard
