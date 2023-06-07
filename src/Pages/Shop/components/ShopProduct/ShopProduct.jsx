import React, { useContext, useState } from "react"
import { ReactComponent as AddIcon} from '../../../../Resources/Icons/add.svg'
import { ReactComponent as RemoveIcon} from '../../../../Resources/Icons/remove.svg'
import { PreduContext } from "../../../../PreduContext"


const ShopProduct = (props) => {
  const { id, title, subtitle, desc, category, img_link, stock, cost_per_unit } = props.data;
  const [ quantity, setQuantity] = useState(0)
  const { setCartProductQuantity } = useContext(PreduContext)

  const handleChange = event => {
    if (isNaN(event.target.value)) {
      setQuantity(0)
    }
    else if (event.target.value >= 0) {
      setQuantity(event.target.value);
    }
  }

  const minus = () => {
    if (isNaN(quantity)) {
      setQuantity(0)
    }
    if (quantity > 0) {
      setQuantity(parseInt(quantity) - 1)
    }
  }

  const plus = () => {
    if (isNaN(quantity)) {
      setQuantity(0)
    }
    setQuantity(parseInt(quantity) + 1)
  }
  
  return (
    <div className="shop-product">
      <img src={img_link}></img>
      <div className="product_title">
        <h3>
          <b>{title}</b>
        </h3>
        <h4>
          <b>{subtitle}</b>
        </h4>
      </div> 
      <h4 className="product_price">
        <i><b>{cost_per_unit} VND</b></i>
      </h4>
      <p className="desc">{desc}</p>
      <div className="product_counter">
        <button className="minus" onClick={minus}>
          <RemoveIcon className="icon"/>
        </button>
        <input type="number" placeholder={quantity} min={0} value={quantity} onChange={handleChange}/>
        <button className="plus" onClick={plus}>
          <AddIcon className="icon"/>
        </button>
      </div>
      <button className="add-cart-button" onClick={() => {setCartProductQuantity(id, quantity)}}>
        {/* <AddShoppingCartIcon className="icon"/> */}
        <h3><b>ADD TO CART</b></h3>
      </button>
    </div>
  )
}

export default ShopProduct