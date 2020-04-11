import React from 'react'

function Temperature(props) {
    return (
        <div>
            <p>Temp: {props.temp}</p>
            <p>Min Temp: {props.min}</p>
            <p>Max temp: {props.max}</p>
        </div>
    )
}

export default Temperature;