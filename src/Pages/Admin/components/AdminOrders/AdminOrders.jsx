import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import {ReactComponent as RefreshIcon } from '../../../../Resources/Icons/refresh.svg'
import { PreduContext } from "../../../../PreduContext";
import axios from "axios";

const AdminOrders = () => {
  return (
    <div className="admin-orders">
      ADMIN ORDERS
    </div>
  ) 
}

export default AdminOrders