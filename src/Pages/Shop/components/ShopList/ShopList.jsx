import React, { useContext , useState} from "react"
import { PreduContext } from "../../../../PreduContext"
import ShopProduct from "../ShopProduct/ShopProduct"

const ShopList = () => {
  const { shop, selectCategory, productSearchQuery} = useContext(PreduContext);
  // const [title, setTitle] = useState("All")
  return (
    <div className="shop-list">
      <h3 className="shop-list_title">{selectCategory}</h3>
      <div className="shop-list_products">
        {shop.map((product) => {
          if (productSearchQuery !== "") {
            if ((String(product.name) + " " +
              String(product.brand) + " " +
              String(product.category) + " " +
              String(product.cost_per_unit)).toLowerCase().includes(productSearchQuery)) {
                return <ShopProduct data={product} key={product.id}/>
              }
          }
          else{
            if (selectCategory === "all") {
              return <ShopProduct data={product} key={product.id}/>
            }
            else {
              if (selectCategory === product.brand) {
                return <ShopProduct data={product} key={product.id}/>
              }
            }
          }
        })}
          
      </div>
    </div>
  )
}

export default ShopList