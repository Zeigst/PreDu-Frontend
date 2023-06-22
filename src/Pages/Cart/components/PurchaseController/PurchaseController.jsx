import React, { useContext, useState } from "react"
import { ReactComponent as InputIcon } from '../../../../Resources/Icons/input.svg'
import { ReactComponent as CheckoutIcon } from '../../../../Resources/Icons/shopping_cart_checkout.svg'
import { PreduContext } from "../../../../PreduContext"
import axios from "axios"

const PurchaseController = () => {
  const { api_path } = useContext(PreduContext)
  const [ couponDescription, setCouponDescription] = useState("Empty")
  const [ couponCode, setCouponCode ] = useState("")

  const getCoupon = async() => {
    var couponAPI = api_path + "/api/coupons/" + couponCode.toUpperCase()
    const response = await axios.get(couponAPI)
    console.log(response)
  }

  return (
    <div className="purchase-controller">

      <h1>Buy Now!</h1>

      <div className="divider"></div>
      
      <div className="coupon-container">
        <form>
          <input type="text" placeholder="Your Coupon" onChange={(e)=>setCouponCode(e.target.value)} value={couponCode}></input>
          <button type="button" onClick={getCoupon}>
            <InputIcon className="icon"/>
          </button>
        </form>
        <div className="coupon-value">
          <h4>Description: </h4>
          <p>{couponDescription}</p>
        </div>
      </div>

      <div className="divider"></div>

      <div className="checkout-container">
        <div className="cost">
          <h4>Cart:</h4>
          <p>0</p>
        </div>
        <div className="cost">
          <h4>Coupon:</h4>
          <p>-0</p>
        </div>
        <div className="cost">
          <h3>Total:</h3>
          <p>0</p>
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