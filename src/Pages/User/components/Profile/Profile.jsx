import React, { useContext, useState } from "react"
import Cookies from "js-cookie"


import { PreduContext } from "../../../../PreduContext"
import Header from "../../../../Components/Header"
import Footer from "../../../../Components/Footer"
import AccountDetails from "./components/AccountDetails/AccountDetails"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const { api_path, getAccessToken, currentUser, setCurrentUser, setAuthenticated } = useContext(PreduContext)
  return (
    <div className="profile">
      <Header/>
      <main className="content">
        <AccountDetails/>
      </main>
      <Footer/>
    </div>
  )
}

export default Profile