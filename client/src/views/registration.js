// const Registration = props => {
//   return (
//     <>
//       <h3>register</h3>
//       <form onSubmit={props.onSubmit}>
//         username:
//         <input name='username' />
//         <br />
//         password:
//         <input name='password1' type='password' />
//         <br />
//         repeat password:
//         <input name='password2' type='password' />
//         <br />
//         <button type='submit'>submit</button>
//       </form>
//       <br />
//       <br />
//       <button onClick={props.link}>login</button>
//     </>
//   )
// }

// export default Registration

import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Registration = props => {
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
            <Form onSubmit={props.onSubmit}>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Control type='text' placeholder='username' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Control type='password' placeholder='password' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPasswordRepeat'>
                <Form.Control type='password' placeholder='repeat password' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                <Form.Check type='checkbox' label='Check me out' />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
              <Button variant='primary' onClick={props.link}>
                Login
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </div>
  )
}

export default Registration
