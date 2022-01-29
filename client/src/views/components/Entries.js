import 'bootstrap/dist/css/bootstrap.min.css'

import { useState } from 'react'

import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import ConfirmationAlert from './ConfirmationAlert'
import EntryModal from './EntryModal'

const Entries = props => {
  const [passwordDisplayType, setPasswordDisplayType] = useState('password')
  const [boxesChecked, setBoxesChecked] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [updateId, setUpdateId] = useState('')
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false)

  const {
    vault,
    setVault,
    encryptionKey,
    axios,
    serverUrl,
    selectedData,
    setSelectedData,
  } = props

  const handleCloseUpdate = () => setShowUpdate(false)

  const handleShowUpdate = event => {
    const data = vault.filter(entry => {
      return entry._id === event.target.attributes.entryid.nodeValue
    })
    setSelectedData(data[0])
    setUpdateId(event.target.attributes.entryid.nodeValue)
    setShowUpdate(true)
  }

  const confirm = () => {
    setShowConfirmationAlert(true)
  }

  const deleteEntry = async event => {
    const entryId = event.target.attributes.entryid.nodeValue
    await axios.delete(`${serverUrl}/entry/${entryId}`, {
      data: { id: entryId },
    })
    const newVault = vault.filter(entry => {
      return entry._id !== entryId
    })
    setVault(newVault)
    setShowConfirmationAlert(false)
  }

  return (
    <Accordion>
      {vault.map(entry => {
        return (
          <Accordion.Item key={entry._id} eventKey={entry._id}>
            <Accordion.Header>{entry.label}</Accordion.Header>
            <Accordion.Body>
              {entry.username && (
                <Row>
                  <p className='ml-3'>{entry.username}</p>
                </Row>
              )}
              {entry.password && (
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Row>
                    <Col xs={10}>
                      <Form.Control
                        type={passwordDisplayType}
                        defaultValue={entry.password || null}
                        readOnly
                      />
                    </Col>
                    <Col xs={2}>
                      <Button
                        className='mt-1'
                        size='sm'
                        onClick={() => {
                          navigator.clipboard.writeText(entry.password)
                        }}
                      >
                        copy
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              )}
              <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                <Form.Check
                  checked={boxesChecked}
                  type='checkbox'
                  label='Show Password'
                  onChange={() => {
                    if (!boxesChecked) {
                      setPasswordDisplayType('text')
                      setBoxesChecked(true)
                    } else {
                      setPasswordDisplayType('password')
                      setBoxesChecked(false)
                    }
                  }}
                />
              </Form.Group>

              <Button size='sm' entryid={entry._id} onClick={handleShowUpdate}>
                edit
              </Button>
              <Button
                className='float-end'
                variant='danger'
                size='sm'
                onClick={confirm}
              >
                delete
              </Button>
              <ConfirmationAlert
                entryid={entry._id}
                delete={deleteEntry}
                show={showConfirmationAlert}
                set={setShowConfirmationAlert}
              />

              <EntryModal
                show={showUpdate}
                handleClose={handleCloseUpdate}
                vault={vault}
                setVault={setVault}
                id={updateId}
                encryptionKey={encryptionKey}
                title={'Update Entry'}
                function={'update'}
                selectedData={selectedData}
              />
            </Accordion.Body>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}

export default Entries
