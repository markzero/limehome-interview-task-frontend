import React, {useState} from 'react'

const ListItem = ({name, address, isBooked, onBook}) => {
  const [checked, setChecked] = useState(false)
  return (
    <li onClick={() => setChecked(!checked)}>
      <span>{name}, {address}</span>
      {checked && <span>
        <button onClick={onBook}>Book</button>
        <button onClick={() => setChecked(false)}>Cancel</button>
      </span>}
      {isBooked && <small>✔ booked</small>}
    </li>
  )
}

export default ListItem