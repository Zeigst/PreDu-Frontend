import React, { useContext, useState } from "react";
import { PreduContext } from "../../../../PreduContext";
import { ReactComponent as MinusIcon } from "../../../../Resources/Icons/remove.svg"
import { ReactComponent as PlusIcon } from "../../../../Resources/Icons/add.svg"

const CartProduct = (props) => {
  const { id, title, subtitle, desc, category, img_link, stock, cost_per_unit } = props.data;
  const { cart } = useContext(PreduContext)
  const [ quantity, setQuantity] = useState(cart[id])
  const [ costTotal, setCostTotal] = useState(cart[id] * cost_per_unit)
  
  return (
    <tr className="cart-product">
      <td>
        <img src={img_link}></img>
      </td>
      <td>
        <div>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
        </div>
      </td>
      <td>
        <p>{cost_per_unit}</p>
      </td>
      <td>
        <div className="product-counter">
          <button className="minus-button">
            <MinusIcon className="icon"/>
          </button>
          <input type="number" min={1} value={quantity}/>
          <button className="plus-button">
            <PlusIcon className="icon"/>
          </button>
        </div>
      </td>
      <td>
        <p>{costTotal}</p>
      </td>
      <td>
        <button>Remove</button>
      </td>
    </tr>
  )
}

export default CartProduct