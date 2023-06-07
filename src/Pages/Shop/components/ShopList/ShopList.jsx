import React, { useContext , useState} from "react"
import { PreduContext } from "../../../../PreduContext"
import ShopProduct from "../ShopProduct/ShopProduct"

const ShopList = () => {
  const { shop } = useContext(PreduContext);
  const [title, setTitle] = useState("All")
  return (
    <div className="shop-list">
      <h3 className="shop-list_title">Category - {title}</h3>
      <div className="shop-list_products">
        {shop.map((product) => (
            <ShopProduct data={product} key={product.id}/>
          ))}
      </div>
    </div>
  )
}

export default ShopList