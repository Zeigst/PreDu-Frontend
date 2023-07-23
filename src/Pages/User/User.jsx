import React, { useContext, useEffect } from "react"
import { PreduContext } from "../../PreduContext"
import Login from "./components/Login/Login"
import Profile from "./components/Profile/Profile"
import Signup from "./components/Signup/Signup"
import { useNavigate } from "react-router-dom"

const User = () => {
  const navigate = useNavigate()
  const { authenticated, currentUser, onSignupPage } = useContext(PreduContext)
  
  useEffect(() => {
    if (authenticated)  {
      if (currentUser.role === "admin") {
        navigate('/Admin')
      }
    }
  }, []);
  
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