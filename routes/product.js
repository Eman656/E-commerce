const { ProductRepository } = require('../repositories/productRepository');
const { Product } = require('./product');

class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async createProduct(productData) {
    const { title, description, cat_id, price, brand, img } = productData;

    // Create a new Product object with the request body values
    const product = new Product(null, title, description, cat_id, price, brand, img);

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
    const { id, title, description, cat_id, price, brand, img } = productData;

    // Create a new Product object with the request body values
    const product = new Product(id, title, description, cat_id, price, brand, img);

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
}

module.exports = ProductService;