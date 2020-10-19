import React from 'react'

const Button = ({className, eventHandler, text}) => {
    return <button className={className} onClick={eventHandler}> {text} </button>
}

export default Button