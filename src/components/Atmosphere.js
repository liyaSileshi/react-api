import React from 'react'

function Atmosphere(props) {
  return (
    <div>
      <p>Pressure: {props.pressure}</p>
      <p>Humidity: {props.humidity}</p>
    </div>
  )
}

export default Atmosphere;