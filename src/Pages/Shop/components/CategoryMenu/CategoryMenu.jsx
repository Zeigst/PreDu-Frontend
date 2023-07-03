import React, { useContext, useState } from "react"
import { PreduContext } from "../../../../PreduContext";
import { ReactComponent as SearchIcon } from "../../../../Resources/Icons/seacrh.svg";
import { ReactComponent as DropdownIcon } from "../../../../Resources/Icons/arrow_drop_down.svg";
import { ReactComponent as ArrowCircleRightIcon } from "../../../../Resources/Icons/arrow_circle_right.svg";

import { education_categories, entertainment_categories, office_categories } from "../../../../Data";

const CategoryMenu = () => {
  const { categories, categoryMenuStatus, changeSelectFilter, searchProduct, menuState, setMenuState } = useContext(PreduContext)
  const [ userSearchInput, setUserSearchInput] = useState("")

  function handleMenuState(position) {
    if (menuState[position] === false) {
      const new_state = []
      for (let i=0; i<menuState.length; i++) {
        new_state.push(false)
      }
      new_state[position] = true
      setMenuState(new_state)
    }
    else if (menuState[position] === true) {
      const new_state2 = []
      for (let i=0; i<menuState.length; i++) {
        new_state2.push(false)
      }
      setMenuState(new_state2)
    }
  }

  const handleInputChange = event => {
    setUserSearchInput(event.target.value)
  }

  window.addEventListener("scroll", function() {
    var selection = document.querySelector('.category-menu') !== null;
    if (selection) {
      document.querySelector(".category-menu").classList.toggle("sticky", window.scrollY > 0)
    }
  })

  const selectAll = () => {
    changeSelectFilter("all", "all")
  }

  return (
    <div className={`category-menu ${categoryMenuStatus ? "open" : ""}`}>
      
      <h3>Search</h3>
      <form className="search-box">
        <input type="text" className="search-input" placeholder="What are you looking for?" value={userSearchInput} onChange={handleInputChange}></input>
        <button type="button" onClick={()=>{searchProduct(userSearchInput)}}>
          <SearchIcon className="icon"/>
        </button>
      </form>
      <h3>Shop Categories</h3>
      <div className="category-list">
        <div className="category-all-button" onClick={selectAll}>
          <h4>ALL</h4>
          <ArrowCircleRightIcon className="icon"/>
        </div>
        
        {categories.map((category) =>  (
          <div className="category-dropdown" key={category.name}>
            <div className="select" onClick={()=>{handleMenuState(categories.indexOf(category))}}>
              <h4>{category.name}</h4>
              <DropdownIcon className={`icon ${menuState[categories.indexOf(category)] ? "open" : ""}`}/>
            </div>
            <ul className={`menu ${menuState[categories.indexOf(category)] ? "open" : ""}`}>
              {category.brands.map((brand) => (
                <li className="category-item" key={brand} onClick={()=>{changeSelectFilter(category.name, brand)}}>
                  <h5>{brand}</h5>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryMenu