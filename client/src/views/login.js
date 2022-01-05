import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Login = props => {
  const { axios, setView, serverUrl } = props.config

  const loginSubmit = async event => {
    event.preventDefault()
    const loginInfo = {
      username: event.target.elements[0].value,
      password: event.target.elements[1].value,
    }
    const res = await axios.post(`${serverUrl}/login`, loginInfo)
    if (res.data.status === 0) {
      setView('dashboard')
    } else {
      console.log('invalid login')
    }
  }

  const goToRegistration = async () => {
    const res = await axios.get(`${serverUrl}/register`)
    setView(res.data)
  }

  return (
    <div>
      <Row>
        <Container className='pt-5 pb-2 col-6 align-self-center'>
          <h1>Login</h1>
        </Container>
      </Row>
      <Row className='pt-4 pb-3'>
        <Col sm={3} xs={0}></Col>
        <Col sm={6} xs={12}>
          <Container
            className='pt-3 pb-3'
            style={{ border: '5px solid #cecece' }}
          >
            <Form onSubmit={loginSubmit}>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Control type='text' placeholder='username' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Control type='password' placeholder='password' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                <Form.Check type='checkbox' label='Check me out' />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
              <Button variant='primary' onClick={goToRegistration}>
                register
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </div>
  )
}

export default Login
