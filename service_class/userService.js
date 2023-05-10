const { ProductRepository } = require('../repositories/productRepository');
const Product = require('../classes/product');
const { Auth } = require('../auth');

class ProductService {
  constructor(productRepository, auth) {
    this.productRepository = productRepository;
    this.auth = auth;
  }

  async createProduct(productData) {
    const { title, description, cat_id, price, brand} = productData;

    const product = new Product(null, title, description, cat_id, price, brand);

    try {
      await this.productRepository.insert(product);
      return { message: 'Product created successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create product');
    }
  }

  async getProductById(id) {
    try {
      const product = await this.productRepository.findById(id);
      return product;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get product');
    }
  }

  async updateProduct(productData) {
    const { id, title, description, cat_id, price, brand} = productData;

    const product = new Product(id, title, description, cat_id, price, brand);

    try {
      await this.productRepository.update(product);
      return { message: 'Product updated successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update product');
    }
  }

  async deleteProduct(id) {
    try {
      await this.productRepository.delete(id);
      return { message: 'Product deleted successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete product');
    }
  }

  async register(user) {
    try {
      const result = await this.auth.register(user);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to register user');
    }
  }

  async login(email, password) {
    try {
      const user = await this.auth.login(email, password);
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to log in');
    }
  }
}

module.exports = ProductService;