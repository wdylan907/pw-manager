import { useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import EntryModal from './components/EntryModal'
import ConfirmationAlert from './components/ConfirmationAlert'

const Dashboard = props => {
  const encryptionKey = props.encryptionKey
  const { axios, setView, serverUrl } = props.config

  const [vault, setVault] = useState([])
  const [showCreate, setShowCreate] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [updateId, setUpdateId] = useState('')
  const [selectedData, setSelectedData] = useState({})
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false)
  const [passwordDisplayType, setPasswordDisplayType] = useState('password')
  const [boxesChecked, setBoxesChecked] = useState(false)

  const handleCloseCreate = () => setShowCreate(false)
  const handleShowCreate = () => {
    setSelectedData({})
    setShowCreate(true)
  }

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

  const logout = async () => {
    await axios.post(`${serverUrl}/logout`)
    setView('login')
  }

  useEffect(() => {
    async function getVault() {
      const vaultEncrypted = await axios.get(`${serverUrl}/user`)
      if (vaultEncrypted) {
        const vaultPlain = vaultEncrypted.data.vault.map(entry => {
          return {
            _id: entry._id,
            label: CryptoJS.AES.decrypt(
              entry.label,
              props.encryptionKey
            ).toString(CryptoJS.enc.Utf8),
            username: CryptoJS.AES.decrypt(
              entry.username,
              props.encryptionKey
            ).toString(CryptoJS.enc.Utf8),
            password: CryptoJS.AES.decrypt(
              entry.password,
              props.encryptionKey
            ).toString(CryptoJS.enc.Utf8),
          }
        })
        setVault(vaultPlain)
      }
    }
    getVault()
  }, [axios, serverUrl, props.encryptionKey])

  if (vault) {
    return (
      <div>
        <Row>
          <Container className='pt-5 pb-2 col-6 align-self-center'>
            <br />
            <Button size='sm' onClick={handleShowCreate}>
              New Entry
            </Button>
            <Button size='sm' onClick={logout} className='float-end'>
              Log Out
            </Button>
            <EntryModal
              show={showCreate}
              handleClose={handleCloseCreate}
              vault={vault}
              setVault={setVault}
              encryptionKey={encryptionKey}
              title={'New Entry'}
              function={'new'}
              selectedData={selectedData}
            />
          </Container>
        </Row>
        <Row className='pt-4 pb-3'>
          <Col sm={3} xs={0}></Col>
          <Col sm={6} xs={12}>
            <Container
              className='pt-3 pb-3'
              style={{ border: '5px solid #cecece' }}
            >
              {vault.length === 0 && (
                <p>
                  Nothing here yet! Use the button on the upper left to add
                  something.
                </p>
              )}
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
                          <Form.Group
                            className='mb-3'
                            controlId='formBasicPassword'
                          >
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
                                    navigator.clipboard.writeText(
                                      entry.password
                                    )
                                  }}
                                >
                                  copy
                                </Button>
                              </Col>
                            </Row>
                          </Form.Group>
                        )}
                        <Form.Group
                          className='mb-3'
                          controlId='formBasicCheckbox'
                        >
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

                        <Button
                          size='sm'
                          entryid={entry._id}
                          onClick={handleShowUpdate}
                        >
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
            </Container>
            <br />
            <br />
            {props.isDemo && (
              <p>
                Note: demo user data is reset on login, so it will not persist
                between sessions.
              </p>
            )}
          </Col>
        </Row>
      </div>
    )
  } else return null
}

export default Dashboard
