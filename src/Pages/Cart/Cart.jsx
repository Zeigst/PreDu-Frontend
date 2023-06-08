import React, { useContext } from "react"
import { PreduContext } from "../../PreduContext"
import CartList from "./components/CartList/CartList"
import PurchaseController from "./components/PurchaseController/PurchaseController"

const Cart = () => {
  const { cart, shop } = useContext(PreduContext)
  
  return (
    <main className="cart">
      <CartList/>
      <PurchaseController/>
    </main>
  )
}

export default Cart