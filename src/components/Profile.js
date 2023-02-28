import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserNameContext, RoleValueContext } from '../App';
import AddBlog from './AddBlog';
import SelfBlogs from './SelfBlogs';
import Friends from './Friends';
import UserComplaint from './UserComplaints';
import Settings from './Settings';

function Profile() {

  const { username } = useContext(UserNameContext)
  const { roleValue } = useContext(RoleValueContext)

  const [profileDetails, setProfileDetails] = useState({
    id: '',
    accountType: '',
    backgroundProfilePhoto: '',
    profileName: '',
    profilePhoto: ''
  })

  const [blogs, setBlogs] = useState([])
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (roleValue === 1 || roleValue === 0) {
      axios.post('http://localhost:7000/api/getUserInfo', { username })
        .then((res) => {
          console.log('profile: ', counter)
          setProfileDetails({
            id: res.data.user._id,
            accountType: res.data.user.accountType,
            backgroundProfilePhoto: res.data.user.backgroundProfilePhoto,
            profileName: res.data.user.profileName,
            profilePhoto: res.data.user.profilePhoto
          },)
          setBlogs(res.data.user.blogsIds)

        }, err => { console.log(err) })
    }
  }, [counter, username, blogs.length])

  const [seeBlogs, setSeeBlog] = useState(false)
  const [addBlog, setAddBlog] = useState(true)
  const [friends, setFriends] = useState(false)
  const [complaint, setComplaint] = useState(false)
  const [setting, setSetting] = useState(false)

  const watchBlog = () => {
    (seeBlogs === true ?
      setCounter(counter => counter + 0)
      : setCounter(counter => counter + 1))

    setAddBlog(false)
    setFriends(false)
    setComplaint(false)
    setSetting(false)
    setSeeBlog(true)
  }

  const blogAdd = () => {
    setFriends(false)
    setComplaint(false)
    setSetting(false)
    setSeeBlog(false)
    setAddBlog(true)
  }

  const seeFriends = () => {
    setAddBlog(false)
    setComplaint(false)
    setSetting(false)
    setSeeBlog(false)
    setFriends(true)
  }
  const seeComplaints = () => {
    setAddBlog(false)
    setFriends(false)
    setSetting(false)
    setSeeBlog(false)
    setComplaint(true)
  }
  const seeSettings = () => {
    setAddBlog(false)
    setFriends(false)
    setComplaint(false)
    setSeeBlog(false)
    setSetting(true)
  }

  return (
    <div id='profile'>
      {
        (roleValue === 1 || roleValue === 0) ?
          <div>
            <div id='profile-photos'>
              <img id='bg-photo' src={profileDetails.backgroundProfilePhoto} alt='background-profile' />
              <div id='photo-profile'>
                <img src={profileDetails.profilePhoto} alt='profile' />
                <h1>{profileDetails.profileName}</h1>
              </div>
            </div>
            <div id='options'>
              <button id= {seeBlogs ? 'after-clicked-button' : 'initial-button'} onClick={watchBlog}>Blogs</button>
              <button id= {addBlog ? 'after-clicked-button' : 'initial-button'} onClick={blogAdd}>Add Blog</button>
              <button id= {friends ? 'after-clicked-button' : 'initial-button'} onClick={seeFriends}>Friends </button>
              <button id= {complaint ? 'after-clicked-button' : 'initial-button'} onClick={seeComplaints}>Complaint </button>
              <button id= {setting ? 'after-clicked-button' : 'initial-button'} onClick={seeSettings}>Settings</button>
            </div> 
            <div id='selected-content-page'>
              {addBlog ? <AddBlog countValue={counter} stateChanger={setCounter} /> : null}
              {seeBlogs ? <SelfBlogs allBlogs={blogs} valueOfUserName={username} /> : null}
              {friends ? <Friends stateChanger={setCounter} /> : null}
              {complaint ? <UserComplaint /> : null}
              {setting ? <Settings
                value={profileDetails}
                countValue={counter} stateChanger={setCounter} /> : null}
            </div>
          </div> : null
      }
    </div>
  )
}

export default Profile