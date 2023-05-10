class Product {
    constructor(id, title, description, cat_id, price, brand) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.cat_id = cat_id;
      this.price = price;
      this.brand = brand;
    }
  }
  
  module.exports = Product;