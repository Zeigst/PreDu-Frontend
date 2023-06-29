import React, { useContext } from "react"
import { PreduContext } from "../../PreduContext"
import Login from "./components/Login/Login"
import Profile from "./components/Profile/Profile"
import Signup from "./components/Signup/Signup"

const User = () => {
  const { authenticated, currentUser, onSignupPage } = useContext(PreduContext)
  
  if (authenticated) {
    return <Profile/>
  }
  else {
    if (onSignupPage) {
      return <Signup/>
    }
    else {
      return <Login/>
    }
  }
}

export default User