import { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import NewEntryModal from './components/NewEntryModal'
import UpdateEntryModal from './components/UpdateEntryModal'

const Dashboard = props => {
  const { serverUrl, axios } = props.config
  const [vault, setVault] = useState([])
  const [showCreate, setShowCreate] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)

  const handleCloseCreate = () => setShowCreate(false)
  const handleShowCreate = () => setShowCreate(true)

  const handleCloseUpdate = () => setShowUpdate(false)
  const handleShowUpdate = () => setShowUpdate(true)

  const updateEntry = event => {
    console.log(event.target.attributes.entryid.nodeValue)
    const entryId = event.target.attributes.entryid.nodeValue
  }

  const deleteEntry = async event => {
    const entryId = event.target.attributes.entryid.nodeValue
    console.log(entryId)
    console.log(typeof entryId)
    const res = await axios.delete(`${serverUrl}/delete-entry`, {
      data: { id: entryId },
    })
    const newVault = vault.filter(entry => {
      return entry._id !== entryId
    })
    setVault(newVault)
  }

  useEffect(() => {
    async function getVault() {
      const obj = await axios.get(`${serverUrl}/user`)
      setVault(obj.data.vault)
    }
    getVault()
  }, [axios, serverUrl])

  if (vault) {
    return (
      <div>
        <Row>
          <Container className='pt-5 pb-2 col-6 align-self-center'>
            <h1>Dashboard</h1>
            <Button onClick={props.onClick}>Log out</Button>
            <Button onClick={handleShowCreate}>new entry</Button>
            <NewEntryModal
              show={showCreate}
              handleClose={handleCloseCreate}
              vault={vault}
              setVault={setVault}
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
                        <Button entryid={entry._id} onClick={deleteEntry}>
                          delete
                        </Button>
                        <Button entryid={entry._id} onClick={handleShowUpdate}>
                          edit
                        </Button>
                        <UpdateEntryModal
                          show={showUpdate}
                          handleClose={handleCloseUpdate}
                          vault={vault}
                          setVault={setVault}
                          id={entry._id}
                          label={entry.label}
                          username={entry.username}
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
