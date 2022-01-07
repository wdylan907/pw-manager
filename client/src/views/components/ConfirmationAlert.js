import 'bootstrap/dist/css/bootstrap.min.css'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/esm/Button'

const ConfirmationAlert = props => {
  if (props.show === true) {
    return (
      <Alert variant='danger' className='mt-3'>
        <p>Delete entry?</p>
        <Button
          onClick={() => {
            props.set(false)
          }}
        >
          Cancel
        </Button>
        <Button
          variant='danger'
          entryid={props.entryid}
          onClick={props.delete}
          className='float-end'
        >
          Delete
        </Button>
      </Alert>
    )
  } else return null
}

export default ConfirmationAlert
