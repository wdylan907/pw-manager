import { useState, useEffect } from 'react'
import Entry from './components/Entry'

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Modal from 'react-bootstrap/Modal'
import NewEntryModal from './components/NewEntryModal'

const Dashboard = props => {
  const { serverUrl, axios } = props.config
  const [userData, setUserData] = useState('')
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    async function getData() {
      const obj = await axios.get(`${serverUrl}/user`)
      setUserData(obj.data)
      console.log(obj.data)
    }
    getData()
  }, [axios, serverUrl])

  if (userData) {
    return (
      <div>
        <Row>
          <Container className='pt-5 pb-2 col-6 align-self-center'>
            <h1>Dashboard</h1>
            <Button onClick={props.onClick}>Log out</Button>
            <Button onClick={handleShow}>new entry</Button>
            <NewEntryModal show={show} handleClose={handleClose} />
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
                {userData.vault.map(entry => {
                  return (
                    <Accordion.Item key={entry.id} eventKey={entry.id}>
                      <Accordion.Header>{entry.label}</Accordion.Header>
                      <Accordion.Body>
                        <p>{entry.username}</p>
                        <p>{entry.password}</p>
                        <Button>delete</Button>
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
