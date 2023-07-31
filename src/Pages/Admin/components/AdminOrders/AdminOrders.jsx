import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {ReactComponent as ForwardIcon } from '../../../../Resources/Icons/arrow_forward.svg'
import {ReactComponent as ArrowUpIcon } from '../../../../Resources/Icons/arrow_upward.svg'
import {ReactComponent as ArrowDownIcon } from '../../../../Resources/Icons/arrow_downward.svg'
import { PreduContext } from "../../../../PreduContext";
import axios from "axios";

const AdminOrders = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { api_path, getAccessToken } = useContext(PreduContext)
  const [ orders, setOrders ] = useState(location.state.orders)
  const [ orderSearch, setOrderSearch ] = useState("")


  const sortCostAsc = () => {
    let orders_sorted = orders
    setOrders(orders_sorted.slice().sort((a, b) => a.final_total_cost - b.final_total_cost));
  }
  
  const sortCostDesc = () => {
    let orders_sorted = orders
    setOrders(orders_sorted.slice().sort((a, b) => b.final_total_cost - a.final_total_cost));
  }

  const sortCreateAsc = () => {
    let orders_sorted = orders.slice().sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateA - dateB;
    });
  
    setOrders(orders_sorted);
  };

  const sortCreateDesc = () => {
    let orders_sorted = orders.slice().sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    });
  
    setOrders(orders_sorted);
  };

  const sortUpdateAsc = () => {
    let orders_sorted = orders.slice().sort((a, b) => {
      const dateA = a.updated_at ? new Date(a.updated_at) : new Date(0);
      const dateB = b.updated_at ? new Date(b.updated_at) : new Date(0);
      return dateA - dateB;
    });
  
    setOrders(orders_sorted);
  };
  
  const sortUpdateDesc = () => {
    let orders_sorted = orders.slice().sort((a, b) => {
      const dateA = a.updated_at ? new Date(a.updated_at) : new Date(0);
      const dateB = b.updated_at ? new Date(b.updated_at) : new Date(0);
      return dateB - dateA;
    });
  
    setOrders(orders_sorted);
  };

  const toOrderDetails = async(order) => {
    const order_api = api_path + "/api/orders/" + String(order.id)
    try {
      const response = await axios.get(order_api, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
      navigate('/Admin/OrderDetails', {
        state: {
          order: response.data
        }
      })
    } catch (e) {
      window.alert(e.response.data.detail)
    }
  }

  
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
  
  return (
    <div className="admin-orders">
      <div className="container">
        <h1>ORDERS ({orders.length})</h1>
        
        <input type="text" className="search-bar" placeholder="Search ..." value={orderSearch} onChange={(e)=>{setOrderSearch(e.target.value)}}/>
        
        <div className="sort-btns">
          <button onClick={sortCostAsc}>Cost <ArrowUpIcon className="icon"/></button>
          <button onClick={sortCostDesc}>Cost <ArrowDownIcon className="icon"/></button>
          <button onClick={sortCreateAsc}>Create <ArrowUpIcon className="icon"/></button>
          <button onClick={sortCreateDesc}>Create <ArrowDownIcon className="icon"/></button>
          <button onClick={sortUpdateAsc}>Update <ArrowUpIcon className="icon"/></button>
          <button onClick={sortUpdateDesc}>Update <ArrowDownIcon className="icon"/></button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr className="table-header">
                <th>ID</th>
                <th>Status</th>
                <th>User ID</th>
                <th>User Name</th>
                <th>Cost</th>
                <th>Create</th>
                <th>Update</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order)=>{
                if (("id=" + String(order.id) + " " + 
                  "status=" + String(order.status) + " " +
                  "user_id=" + String(order.user_id) + " " +
                  "username=" + String(order.user_firstname) + " " + String(order.user_lastname)).toLowerCase().includes(orderSearch)) {
                    return (
                      <tr key={order.id}>
                        <td className="center">{order.id}</td>
                        <td className="center">{order.status}</td>
                        <td className="center">{order.user_id}</td>
                        <td className="left">{order.user_firstname} {order.user_lastname}</td>
                        <td className="right">{order.final_total_cost.toLocaleString("en-US")} VND</td>
                        <td className="center">{formatDate(order.created_at)}</td>
                        <td className="center">{formatDate(order.updated_at)}</td>
                        <td className="center">
                          <button onClick={()=>{toOrderDetails(order)}}>
                            <ForwardIcon className="icon"/>
                          </button>
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

export default AdminOrders