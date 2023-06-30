import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PreduContext } from "../../../../PreduContext";
import { ReactComponent as MinusIcon } from "../../../../Resources/Icons/remove.svg"
import { ReactComponent as PlusIcon } from "../../../../Resources/Icons/add.svg"
import { ReactComponent as InfoIcon } from "../../../../Resources/Icons/info.svg"
import { ReactComponent as CloseIcon } from "../../../../Resources/Icons/close.svg"

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
      <td className="img-td">
        <img src={image}></img>
      </td>
      <td className="name-td">
        <div className="product-title">
          <h3>{name}</h3>
        </div>
      </td>
      <td className="info-button-td">
        <button className="info-button" onClick={toProductDetails}>
          <InfoIcon className="icon"/>
        </button>
      </td>
      <td className="cost-td">
        <p className="cost">{cost_per_unit.toLocaleString("en-US")} VND</p>
      </td>
      <td className="counter-td">
        <div className="product-counter">
          <button className="minus-button" onClick={minus}>
            <MinusIcon className="icon"/>
          </button>
          <input type="number" min={1} value={quantity} readOnly/>
          <button className="plus-button" onClick={plus}>
            <PlusIcon className="icon"/>
          </button>
          <div className="text">x {quantity}</div>
        </div>
      </td>
      <td className="cost-total-td">
        <p className="cost">{costTotal.toLocaleString("en-US")} VND</p>
      </td>
      <td className="close-td">
        <button className="remove-button" onClick={()=>{removeProduct()}}>
          <CloseIcon className="close-icon"/>
        </button>
      </td>
    </tr>
  )
}

export default CartProduct