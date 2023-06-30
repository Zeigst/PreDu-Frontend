import React, { createContext, useState, useEffect } from "react";
import { product_database } from "./Data";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const PreduContext = createContext(null);

export const PreduContextProvider = (props) => {

  const api_path = "http://10.18.0.75:8000"

  const [authenticated, setAuthenticated] = useState(false)
  const [onSignupPage, setOnSignupPage] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [categories, updateCategories] = useState([])
  const [brands, updateBrands] = useState([])
  const [shop, updateShop] = useState([])
  const [cart, updateCart] = useState({})
  
  const [numCartItems, updateNumCartItems] = useState(0)
  const [productSearchQuery, updateProductSearchQuery] = useState("")
  const [ menuState, setMenuState] = useState([])
  
  async function getInitialShopData() {
    const brands_result = await (await axios.get(api_path + "/api/brands/")).data

    const categories_result = await (await axios.get(api_path + "/api/categories/")).data
    for (let i in categories_result) {
      let brand_ids = await (await axios.get(api_path + "/api/categories/brands/" + String(categories_result[i]["id"]))).data;
      categories_result[i]["brand_ids"] = brand_ids
      let brands = []
      for (let n in brand_ids) {
        brands.push(_getNameByID(brands_result, brand_ids[n]))
      }
      categories_result[i]["brands"] = brands
    }

    const products_result = await (await axios.get(api_path + "/api/products/")).data
    for (let i in products_result) {
      products_result[i]["category"] = _getNameByID(categories_result, products_result[i]["category_id"]);
      products_result[i]["brand"] = _getNameByID(brands_result, products_result[i]["brand_id"])
    }

    updateCategories(categories_result)
    updateBrands(brands_result)
    updateShop(products_result)
    const new_cart = {}
    for (let i=0; i<products_result.length; i++) {
      new_cart[products_result[i]["id"]] = 0
    }
    updateCart(new_cart);
    
    const newMenuState = []
    for (let i=0; i<categories_result.length; i++) {
      newMenuState.push(false)
    }
    setMenuState(newMenuState)

    if (Cookies.get('access_token')) {
      const profile_api_path = api_path + "/api/auth/me"
      const me_response = await axios.get(profile_api_path, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}});
      const user = me_response.data
      const masked_password = "********";
      user.password = masked_password
      setCurrentUser(user)
      setAuthenticated(true)
      
      getOrderHistory()
    }
  }
  
  useEffect(() => {
    getInitialShopData();
  }, []);

  // ====== Access Token ===== //
  const getAccessToken = () => {
    return (Cookies.get('access_token'));
  }

  // ====== UTIL ===== //
  const _getNameByID = (array, id) => {
    for (let i in array) {
      if (array[i]["id"] === id) {
        return array[i]["name"]
      }
    }
    return ""
  }
  
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

  // ===== ORDERS ===== //
  const [ orderHistory, setOrderHistory ] = useState([])
  
  const getOrderHistory = async() => {
    const orders_api = api_path + "/api/orders/"
    const response = await axios.get(orders_api, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
    setOrderHistory(response.data)
  }


  // ===== COUPON ===== //
  
  const [ coupon, setCoupon ] = useState(
    {
      "code": "",
      "min_order_required": 0,
      "max_discount_applicable": 0
    })
  const [ couponValue, setCouponValue ] = useState(0)
  const [ couponMessage, setCouponMessage ] = useState("No Coupon Applied")

  const applyCoupon = (totalCost, coupon) => {
    let value = 0
    let couponValid = false

    if (coupon.code === "") {
      setCouponMessage("No Coupon Applied")
    }
    else if (!coupon.is_active) {
      setCouponMessage("This coupon code is no longer active.")
    }
    else if (totalCost < coupon.min_order_required) {
      setCouponMessage("Min spend does not reach.")
    }
    else {
      couponValid = true
      setCouponMessage("Coupon Applied")
    }
    

    if (couponValid) {
      if (coupon.type === "fixed") {
        value = coupon.value
      }
      else if (coupon.type === "percentage") {
        value = totalCost / 100 * coupon.value
        if (value >= coupon.max_discount_applicable) {
          value = coupon.max_discount_applicable
        }
      }
      if (value >= totalCost) {
        value = totalCost
      }
    }
    else {
      value = 0
    }

    setCouponValue(value)
    updateCostFinal(totalCost - value)
  }


  // ===== Cart ===== //
  const [costTotal, updateCostTotal] = useState(0)
  const [costFinal, updateCostFinal] = useState(0)

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

    applyCoupon(new_cost, coupon)

    // UPDATE STATE
    updateCart(newCart)
    updateCostTotal(new_cost)
    updateNumCartItems(count)
  }

  const isCartEmpty = () => {
    if (cart === {}) {
      return true
    }
    const cartEmpty = Object.values(cart).every(value => value === 0);
    return cartEmpty
  }

  const reset = () => {
    const new_cart = {}
    for (let i=0; i<shop.length; i++) {
      new_cart[shop[i]["id"]] = 0
    }
    updateCart(new_cart);
    setCoupon({
      "code": "",
      "min_order_required": 0,
      "max_discount_applicable": 0
    })
    setCouponValue(0)
    updateCostFinal(0)
    updateCostTotal(0)
    updateNumCartItems(0)
    setCouponMessage("No Coupon Applied")
    getOrderHistory()
  }

  const contextValue = { 
    api_path, getAccessToken,
    currentUser, setCurrentUser,
    authenticated, setAuthenticated,
    onSignupPage, setOnSignupPage,
    categories,
    shop, cart, numCartItems, costTotal, costFinal, setCartProductQuantity, isCartEmpty,
    coupon, couponValue, couponMessage, setCoupon, applyCoupon,
    categoryMenuStatus, changeCategoryMenuStatus, 
    selectCategory, changeSelectCategory,
    productSearchQuery, searchProduct,
    menuState, setMenuState,
    orderHistory, getOrderHistory,
    reset
  }
  return (
    <PreduContext.Provider value={contextValue}>
      {props.children}
    </PreduContext.Provider>
  )
}