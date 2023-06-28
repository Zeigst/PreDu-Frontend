import React, { useContext, useState } from "react"
import { ReactComponent as InputIcon } from '../../../../Resources/Icons/input.svg'
import { ReactComponent as CheckoutIcon } from '../../../../Resources/Icons/shopping_cart_checkout.svg'
import { PreduContext } from "../../../../PreduContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const PurchaseController = () => {
  const navigate = useNavigate()
  const { api_path, costTotal, costFinal, coupon, couponValue, couponMessage, setCoupon, applyCoupon, 
    isCartEmpty, authenticated } = useContext(PreduContext)
  const [ couponCode, setCouponCode ] = useState("")
  const [ modal, setModal ] = useState(false)
  const [ emptyCartModal, setEmptyCartModal ] = useState(false)

  const checkout = () => {
    if (isCartEmpty()) {
      setEmptyCartModal(true)
    }
    else if (!authenticated) {
      setModal(true)
    }
    else {
      navigate('/Order')
    }
  }


  const getCoupon = async() => {
    var couponAPI = api_path + "/api/coupons/" + couponCode
    try {
      const response = await axios.get(couponAPI)
      setCoupon(response.data)
      applyCoupon(costTotal, response.data)
    } catch(e) {
      console.log(e)
    }
  }

  const removeCoupon = () => {
    const new_coupon = {
      "code": "",
      "min_order_required": 0,
      "max_discount_applicable": 0
    }
    setCoupon(new_coupon)
    applyCoupon(costTotal, new_coupon)
  }

  const toLogin = () => {
    navigate('/User')
  }

  return (
    <div className="purchase-controller">

      <h1>Buy Now!</h1>

      <div className="divider"></div>
      
      <div className="coupon-container">
        <form>
          <input type="text" placeholder="Your Coupon" onChange={(e)=>setCouponCode(e.target.value)} value={couponCode}></input>
          <button type="button" onClick={()=>{getCoupon()}}>
            <InputIcon className="icon"/>
          </button>
        </form>
        <div className="coupon-value">
          <h4>Coupon:</h4>
          <p>{coupon.code}</p>
        </div>
        <div className="coupon-value">
          <h4>Min Spend:</h4>
          <p>{coupon.min_order_required.toLocaleString("en-US")} VND</p>
        </div>
        <div className="coupon-value">
          <h4>Max Value</h4>
          <p>{coupon.max_discount_applicable.toLocaleString("en-US")} VND</p>
        </div>
        <div className="coupon-value">
          <h4>Status: </h4>
          <p>{couponMessage}</p>
        </div>
        
        <button className="remove-button" onClick={removeCoupon}>Remove</button>
      </div>

      <div className="divider"></div>

      <div className="checkout-container">
        <div className="cost">
          <h4>Cart:</h4>
          <p>{costTotal.toLocaleString("en-US")} VND</p>
        </div>
        <div className="cost">
          <h4>Coupon:</h4>
          <p>{couponValue.toLocaleString("en-US")} VND</p>
        </div>
        <div className="cost">
          <h3>Total:</h3>
          <p>{costFinal.toLocaleString("en-US")} VND</p>
        </div>
      </div>

      <button type="button" className="checkout-button" onClick={checkout}>
        <CheckoutIcon className="icon"/>
        <b>Check Out</b>
      </button>

      {modal && (
        <div className="modal">
          <div className="overlay" onClick={()=>{setModal(false)}}></div>
          <div className="modal-content">
            <h2>Message</h2>
            <h1>Authentication Required</h1>
            <p>Please login to continue.</p>
            <div className="buttons">
              <button className="back-btn" onClick={()=>{setModal(false)}}>Back</button>
              <button className="to-login-btn" onClick={toLogin}>Login</button>
            </div>
          </div>
        </div>
      )}

      {emptyCartModal && (
        <div className="modal">
          <div className="overlay" onClick={()=>{setEmptyCartModal(false)}}></div>
          <div className="modal-content">
            <h2>Message</h2>
            <h1>Your Cart Is Empty</h1>
            <p>Please add at least 1 item to continue.</p>
            <div className="buttons">
              <button className="back-btn" onClick={()=>{setEmptyCartModal(false)}}>Back</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PurchaseController