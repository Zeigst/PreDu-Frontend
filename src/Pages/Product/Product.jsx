import React from "react"
import { useNavigate, useLocation } from "react-router-dom"

const Product = () => {
  const navigate = useNavigate()
  const location = useLocation()

  let id = location.state.id;
  let title = location.state.title;
  let subtitle = location.state.subtitle;
  let desc = location.state.desc;
  let category = location.state.category;
  let img_link = location.state.img_link;
  let stock = location.state.stock;
  let cost_per_unit = location.state.cost_per_unit;
  return (
    <main className="product">
      <img src={img_link}></img>
      <h1>{id}</h1>
      <h1>{title}</h1>
      <h1>{subtitle}</h1>
      <h1>{desc}</h1>
      <h1>{category}</h1>
      <h1>{stock}</h1>
      <h1>{cost_per_unit}</h1>
    </main>
  )
}

export default Product