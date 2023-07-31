import React, { useContext, useState } from "react"
import {ReactComponent as MenuIcon} from '../../../../Resources/Icons/menu.svg'
import { ReactComponent as CloseIcon } from '../../../../Resources/Icons/close.svg';
import { useNavigate } from "react-router-dom";
import { PreduContext } from "../../../../PreduContext";
import axios from "axios";

const AdminHeader = () => {
  const navigate = useNavigate()
  const { api_path , getAccessToken } = useContext(PreduContext)
  
  
  const [isOpen, setOpen] = useState("false");
  
  function toggleMenu() {
    setOpen(!isOpen);
  }

  const toProfile = () => {
    navigate('/Admin')
    setOpen("false")
  }

  const toAdminUsers = async() => {
    const users_api = api_path + "/api/users/"
    const response = await axios.get(users_api, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
    navigate('/Admin/Users', {
      state : {
        users : response.data
      }
    })
    setOpen("false")
  }

  const toAdminProducts = () => {
    navigate('/Admin/Products')
    setOpen("false")
  }

  const toAdminCoupons = async() => {
    const coupons_api = api_path + "/api/coupons/"
    const response = await axios.get(coupons_api)
    navigate('/Admin/Coupons', {
      state : {
        coupons: response.data
      }
    })
    setOpen("false")
  }

  const toAdminOrders = async() => {
    const orders_api = api_path + "/api/orders/"
    const response = await axios.get(orders_api, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
    navigate('/Admin/Orders', {
      state : {
        orders: response.data
      }
    })
    setOpen("false")
  }
  
  return (
    <header className="admin-header">
      <div className={`container ${isOpen ? "" : "open"}`}>
        
        <nav className="navigation">
          <ul className="menu-list">
            <li className="menu-item" onClick={toProfile}>
              <h2>Profile</h2>
            </li>
            <li className="menu-item" onClick={toAdminUsers}>
              <h2>Users</h2>
            </li>
            <li className="menu-item" onClick={toAdminProducts}>
              <h2>Products</h2>
            </li>
            <li className="menu-item" onClick={toAdminCoupons}>
              <h2>Coupons</h2>
            </li>
            <li className="menu-item" onClick={toAdminOrders}>
              <h2>Orders</h2>
            </li>
          </ul>
        </nav>

      </div>

      <div className="responsive-buttons">
        <button className={`menu-button ${isOpen ? "" : "open"}`} onClick={toggleMenu} type="button">
          <MenuIcon className="menu-icon"/>
          <CloseIcon className="close-icon"/>
        </button>
      </div>
    </header>
  )
}

export default AdminHeader