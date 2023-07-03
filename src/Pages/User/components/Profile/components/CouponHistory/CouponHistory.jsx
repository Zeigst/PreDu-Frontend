import React, { useContext } from "react";
import { PreduContext } from "../../../../../../PreduContext";

const CouponHistory = () => {
  const { usedCoupons } = useContext(PreduContext)
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if day is a single digit
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if month is a single digit
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  function formatValue(type, value) {
    if (type === "fixed") {
      return (value.toLocaleString("en-US") + " VND");
    }
    
    if (type === "percentage") {
      return value + "%";
    }
  }
  
  return (
    <div className="coupon-history">
      <table className="coupon-list">
        <thead>
          <tr className="table-header">
            <th>Order ID</th>
            <th>Code</th>
            <th>Type</th>
            <th>Value</th>
            <th>Applied</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {usedCoupons.map((coupon) => (
            <tr key={coupon.id}>
              <td>{coupon.order_id}</td>
              <td>{coupon.code}</td>
              <td>{coupon.type}</td>
              <td>{formatValue(coupon.type, coupon.value)}</td>
              <td>{coupon.applied_value.toLocaleString("en-US")} VND</td>
              <td>{formatDate(coupon.created_at)}</td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  )
}

export default CouponHistory