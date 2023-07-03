import React, { useContext } from "react"
import { ReactComponent as RefreshIcon } from "../../../../Resources/Icons/refresh.svg"

import { PreduContext } from "../../../../PreduContext"
import Header from "../../../../Components/Header"
import Footer from "../../../../Components/Footer"
import AccountDetails from "./components/AccountDetails/AccountDetails"
import OrderHistory from "./components/OrderHistory/OrderHistory"
import CouponHistory from "./components/CouponHistory/CouponHistory"

const Profile = () => {
  const { getOrderHistory , getUsedCoupons } = useContext(PreduContext)

  const refresh = () => {
    getOrderHistory()
    getUsedCoupons()
  }
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
        <button className="refresh-btn" onClick={refresh}>
          <RefreshIcon className="icon"/>
        </button>
        <div className="seperator">
          <h2>Coupon History</h2>
          <div className="line"></div>
        </div>
        <CouponHistory/>
        <button className="refresh-btn" onClick={refresh}>
          <RefreshIcon className="icon"/>
        </button>
      </main>
      <Footer/>
    </div>
  )
}

export default Profile