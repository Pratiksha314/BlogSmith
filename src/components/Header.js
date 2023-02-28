import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEllipsisV } from 'react-icons/fa'
import { LoggedInContext, RoleValueContext } from '../App'
import logo from '../images/home/2.png'

function Header() {

    const {state, dispatch} = useContext(LoggedInContext);
    const {roleValue, dispatchValue} = useContext(RoleValueContext);

    const navigate = useNavigate()

    const logOut = () => {
        dispatchValue({
            value: 2
        })
        dispatch({
            type: 'LOGGED_IN', payload: false
        })
        navigate('/')
    }

    return (
        <div id='header'>
            <img src={logo} alt='logo-pic'/>
            <div className='hover-div'>
                <FaEllipsisV className='menu-icon'/>
                <div className='nav-bar'>
                    <ul>
                        <li><Link to='/home'> Home </Link></li>
                        <li><Link to='/about'> About Us  </Link></li>
                        <li><Link to='/contact'> Contact Us  </Link></li>
                        {(roleValue === 1) ? <li><Link to='/admin'>Admin</Link></li> : null}
                        {(roleValue === 0) ? <li><Link to='/profile'>Profile</Link></li> : null}
                        {state ?  <li><button onClick={logOut}>Logout</button></li> : <li><Link to='/login'> Login  </Link></li>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header

