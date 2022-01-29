import { useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import EntryModal from './components/EntryModal'
import Entries from './components/Entries'
import Filter from './components/Filter'

const Dashboard = props => {
  const encryptionKey = props.encryptionKey
  const { axios, setView, serverUrl } = props.config

  const [vault, setVault] = useState([])
  const [showCreate, setShowCreate] = useState(false)
  const [selectedData, setSelectedData] = useState({})
  const [filter, setFilter] = useState('')

  const handleCloseCreate = () => setShowCreate(false)

  const handleShowCreate = () => {
    setSelectedData({})
    setShowCreate(true)
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

  const filteredVault =
    filter === ''
      ? vault
      : vault.filter(entry => {
          return entry.label.toLowerCase().startsWith(filter)
        })

  return (
    <div>
      <Row>
        <Container className='pt-5 pb-2 col-6 align-self-center'>
          <br />
          <Row>
            <Col sm={3}>
              <Button size='sm' onClick={handleShowCreate}>
                New Entry
              </Button>
            </Col>
            <Col sm={6}>
              <Filter filter={filter} setFilter={setFilter} />
            </Col>
            <Col sm={3}>
              <Button size='sm' onClick={logout} className='float-end'>
                Log Out
              </Button>
            </Col>

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
          </Row>
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
            <Entries
              vault={vault}
              setVault={setVault}
              filteredVault={filteredVault}
              encryptionKey={encryptionKey}
              axios={axios}
              serverUrl={serverUrl}
              selectedData={selectedData}
              setSelectedData={setSelectedData}
            />
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
}

export default Dashboard
