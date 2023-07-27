import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import {ReactComponent as RefreshIcon } from '../../../../Resources/Icons/refresh.svg'
import {ReactComponent as EditIcon } from '../../../../Resources/Icons/edit.svg'
import {ReactComponent as AddIcon } from '../../../../Resources/Icons/add.svg'
import { PreduContext } from "../../../../PreduContext";
import axios from "axios";

const AdminCoupons = () => {
  const location = useLocation()
  const [ coupons, setCoupons ] = useState(location.state.coupons)
  const [ couponSearch, setCouponSearch ] = useState("")

  function formatDate(dateString) {
    if (dateString === null) {
      return "N/A";
    }
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if day is a single digit
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if month is a single digit
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  function formatActive(active) {
    if (active) {
      return "True"
    }
    else {
      return "False"
    }
  }

  function formatValueType(type) {
    if (type === "fixed") {
      return "VND"
    }
    else if (type === "percentage") {
      return "%"
    }
  }
  
  return (
    <div className="admin-coupons">
      <div className="container">
        <h1>COUPONS</h1>
        
        <input type="text" className="search-bar" placeholder="Search ..." value={couponSearch} onChange={(e)=>{setCouponSearch(e.target.value)}}/>

        <div className="table-container">
          <table>
            <thead>
              <tr className="table-header">
                <th>ID</th>
                <th>Code</th>
                <th>Type</th>
                <th>Value</th>
                <th>Minimum Required</th>
                <th>Maximum Applicable</th>
                <th>Stock</th>
                <th>Active</th>
                <th>Limit Per User</th>
                <th>Create</th>
                <th>Update</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((coupon)=>{
                if (("id=" + String(coupon.id) + " " +
                  "code=" + String(coupon.code) + " " +
                  "type=" + String(coupon.type) + " " +
                  "active=" + String(coupon.active)).toLowerCase().includes(couponSearch)) {
                    return (
                      <tr key={coupon.id}>
                        <td className="center">{coupon.id}</td>
                        <td className="left">{coupon.code}</td>
                        <td className="center">{coupon.type}</td>
                        <td className="right">{coupon.value.toLocaleString("en-US")} {formatValueType(coupon.type)}</td>
                        <td className="right">{coupon.min_order_required.toLocaleString("en-US")} VND</td>
                        <td className="right-">{coupon.max_discount_applicable.toLocaleString("en-US")} VND</td>
                        <td className="right">{coupon.stock_quantity}</td>
                        <td className="center">{formatActive(coupon.is_active)}</td>
                        <td className="right">{coupon.limit_per_user}</td>
                        <td className="center">{formatDate(coupon.created_at)}</td>
                        <td className="center">{formatDate(coupon.updated_at)}</td>
                        <td className="center" >
                          <button><EditIcon className="icon"/></button>
                        </td>
                      </tr>
                    )
                  }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) 
}

export default AdminCoupons