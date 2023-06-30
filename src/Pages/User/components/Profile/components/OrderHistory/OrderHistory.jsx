import React, { useContext, useState } from "react"
import { PreduContext } from "../../../../../../PreduContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"


import { ReactComponent as InfoIcon } from "../../../../../../Resources/Icons/info.svg"

const OrderHistory = () => {
  const { orderHistory, getOrderHistory } = useContext(PreduContext)
  const navigate = useNavigate()

  console.log(orderHistory)

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  function toOrderDetails(order) {
    navigate('/OrderDetails', {
      state : {
        order: order
      },
  });
  }

  return (
    <div className="order-history">
      <table className="order-list">
        <thead>
          <tr className="table-header">
            <th>ID</th>
            <th>Status</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        
        <tbody>
          {orderHistory.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td className={`status ${order.status === "processing" ? "processing" : order.status === "canceled" ? "canceled" : order.status === "completed" ? "completed" : ""}`}>
                {order.status}
              </td>
              <td>{formatDate(order.created_at)}</td>
              <td>
                <button onClick={()=>{toOrderDetails(order)}}>
                  <InfoIcon className="icon"/>
                </button>
              </td>
            </tr>
          ))}
          
          
        </tbody>
      </table>
    </div>
  )
}

export default OrderHistory