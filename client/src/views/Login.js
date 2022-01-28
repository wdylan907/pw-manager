import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AlertMessage from './components/AlertMessage'

const Login = props => {
  const { axios, setView, serverUrl } = props.config
  const [alert, setAlert] = useState(null)

  const loginSubmit = async event => {
    event.preventDefault()
    const loginInfo = {
      username: event.target.elements[0].value,
      password: event.target.elements[1].value,
    }
    try {
      await axios.post(`${serverUrl}/login`, loginInfo)
      props.setEncryptionKey(event.target.elements[1].value)
      if (loginInfo.username === 'demo') {
        props.setIsDemo(true)
      } else {
        props.setIsDemo(false)
      }
      setView('dashboard')
    } catch (error) {
      setAlert(3)
    }
  }

  const goToRegistration = () => {
    setView('registration')
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
              <Button variant='primary' type='submit'>
                Log In
              </Button>
              <Button
                variant='primary'
                onClick={goToRegistration}
                className='float-end'
              >
                Register
              </Button>
            </Form>
          </Container>
          <br />
          <AlertMessage alert={alert} />
        </Col>
      </Row>
    </div>
  )
}

export default Login
