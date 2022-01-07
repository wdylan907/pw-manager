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
    {
      variant: 'danger',
      message: 'invalid username or password',
    },
    {
      variant: 'danger',
      message: 'label is required',
    },
    {
      variant: 'danger',
      message: 'all fields are required',
    },
  ]
  if (typeof props.alert === 'number') {
    return (
      <Alert variant={alerts[props.alert].variant}>
        <p>{alerts[props.alert].message}</p>
      </Alert>
    )
  } else return null
}

export default AlertMessage
