import React from "react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeMainTitle = () => {
  const [hacktext, setHackText] = useState("ACCOUNTS");
  const navigate = useNavigate()
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const text1 = "SERVICES";
  const text2 = "ACCOUNTS";

  function mouseOverHack() {    
    let iterations = 0;
    const interval = setInterval(() => {
      setHackText(
        text2.split("").map((letter, index) => {
          if(index < iterations) {
            return text1[index];
          }
          return letters[Math.floor(Math.random()*26)]
        }).join("")
        );
      if (iterations >= text1.length) {
        clearInterval(interval);
      }
      iterations += 1/3;
    }, 30)
  }
  
  function mouseLeaveHack() {
    let iterations = 0;
    const interval = setInterval(() => {
      setHackText(
        text1.split("").map((letter, index) => {
          if(index < iterations) {
            return text2[index];
          }
          return letters[Math.floor(Math.random()*26)]
        }).join("")
        );
      if (iterations >= text1.length) {
        clearInterval(interval);
      }
      iterations += 1/3;
    }, 30)
  }

  function toShop() {
    window.scrollTo(0, 0)
    navigate('/Shop')
  }


  return (
    <div className="home-main-title">
      <div className="text">
        <h1>UNLOCK <b>PREMIUM</b></h1>
        <h1 className="hack-text" onMouseOver={mouseOverHack} onMouseLeave={mouseLeaveHack}>{hacktext}</h1>
      </div>

      <button onClick={toShop}>Get Started</button>
    </div>
  )
}

export default HomeMainTitle