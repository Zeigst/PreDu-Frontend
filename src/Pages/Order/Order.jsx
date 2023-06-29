import React, { useContext } from "react"
import { PreduContext } from "../../PreduContext"
import axios from "axios"

const Order = () => {
  const { api_path, getAccessToken, currentUser, shop, cart, costTotal, costFinal, coupon, couponValue } = useContext(PreduContext)
  
  const makeOrder = async() => {
    const order_api = api_path + "/api/orders/"
    const newOrder = {
      cart: cart,
      coupon_code: coupon.code
    }

    try {
      const response = await axios.post(order_api, newOrder, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
      console.log(response)
    } catch(e) {
      console.log(e)
    }
  }
  
  return (
    <main className="order">
      <div className="container">
        <h1>ORDER</h1>

        <div className="seperator"></div>

        <h2>Contact Information</h2>

        <table className="user-info">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{currentUser.firstname} {currentUser.lastname}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{currentUser.phone}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{currentUser.email}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{currentUser.location}</td>
            </tr>
          </tbody>
        </table>
        
        <div className="seperator"></div>

        <h2>Order Details</h2>

        <table className="order-details">
          <tbody>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Cost</th>
            </tr>
            {shop.map((product) => {
                if (cart[product.id] !== 0) {
                  return (
                    <tr key={product.name}>
                      <td className="product-name">{product.name}</td>
                      <td>{cart[product.id]}</td>
                      <td>{(product.cost_per_unit * cart[product.id]).toLocaleString("en-US")} VND</td>
                    </tr>
                  )
                }
            })}
            <tr>
              <th colSpan={2} className="total-left">Total:</th>
              <th className="total-right">{costTotal.toLocaleString("en-US")} VND</th>
            </tr>
          </tbody>
        </table>

        <h2>Coupon</h2>

        <table className="coupon-info">
          <tbody>
            <tr>
              <th>Code</th>
              <td>{coupon.code}</td>
            </tr>
            <tr>
              <th>Value</th>
              <td>{couponValue.toLocaleString("en-US")} VND</td>
            </tr>
          </tbody>
        </table>

        <div className="seperator"></div>

        <div className="final">
          <h1>TOTAL :</h1>
          <h1>{costFinal.toLocaleString("en-US")} VND</h1>
        </div>

        <div className="seperator"></div>

        <button className="buy-btn" onClick={makeOrder}>ORDER NOW</button>
      </div>

    </main>
  )
}

export default Order