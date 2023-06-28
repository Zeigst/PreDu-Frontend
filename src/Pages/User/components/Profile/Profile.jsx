import React, { useContext, useState } from "react"
import Cookies from "js-cookie"


import { PreduContext } from "../../../../PreduContext"
import { ReactComponent as UserIcon } from '../../../../Resources/Icons/person_fill.svg'
import { ReactComponent as PhoneIcon } from '../../../../Resources/Icons/phone.svg'
import { ReactComponent as MailIcon } from '../../../../Resources/Icons/mail.svg'
import { ReactComponent as PinIcon } from '../../../../Resources/Icons/pin_drop.svg'
import { ReactComponent as EditIcon } from '../../../../Resources/Icons/edit.svg'
import Header from "../../../../Components/Header"
import Footer from "../../../../Components/Footer"
import axios from "axios"

const Profile = () => {
  const { api_path, getAccessToken, currentUser, setCurrentUser, setAuthenticated } = useContext(PreduContext)

  const [firstname, setFirstname] = useState(currentUser.firstname)
  const [lastname, setLastname] = useState(currentUser.lastname)
  const [phone, setPhone] = useState(currentUser.phone)
  const [email, setEmail] = useState(currentUser.email)
  const [location, setLocation] = useState(currentUser.location)

  const [emptyInputModal, setEmptyInputModal] = useState(false)
  const [updateSuccessModal, setUpdateSuccessModal] = useState(false)

  const logout = () => {
    Cookies.remove('access_token', { secure: true, sameSite: 'strict' });
    setCurrentUser({})
    setAuthenticated(false)
  }

  const notEmpty = () => {
    return [firstname, lastname, email, phone, location].every(value => value !== '');
  }

  const updateProfile = async() => {
    if (notEmpty()) {
      const user_update_api = api_path + "/api/users/update-user"
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

  return (
    <main className="profile">
      <Header/>
      <div className="content">
        <div className="container1">
          <div className="container1-left">
            <UserIcon className="user-icon"/>
            <div>
              <table>
                <tbody>
                  <tr>
                    <th>Username:</th>
                    <td>{currentUser.username}</td>
                    <td rowSpan={2}>
                      <button className="edit-btn">
                        <EditIcon className="icon"/>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th>Password:</th>
                    <td>{currentUser.password}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="logout-btn" onClick={logout}>Log Out</button>
          </div>
          <table className="container1-right">
            <tbody>
              <tr>
                <td></td>
                <th>First Name:</th>
                <td>
                  <input type="text" className="profile-firstname" value={firstname}
                   placeholder={currentUser.firstname} onChange={(e)=>setFirstname(e.target.value)}/>
                </td>
                <td></td>
                <th>Last Name:</th>
                <td>
                  <input type="text" className="profile-lastname" value={lastname}
                   placeholder={currentUser.lastname} onChange={(e)=>setLastname(e.target.value)}/>
                </td>
              </tr>

              <tr>
                <th><PhoneIcon className="icon"/></th>
                <th>Phone:</th>
                <td>
                  <input type="number" className="profile-phone" value={phone} maxLength={10} onWheel={(e) => e.target.blur()}
                  placeholder={currentUser.phone} onChange={(e)=>setPhone(e.target.value)}/>
                </td>
                <th><MailIcon className="icon"/></th>
                <th>Email:</th>
                <td>
                  <input type="email" className="profile-email" value={email}
                  placeholder={currentUser.email} onChange={(e)=>setEmail(e.target.value)}/>
                </td>
              </tr>

              <tr>
                <th><PinIcon className="icon"/></th>
                <th>Location:</th>
                <td colSpan={4}>
                  <textarea className="profile-location" value={location} 
                   placeholder={currentUser.location} onChange={(e)=>setLocation(e.target.value)}/>
                </td>
              </tr>

              <tr className="update-btn-container">
                <td colSpan={6}>
                  <button className="update-btn" onClick={updateProfile}>Update</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="container1-right_responsive">
            <table>
              <tbody>
                <tr>
                  <th>First Name:</th>
                  <th>Last Name:</th>
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
                      <span className="text">Phone:</span>
                    </div>
                  </th>
                  <th>
                    <div className="content-wrapper">
                      <MailIcon className="icon" />
                      <span className="text">Email:</span>
                    </div>
                  </th>
                </tr>
                <tr>
                  <td>
                    <input type="number" className="profile-phone" value={phone} maxLength={10} onWheel={(e) => e.target.blur()}
                    placeholder={currentUser.phone} onChange={(e)=>setPhone(e.target.value)}/>
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
                      <span className="text">Location:</span>
                    </div>
                  </th>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <textarea className="profile-location" value={location} 
                    placeholder={currentUser.location} onChange={(e)=>setLocation(e.target.value)}/>
                  </td>
                </tr>
                <tr className="update-btn-container">
                  <td colSpan={2}>
                    <button className="update-btn" onClick={updateProfile}>Update</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        
        </div>
      </div>
      <Footer/>



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
    </main>
  )
}

export default Profile