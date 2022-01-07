import 'bootstrap/dist/css/bootstrap.min.css'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/esm/Button'

const ConfirmationAlert = props => {
  if (props.show === true) {
    return (
      <Alert>
        <p>some alert</p>
        <Button
          onClick={() => {
            props.set(false)
          }}
        >
          hide
        </Button>
        <Button entryid={props.entryid} onClick={props.delete}>
          delete
        </Button>
      </Alert>
    )
  } else return null
}

export default ConfirmationAlert
