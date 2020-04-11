import React from 'react'

function Description(props) {
  return (
    <div>
      <p>Title: {props.title}</p>
      <p>Description: {props.desc}</p>
    </div>
  )
}

export default Description;