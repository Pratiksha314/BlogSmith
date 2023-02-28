import React, { useContext, useEffect, useState } from 'react'
import { UserNameContext } from '../App';
import axios from 'axios';

function SeeComplaints() {
  const { username } = useContext(UserNameContext)

  const [complaintArray, setComplaintArray] = useState([])

  useEffect(() => {
    axios.post('http://localhost:7000/api/getAllComplaintsByUser', { username })
      .then((res) => {
        setComplaintArray(res.data.user.message)
        console.log(res.data.user.message)
      }, (err) => { console.log(err) })
  }, [])

  return (
    <div id='seeOwnComplaints'>
      {
        complaintArray.map(i =>
          <div id='contentOfComplaint' key={i.complaintId}>
            <h3>{i.content}</h3>
            <h4>Complaint id: {i.complaintId}</h4>
          </div>
        )
      }

    </div>
  )
}

export default SeeComplaints