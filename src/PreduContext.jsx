import React, { createContext, useState } from "react";
import { product_database } from "./Data";
import { Shop } from './Classes/Shop'
import { Product } from "./Classes/Product";


export const PreduContext = createContext(null);

export const PreduContextProvider = (props) => {
  const shop = new Shop()
  
  for (let product in product_database) {
    const product_obj = new Product(
      product["id"], 
      product["title"], 
      product["subtitle"], 
      product["desc"], 
      product["img_link"], 
      product["category"], 
      product["cost"],
      product["stock"]
    )
    shop.add(product_obj)
  }

  const [shopContext, updateShopContext] = useState(shop)

  const updateCart = (product_id, cart_quantity) => {
    shop.updateCart(product_id, cart_quantity)
    updateShopContext(shop)
  }

  const contextValue = { shop, shopContext, updateCart }
  return (
    <PreduContext.Provider value={contextValue}>
      {props.children}
    </PreduContext.Provider>
  )
}