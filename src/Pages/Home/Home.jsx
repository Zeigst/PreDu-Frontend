import React from "react"
import HomeMainTitle from "./components/HomeMainTitle/HomeMainTitle"
import GlassBoxes from "./components/GlassBoxes/GlassBoxes"
import { BannerSwiper } from "./components/BannerSwiper/BannerSwiper"
import HomeMainIcons from "./components/HomeMainIcons/HomeMainIcons"
import Selections from "./components/Selections/Selections"
import chatbot_img from "../../Resources/friendly-chatbot.jpg"

const Home = () => {
  return (
    <main className="home">
      <HomeMainTitle/>
      <div className="divider"></div>

      <BannerSwiper/>
      <div className="divider"></div>
      
      <div className="title">
        <h1 className="title_white">QUALITY</h1>
        <h1 className="title_orange">SERVICES</h1>
      </div>
      <GlassBoxes/>
      <div className="divider"></div>

      <HomeMainIcons/>
      <div className="divider"></div>

      <div className="title">
        <h1 className="title_white">VARIETY</h1>
        <h1 className="title_orange">SELECTIONS</h1>
      </div>
      <Selections/>
      <div className="divider"></div>
      
      <div className="title">
        <h1 className="title_white">FRIENDLY</h1>
        <h1 className="title_orange">CHATBOT</h1>
      </div>
      <img className="chatbot-img" src={chatbot_img} alt="Chatbot Img"/>
      
    </main>
  )
}

export default Home