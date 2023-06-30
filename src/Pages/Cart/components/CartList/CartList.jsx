import React, { useContext } from "react";
import { PreduContext } from "../../../../PreduContext";
import CartProduct from "../CartProduct/CartProduct";
import image from "../../../../Resources/6844076.jpg"

const CartList = () => {
  const { cart, shop, costTotal, numCartItems } = useContext(PreduContext)

  function CartEmpty(props) {
    const numCartItems = props.numCartItems;
    if (numCartItems === 0) {
      return (
        <div className="empty-cart-alert">
          <img src={image}></img>
          <h2>Oops! Your Cart is Empty.</h2>
        </div>
      )
    }
  }
  
  return (
    <div className="cart-list">
      <div className="table-container">
        <table>
          <thead>
            <tr className="table-header">
              <th colSpan="3" >PRODUCT</th>
              <th >COST</th>
              <th >QUANTITY</th>
              <th >TOTAL</th>
              <th></th>
            </tr>
            <tr className="table-header-responsive">
              <th colSpan={7}>YOUR CART</th>
            </tr>
          </thead>
          
          <tbody className="cart-list_products">          
            {shop.map((product) => {
              if (cart[product.id] !== 0) {
                return <CartProduct data={product} key={product.id}/>
              }
            })}
          </tbody>
        </table>
      </div>

      <CartEmpty numCartItems={numCartItems}/>

      <div className="table-footer">
        <h2>Items: {numCartItems}</h2>
        <h2>Your Cart: {costTotal.toLocaleString("en-US")} VND</h2>
      </div>
      <div className="table-footer responsive">
        <h2>TOTAL:</h2>
        <h2>{costTotal.toLocaleString("en-US")} VND</h2>
      </div>
    </div>
  )
}

export default CartList