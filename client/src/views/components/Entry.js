const Entry = props => {
  const expand = () => {}
  return (
    <li key={props.key}>
      {props.label}
      <button onClick={expand}>view</button>
    </li>
  )
}

export default Entry
