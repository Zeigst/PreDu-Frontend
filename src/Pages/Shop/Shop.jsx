import React from "react"
import CategoryMenu from "./components/CategoryMenu/CategoryMenu"
import ShopList from "./components/ShopList/ShopList"

const Shop = () => {
  return (
    <main className="shop">
      <CategoryMenu/>
      <ShopList/>
    </main>
  )
}

export default Shop