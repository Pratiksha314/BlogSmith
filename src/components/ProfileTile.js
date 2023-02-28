import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'

function ProfileTile(props) {

  const [profilePhoto, setProfilePhoto] = useState('')
  const [profileName, setProfileName] = useState('')
  const [username, setUsername] = useState(props.name)
  const navigate = useNavigate()

  useEffect(()=>{
    axios.post('http://localhost:7000/api/getUserInfo', {username})
    .then((res)=>{
      console.log(res.data.user)
      setProfilePhoto(res.data.user.profilePhoto)
      setUsername(res.data.user.username)
      setProfileName(res.data.user.profileName)
    }, (err)=> {console.log(err);})
  })

  const goToProfile = () => {
    navigate('/seeOthersProfile',{state:{userNameValue: username}});
  }

  return (
    <div id = 'profile-tile-section'>
      <div id = 'profile-tile' onClick={goToProfile}>
        <img src={profilePhoto} alt='profile-pic'/>
        <h1>{profileName}</h1>
        <h2>{username}</h2>
      </div>
    </div>
  )
}

export default ProfileTile