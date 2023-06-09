import React, { createContext, useState, useEffect } from "react";
import { product_database } from "./Data";
import axios from "axios";

export const PreduContext = createContext(null);

export const PreduContextProvider = (props) => {

  const [shop, updateShop] = useState([])
  const [cart, updateCart] = useState({})
  const [costTotal, updateCostTotal] = useState(0)
  const [numCartItems, updateNumCartItems] = useState(0)
  const [productSearchQuery, updateProductSearchQuery] = useState("")
  
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

  const [selectCategory, updateSelectCategory] = useState("all")

  const changeSelectCategory = (new_category) => {
    window.scrollTo(0, 0);
    if (categoryMenuStatus) {
      changeCategoryMenuStatus();
    }
    updateProductSearchQuery("")
    updateSelectCategory(new_category);
  }

  const searchProduct = (user_input) => {
    window.scrollTo(0, 0);
    if (categoryMenuStatus) {
      changeCategoryMenuStatus();
    }
    updateProductSearchQuery(user_input);
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
    const prevQuantity = cart[productID]
    const newCart = cart
    newCart[productID] = quantity
    
    // Update total cost
    const new_cost = costTotal - prevQuantity*getCost(productID) + quantity*getCost(productID)
    
    // Change number of cart items alerts
    let count = 0
    for (let i in Object.values(cart)) {
      if (Object.values(cart)[i] !== 0) {
        count += 1
      }
    }
    updateNumCartItems(count)

    // UPDATE STATE
    updateCart(newCart)
    updateCostTotal(new_cost)
    updateNumCartItems(count)
  }

  // ===== UTIL ===== //
  // function numberWithCommas(x) {
  //   var parts = x.toString().split(".");
  //   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   return parts.join(".");
  // }

  const contextValue = { 
    shop, cart, numCartItems, costTotal, setCartProductQuantity,
    categoryMenuStatus, changeCategoryMenuStatus, 
    selectCategory, changeSelectCategory,
    productSearchQuery, searchProduct,
  }
  return (
    <PreduContext.Provider value={contextValue}>
      {props.children}
    </PreduContext.Provider>
  )
}