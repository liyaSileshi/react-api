import React from 'react'

function Temperature(props) {
  return (
    <div>
      <p>Temp: {(props.temp * (9/5) - 459.67).toFixed(0)} F</p>
      <p>Min Temp: {(props.min * (9/5) - 459.67).toFixed(0)} F</p>
      <p>Max temp: {(props.max * (9/5) - 459.67).toFixed(0)} F</p>
    </div>
  )
}

export default Temperature;