import React, { useContext, useState } from "react"
import { PreduContext } from "../../../../PreduContext"
import { ReactComponent as UserIcon } from "../../../../Resources/Icons/person_fill.svg"
import { ReactComponent as LockIcon } from "../../../../Resources/Icons/lock_fill.svg"
import { ReactComponent as LoginIcon } from "../../../../Resources/Icons/login.svg"

const Login = () => {
  const { authenticated, setAuthenticated } = useContext(PreduContext)
  const [ signupState, setSignupState ] = useState(false) 
  
  return (
    <main className="login">
      <div className="container">
        <h1>PreDu</h1>
        <div className="signin_form">
          <table>
            <tbody>
              <tr>
                <th rowSpan="2"><UserIcon className="icon"/></th>
                <td><label htmlFor="signin_username">Username</label></td>
              </tr>
              <tr>
                <td><input type="text" name="signin_username" id="signin_username"/></td>
              </tr>

              <tr>
                <th rowSpan="2"><LockIcon className="icon"/></th>
                <td><label htmlFor="signin_password">Password</label></td>
              </tr>
              <tr>
                <td><input type="password" name="signin_password" id="signin_password"/></td>
              </tr>
            </tbody>
          </table>

          <button>
            Sign In
            <LoginIcon className="button_icon"/>
          </button>

          <div>
            <p>Don't have an account? Sign up <a>here!</a></p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login