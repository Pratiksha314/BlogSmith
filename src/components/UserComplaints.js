import React, { useState } from 'react'
import FileComplaint from './FileComplaint'
import SeeComplaints from './SeeComplaints'

function UserComplaints() {

  const [seeFileComplaint, setSeeFileComplaint] = useState(true)
  const [watchComplaints, setWatchComplaints] = useState(false)

  const openFileComplaint = ()=> {
    setWatchComplaints(false)
    setSeeFileComplaint(true)
  }

  const openSeeComplaints = ()=> {
    setSeeFileComplaint(false)
    setWatchComplaints(true)
  }

  return (
    <div id='user-complaint'>
      <div id='user-complaint-buttons'>
        <button onClick={openFileComplaint}>File Complaint</button>
        <button onClick={openSeeComplaints}>See Complaints</button>
      </div>

      <div id= 'complaint-choice-content'>
        { seeFileComplaint ? <FileComplaint/> : null}
        { watchComplaints ? <SeeComplaints/> : null}
      </div>

    </div>
  )
}

export default UserComplaints