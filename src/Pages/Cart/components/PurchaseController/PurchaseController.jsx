import React, { useContext, useState } from "react"
import { ReactComponent as InputIcon } from '../../../../Resources/Icons/input.svg'
import { ReactComponent as CheckoutIcon } from '../../../../Resources/Icons/shopping_cart_checkout.svg'
import { PreduContext } from "../../../../PreduContext"
import axios from "axios"

const PurchaseController = () => {
  const { api_path, costTotal, costFinal, coupon, couponValue, couponMessage, setCoupon, applyCoupon } = useContext(PreduContext)
  const [ couponDescription, setCouponDescription] = useState("Empty")
  const [ couponCode, setCouponCode ] = useState("")

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
      "minimum_order": 0,
      "maximum_discount": 0
    }
    setCoupon(new_coupon)
    applyCoupon(costTotal, new_coupon)
  }

  const test = () => {
    console.log(coupon)
  }

  return (
    <div className="purchase-controller">

      <h1 onClick={test}>Buy Now!</h1>

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
          <p>{coupon.minimum_order.toLocaleString("en-US")} VND</p>
        </div>
        <div className="coupon-value">
          <h4>Max Value</h4>
          <p>{coupon.maximum_discount.toLocaleString("en-US")} VND</p>
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

      <button type="button" className="checkout-button">
        <CheckoutIcon className="icon"/>
        <b>Check Out</b>
      </button>
    </div>
  )
}

export default PurchaseController