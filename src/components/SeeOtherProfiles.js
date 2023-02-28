import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { RoleValueContext, UserNameContext } from '../App';
import axios from 'axios';
import SelfBlogs from './SelfBlogs';
import ChatSection from './ChatSection';

function SeeOtherProfiles() {
  const location = useLocation()
  const username = location.state?.userNameValue
  const { roleValue } = useContext(RoleValueContext)

  const userOne = useContext(UserNameContext) // here we have taken different name 'userOne' because we already have username, but we want our global username value also
  // so that's why, and to access it we will write userOne.username

  const [profileDetails, setProfileDetails] = useState({
    id: '',
    accountType: '',
    backgroundProfilePhoto: '',
    profileName: '',
    profilePhoto: ''
  })

  const [blogs, setBlogs] = useState([])
  const [friendsList, setFriendsList] = useState([])
  const [requestSentNames, setRequestSentName] = useState([])

  const [chat, setChat] = useState(true)
  const [seeBlogs, setSeeBlog] = useState(false)

  const [count, setCount] = useState(0)

  const openChat = () => {
    setSeeBlog(false)
    setChat(true)
  }

  const openBlog = () => {
    setChat(false)
    setSeeBlog(true)
  }

  useEffect(() => {
    if (roleValue === 1 || roleValue === 0) {
      axios.post('http://localhost:7000/api/getUserInfo', { username })
        .then((res) => {
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
  }, [username, blogs.length, roleValue])


  // to check that whether we are already friend with user whose profile we are checking
  useEffect(() => {
    axios.get(`http://localhost:7000/api/getFriendList/${userOne.username}`)
      .then((res) => {
        if (res.data.msg === 'friend list is there') {
          setFriendsList(res.data.info)
        }
      }, (err) => { console.log(err) })
  }, [])

  // to check whether we have send the request already or not
  useEffect(() => {
    axios.get(`http://localhost:7000/api/getRequestsSent/${userOne.username}`)
      .then((res) => {
        console.log('bnhj:', res)
        if (res.data.msg !== "There is no data available.") {
          setRequestSentName(res.data.info)
        }
      }, (err) => {
        console.log(err)
      }
      )
  }, [count])

  const sendRequest = () => {
    axios.post(`http://localhost:7000/api/sendFriendRequest/${userOne.username}`, { username })
      .then((res) => {
        console.log(res)
        setCount(ov => ov + 1)
        // setFriendReqSent(true)
      },
        err => console.log(err)
      )
    console.log('as', requestSentNames)
  }

  const revertRequest = () => {
    axios.patch(`http://localhost:7000/api/deleteFriendRequest/${userOne.username}`, { username })
      .then((res) => {
        console.log(res)
        setCount(ov => ov + 1)
      }, (err) => {
        console.log(err)
      }
      )
  }

  return (
    <div>
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

            <div id='selected-content-page'>
              {
                (roleValue === 0) ?
                  (username !== userOne.username) ?
                    (profileDetails.accountType === 'public' && friendsList.includes(username) === false) ?


                      (requestSentNames.some(i => i.to === username)) ? // if friend req has been sent then first button should not be visible
                        <button id='request-follow' onClick={revertRequest}> Revert the Request - </button> :
                        <button id='request-follow' onClick={sendRequest}> Request to Follow + </button>
                      : null : null : null
              }

              {
                (friendsList.includes(username) === true || profileDetails.accountType === 'public') ?
                  <div>
                    <div id='options-other'>
                      <button id={seeBlogs ? 'after-chose' : 'before-chose'} onClick={openBlog}> Blogs </button>
                      {(username !== userOne.username) ? <button id={chat ? 'after-chose' : 'before-chose'} onClick={openChat}>Chat</button> : null}
                    </div>
                    {seeBlogs ? <SelfBlogs allBlogs={blogs} valueOfUserName={username} /> : null}
                    {(username !== userOne.username) ? chat ? <ChatSection chatPerson={username} /> : null : null}
                  </div>
                  : <div>
                    <h3 id='account-private'>Account is private</h3>
                    {
                      (roleValue === 0) ? // user is not be an admin
                        (username !== userOne.username) ?
                          (requestSentNames.some(i => i.to === username)) ? // if friend req has been sent then first button should not be visible
                            <button id='request-follow' onClick={revertRequest}> Revert the Request - </button> :
                            <button id='request-follow' onClick={sendRequest}> Request to Follow + </button>
                          : null : null
                    }
                  </div>
              }
            </div>
          </div> : null
      }

    </div>

  )
}

export default SeeOtherProfiles