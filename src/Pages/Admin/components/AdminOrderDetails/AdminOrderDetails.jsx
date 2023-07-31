import React, { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { PreduContext } from "../../../../PreduContext"

const AdminOrderDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { api_path, getAccessToken } = useContext(PreduContext)

  const [ order, setOrder ] = useState(location.state.order)

  const goBack = async() => {
    const orders_api = api_path + "/api/orders/"
    const response = await axios.get(orders_api, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
    navigate('/Admin/Orders', {
      state : {
        orders: response.data
      }
    })
  }

  const cancelOrder = async() => {
    if (window.confirm("Cancel Order?")) {
      const cancel_api = api_path + "/api/orders/cancel-order/" + String(order.id)
      try {
        const response = await axios.patch(cancel_api, {}, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
        window.alert(response.data.message)
      } catch(e){
        window.alert(e.response.data.detail)
      }
    }

    refresh()
  }

  const completeOrder = async() => {
    if (window.confirm("Complete Order?")) {
      const complete_api = api_path + "/api/orders/complete-order/" + String(order.id)
      try {
        const response = await axios.patch(complete_api, {}, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
        window.alert(response.data.message)
      } catch(e){
        window.alert(e.response.data.detail)
      }
    }
    refresh()
  }

  const refresh = async() => {
    const order_api = api_path + "/api/orders/" + String(order.id)
    const response = await axios.get(order_api, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
    setOrder(response.data)
  }
  
  return(
    <div className="admin-order-details">
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
              <th>User ID</th>
              <td>{order.user_id}</td>
            </tr>
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
              <th>ID</th>
              <th className="product-name">Product</th>
              <th className="product-quantity">Quantity</th>
              <th className="product-cost">Cost (VND)</th>
            </tr>
            {order.ordered_products.map((ordered_product) => (
              <tr key={ordered_product.id}>
                <td className="center">{ordered_product.id}</td>
                <td className="left">{ordered_product.name}</td>
                <td className="right">{ordered_product.quantity}</td>
                <td className="right">{(ordered_product.total_cost).toLocaleString("en-US")}</td>
              </tr>
            ))}
            <tr>
              <th colSpan={2} className="total-left">Total:</th>
              <th colSpan={2} className="total-right">{order.raw_total_cost.toLocaleString("en-US")} VND</th>
            </tr>
          </tbody>
        </table>

        <h2>Coupon</h2>

        <table className="coupon-info">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{order.used_coupon.coupon_id}</td>
            </tr>
            <tr>
              <th>Code</th>
              <td>{order.used_coupon.code}</td>
            </tr>
            <tr>
              <th>Value</th>
              <td>{order.used_coupon ?  "0 VND" : order.used_coupon.applied_value.toLocaleString("en-US") + " VND"}</td>
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
          <div className="btns-container">
            <button className="cancel-btn" onClick={cancelOrder}>CANCEL ORDER</button>
            <button className="complete-btn" onClick={completeOrder}>COMPLETE ORDER</button>
          </div>
          
        )}

        <button className="back-btn" onClick={goBack}>BACK</button>


        
      </div>
    </div>
  )
}

export default AdminOrderDetails