import React, { useContext } from "react"
import { PreduContext } from "../../PreduContext"
import Login from "./components/Login/Login"
import Profile from "./components/Profile/Profile"

const User = () => {
  const { authenticated, setAuthenticated } = useContext(PreduContext)
  
  if (authenticated) {
    return <Profile/>
  }
  else {
    return <Login/>
  }
}

export default User