import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import config from '../../config'
import cryptography from '../../cryptography'

const EntryModal = props => {
  const { serverUrl, axios } = config

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={saveEntry}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Control type='text' placeholder='label' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Control type='text' placeholder={'username (optional)'} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Control type='password' placeholder='new password' />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Save
          </Button>
          <AlertMessage alert={alert} />
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EntryModal
