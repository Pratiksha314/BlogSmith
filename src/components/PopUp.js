import React, { useState } from 'react'

function PopUp(props) {

    const [pop, setPop] = useState(true)

    const changeModal = () => {
        setPop(false)
    }

    return (
        pop ?
            <div id='pop-modal'>
                <h2>{props.titleContent}</h2>
                <button onClick={changeModal}>Okay</button>
            </div>
            : null
    )
}

export default PopUp