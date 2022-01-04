const Login = props => {
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
