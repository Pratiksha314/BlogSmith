import React from 'react'

function Photo(props) {
  return (
    <div id = 'photo'>
        <img src={props.photo} alt='content'/>
        <h1>{props.title}</h1>
    </div>
  )
}

export default Photo