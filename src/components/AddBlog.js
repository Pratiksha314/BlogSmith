import axios from 'axios';
import React, { useState, useContext } from 'react'
import { UserNameContext } from '../App';
import FileBase64 from 'react-file-base64'

function AddBlog(props) {

    const { username } = useContext(UserNameContext)

    const [title, setTitle] = useState('')
    const [description, setDecription] = useState('')
    const [img, setImg] = useState('')

    const addBlog = () => {
        axios.post('http://localhost:7000/api/addBlog', { username, title, description, img }).then((res) => {
            setTitle(title)
            setDecription(description)
            setImg(img)
            if (res !== null) { props.stateChanger(props.countValue + 1) }
            alert('Blog has been added successfully !!')
        }, (err) => { console.log(err) })
    }

    return (
        <div id='addBlog'>
            <h2>Write your blog</h2>
            <div id='addBlog-inputs'>
                <input type='text' placeholder='Enter the title' onChange={(e) => setTitle(e.target.value)} />
                <textarea type='text' placeholder='Add your thoughts' onChange={(e) => setDecription(e.target.value)} />
                <h4>Add Image for your blog</h4>
                <span><FileBase64 multiple={false} onDone={({ base64 }) => setImg(base64)} /></span><br />
                {img !== '' ? <img src={img} alt='blog-pic' /> : null}<br /><br />
                <button onClick={addBlog}>Add</button>
            </div>
        </div>
    )
}

export default AddBlog