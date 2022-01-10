import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import config from '../../config'
import cryptography from '../../cryptography'
import AlertMessage from './AlertMessage'
import passwordGenerator from '../../pw-tool'

const EntryModal = props => {
  const { serverUrl, axios } = config

  const [alert, setAlert] = useState(null)
  const [passwordDisplayType, setPasswordDisplayType] = useState('password')
  const [passwordValue, setPasswordValue] = useState('')

  const saveNewEntry = async event => {
    event.preventDefault()
    if (event.target.elements[0].value === '') {
      setAlert(4)
      return
    }
    setAlert(null)
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

  const saveUpdatedEntry = async event => {
    event.preventDefault()
    if (event.target.elements[0].value === '') {
      setAlert(4)
      return
    }
    setAlert(null)
    const id = props.id
    const updatedEntryPlain = {
      id,
      label: event.target.elements[0].value,
      username: event.target.elements[1].value,
      password: event.target.elements[2].value,
    }
    const updatedEntryEncrypted = cryptography.encryptUpdatedEntry(
      updatedEntryPlain,
      props.encryptionKey
    )
    await axios.post(`${serverUrl}/update-entry`, updatedEntryEncrypted)
    props.handleClose()
    const newDataEncrypted = await axios.get(`${serverUrl}/user`)
    const newDataPlain = cryptography.decryptVault(
      newDataEncrypted.data.vault,
      props.encryptionKey
    )
    props.setVault(newDataPlain)
  }

  let onSubmit
  if (props.function === 'new') {
    onSubmit = saveNewEntry
  } else if (props.function === 'update') {
    onSubmit = saveUpdatedEntry
  }

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
        <Form onSubmit={onSubmit}>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Control
              type='text'
              placeholder='label'
              defaultValue={props.selectedData.label || null}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Control
              type='text'
              placeholder='username'
              defaultValue={props.selectedData.username || null}
            />
          </Form.Group>
          <Row>
            <Col xs={10}>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Control
                  value={passwordValue || props.selectedData.password || null}
                  type={passwordDisplayType}
                  placeholder={'password'}
                  onChange={event => {
                    setPasswordValue(event.target.value)
                  }}
                />
              </Form.Group>
            </Col>
            <Col xs={2}>
              <Button
                size='sm'
                className='mt-1'
                onClick={() => {
                  setPasswordValue(passwordGenerator(24))
                }}
              >
                Random
              </Button>
            </Col>
          </Row>

          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Check
              type='checkbox'
              label='Show Password'
              onChange={() => {
                if (passwordDisplayType === 'password') {
                  setPasswordDisplayType('text')
                } else {
                  setPasswordDisplayType('password')
                }
              }}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Save
          </Button>
        </Form>
        <br />
        <AlertMessage alert={alert} />
      </Modal.Body>
    </Modal>
  )
}

export default EntryModal
