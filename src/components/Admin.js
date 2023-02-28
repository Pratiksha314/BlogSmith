import React, { useState, useContext } from 'react'
import { RoleValueContext } from '../App'
import AllUsers from './AllUsers';
import Complaints from './Complaints';
import ProfileTile from './ProfileTile';
import { FaSearch } from "react-icons/fa";

function Admin() {

  const { roleValue } = useContext(RoleValueContext);
  const [allUsers, setAllUsers] = useState(true)
  const [complaints, setComplaints] = useState(false)
  const [findProfile, setProfile] = useState(false)

  const [findUserProfile, setFindUserProfile] = useState('')

  const allUser = () => {
    setComplaints(false)
    setProfile(false)
    setAllUsers(true)
  }

  const complaint = () => {
    setAllUsers(false)
    setProfile(false)
    setComplaints(true)
  }

  const profile = () => {
    setProfile(false)
    setAllUsers(false)
    setComplaints(false)
    setProfile(true)
  }

  return (
    <div id='admin-wallpaper'>
      <div id='admin'>
        {
          roleValue === 1 ?
            <div>

              <div id='setting-admin'>
                <button id = { allUsers ? 'after-click-admin' : 'before-click-admin'} onClick={allUser}>All Users</button>
                <button id = { complaints ? 'after-click-admin' : 'before-click-admin'} onClick={complaint}>Complaints</button>
                <div>
                  <input id='find' type='text' placeholder="Find someone's profile" onChange={(e) => setFindUserProfile(e.target.value)} />
                  <FaSearch className='search-icon' onClick={profile} />
                </div>
              </div>

              {allUsers ? <AllUsers /> : null}
              {complaints ? <Complaints /> : null}
              {findProfile ? <ProfileTile name={findUserProfile} /> : null}

            </div> : ''}
      </div>
    </div>
  )
}

export default Admin