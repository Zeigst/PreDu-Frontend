import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ReactComponent as AddIcon} from '../../../../Resources/Icons/add.svg'
import { ReactComponent as RemoveIcon} from '../../../../Resources/Icons/remove.svg'
import { ReactComponent as InfoIcon} from '../../../../Resources/Icons/info.svg'
import { ReactComponent as AddCartIcon} from '../../../../Resources/Icons/add_shopping_cart.svg'
import { PreduContext } from "../../../../PreduContext"


const ShopProduct = (props) => {
  let navigate = useNavigate();
  const { id, title, subtitle, desc, category, img_link, stock, cost_per_unit } = props.data;
  const { cart, setCartProductQuantity } = useContext(PreduContext)
  const [ quantity, setQuantity] = useState(cart[id])

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

  const toProductDetails = () => {
    navigate('/Product', {
      state : {
          id: id,
          title: title,
          subtitle: subtitle,
          desc: desc,
          category: category,
          img_link: img_link,
          stock: stock,
          cost_per_unit: cost_per_unit
      },
  });
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
      
      <div className="buttons">
        <button className="product-detail-button" onClick={toProductDetails}>
          <InfoIcon className="icon"/> 
          <h3><b>Details</b></h3>
        </button>
        <button className="add-cart-button" onClick={() => {setCartProductQuantity(id, quantity)}}>
          <AddCartIcon className="icon"/>
          <h3><b>Cart</b></h3>
        </button>
      </div>
    </div>
  )
}

export default ShopProduct