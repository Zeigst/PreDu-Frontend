import './Product'
import { Product } from './Product'

export class Shop {
  constructor() {
    this.shop = {}
    this.cart_total_cost = 0
  }

  /**
   * @param {Product} product 
   */
  add(product) {
    this.shop[product.getID()] = product
  }

  /**
   * @param {Product} product 
   */
  remove(product) {
    delete this.shop[product.getID()]
  }

  /**
   * @param {number} product_id 
   * @returns {Product}
   */
  getProductByID(product_id) {
    return this.shop[product_id]
  }

  getAllProductsList() {
    const list = [Product]
    for (const [product_id, product] of Object.entries(this.shop)) {
      list.push(product)
    }
    return list
  }

  getProductsByCategory(category) {
    const list = [Product]
    for (const [product_id, product] of Object.entries(this.shop)) {
      if (product["category"] == category) {
        list.push(product)
      }
    }
    return list
  }

  updateCart(product_id, cart_quantity) {
    this.cart_total_cost -= this.shop[product_id].getTotalCost()
    this.shop[product_id].setNumInCart(cart_quantity)
    this.cart_total_cost += this.shop[product_id].getTotalCost()
  }
}