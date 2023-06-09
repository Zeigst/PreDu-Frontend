import React from "react"
import HomeMainTitle from "./components/HomeMainTitle/HomeMainTitle"
import { HomeCardSwiper } from "./components/CardSlider/HomeCardSwiper"

const Home = () => {
  return (
    <main className="home">
      <HomeMainTitle/>
      <HomeCardSwiper/>
    </main>
  )
}

export default Home