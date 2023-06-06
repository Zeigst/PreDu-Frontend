import React, { createContext, useState } from "react";
import { product_database } from "./Data";

export const PreduContext = createContext(null);

export const PreduContextProvider = (props) => {

  const [categoryMenuStatus, setCategoryMenuStatus] = useState(false)

  const changeCategoryMenuStatus = () => {
    setCategoryMenuStatus(!categoryMenuStatus)
  }

  const contextValue = { categoryMenuStatus, changeCategoryMenuStatus}
  return (
    <PreduContext.Provider value={contextValue}>
      {props.children}
    </PreduContext.Provider>
  )
}