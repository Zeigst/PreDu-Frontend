import React, { useContext, useState } from "react"
import { PreduContext } from "../../../../PreduContext"
import { ReactComponent as UserIcon } from "../../../../Resources/Icons/person_fill.svg"
import { ReactComponent as LockIcon } from "../../../../Resources/Icons/lock_fill.svg"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"

const Login = () => {
  const navigate = useNavigate()
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")

  const { api_path, getAccessToken, setOnSignupPage, setCurrentUser, setAuthenticated, 
    categoryMenuStatus, changeCategoryMenuStatus, getOrderHistory, getUsedCoupons } = useContext(PreduContext)

  function toHome() {
    window.scrollTo(0, 0);
    if (categoryMenuStatus === true) {
      changeCategoryMenuStatus()
    }
    navigate('/Home')
  }

  function toSignup() {
    setOnSignupPage(true)
  }

  async function handleLogin(e) {
    e.preventDefault();
    const newLogin={
      username: username,
      password: password
    };
    var login_api_path = api_path + "/api/auth/login"
    var profile_api_path = api_path + "/api/auth/me"

    try {
      const login_response = await axios.post(login_api_path, newLogin);

      if (login_response.status === 200) {
        Cookies.set('access_token', login_response.data.access_token); //{ secure: true, sameSite: 'strict' });
        try {
          const me_response = await axios.get(profile_api_path, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}});
          const user = me_response.data
          const masked_password = password.slice(0, -2).replace(/./g, "*") + password.slice(-2);
          user.password = masked_password
          setCurrentUser(user)
    
          if (me_response.data.role === "admin") {
            window.scrollTo(0, 0);
            setAuthenticated(true)
            navigate('/Admin')
          }
          else {
            setAuthenticated(true)
            getOrderHistory()
            getUsedCoupons()
          }
        } catch(e) {
          console.log(e)
          window.alert(e.response.data.detail)
        }
        
      }
    } catch(e) {
      console.log(e)
      window.alert(e.response.data.detail)
    }
    
  }
  
  return (
    <main className="login">
      <div className="container">
        <h1 onClick={toHome}>PreDu</h1>
        <div className="signin_form">
          <table>
            <tbody>
              <tr>
                <th rowSpan="2"><UserIcon className="icon"/></th>
                <td><label htmlFor="signin_username">Username</label></td>
              </tr>
              <tr>
                <td>
                  <input type="text" name="signin_username" id="signin_username" 
                    onChange={(e)=>setUsername(e.target.value)} value={username}/>
                </td>
              </tr>

              <tr>
                <th rowSpan="2"><LockIcon className="icon"/></th>
                <td><label htmlFor="signin_password">Password</label></td>
              </tr>
              <tr>
                <td>
                  <input type="password" name="signin_password" id="signin_password" 
                    onChange={(e)=>setPassword(e.target.value)} value={password}/>
                </td>
              </tr>
            </tbody>
          </table>

          <button onClick={handleLogin}>
            Sign In
          </button>

          <div className="to-signup-text">
            <p>Don't have an account?</p>
            <p>Sign up <a onClick={toSignup}>here!</a></p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login