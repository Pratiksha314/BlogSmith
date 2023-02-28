import React, { useContext, useEffect, useState } from 'react'
import { FaCheckSquare, FaTimesCircle } from "react-icons/fa";
import { UserNameContext } from '../App';
import axios from 'axios';

function NotificationBell() {

  const { username } = useContext(UserNameContext)
  const [getRequestList, setGetRequestList] = useState([])

  useEffect(() => {
    axios.post('http://localhost:7000/api/getOtherPeopleRequests', { username })
      .then((res) => {
        console.log(res)
        if (res.data.msg !== "There is no data available.") {
          setGetRequestList(res.data.info)
        }
      })
  }, [getRequestList.length])

  const acceptRequest = (senderId) => {
    axios.patch(`http://localhost:7000/api/acceptRequestAddFriendInList/${senderId}`, { username })
      .then((res) => {
        console.log(res.data.msg)
        if (res.data.msg === 'friend added to list') {
          rejectRequest(senderId)
        }
      }, (err) => console.log(err)
      )
  }

  const rejectRequest = (senderId) => {
    axios.patch(`http://localhost:7000/api/deleteFriendRequest/${senderId}`, { username })
      .then((res) => {
        console.log(res)
        setGetRequestList(getRequestList.filter(sId => sId.from !== senderId))
      }, (err) => console.log(err)
      )
  }

  return (
    <div id='notification'>
      <h2>Friend Requests</h2>
      <div id='grid-css'>
        {
          getRequestList.map(i =>
            <div id='bell-detail' key={i.from}>
              <h3><span>{i.from}</span></h3>
              <div id='buttons'>
                <button onClick={() => { acceptRequest(i.from) }}>Accept</button>
                <button onClick={() => { rejectRequest(i.from) }}>Deny</button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default NotificationBell