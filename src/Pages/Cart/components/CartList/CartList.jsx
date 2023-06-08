import React, { useContext } from "react";
import { PreduContext } from "../../../../PreduContext";
import CartProduct from "../CartProduct/CartProduct";

const CartList = () => {
  const { cart, shop } = useContext(PreduContext)
  
  return (
    <div className="cart-list">
      <table>
        <thead>
          <tr className="table-header">
            <th colspan="2">
              PRODUCT
            </th>
            <th>
              PRODUCT COST
            </th>
            <th>
              PRODUCT QUANTITY
            </th>
            <th>
              TOTAL COST
            </th>
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
  )
}

export default CartList