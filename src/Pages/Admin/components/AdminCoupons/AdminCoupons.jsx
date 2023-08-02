import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import {ReactComponent as RefreshIcon } from '../../../../Resources/Icons/refresh.svg'
import {ReactComponent as EditIcon } from '../../../../Resources/Icons/edit.svg'
import {ReactComponent as AddIcon } from '../../../../Resources/Icons/add.svg'
import {ReactComponent as ArrowUpIcon } from '../../../../Resources/Icons/arrow_upward.svg'
import {ReactComponent as ArrowDownIcon } from '../../../../Resources/Icons/arrow_downward.svg'
import { PreduContext } from "../../../../PreduContext";
import axios from "axios";

const AdminCoupons = () => {
  const location = useLocation()
  const { api_path, getAccessToken} = useContext(PreduContext)
  const [ coupons, setCoupons ] = useState(location.state.coupons)
  const [ couponSearch, setCouponSearch ] = useState("")
  const [ modalEdit, setModalEdit ] = useState(false)
  const [ modalAdd, setModalAdd ] = useState(false)
  const [ currentSelect, setCurrentSelect ] = useState(null)

  const [ code, setCode ] = useState("")
  const [ type, setType ] = useState("")
  const [ value, setValue ] = useState(0)
  const [ minOrderRequired, setMinOrderRequired ] = useState(0)
  const [ maxDiscountApplicable, setMaxDiscountApplicable ] = useState(0)
  const [ stockQuantity, setStockQuantity ] = useState(0)
  const [ isActive, setIsActive ] = useState(false)
  const [ limitPerUser, setLimitPerUser ] = useState(0)

  const selectEdit = (coupon) => {
    setCurrentSelect(coupon)
    setCode(coupon.code)
    setType(coupon.type)
    setValue(coupon.value)
    setMinOrderRequired(coupon.min_order_required)
    setMaxDiscountApplicable(coupon.max_discount_applicable)
    setStockQuantity(coupon.stock_quantity)
    setIsActive(coupon.is_active)
    setLimitPerUser(coupon.limit_per_user)
    setModalEdit(true)
  }

  const selectAdd = () => {
    setModalAdd(true)
  }

  const closeModal = () => {
    setCurrentSelect(null)
    setCode("")
    setType("")
    setValue(0)
    setMinOrderRequired(0.)
    setMaxDiscountApplicable(0)
    setStockQuantity(0)
    setIsActive(false)
    setLimitPerUser(0)
    setModalEdit(false)
    setModalAdd(false)
  }

  const update = async() => {   
    try {
      const update_api = api_path + "/api/coupons/" + String(currentSelect.id)
      const updateCoupon = {
        code: code,
        type: type,
        value: parseFloat(value),
        min_order_required: parseFloat(minOrderRequired),
        max_discount_applicable: parseFloat(maxDiscountApplicable),
        stock_quantity: parseInt(stockQuantity),
        is_active: isActive,
        limit_per_user: parseInt(limitPerUser),
      }
      const response = await axios.put(update_api, updateCoupon, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
      window.alert(response.data.message)
    } catch (e) {
      window.alert(e.response.data.detail)
    }

    refresh()
    closeModal()
  }

  const add = async() => {
    try {
      const add_api = api_path + "/api/coupons/"
      const newCoupon = {
        code: code,
        type: type,
        value: parseFloat(value),
        min_order_required: parseFloat(minOrderRequired),
        max_discount_applicable: parseFloat(maxDiscountApplicable),
        stock_quantity: parseInt(stockQuantity),
        is_active: isActive,
        limit_per_user: parseInt(limitPerUser),
      }
      const response = await axios.post(add_api, newCoupon, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
      window.alert(response.data.message)
    } catch (e) {
      window.alert(e.response.data.detail)
    }

    refresh()
    closeModal()
  }

  const deleteCoupon = async() => {
    try {
      const delete_api = api_path + "/api/coupons/" + String(currentSelect.id)
      const response = await axios.delete(delete_api, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
      window.alert(response.data.message)
    } catch(e) {
      window.alert(e.response.data.detail)
    }
  }

  const refresh = async() => {
    const coupons_api = api_path + "/api/coupons/"
    const response = await axios.get(coupons_api)
    setCoupons(response.data)
  }

  // SORT FUNCTIONS
  const sortValueAsc = () => {
    let coupons_sorted = coupons
    setCoupons(coupons_sorted.slice().sort((a, b) => a.value - b.value));
  }
  
  const sortValueDesc = () => {
    let coupons_sorted = coupons
    setCoupons(coupons_sorted.slice().sort((a, b) => b.value - a.value));
  }

  const sortMinReqAsc = () => {
    let coupons_sorted = coupons
    setCoupons(coupons_sorted.slice().sort((a, b) => a.min_order_required - b.min_order_required));
  }
  
  const sortMinReqDesc = () => {
    let coupons_sorted = coupons
    setCoupons(coupons_sorted.slice().sort((a, b) => b.min_order_required - a.min_order_required));
  }

  const sortMaxAppAsc = () => {
    let coupons_sorted = coupons
    setCoupons(coupons_sorted.slice().sort((a, b) => a.max_discount_applicable - b.max_discount_applicable));
  }
  
  const sortMaxAppDesc = () => {
    let coupons_sorted = coupons
    setCoupons(coupons_sorted.slice().sort((a, b) => b.max_discount_applicable - a.max_discount_applicable));
  }

  const sortStockAsc = () => {
    let coupons_sorted = coupons
    setCoupons(coupons_sorted.slice().sort((a, b) => a.stock_quantity - b.stock_quantity));
  }
  
  const sortStockDesc = () => {
    let coupons_sorted = coupons
    setCoupons(coupons_sorted.slice().sort((a, b) => b.stock_quantity - a.stock_quantity));
  }

  const sortLimitAsc = () => {
    let coupons_sorted = coupons
    setCoupons(coupons_sorted.slice().sort((a, b) => a.limit_per_user - b.limit_per_user));
  }
  
  const sortLimitDesc = () => {
    let coupons_sorted = coupons
    setCoupons(coupons_sorted.slice().sort((a, b) => b.limit_per_user - a.limit_per_user));
  }

  // FORMAT FUNCTIONS 
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
    if (active === true) {
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
        <h1>COUPONS ({coupons.length})</h1>
        
        <input type="text" className="search-bar" placeholder="Search ..." value={couponSearch} onChange={(e)=>{setCouponSearch(e.target.value)}}/>

        <div className="sort-btns">
          <button onClick={sortValueAsc}>Value <ArrowUpIcon className="icon"/></button>
          <button onClick={sortValueDesc}>Value <ArrowDownIcon className="icon"/></button>
          <button onClick={sortMinReqAsc}>Min Req <ArrowUpIcon className="icon"/></button>
          <button onClick={sortMinReqDesc}>Min Req <ArrowDownIcon className="icon"/></button>
          <button onClick={sortMaxAppAsc}>Max App <ArrowUpIcon className="icon"/></button>
          <button onClick={sortMaxAppDesc}>Max App <ArrowDownIcon className="icon"/></button>
        </div>

        <div className="sort-btns">
          <button onClick={sortStockAsc}>Stock <ArrowUpIcon className="icon"/></button>
          <button onClick={sortStockDesc}>Stock <ArrowDownIcon className="icon"/></button>
          <button onClick={sortLimitAsc}>Limit <ArrowUpIcon className="icon"/></button>
          <button onClick={sortLimitDesc}>Limit <ArrowDownIcon className="icon"/></button>
        </div>

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
                <th>Limit/User</th>
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
                  "value=" + String(coupon.value) + String(formatValueType(coupon.type)) + " " +
                  "active=" + String(formatActive(coupon.is_active))).toLowerCase().includes(couponSearch)) {
                    return (
                      <tr key={coupon.id}>
                        <td className="center">{coupon.id}</td>
                        <td className="left">{coupon.code}</td>
                        <td className="center">{coupon.type}</td>
                        <td className="right">{coupon.value.toLocaleString("en-US")} {formatValueType(coupon.type)}</td>
                        <td className="right">{coupon.min_order_required.toLocaleString("en-US")} VND</td>
                        <td className="right-">{coupon.max_discount_applicable.toLocaleString("en-US")} VND</td>
                        <td className="right">{coupon.stock_quantity.toLocaleString("en-US")}</td>
                        <td className="center">{formatActive(coupon.is_active)}</td>
                        <td className="right">{coupon.limit_per_user}</td>
                        <td className="center">{formatDate(coupon.created_at)}</td>
                        <td className="center">{formatDate(coupon.updated_at)}</td>
                        <td className="center" onClick={()=>{selectEdit(coupon)}}>
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

      <div className="btns-container">
        <button onClick={selectAdd}>
          <AddIcon className="icon"/>
        </button>
        <button onClick={refresh}>
          <RefreshIcon className="icon"/>
        </button>
      </div>

      {modalEdit && (
        <div className="modal">
          <div className="overlay" onClick={closeModal}></div>
          <div className="modal-content">
            <h2>Edit Coupon {currentSelect.id}</h2>
            
            <form>
              <table>
                <tbody>
                  <tr>
                    <td colSpan={2}><label htmlFor="code">Code</label></td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input type="text" id="code" value={code} onChange={(e)=>setCode(e.target.value)}
                      placeholder={currentSelect.code}/>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="type">Type</label></td>
                    <td><label htmlFor="value">Value</label></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" id="type" value={type} onChange={(e)=>setType(e.target.value)}
                      placeholder={currentSelect.type}/>
                    </td>
                    <td>
                      <input type="number" id="value" value={value} onChange={(e)=>setValue(e.target.value)}
                      placeholder={currentSelect.value}/>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="min_req">Min Required</label></td>
                    <td><label htmlFor="max_app">Max Applicable</label></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="number" id="min_req" value={minOrderRequired} onChange={(e)=>setMinOrderRequired(e.target.value)}
                      placeholder={currentSelect.min_order_required}/>
                    </td>
                    <td>
                      <input type="number" id="max_app" value={maxDiscountApplicable} onChange={(e)=>setMaxDiscountApplicable(e.target.value)}
                      placeholder={currentSelect.max_discount_applicable}/>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="limit_user">Limit / User</label></td>
                    <td><label htmlFor="stock">Stock</label></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="number" id="limit_user" value={limitPerUser} onChange={(e)=>setLimitPerUser(e.target.value)}
                      placeholder={currentSelect.limit_per_user}/>
                    </td>
                    <td>
                      <input type="number" id="stock" value={stockQuantity} onChange={(e)=>setStockQuantity(e.target.value)}
                      placeholder={currentSelect.stock_quantity}/>
                    </td>
                  </tr>
                  <tr>
                    <td className="active"><label htmlFor="is-active">Active</label></td>
                    <td className="active">
                      <input type="checkbox" checked={isActive} onChange={(e)=>setIsActive(!isActive)}/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>

            <div className="buttons-container">
              <button className="update" onClick={update}>Update</button>
              <button className="delete" onClick={deleteCoupon}>Delete</button>
            </div>
          </div>
        </div>
      )}
      
      {modalAdd && (
        <div className="modal">
          <div className="overlay" onClick={closeModal}></div>
          <div className="modal-content">
            <h2>New Coupon</h2>
            
            <form>
              <table>
                <tbody>
                  <tr>
                    <td colSpan={2}><label htmlFor="code">Code</label></td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input type="text" id="code" value={code} onChange={(e)=>setCode(e.target.value)}/>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="type">Type</label></td>
                    <td><label htmlFor="value">Value</label></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" id="type" value={type} onChange={(e)=>setType(e.target.value)}/>
                    </td>
                    <td>
                      <input type="number" id="value" value={value} onChange={(e)=>setValue(e.target.value)}/>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="min_req">Min Required</label></td>
                    <td><label htmlFor="max_app">Max Applicable</label></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="number" id="min_req" value={minOrderRequired} onChange={(e)=>setMinOrderRequired(e.target.value)}/>
                    </td>
                    <td>
                      <input type="number" id="max_app" value={maxDiscountApplicable} onChange={(e)=>setMaxDiscountApplicable(e.target.value)}/>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="limit_user">Limit / User</label></td>
                    <td><label htmlFor="stock">Stock</label></td>
                  </tr>
                  <tr>
                    <td>
                      <input type="number" id="limit_user" value={limitPerUser} onChange={(e)=>setLimitPerUser(e.target.value)}/>
                    </td>
                    <td>
                      <input type="number" id="stock" value={stockQuantity} onChange={(e)=>setStockQuantity(e.target.value)}/>
                    </td>
                  </tr>
                  <tr>
                    <td className="active"><label htmlFor="is-active">Active</label></td>
                    <td className="active">
                      <input type="checkbox" checked={isActive} onChange={(e)=>setIsActive(!isActive)}/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>

            <div className="buttons-container">
              <button className="update" onClick={add}>Create</button>
            </div>
          </div>
        </div>
      )}

    </div>
  ) 
}

export default AdminCoupons