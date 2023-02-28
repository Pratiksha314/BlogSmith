import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserNameContext } from '../App'
import { FaAngleRight } from 'react-icons/fa'

function ChatSection(props) {
  const username = props.chatPerson
  console.log('naam : ', username)

  const nameUser = useContext(UserNameContext)

  const [conversations, setConversations] = useState([])
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    axios.post(`http://localhost:7000/api/getChatMsg/${nameUser.username}`, { username }).then((res) => {
      console.log(res)
      if (res.data.msg === 'conversations are there') {
        setConversations(res.data.info.conversation)
      }
    }, (err) => {
      console.log(err)
    })
  }, [count])

  const sendMessage = () => {
    axios.post(`http://localhost:7000/api/addChat/${nameUser.username}`, { username, message })
      .then((res) => {
        console.log(res)
        setMessage("")
        if (res.data.msg === 'msg has been addded' || res.data.msg === 'chat room created and msg added') {
          setCount(ov => ov + 1)
        }
      }, err => console.log(err)
      );
  }

  return (
    <div id='chat' >
      {
        conversations.map(i =>
          i.name === username ?
            <div id='left-side' key={i._id}>
              <div id='set-div-left'>
                <h3>{i.message}</h3>
              </div>
            </div>
            :
            <div id='right-side' key={i._id}>
              <div id='set-div-right'>
                <h3>{i.message}</h3>
              </div>
            </div>
        )
      }
      <div id='send-msg'>
        <input type='text' value={message} placeholder='Enter your message' onChange={(e) => setMessage(e.target.value)} />
        <FaAngleRight className='send-msg-button' onClick={sendMessage} />
      </div>
    </div>
  )
}

export default ChatSection