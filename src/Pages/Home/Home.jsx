import React from "react"
import HomeMainTitle from "./components/HomeMainTitle/HomeMainTitle"
import { HomeCardSwiper } from "./components/CardSlider/HomeCardSwiper"
import GlassBoxes from "./components/GlassBoxes/GlassBoxes"
import { BannerSwiper } from "./components/BannerSwiper/BannerSwiper"

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

      
    </main>
  )
}

export default Home