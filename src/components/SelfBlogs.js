import React, { useEffect, useState, useContext } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";
import { UserNameContext } from '../App';
import axios from 'axios'
import { Link } from 'react-router-dom';
import PopUp from './PopUp';

function SelfBlogs(props) {

  const [blogContents, setBlogContents] = useState([])
  const {username} = useContext(UserNameContext)

  useEffect(() => {
    props.allBlogs.map((i) => {
      axios.get(`http://localhost:7000/api/getBlog/${i}`)
      .then((res) => {
        setBlogContents((oldValue) => [...oldValue, res.data.blog])
      }, (err) => {
         console.log(err) 
        })
    })
  },[])

  const deleteBlog = (blogID) => {
    axios.delete(`http://localhost:7000/api/deleteBlog/${username}/${blogID}`)
    .then((res)=>{
      alert('Blog has been deleted')
      setBlogContents(blogContents.filter(blog => blog._id !== blogID))
    }, (err)=>{
      console.log(err)
    })
  }

  return (
    <div id='seeBlogs'>
      {
        blogContents.map((i) =>
          <div id='blog' key={i._id}>
            <img src={i.img} alt='blog' />
            <h1>{i.title}</h1>
            <h3>{i.description} </h3>
            {
              props.valueOfUserName === username ?
              <div id='icons-style'>
              <Link to ='/editBlog' state={{ blogId: i._id }}><abbr title='Edit Blog'><FaEdit className='blog-icon'/></abbr></Link> <abbr title='Delete Blog'><FaTrash className='blog-icon' onClick={()=>deleteBlog(i._id)}/></abbr>
              </div> : null
            }
          </div>
        )
      }

    </div>
  )
}

export default SelfBlogs