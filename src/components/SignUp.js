import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [profileName, setProfileName] = useState('')
    const [otpValue, setOtpValue] = useState('')
    // to show otp modal
    const [showModal, setModal] = useState(false)
    const [enteredOtp, setEnteredOtp] = useState('')
    // otp has been sent or not
    const [otpStatus, setOtpStatus] = useState(true)

    const navigate = useNavigate()

    // to send otp for email address verification
    const submit = () => {
        setOtpStatus(true)
        axios.post('http://localhost:7000/api/otp', { username })
            .then((res) => {
                setOtpValue(res.data.otpSend)
                // console.log(res.data.otpSend)
                if (res.data.success === true) { setModal(true); }
            })
            .catch((err) => {
                setOtpStatus(err.response.data.success)
                console.log("errors: " + err.response.data.success)
            })
    }

    const doneSignup = () => {
        if (enteredOtp === otpValue.toString()) {
            setModal(false)
            axios.post("http://localhost:7000/api/signup", { username, profileName, password })
                .then((res) => {
                    setUserName(username)
                    setProfileName(profileName)
                    setPassword(password)
                    alert('Account has been made successfully!!')
                    axios.post('http://localhost:7000/api/thanks', { username, profileName })
                        .then((res) => { console.log(res) })
                    navigate('/login')
                }, (err) => {
                    setOtpStatus(err.response.data.success)
                    console.log(err.response.data.success)
                })
        }
    }

    return (
        <div id='account-wallpaper'>
            <div id='account'>
                {
                    showModal === true ?
                        <div id='otp'>
                            <h2>Otp has been sent to your entered email address.</h2>
                            <input type='text' placeholder='Enter the OTP' onChange={(e) => setEnteredOtp(e.target.value)}></input><br />
                            <button onClick={doneSignup}>Done</button>
                        </div> : null
                }
                <h1>Signup</h1>
                <input type='text' placeholder='Email ' onChange={(e) => setUserName(e.target.value)}></input>
                <input type='text' placeholder='Profile Name' onChange={(e) => setProfileName(e.target.value)}></input>
                <input type='text' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input><br />
                {otpStatus ? null : <p>User already exists</p>}
                <button onClick={submit}>Submit</button><br />
                <div id='signup-link'>
                    <h3>Already have an account? </h3>
                    <button><Link to='/login'>Login</Link></button>
                </div>
            </div>
        </div>
    )
}

export default SignUp