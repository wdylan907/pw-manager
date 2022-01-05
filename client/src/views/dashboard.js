import { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import NewEntryModal from './components/NewEntryModal'

const Dashboard = props => {
  const { serverUrl, axios } = props.config
  const [vault, setVault] = useState([])
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const updateEntry = event => {
    console.log(event.target.attributes.entryid.nodeValue)
    const entryId = event.target.attributes.entryid.nodeValue
  }
  const deleteEntry = () => {}

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
            <Button onClick={handleShow}>new entry</Button>
            <NewEntryModal
              show={show}
              handleClose={handleClose}
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
                    <Accordion.Item key={entry.id} eventKey={entry.id}>
                      <Accordion.Header>{entry.label}</Accordion.Header>
                      <Accordion.Body>
                        <p>{entry.username}</p>
                        <p>{entry.password}</p>
                        <Button>delete</Button>
                        <Button entryid={entry.id} onClick={updateEntry}>
                          edit
                        </Button>
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
