import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Complaints() {

  const [complaintList, setComplaintList] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:7000/api/getAllComplaints').then(
      (res)=>{
        setComplaintList(res.data.info)
        console.log(res.data.info)
      },(err)=>{console.log(err)}
    )
  },[ ])

  return (
    <div id = 'complaint'>
      <h1>Complaints</h1>
      {
        complaintList.map((i) => 
          <div id = 'complaint-tile' key={i._id}>
          <h2>{i.username}</h2>
          {
            i.message.map((subitem, index) => 
            <h3>{subitem.content}</h3>
            )
          }
        </div>
        )
      }
    </div>
  )
}

export default Complaints