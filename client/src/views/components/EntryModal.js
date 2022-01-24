import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import config from '../../config'
import cryptography from '../../services/cryptography'
import AlertMessage from './AlertMessage'
import passwordGenerator from '../../services/pw-tool'

const EntryModal = props => {
  const { serverUrl, axios } = config

  const [alert, setAlert] = useState(null)
  const [passwordDisplayType, setPasswordDisplayType] = useState('password')
  const [passwordValue, setPasswordValue] = useState('')

  const saveEntry = async event => {
    event.preventDefault()
    if (event.target.elements[0].value === '') {
      setAlert(4)
      return
    }
    setAlert(null)
    const entryPlain = {
      label: event.target.elements[0].value,
      username: event.target.elements[1].value,
      password: event.target.elements[2].value,
    }
    if (props.id) {
      entryPlain.id = props.id
    }
    const entryEncrypted = cryptography.encryptEntry(
      entryPlain,
      props.encryptionKey
    )
    if (props.function === 'new') {
      await axios.post(`${serverUrl}/entry`, entryEncrypted)
    } else if (props.function === 'update') {
      await axios.put(`${serverUrl}/entry`, entryEncrypted)
    }
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
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={saveEntry}>
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
                  setPasswordValue(passwordGenerator())
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
