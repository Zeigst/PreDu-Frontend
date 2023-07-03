import React, { useContext} from "react"
import { PreduContext } from "../../../../../../PreduContext"
import { useNavigate } from "react-router-dom"


import { ReactComponent as InfoIcon } from "../../../../../../Resources/Icons/info.svg"

const OrderHistory = () => {
  const { orderHistory } = useContext(PreduContext)
  const navigate = useNavigate()


  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if day is a single digit
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if month is a single digit
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }
  
  function toOrderDetails(order) {
    window.scrollTo(0, 0)
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
            <th>Cost</th>
            <th>Date</th>
            <th>Update</th>
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
              <td>{order.final_total_cost.toLocaleString("en-US")} VND</td>
              <td>{formatDate(order.created_at)}</td>
              <td>{formatDate(order.updated_at)}</td>
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