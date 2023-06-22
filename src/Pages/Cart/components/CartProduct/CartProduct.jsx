import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PreduContext } from "../../../../PreduContext";
import { ReactComponent as MinusIcon } from "../../../../Resources/Icons/remove.svg"
import { ReactComponent as PlusIcon } from "../../../../Resources/Icons/add.svg"
import { ReactComponent as InfoIcon } from "../../../../Resources/Icons/info.svg"

const CartProduct = (props) => {
  const navigate = useNavigate()
  const { id, category, category_id, brand, brand_id, name, description, image, stock_quantity, cost_per_unit } = props.data;
  const { cart, setCartProductQuantity } = useContext(PreduContext)
  const [ quantity, setQuantity] = useState(cart[id])
  const [ costTotal, setCostTotal] = useState(cart[id] * cost_per_unit)

  const removeProduct = () => {
    setCartProductQuantity(id, 0)
  }

  const plus = () => {
    setCartProductQuantity(id, quantity + 1)
    setQuantity(cart[id])
    setCostTotal(cart[id] * cost_per_unit)
  }

  const minus = () => {
    setCartProductQuantity(id, quantity - 1)
    setQuantity(cart[id])
    setCostTotal(cart[id] * cost_per_unit)
  }

  const toProductDetails = () => {
    navigate('/Product', {
      state : {
        id: id,
        name: name,
        brand: brand,
        brand_id: brand_id,
        category: category,
        category_id: category_id,
        description: description,
        image: image,
        stock_quantity: stock_quantity,
        cost_per_unit: cost_per_unit
      },
  });
  }
  
  return (
    <tr className="cart-product">
      <td style={{width: "10%"}}>
        <img src={image}></img>
      </td>
      <td style={{width: "20%"}}>
        <div className="product-title">
          <h3>{name}</h3>
        </div>
      </td>
      <td style={{width: "2%"}} className="info-button-td">
        <button className="info-button" onClick={toProductDetails}>
          <InfoIcon className="icon"/>
        </button>
      </td>
      <td style={{width: "15%"}}>
        <p className="cost">{cost_per_unit.toLocaleString("en-US")} VND</p>
      </td>
      <td style={{width: "20%"}}>
        <div className="product-counter">
          <button className="minus-button" onClick={minus}>
            <MinusIcon className="icon"/>
          </button>
          <input type="number" min={1} value={quantity} readOnly/>
          <button className="plus-button" onClick={plus}>
            <PlusIcon className="icon"/>
          </button>
        </div>
      </td>
      <td style={{width: "15%"}}>
        <p className="cost">{costTotal.toLocaleString("en-US")} VND</p>
      </td>
      <td style={{width: "18%"}}>
        <button className="remove-button" onClick={()=>{removeProduct()}}><b>Remove</b></button>
      </td>
    </tr>
  )
}

export default CartProduct