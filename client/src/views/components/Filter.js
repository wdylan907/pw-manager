import 'bootstrap/dist/css/bootstrap.min.css'

import Form from 'react-bootstrap/Form'

const Filter = props => {
  return (
    <Form
      onChange={event => {
        props.setFilter(event.target.value)
      }}
    >
      <Form.Group className='mb-3' controlId='formBasicText'>
        <Form.Control type='text' placeholder='Filter' />
      </Form.Group>
    </Form>
  )
}

export default Filter
