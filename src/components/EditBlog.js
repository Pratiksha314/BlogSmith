import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import FileBase64 from 'react-file-base64'
import { useLocation, useNavigate } from 'react-router-dom'
import { RoleValueContext } from '../App';

function EditBlog() {
    const location = useLocation();   // to access the data that we have received from the another component
    const blogMainId = location.state?.blogId

    const { roleValue } = useContext(RoleValueContext)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [img, setImg] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (roleValue === 0) {
            axios.get(`http://localhost:7000/api/getBlog/${blogMainId}`)
                .then((res) => {
                    setTitle(res.data.blog.title)
                    setDescription(res.data.blog.description)
                    setImg(res.data.blog.img)
                })
        }
    }, [blogMainId])

    const editBlog = () => {
        axios.patch(`http://localhost:7000/api/editBlog/${blogMainId}`, { title, description, img })
            .then((res) => {
                setTitle(title)
                setDescription(description)
                setImg(img)
                console.log(res)
                alert("Blog has been edited!!")
                navigate('/profile')
            })
    }

    return (
        <div>
            {
                roleValue === 0 ?
                    <div id='edit-blog'>
                        <h2> Edit Your Blog </h2>
                        <div id='add-blog-details'>
                            <div id='div-photo'>
                                <h3>Existing photo</h3>
                                <img id='existing-photo' src={img} alt='blog-pic' />
                            </div>
                            <input type='text' defaultValue={title} placeholder='Edit title of your blog' onChange={(e) => setTitle(e.target.value)} /> <br />
                            <textarea type='text' defaultValue={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} /> <br />
                            <span><FileBase64 multiple={false} onDone={({ base64 }) => setImg(base64)} />
                            </span>
                            <div>
                                <button onClick={editBlog}>Edit It</button>
                            </div>
                        </div>
                    </div> : null
            }
        </div>
    )
}

export default EditBlog