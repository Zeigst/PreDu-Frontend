import React from "react"
import { ReactComponent as SearchIcon } from "../../../../Resources/Icons/seacrh.svg";
import { ReactComponent as DropdownIcon } from "../../../../Resources/Icons/arrow_drop_down.svg";
import { education_categories, entertainment_categories, office_categories } from "../../../../Data";

const CategoryMenu = () => {

  window.addEventListener("scroll", function() {
    var selection = document.querySelector('.category-menu') !== null;
    if (selection) {
      document.querySelector(".category-menu").classList.toggle("sticky", window.scrollY > 0)
    }
  })

  return (
    <div className="category-menu">
      <h3>Search</h3>
      <form className="search-box">
        <input type="text" className="search-input" placeholder="What are you looking for?"></input>
        <button type="submit">
          <SearchIcon className="icon"/>
        </button>
      </form>
      <h3>Categories</h3>
      <div className="category-list">
        <div className="category-dropdown">
          <div className="select">
            <h4>Category 1</h4>
            <DropdownIcon className="icon"/>
          </div>
          <ul className="menu">
            {education_categories.map((category) => (
              <li className="category-item">
                <h5>{category}</h5>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CategoryMenu