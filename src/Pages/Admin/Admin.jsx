import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import { ReactComponent as UserIcon } from '../../Resources/Icons/person_fill.svg'
import { ReactComponent as PhoneIcon } from '../../Resources/Icons/phone.svg'
import { ReactComponent as MailIcon } from '../../Resources/Icons/mail.svg'
import { ReactComponent as PinIcon } from '../../Resources/Icons/pin_drop.svg'
import { ReactComponent as EditIcon } from '../../Resources/Icons/edit.svg'
import { PreduContext } from "../../PreduContext"
const Admin = () => {
  const navigate = useNavigate()
  const { api_path, getAccessToken, currentUser, setCurrentUser, setAuthenticated } = useContext(PreduContext)

  const [emptyInputModal, setEmptyInputModal] = useState(false)
  const [updateSuccessModal, setUpdateSuccessModal] = useState(false)
  const [updateUsernameModal, setUpdateUsernameModal] = useState(false)
  const [updatePasswordModal, setUpdatePasswordModal] = useState(false)

  const [firstname, setFirstname] = useState(currentUser.firstname)
  const [lastname, setLastname] = useState(currentUser.lastname)
  const [phone, setPhone] = useState(currentUser.phone)
  const [email, setEmail] = useState(currentUser.email)
  const [location, setLocation] = useState(currentUser.location)

  const [newUsername, setNewUsername] = useState(currentUser.username)
  const [currentPassword, setCurrentPassword] = useState(currentUser.password)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  function logout() {
    Cookies.remove('access_token', { secure: true, sameSite: 'strict' });
    setCurrentUser({})
    setAuthenticated(false)

    navigate('/User')
  }

  async function updateProfile() {
    if (notEmpty()) {
      const user_update_api = api_path + "/api/users/update-admin"
      const profile_api_path = api_path + "/api/auth/me"
      const userUpdate = {
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        location: location
      }
      const response = await axios.patch(user_update_api, userUpdate, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
      if (response.status === 200) {
        const me_response = await axios.get(profile_api_path, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}});
        const user = me_response.data
        user.password = currentUser.password
        setCurrentUser(user)
        setUpdateSuccessModal(true)
      }
    }
    else {
      setEmptyInputModal(true)
    }
  }

  const closeUpdateModal = () => {
    setCurrentPassword(currentUser.password)
    setUpdateUsernameModal(false)
    setUpdatePasswordModal(false)
  }

  const updateUsername = async() => {
    if (currentUser.username === newUsername) {
      window.alert("Username must be different from current username")
    }
    else {
      const usernameUpdated = {
        new_username: newUsername,
        password: currentPassword
      }
      try {
        const name_api = api_path + "/api/auth/change-username"
        const response = await axios.patch(name_api, usernameUpdated, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
        Cookies.set('access_token', response.data.access_token, { secure: true, sameSite: 'strict' });
        window.alert(response.data.message)
        const newCurrentUser = currentUser
        newCurrentUser.username = newUsername
        setCurrentUser(newCurrentUser)
        setUpdateUsernameModal(false)
      } catch(e) {
        window.alert(e.response.data.detail)
      }
    }
    
  } 

  const updatePassword = async() => {
    const passwordUpdated = {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword
    }
    try {
      const password_api = api_path + "/api/auth/change-password"
      const response = await axios.patch(password_api, passwordUpdated, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
      const newCurrentUser = currentUser
      const masked_password = newPassword.slice(0, -2).replace(/./g, "*") + newPassword.slice(-2);
      newCurrentUser.password = masked_password
      setCurrentUser(newCurrentUser)
      window.alert(response.data.message)
    } catch(e) {
      window.alert(e.response.data.detail)
    }
  }

  const handleInputPhone = (event) => {
    let newValue = event.target.value;
    if (newValue.length > 10) {
      newValue = newValue.slice(0, 10); 
    }
    setPhone(newValue);
  };

  const notEmpty = () => {
    return [firstname, lastname, email, phone, location].every(value => value !== '');
  }
  
  return (
    <div className="admin">

      <div className="container">
        <div className="container1">
          <UserIcon className="user-icon"/>
          
          <div className="table-container">
            <table>
              <tbody>
                <tr>
                  <th>Username</th>
                  <th>:</th>
                  <td>{currentUser.username}</td>
                  <td>
                    <button className="edit-btn" onClick={()=>{setUpdateUsernameModal(true)}}>
                      <EditIcon className="icon"/>
                    </button>
                  </td>
                </tr>
                <tr>
                  <th>Password</th>
                  <th>:</th>
                  <td>{currentUser.password}</td>
                  <td>
                    <button className="edit-btn">
                      <EditIcon className="icon" onClick={()=>{setUpdatePasswordModal(true)}}/>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <button className="logout-btn" onClick={logout}>Log Out</button>
        </div>

        <div className="container2">
          <table>
            <tbody>
              <tr>
                <th><span className="color-name">First</span> Name</th>
                <th><span className="color-name">Last</span> Name</th>
              </tr>
              <tr>
                <td>
                  <input type="text" className="profile-firstname" value={firstname}
                  placeholder={currentUser.firstname} onChange={(e)=>setFirstname(e.target.value)}/>
                </td>
                <td>
                  <input type="text" className="profile-lastname" value={lastname}
                    placeholder={currentUser.lastname} onChange={(e)=>setLastname(e.target.value)}/>
                </td>
              </tr>
              <tr>
                <th>
                  <div className="content-wrapper">
                    <PhoneIcon className="icon" />
                    <span className="text">Phone</span>
                  </div>
                </th>
                <th>
                  <div className="content-wrapper">
                    <MailIcon className="icon" />
                    <span className="text">Email</span>
                  </div>
                </th>
              </tr>
              <tr>
                <td>
                  <input type="number" className="profile-phone" value={phone} maxLength={10} onWheel={(e) => e.target.blur()}
                  placeholder={currentUser.phone} onChange={handleInputPhone}/>
                </td>
                <td>
                  <input type="email" className="profile-email" value={email}
                  placeholder={currentUser.email} onChange={(e)=>setEmail(e.target.value)}/>
                </td>
              </tr>
              <tr>
                <th colSpan={2}>
                  <div className="content-wrapper">
                    <PinIcon className="icon" />
                    <span className="text">Location</span>
                  </div>
                </th>
              </tr>
              <tr>
                <td colSpan={2}>
                  <textarea className="profile-location" value={location} 
                  placeholder={currentUser.location} onChange={(e)=>setLocation(e.target.value)}/>
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="update-btn-container">
                  <button className="update-btn" onClick={updateProfile}>Update</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {emptyInputModal && (
        <div className="modal">
          <div className="overlay" onClick={()=>{setEmptyInputModal(false)}}></div>
          <div className="modal-content">
            <h2>Message</h2>
            <h1>Empty Fields</h1>
            <p>Please fill in all fields to update.</p>
            <div className="buttons">
              <button className="ok-btn" onClick={()=>{setEmptyInputModal(false)}}>OK</button>
            </div>
          </div>
        </div>
      )}

      {updateSuccessModal && (
        <div className="modal">
          <div className="overlay" onClick={()=>{setUpdateSuccessModal(false)}}></div>
          <div className="modal-content">
            <h2>Message</h2>
            <h1>Success</h1>
            <p>Profile Updated</p>
            <div className="buttons">
              <button className="ok-btn" onClick={()=>{setUpdateSuccessModal(false)}}>OK</button>
            </div>
          </div>
        </div>
      )}

      {updateUsernameModal && (
        <div className="update-modal">
          <div className="overlay" onClick={closeUpdateModal}></div>
          <div className="modal-content">
            <UserIcon className="modal-icon"/>
            <form>
              <label htmlFor="new-username">New Username</label>
              <input type="text" id="new-username" value={newUsername} onChange={(e)=>setNewUsername(e.target.value)}
              placeholder={currentUser.username}/>
              <label htmlFor="password">Password</label>
              <input type="text" id="password" value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)}/>
            </form>
            <button className="modal-update-btn" onClick={updateUsername}>Update</button>
          </div>
        </div>
      )}

      {updatePasswordModal && (
        <div className="update-modal">
          <div className="overlay" onClick={closeUpdateModal}></div>
          <div className="modal-content">
            <UserIcon className="modal-icon"/>
            <form>
              <label htmlFor="current-password">Password</label>
              <input type="password" id="current-password" value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)}/>
              <label htmlFor="new-password">New Password</label>
              <input type="password" id="new-password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </form>
            <button className="modal-update-btn" onClick={updatePassword}>Update</button>
          </div>
        </div>
      )}      
    </div>
  )
}

export default Admin