import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { RoleValueContext } from '../App'

function AllUsers() {

  const { roleValue } = useContext(RoleValueContext);
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (roleValue === 1) {
      axios.get('http://localhost:7000/api/getAllUsersInfo').then(
        (res) => {
          setUsers(res.data.detail)
        }
      ).catch(
        (err) => {
          console.log("Unable to get data : " + err)
        }
      )
    }
  }, [roleValue]);

  return (
    <div id='allUsers'>
      {roleValue === 1 ?
        <table>
          <tbody>
          <tr>
            <th>S.No.</th>
            <th>User ID</th>
            <th>Profile Name</th>
            <th>Admin / User</th>
          </tr>
          {
            users.map(
              (i, index) =>
                <tr key={i._id}>
                  <td>{index + 1}</td>
                  <td>{i.username}</td>
                  <td>{i.profileName}</td>
                  <td>{(i.role === 1) ? 'Admin' : 'User'}</td>
                </tr>)
          }
          </tbody>
        </table> : ''
      }
    </div>
  )
}

export default AllUsers