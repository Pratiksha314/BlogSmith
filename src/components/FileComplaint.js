import React, { useContext, useState } from 'react'
import { UserNameContext } from '../App';
import axios from 'axios';
import PopUp from './PopUp';

function FileComplaint() {

    const { username } = useContext(UserNameContext)
    const [content, setContent] = useState('')
    const [popUp, setPopUp] = useState(false)

    const changePopup = ()=>{
        setPopUp(!popUp)
    }

    const submitComplaint = () => {
        axios.post('http://localhost:7000/api/addComplaint', { username, content })
            .then((res) => {
                console.log(res)
                changePopup()
            }, (Err) => { console.log(Err) })
    }

    return (

        <div id='file-complaint'>
            <h2> File Your Complaint </h2>
            {popUp ? <PopUp titleContent='Complaint has been added'/> : null}
            <textarea placeholder='Write your concerns' onChange={(e) => setContent(e.target.value)} /><br />
            <button onClick={submitComplaint}>Submit</button>
        </div>
    )
}

export default FileComplaint