import React, { createContext, useState, useEffect } from "react";
import { product_database } from "./Data";
import axios from "axios";

export const PreduContext = createContext(null);

export const PreduContextProvider = (props) => {

  const [shop, updateShop] = useState([])
  const [cart, updateCart] = useState({})
  const [costTotal, updateCostTotal] = useState(0)
  const [numCartItems, updateNumCartItems] = useState(0)
  
  async function getInitialShopData() {
    const result = product_database //await axios.get('https://dummyjson.com/products/1')
    updateShop(result)
    const new_cart = {}
    for (let i=0; i<result.length; i++) {
      new_cart[result[i]["id"]] = 0
    }
    updateCart(new_cart);
  }
  
  useEffect(() => {
    getInitialShopData();
  }, []);
  
  // ====== SideBar Category Menu ===== //
  const [categoryMenuStatus, setCategoryMenuStatus] = useState(false)

  const changeCategoryMenuStatus = () => {
    setCategoryMenuStatus(!categoryMenuStatus)
  }


  // ===== Cart ===== //
  const getCost = (id) => {
    for (let i=0; i<shop.length; i++) {
      if (shop[i]["id"] === id) {
        return shop[i]["cost_per_unit"]
      }
    }
  }
  
  const setCartProductQuantity = (productID, quantity) => {
    // Update quantity in cart
    const prevQuantity = shop[productID]
    updateCart((prev) => ({...prev, [productID]: quantity}))
    // Update total cost
    const new_cost = costTotal - prevQuantity*getCost(productID) + quantity*getCost(productID)
    updateCostTotal(new_cost)
    // Change number of cart items alerts
    let count = 0
    for (let i in Object.values(cart)) {
      if (Object.values(cart)[i] !== 0) {
        count += 1
      }
    }
    updateNumCartItems(count)
  }

  const contextValue = { shop, cart, numCartItems, categoryMenuStatus, changeCategoryMenuStatus, setCartProductQuantity}
  return (
    <PreduContext.Provider value={contextValue}>
      {props.children}
    </PreduContext.Provider>
  )
}