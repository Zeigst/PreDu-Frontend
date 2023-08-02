import React, { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { PreduContext } from "../../PreduContext"

const OrderDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { api_path, getAccessToken, getOrderHistory } = useContext(PreduContext)

  const [order, setOrder] = useState(location.state.order)
  const [cancelModal, setCancelModal] = useState(false)

  const goBack = async() => {
    window.scrollTo(0, 0);
    navigate('/User')
  }

  const cancelOrder = async() => {
    if (window.confirm("Cancel your order?")) {
      try {
        const cancel_order_api = api_path + "/api/orders/cancel-order/" + String(order.id)
        const response = await axios.patch(cancel_order_api, {}, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
        if (response.status === 200) {
          try {
            const order_api = api_path + "/api/orders/" + String(order.id)
            const order_response = await axios.get(order_api, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
            setCancelModal(true)
            setOrder(order_response.data)
            getOrderHistory()
            window.scrollTo(0, 0)
          } catch (e){
            window.alert(e.response.data.detail)
          }
        }
      } catch(e) {
        window.alert(e.response.data.detail)
      }
    }
    }

  return (
    <main className="order-details">
      <div className="container">
        <h1>ORDER DETAILS</h1>

        <div className="seperator"></div>

        <h2>Order Information</h2>

        <table className="order-status">
          <tbody>
            <tr>
              <th>ORDER ID</th>
              <td className="id">{order.id}</td>
            </tr>
            <tr>
              <th>STATUS</th>
              <td className={`status ${order.status === "processing" ? "processing" : order.status === "canceled" ? "canceled" : order.status === "completed" ? "completed" : ""}`}>
                {order.status}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="seperator"></div>

        <h2>Contact Information</h2>

        <table className="user-info">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{order.user_firstname} {order.user_lastname}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{order.user_phone}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{order.user_email}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{order.user_location}</td>
            </tr>
          </tbody>
        </table>

        <div className="seperator"></div>

        <h2>Products</h2>

        <table className="order-info">
          <tbody>
            <tr>
              <th className="product-name">Product</th>
              <th className="product-quantity">Quantity</th>
              <th className="product-cost">Cost</th>
            </tr>
            {order.ordered_products.map((ordered_product) => (
              <tr key={ordered_product.id}>
                <td className="product-name">{ordered_product.name}</td>
                <td className="product-quantity">{ordered_product.quantity}</td>
                <td className="product-cost">{(ordered_product.total_cost).toLocaleString("en-US")} VND</td>
              </tr>
            ))}
            <tr>
              <th colSpan={2} className="total-left">Total:</th>
              <th className="total-right">{order.raw_total_cost.toLocaleString("en-US")} VND</th>
            </tr>
          </tbody>
        </table>

        <h2>Coupon</h2>

        <table className="coupon-info">
          <tbody>
            <tr>
              <th>Code</th>
              <td>{order.used_coupon.code}</td>
            </tr>
            <tr>
              <th>Value</th>
              <td>{order.used_coupon.applied_value ?  order.used_coupon.applied_value.toLocaleString("en-US") : "0"} VND</td>
            </tr>
          </tbody>
        </table>

        <div className="seperator"></div>

        <div className="final">
          <h1>TOTAL :</h1>
          <h1>{order.final_total_cost.toLocaleString("en-US")} VND</h1>
        </div>

        <div className="seperator"></div>

        {(order.status === "processing") && (
          <button className="cancel-btn" onClick={cancelOrder}>CANCEL ORDER</button>
        )}
        
        <button className="back-btn" onClick={goBack}>BACK</button>


        
      </div>

      {cancelModal && (
        <div className="modal">
          <div className="overlay" onClick={()=>{setCancelModal(false)}}></div>
          <div className="modal-content">
            <h2>Message</h2>
            <h1>Order Canceled</h1>
            <p>Your order has been canceled.</p>
            <div className="buttons">
              <button className="ok-btn" onClick={()=>{setCancelModal(false)}}>OK</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default OrderDetails