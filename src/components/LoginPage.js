import axios from 'axios'
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoggedInContext, RoleValueContext, UserNameContext } from '../App';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

function LoginPage() {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loginStatus, setLoginStatus] = useState(true)

    const [isPwdVisible, setIsPwdVisible] = useState(false)

    const navigate = useNavigate()

    const { dispatch } = useContext(LoggedInContext);
    const { dispatchValue } = useContext(RoleValueContext);
    const { dispatchUser } = useContext(UserNameContext);

    const changePwdVisibility = () => {
        setIsPwdVisible(!isPwdVisible)
    }

    const submitLogin = () => {
        setLoginStatus(true)
        axios.post('http://localhost:7000/api/login', { username, password })
            .then((res) => {
                setUserName(username)
                setPassword(password)
                console.log(res.data.success)
                setLoginStatus(res.data.success)
                if (res.data.success === true) {
                    axios.post('http://localhost:7000/api/getUserInfo', { username }).then(
                        (response) => {
                            console.log(response.data.user.role)
                            dispatch(
                                {
                                    type: "LOGGED_IN", payload: true,
                                }
                            )
                            dispatchValue(
                                {
                                    value: response.data.user.role
                                }
                            )
                            dispatchUser(
                                {
                                    name: "PERSON", nameValue: response.data.user.username
                                }
                            )
                            navigate('/');
                        }
                    ).catch(
                        (err) => {
                            console.log('unable to fetch user info')
                            console.log(err)
                        }
                    )
                    navigate('/home')
                }
            }, (err) => { console.log(err) })
    }

    return (
        <div id='account-wallpaper'>
            <div id='account'>
                <h1>Login</h1>
                <input type='text' placeholder='Email' onChange={(e) => setUserName(e.target.value)} /><br/>
                <input type={isPwdVisible ? 'text' : 'password'} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <span onClick={changePwdVisibility}>
                    {
                        isPwdVisible ? <FaEye className='pwd-icon' /> : <FaEyeSlash className='pwd-icon' />
                    }
                </span><br />
                {loginStatus ? null : <p>Invalid Credentials</p>}
                <button onClick={submitLogin}>Submit</button><br />
                <div id='signup-link'>
                    <h3>Don't have an account? </h3>
                    <button><Link to='/signup'>Sign Up</Link></button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage