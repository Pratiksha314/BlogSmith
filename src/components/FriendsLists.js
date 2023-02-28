import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { UserNameContext } from '../App';
import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from 'react-router';

function FriendsLists() {

  const [friendsList, setFriendsList] = useState([])
  const [isFriendDataBool, setIsFriendDataBool] = useState(false)
  const [friendData, setFriendData] = useState([])
  
  const user = useContext(UserNameContext)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:7000/api/getFriendList/${user.username}`)
      .then((res) => {
        if (res.data.msg === 'friend list is there') {
          setFriendsList(res.data.info)
          setIsFriendDataBool(true)
        }
        else {
          setIsFriendDataBool(false)
        }
      }, (err) => { console.log(err) })
  }, [])

  useEffect(() => {
    if (friendsList.length > 0) {
      friendsList.forEach(username => {
        axios.post('http://localhost:7000/api/getUserInfo', { username })
          .then((resp) => {
            // use this below way when you are taking data via loop
            setFriendData((oldValue) => [...oldValue, resp.data.user])
          })
      })
    }
  }, [isFriendDataBool]) 

  const removeFriend = (username) => {
    axios.patch(`http://localhost:7000/api/removeFromFriend/${user.username}`, { username })
      .then((res) => {
        console.log(res)
        setFriendsList(friendsList.filter((sId) => sId !== username))
        setFriendData(friendData.filter((x)=> x.username !== username))
      }, err => console.log(err)
      )
  }

  const goToProfile = (username) => {
    navigate('/seeOthersProfile', { state: { userNameValue: username } });
  }

  return (
    <div id='friend-list'>
      {
        isFriendDataBool ?

          friendData.map(x =>
            <div id = 'whole-list' key={x._id}> 
              <div id='friend-tile' onClick={() => { goToProfile(x.username) }}>
                <img src={x.profilePhoto} alt='friend-profil-pic' />
                <h2>{x.profileName}</h2>
              </div>
              <button onClick={() => { removeFriend(x.username) }}>Remove</button>
            </div>
          )
          : 'Empty'
      }
    </div>
  )
}

export default FriendsLists