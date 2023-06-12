import React, { useContext, useState } from "react"
import { ReactComponent as InputIcon } from '../../../../Resources/Icons/input.svg'
import { ReactComponent as CheckoutIcon } from '../../../../Resources/Icons/shopping_cart_checkout.svg'

const PurchaseController = () => {
  const [ couponDescription, setCouponDescription] = useState("Empty")

  return (
    <div className="purchase-controller">

      <h1>Buy Now!</h1>

      <div className="divider"></div>
      
      <div className="coupon-container">
        <form>
          <input type="text" placeholder="Your Coupon"></input>
          <button type="button">
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