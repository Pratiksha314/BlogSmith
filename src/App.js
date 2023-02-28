import React, { useReducer } from 'react'
import './App.css';
import './styles/home.css';
import './styles/login_signup.css';
import './styles/about_contact.css';
import './styles/photo.css';
import './styles/header_footer.css';
import './styles/allUsers.css';
import './styles/admin.css';
import './styles/profile.css';
import './styles/complaint.css';
import './styles/blogs.css';
import './styles/editBlog.css';
import './styles/userComplaint.css';
import './styles/settings.css';
import './styles/friends.css';
import './styles/notification.css';
import './styles/chat.css';
import './styles/popup.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Home from './components/Home';
import Footer from './components/Footer';
import { initialState, reducer, initialRoleValue, userReducer, initialUsername, useNameReducer } from './reducers/userReducer';
import Admin from './components/Admin';
import Profile from './components/Profile';
import EditBlog from './components/EditBlog';
import SeeComplaints from './components/SeeComplaints';
import SeeOtherProfiles from './components/SeeOtherProfiles';
import ChatSection from './components/ChatSection';

export const LoggedInContext = React.createContext()
export const RoleValueContext = React.createContext()
export const UserNameContext = React.createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [roleValue, dispatchValue] = useReducer(userReducer, initialRoleValue)
  const [username, dispatchUser] = useReducer(useNameReducer, initialUsername)

  return (
    <LoggedInContext.Provider value={{ state, dispatch }}>
      <RoleValueContext.Provider value={{ roleValue, dispatchValue }}>
        <UserNameContext.Provider value={{ username, dispatchUser }}>
          <Router>
            <div className="App">
              <Header />
              <div className='main-section'>
                <Routes>
                  <Route path='/' element={<Navigate to='/home' />}></Route>
                  <Route path='/home' element={<Home />}></Route>
                  <Route path='/about' element={<AboutUs />}></Route>
                  <Route path='/contact' element={<ContactUs />}></Route>
                  <Route path='/login' element={<LoginPage />}></Route>
                  <Route path='/signup' element={<SignUp />}></Route>
                  <Route path='/admin' element={<Admin/>}></Route>
                  <Route path='/profile' element={<Profile/>}></Route>
                  <Route path='/editBlog' element={<EditBlog/>}></Route>
                  <Route path='/seeComplaints' element={<SeeComplaints/>}></Route>
                  <Route path='/seeOthersProfile' element={<SeeOtherProfiles/>}></Route>
                  <Route path='/chatRoom' element={<ChatSection/>}></Route>
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </UserNameContext.Provider>
      </RoleValueContext.Provider>
    </LoggedInContext.Provider>
  );
}

export default App;