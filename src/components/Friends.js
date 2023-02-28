import React, { useState } from 'react'
import { FaSearch, FaUserFriends, FaRegBell } from "react-icons/fa";
import ProfileTile from './ProfileTile';
import FriendsLists from './FriendsLists';
import NotificationBell from './NotificationBell';

function Friends() {

  const [findProfile, setProfile] = useState(false)
  const [friend, setFriend] = useState(true)
  const [notification, setNotification] = useState(false)
  const [findUserProfile, setFindUserProfile] = useState('')

  const seeProfile = ()=> {
    setFriend(false) 
    setNotification(false)
    setProfile(true)
  }

  const seeFriend = ()=> {
    setProfile(false)
    setNotification(false)
    setFriend(true)
  }

  const seeNotifications = ()=>{
    setProfile(false)
    setFriend(false)
    setNotification(true)
  }
 
  return (
    <div id='friends'>
      <div id='choice'>
        <input type='text' placeholder="Find someone's profile" onChange={(e)=>setFindUserProfile(e.target.value)}/>
        <FaSearch className='find-icon' onClick={seeProfile}/>
        <abbr title='Friends List'><FaUserFriends className = { friend ? 'after-clicked-fr-icon' : 'fr-icon'} onClick={seeFriend}/></abbr>
        <abbr title='Notifications'> <FaRegBell className= { notification ? 'after-clicked-fr-icon' : 'fr-icon'} onClick={seeNotifications}/></abbr>
      </div>

      {findProfile ? <div id='tile-profile'><ProfileTile name={findUserProfile}/> </div> :  null}
      {friend ? <FriendsLists/> : null}
      {notification ? <NotificationBell/> : null}
    </div>
  )
}

export default Friends