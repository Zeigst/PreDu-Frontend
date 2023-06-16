import React, { useContext } from "react"
import { PreduContext } from "../../../../PreduContext"

const Profile = () => {
  const { authenticated, setAuthenticated } = useContext(PreduContext)
  
  return (
    <main className="profile">
      PROFILE
    </main>
  )
}

export default Profile