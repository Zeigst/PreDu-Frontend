import React, { useContext, useState } from "react"
import { PreduContext } from "../../../../PreduContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"

const Signup = () => {
  const { setOnSignupPage, api_path, getAccessToken, setCurrentUser, setAuthenticated, } = useContext(PreduContext)
  const navigate = useNavigate()

  function toHome() {
    window.scrollTo(0, 0);
    navigate('/Home')
  }

  function toSignin() {
    setOnSignupPage(false)
  }

  const [ firstname, setFirstname ] = useState("")
  const [ lastname, setLastname ] = useState("")
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ confirm_password, setConfirmPassword ] = useState("")
  const [ phone, setPhone ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ location, setLocation ] = useState("")

  async function signup() {
    var signup_api = api_path + "/api/users/signup"
    var login_api = api_path + "/api/auth/login"
    var user_api = api_path + "/api/auth/me"

    const new_user = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      confirm_password: confirm_password,
      phone: phone,
      email: email,
      location: location
    }

    try {
      const signup_response = await axios.post(signup_api, new_user);
      console.log(signup_response)
      if (signup_response.status === 200) {
        const new_login = {
          username: username,
          password: password
        }
        
        try {
          const login_response = await axios.post(login_api, new_login);
          Cookies.set('access_token', login_response.data.access_token);
        } catch(e) {
          console.log(e)
        }
      }
    } catch(e) {
      console.log(e)
    }

    if(getAccessToken() !== null) {
      const me_response = await axios.get(user_api, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}});
      const user = me_response.data
      const masked_password = password.slice(0, -2).replace(/./g, "*") + password.slice(-2);
      user.password = masked_password
      setCurrentUser(user)
      window.scrollTo(0, 0);
      setAuthenticated(true)
    }
  }

  
  return (
    <main className="signup">
      <div className="container">
        <h1 onClick={toHome}>PreDu</h1>

        <form className="signup_form">
          <table className="name">
            <tbody>
              <tr>
                <td colSpan={2}>
                  <div className="separator">
                    <h2>ACCOUNT DETAILS</h2>
                    <div className="line"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <th><label htmlFor="signup_firstname">Firstname:</label></th>
                <th><label htmlFor="signup_lastname">Lastname:</label></th>
              </tr>
              <tr>
                <td>
                  <input type="text" name="signup_firstname" id="signup_firstname" 
                    onChange={(e)=>setFirstname(e.target.value)} value={firstname}/>
                </td>
                <td>
                  <input type="text" name="signup_lastname" id="signup_lastname"
                    onChange={(e)=>setLastname(e.target.value)} value={lastname}/>
                </td>
              </tr>
              <tr>
                <th><label htmlFor="signup_username">Username</label></th>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input type="text" name="signup_username" id="signup_username" 
                   onChange={(e)=>setUsername(e.target.value)} value={username}/>
                </td>
              </tr>
              <tr>
                <th><label htmlFor="signup_password">Password</label></th>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input type="password" name="signup_password" id="signup_password" 
                   onChange={(e)=>setPassword(e.target.value)} value={password}/>
                </td>
              </tr>
              <tr>
                <th colSpan={2}><label htmlFor="signup_confirm_password">Confirm Password</label></th>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input type="password" name="signup_confirm_password" id="signup_confirm_password" 
                   onChange={(e)=>setConfirmPassword(e.target.value)} value={confirm_password}/>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div className="separator">
                    <h2>CONTACT INFORMATIONS</h2>
                    <div className="line"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <th><label htmlFor="signup_phone">Phone</label></th>
                <th><label htmlFor="signup_email">Email</label></th>
              </tr>
              <tr>
                <td>
                  <input type="number" name="signup_phone" id="signup_phone" 
                   onChange={(e)=>setPhone(e.target.value)} value={phone}/>
                </td>
                <td>
                  <input type="text" name="signup_email" id="signup_email" 
                   onChange={(e)=>setEmail(e.target.value)} value={email}/>
                </td>
              </tr>
              <tr>
                <th><label htmlFor="signup_location">Location</label></th>
              </tr>
              <tr>
                <td colSpan={2}>
                  <textarea name="signup_location" id="signup_location"
                   onChange={(e)=>setLocation(e.target.value)} value={location} />
                </td>
              </tr>
            </tbody>
          </table>
          
          
        </form>
        
        
        <div className="buttons">
          <button className="signup-button" onClick={signup}>
            Sign Up
          </button>

          <div className="btn-divider">
            <div className="line-"></div>
            <h4>Or</h4>
            <div className="line-"></div>          
          </div>

          <button className="login-button" onClick={toSignin}>
            Log In
          </button>
        </div>
      </div>
    </main>
  )
}

export default Signup