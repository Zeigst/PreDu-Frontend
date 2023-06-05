import React from "react"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as AccountCircleIcon } from '../Resources/Icons/account_circle.svg';
import { ReactComponent as ShoppingCartIcon } from '../Resources/Icons/shopping_cart.svg';
import { ReactComponent as MenuIcon } from '../Resources/Icons/menu.svg';
import { ReactComponent as CloseIcon } from '../Resources/Icons/close.svg';

const Header = () => {
  let navigate = useNavigate();
  const [isOpen, setOpen] = useState("false");

  function toggleMenu() {
    setOpen(!isOpen);
  }
  
  function toShop() {
    window.scrollTo(0, 0);
    navigate('/Shop')
  }

  window.addEventListener("scroll", function() {
    var selection = document.querySelector('.header') !== null;
    if (selection) {
      document.querySelector("header").classList.toggle("sticky", window.scrollY > 0)
    }
  })

  return (
    <header className="header">
      
      <div className="logo">
        <h1>PreDu</h1>
      </div>

      <div className={`container ${isOpen ? "" : "open"}`}>
        
        <button className="account-button-responsive" type="button">
          <AccountCircleIcon className="icon"/>
        </button>
        
        <nav className="navigation">
          <ul className="menu-list">
            <li className="menu-item" onClick={toShop}>
              <h2>Shop</h2>
            </li>
            <li className="menu-item">
              <h2>News</h2>
            </li>
            <li className="menu-item">
              <h2>About Us</h2>
            </li>
            <li className="menu-item">
              <h2>Help</h2>
            </li>
          </ul>
        </nav>

        <div className="buttons">
          <button className="cart-button" type="button">
            <ShoppingCartIcon className="icon"/>
            <h2>Your Cart</h2>
          </button>
          <button className="account-button" type="button">
            <AccountCircleIcon className="icon"/>
          </button>
        </div>
      </div>

      <button className={`menu-button ${isOpen ? "" : "open"}`} onClick={toggleMenu} type="button">
        <MenuIcon className="menu-icon"/>
        <CloseIcon className="close-icon"/>
      </button>
    </header>
  )
}

export default Header