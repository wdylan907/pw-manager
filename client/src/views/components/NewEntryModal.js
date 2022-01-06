import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import config from '../../config'
import cryptography from '../../cryptography'
import AlertMessage from './AlertMessage'

const NewEntryModal = props => {
  const { serverUrl, axios } = config

  const saveEntry = async event => {
    event.preventDefault()
    if (event.target.elements[0].value === '') {
      console.log('alert')
      props.setAlert(4)
      return
    }
    const newEntryPlain = {
      label: event.target.elements[0].value,
      username: event.target.elements[1].value,
      password: event.target.elements[2].value,
    }
    const newEntryEncrypted = cryptography.encryptNewEntry(
      newEntryPlain,
      props.encryptionKey
    )
    await axios.post(`${serverUrl}/entry`, newEntryEncrypted)
    props.handleClose()
    const newDataEncrypted = await axios.get(`${serverUrl}/user`)
    const newDataPlain = cryptography.decryptVault(
      newDataEncrypted.data.vault,
      props.encryptionKey
    )
    props.setVault(newDataPlain)
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
          <Button variant='primary' type='submit'>
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default NewEntryModal
