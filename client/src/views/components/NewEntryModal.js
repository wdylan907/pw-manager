import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import config from '../../config'
import CryptoJS from 'crypto-js'

const NewEntryModal = props => {
  const { serverUrl, axios } = config

  const saveEntry = async event => {
    event.preventDefault()
    const newEntry = {
      label: event.target.elements[0].value,
      username: event.target.elements[1].value || null,
      password: event.target.elements[2].value || null,
    }
    await axios.post(`${serverUrl}/entry`, newEntry)
    props.handleClose()
    const newData = await axios.get(`${serverUrl}/user`)
    props.setVault(newData.data.vault)
  }

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>New Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={saveEntry}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Control type='text' placeholder='label' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Control type='text' placeholder='username (optional)' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Control type='password' placeholder='password' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Check me out' />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default NewEntryModal
