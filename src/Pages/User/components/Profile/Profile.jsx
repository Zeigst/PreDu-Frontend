import React, { useContext, useState } from "react"
import { ReactComponent as RefreshIcon } from "../../../../Resources/Icons/refresh.svg"
import Cookies from "js-cookie"


import { PreduContext } from "../../../../PreduContext"
import Header from "../../../../Components/Header"
import Footer from "../../../../Components/Footer"
import AccountDetails from "./components/AccountDetails/AccountDetails"
import OrderHistory from "./components/OrderHistory/OrderHistory"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const { getOrderHistory } = useContext(PreduContext)
  return (
    <div className="profile">
      <Header/>
      <main className="content">
        <AccountDetails/>
        <div className="seperator">
          <h2>Order History</h2>
          <div className="line"></div>
        </div>
        <OrderHistory/>
        <button className="refresh-btn" onClick={()=>{getOrderHistory()}}>
          <RefreshIcon className="icon"/>
        </button>
        <div className="seperator">
          <h2>Coupon History</h2>
          <div className="line"></div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default Profile