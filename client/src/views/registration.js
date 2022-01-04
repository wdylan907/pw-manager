const Registration = props => {
  return (
    <>
      <h3>register</h3>
      <form onSubmit={props.onSubmit}>
        username:
        <input name='username' />
        <br />
        password:
        <input name='password1' type='password' />
        <br />
        repeat password:
        <input name='password2' type='password' />
        <br />
        <button type='submit'>submit</button>
      </form>
      <br />
      <br />
      <button onClick={props.link}>login</button>
    </>
  )
}

export default Registration
