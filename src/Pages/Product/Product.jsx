import React, { useContext, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ReactComponent as MinusIcon } from "../../Resources/Icons/remove.svg"
import { ReactComponent as PlusIcon } from "../../Resources/Icons/add.svg"
import { ReactComponent as AddCartIcon } from "../../Resources/Icons/add_shopping_cart.svg"
import { ReactComponent as UndoIcon } from "../../Resources/Icons/undo.svg"
import { PreduContext } from "../../PreduContext"




const Product = () => {
  const location = useLocation()
  const navigate = useNavigate()

  let id= location.state.id
  let name = location.state.name
  let brand = location.state.brand
  let brand_id = location.state.brand_id
  let category = location.state.category
  let category_id = location.state.category_id
  let description = location.state.description
  let image = location.state.image
  let stock_quantity = location.state.stock_quantity
  let cost_per_unit =location.state. cost_per_unit


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

  const toShop = () => {
    window.scrollTo(0, 0)
    navigate("/Shop")
  }


  return (
    <main className="product">
      <div className="container">
        <img src={image} className="product-img"></img>

        <div className="details">
          <h1 className="name">{name}</h1>
          <table className="cb-table">
            <tbody>
              <tr>
                <th>CATEGORY</th>
                <td>{category}</td>
              </tr>
              <tr>
                <th>BRAND</th>
                <td>{brand}</td>
              </tr>
            </tbody>
          </table>

          <div className="description">
            <h2>Description</h2>
            <p>{description}</p>
          </div>

          <table className="cb-table">
            <tbody>
              <tr>
                <th>IN STOCK</th>
                <td>{stock_quantity.toLocaleString("en-US")}</td>
              </tr>
              <tr>
                <th>PRICE</th>
                <td>{cost_per_unit.toLocaleString("en-US")} VND</td>
              </tr>
            </tbody>
          </table>

          <div className="counter">
            <button onClick={minus}><MinusIcon className="icon"/></button>
            <input type="number" placeholder={quantity} min={0} value={quantity} onChange={handleChange}/>
            <button onClick={plus}><PlusIcon className="icon"/></button>
          </div>

          <div className="buttons">
            <button className="back-btn" onClick={toShop}>
              <UndoIcon className="icon"/>
              SHOP
            </button>
            <button className="cart-btn" onClick={() => {setCartProductQuantity(id, quantity)}}>
              <AddCartIcon className="icon"/>
              CART
            </button>
          </div>
        </div>

        
      </div>
    
    </main>
  )
}

export default Product