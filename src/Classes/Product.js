export class Product {
  /**
   * @param {number} id
   * @param {string} title
   * @param {string} subtitle
   * @param {string} desc
   * @param {string} img_link
   * @param {string} category
   * @param {number} cost
   * @param {number} stock
   */
  constructor(id, title, subtitle, desc, img_link, category, cost_per_unit, stock) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.desc = desc;
    this.img_link = img_link;
    this.category = category;
    this.cost_per_unit = cost_per_unit;
    this.stock = stock;
    this.num_in_cart = 0;
    this.total_cost = this.num_in_cart * this.cost_per_unit;
  }

  // ===== GET METHODS ===== //
  /**
   * @returns {number}
   */
  getID() {
    return this.id;
  }

  /**
   * @returns {string}
   */
  getTitle() {
    return this.title;
  }

  /**
   * @returns {string}
   */
  getSubtitle() {
    return this.subtitle;
  }

  /**
   * @returns {string}
   */
  getDescription() {
    return this.desc;
  }

  /**
   * @returns {string}
   */
  getImage() {
    return this.img_link;
  }

  /**
   * @returns {string}
   */
  getCategory() {
    return this.category;
  }

  /**
   * @returns {number}
   */
  getCostPerUnit() {
    return this.cost_per_unit;
  }
  
  /**
   * @returns {number}
   */
  getStock() {
    return this.stock
  }

  /**
   * @returns {number}
   */
  getTotalCost() {
    return this.total_cost
  }

  // ===== SET METHODS ===== //
  /**
   * @param {number} id 
   */
  setID(id) {
    this.id = id;
  }

  /**
   * @param {string} title
   */
  setTitle(title) {
    this.title = title;
  }

  /**
   * @param {string} subtitle
   */
  setSubtitle(subtitle) {
    this.subtitle = subtitle;
  }

  /**
   * @param {string} desc
   */
  setDescription(desc) {
    this.desc = desc;
  }

  /**
   * @param {string} img_link
   */
  setImage(img_link) {
    this.img_link = img_link;
  }

  /**
   * @param {string} category
   */
  setCategory(category) {
    this.category = category;
  }

  /**
   * @param {number} cost
   */
  setCostPerUnit(cost_per_unit) {
    this.cost_per_unit = cost_per_unit;
  }

  setNumInCart(num_in_cart) {
    this.num_in_cart = num_in_cart
    this.total_cost = this.num_in_cart * this.cost_per_unit
  }

  // ===== OTHER METHODS ===== //
  /**
   * @returns {object}
   */
  jsonObj() {
    return {
      id: this.id,
      title: this.title,
      subtitle: this.subtitle,
      desc: this.desc,
      img_link: this.img_link,
      category: this.category,
      cost_per_unit: this.cost_per_unit
    }
  }
}