import axios from 'axios'
import React, { useContext, useState } from 'react'
import FileBase64 from 'react-file-base64'
import { UserNameContext } from '../App';

function Settings(props) {
  const [profileNameBool, setProfileNameBool] = useState(true)
  const [profilePhotoBool, setProfilePhotoBool] = useState(false)
  const [bgProfilePhotoBool, setBgProfilePhotoBool] = useState(false)
  const [accountTypeBool, setAccountTypeBool] = useState(false)

  const changePN = () => {
    setBgProfilePhotoBool(false)
    setProfilePhotoBool(false)
    setAccountTypeBool(false)
    setProfileNameBool(true)
  }
  const changePP = () => {
    setBgProfilePhotoBool(false)
    setProfileNameBool(false)
    setAccountTypeBool(false)
    setProfilePhotoBool(true)
  }
  const changeBPP = () => {
    setProfilePhotoBool(false)
    setProfileNameBool(false)
    setAccountTypeBool(false)
    setBgProfilePhotoBool(true)
  }
  const changeAT = () => {
    setProfilePhotoBool(false)
    setProfileNameBool(false)
    setBgProfilePhotoBool(false)
    setAccountTypeBool(true)
  }

  const [profileName, setProfileName] = useState(props.value.profileName)
  const [profilePhoto, setUserProfilePhoto] = useState(props.value.profilePhoto)
  const [backgroundProfilePhoto, setUserBgProfilePhoto] = useState(props.value.backgroundProfilePhoto)
  const [accountType, setAccountType] = useState(props.value.accountType)

  const { username } = useContext(UserNameContext)
  const [userId, setUserID] = useState(props.value.id)

  const profileNameChange = () => {
    axios.patch('http://localhost:7000/api/updateProfileName', { profileName, username })
      .then((res) => {
        setProfileName(profileName)
        if (res.data.msg !== 'Name already Exists') { 
          alert("Profile name has been updated !!")
          props.stateChanger(props.countValue + 1) 
        }
        if(res.data.msg === 'Name already Exists'){alert("Profile Name already exists !!")}
        console.log(res)
      }, (err) => { console.log(err) })
  }

  const profilePhotoChange = () => {
    axios.patch(`http://localhost:7000/api/updateProfilePhoto/${userId}`, {profilePhoto})
      .then((res) => {
        setUserProfilePhoto(profilePhoto)
        if (res != null) { props.stateChanger(props.countValue + 1) }
        alert("Profile Photo has been updated !!")
        console.log(res)
      }, err => console.log(err))
  }

  const bgProfilePhotoChange = () => {
    axios.patch(`http://localhost:7000/api/updateBackgroundProfilePhoto/${userId}`, {backgroundProfilePhoto})
      .then((res) => {
        setUserBgProfilePhoto(backgroundProfilePhoto)
        if (res != null) { props.stateChanger(props.countValue + 1) }
        alert("Background Profile Photo has been updated !!")
        console.log(res)
      }, err => console.log(err))
  }

  const changeAccountT = () =>{
    axios.patch(`http://localhost:7000/api/changeAccountType/${userId}`)
    .then((res)=>{
      setAccountType(accountType)
      if (res != null) { props.stateChanger(props.countValue + 1) }
      console.log(res)
      alert("Account type has been updated !")
    }, (err)=> console.log(err, userId))
  }

  return (
    <div id='settings'>
      <h3>Change Your ...</h3>
      <div id='change-options'>
        <button id= {profileNameBool ?  'after-click' : 'before-click'} onClick={changePN}>Profile Name</button><br />
        <button id= {profilePhotoBool ?  'after-click' : 'before-click'} onClick={changePP}>Profile Photo</button><br />
        <button id= {bgProfilePhotoBool ?  'after-click' : 'before-click'} onClick={changeBPP}>Background Profile Photo</button>
        <button id= {accountTypeBool ?  'after-click' : 'before-click'} onClick={changeAT}>Account Type</button>
      </div>

      {/* to change the profile name*/}

      {
        profileNameBool === true ?
          <div id='change-profile-name'>
            <div className='input-name'>
              <h4>Old Profile Name: </h4> <h3>{props.value.profileName}</h3>
            </div><br />
            <div className='input-name'>
              <h4>New Profile Name: </h4> <input type='text' placeholder='Enter your new profile name here' onChange={(e) => setProfileName(e.target.value)} />
            </div><br />
            <button onClick={profileNameChange}>Change</button>
          </div> : null
      }

      {/* to change the profile photo*/}

      {
        profilePhotoBool === true ?
          <div className='change-photo'>
            <h3>Old Profile Photo: </h3>
            <img src={props.value.profilePhoto} alt='old-profile-pic' /><br />
            <span><FileBase64 multiple={false} onDone={({ base64 }) => setUserProfilePhoto(base64)} /></span><br /><br />
            {profilePhoto !== props.value.profilePhoto ? <img src={profilePhoto} alt='new-pf-pic' /> : null}<br />
            <button onClick={profilePhotoChange}>Change</button>
          </div> : null
      }

      {/* to change the background profile photo*/}

      {

        bgProfilePhotoBool === true ?
          <div className='change-photo'>
            <h3>Old Background Profile Photo: </h3>
            <img src={props.value.backgroundProfilePhoto} alt='old-big-pic' /><br />
            <span><FileBase64 multiple={false} onDone={({ base64 }) => setUserBgProfilePhoto(base64)} /></span><br /><br />
            {backgroundProfilePhoto !== props.value.backgroundProfilePhoto ? <img src={backgroundProfilePhoto} alt='new-bg-pic' />
              : null}<br />
            <button onClick={bgProfilePhotoChange}>Change</button>

          </div> : null
      }

      {/* to change the account type*/}

      {
        accountTypeBool ?
          <div className='change-photo'>
            <h3>Currently your account is {props.value.accountType} </h3>
            <button id='at-button' onClick={changeAccountT}>
              {
                props.value.accountType === 'private' ?
                'Switch it to PUBLIC' : 'Switch it to PRIVATE'
              }
            </button>
          </div> : null
      }

    </div>
  )
}

export default Settings