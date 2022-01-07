import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AlertMessage from './components/AlertMessage'
import { useState } from 'react'

const Registration = props => {
  const { axios, setView, serverUrl } = props.config
  const [alert, setAlert] = useState(null)

  const registrationSubmit = async event => {
    event.preventDefault()
    if (event.target.elements[1].value === event.target.elements[2].value) {
      const userInfo = {
        username: event.target.elements[0].value,
        password: event.target.elements[1].value,
      }
      const res = await axios.post(`${serverUrl}/register`, userInfo)
      if (res.data.status === 0) {
        event.target.elements[0].value = ''
        event.target.elements[1].value = ''
        event.target.elements[2].value = ''
        console.log('success')
        setAlert(0)
        setView('login')
      } else if (res.data.status === 1) {
        console.log('username already in use')
        setAlert(1)
      }
    } else {
      console.log('passwords do not match')
      setAlert(2)
    }
  }

  const goToLogin = async () => {
    const res = await axios.get(`${serverUrl}/login`)
    setView(res.data)
  }

  return (
    <div>
      <Row>
        <Container className='pt-5 pb-2 col-6 align-self-center'>
          <h1>Register</h1>
        </Container>
      </Row>
      <Row className='pt-4 pb-3'>
        <Col sm={3} xs={0}></Col>
        <Col sm={6} xs={12}>
          <Container
            className='pt-3 pb-3'
            style={{ border: '5px solid #cecece' }}
          >
            <Form onSubmit={registrationSubmit}>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Control type='text' placeholder='username' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Control type='password' placeholder='password' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPasswordRepeat'>
                <Form.Control type='password' placeholder='repeat password' />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Register
              </Button>
              <Button
                variant='primary'
                onClick={goToLogin}
                className='float-end'
              >
                Log In
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

export default Registration
