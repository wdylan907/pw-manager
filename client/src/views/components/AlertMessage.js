import 'bootstrap/dist/css/bootstrap.min.css'
import Alert from 'react-bootstrap/Alert'

const AlertMessage = props => {
  const alerts = [
    {
      variant: 'success',
      message: 'account created',
    },
    {
      variant: 'danger',
      message: 'username already in use',
    },
    {
      variant: 'danger',
      message: 'passwords do not match',
    },
  ]
  if (props.alert !== null) {
    return (
      <Alert variant={alerts[props.alert].variant}>
        <p>{alerts[props.alert].message}</p>
      </Alert>
    )
  } else return null
}

export default AlertMessage
