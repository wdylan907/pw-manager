import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import EntryModal from './components/EntryModal'
import CryptoJS from 'crypto-js'

const Dashboard = props => {
  //console.log('rendering twice?')
  const encryptionKey = props.encryptionKey

  const { axios, setView, serverUrl, alert, setAlert } = props.config
  const [vault, setVault] = useState([])
  const [showCreate, setShowCreate] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [updateId, setUpdateId] = useState('')

  const handleCloseCreate = () => setShowCreate(false)
  const handleShowCreate = () => setShowCreate(true)

  const handleCloseUpdate = () => setShowUpdate(false)

  const handleShowUpdate = event => {
    setUpdateId(event.target.attributes.entryid.nodeValue)
    setShowUpdate(true)
  }

  const deleteEntry = async event => {
    const entryId = event.target.attributes.entryid.nodeValue
    console.log(entryId)
    console.log(typeof entryId)
    await axios.delete(`${serverUrl}/delete-entry`, {
      data: { id: entryId },
    })
    const newVault = vault.filter(entry => {
      return entry._id !== entryId
    })
    setVault(newVault)
  }

  const logout = async () => {
    const res = await axios.post(`${serverUrl}/logout`)
    setAlert(null)
    setView(res.data)
  }

  useEffect(() => {
    async function getVault() {
      const vaultEncrypted = await axios.get(`${serverUrl}/user`)
      console.log(vaultEncrypted.data.vault)
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
  }, [axios, serverUrl])

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
              alert={alert}
              setAlert={setAlert}
              title={'New Entry'}
              function={'new'}
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
              <Accordion>
                {vault.map(entry => {
                  return (
                    <Accordion.Item key={entry._id} eventKey={entry._id}>
                      <Accordion.Header>{entry.label}</Accordion.Header>
                      <Accordion.Body>
                        <p>{entry.username}</p>
                        <p>{entry.password}</p>

                        <Button
                          size='sm'
                          entryid={entry._id}
                          onClick={handleShowUpdate}
                        >
                          edit
                        </Button>
                        <Button
                          entryid={entry._id}
                          onClick={deleteEntry}
                          className='float-end'
                          variant='danger'
                          size='sm'
                        >
                          delete
                        </Button>
                        <EntryModal
                          show={showUpdate}
                          handleClose={handleCloseUpdate}
                          vault={vault}
                          setVault={setVault}
                          id={updateId}
                          encryptionKey={encryptionKey}
                          alert={alert}
                          setAlert={setAlert}
                          title={'Update Entry'}
                          function={'update'}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                  )
                })}
              </Accordion>
            </Container>
          </Col>
        </Row>
      </div>
    )
  } else return null
}

export default Dashboard
