const express = require('express');
const router = express.Router();
const ProductService = require('../service_class/productService');
const { ProductRepository } = require('../repositories/productRepository');
const connection = require('../db_connection');

const productRepository = new ProductRepository(connection);
const productService = new ProductService(productRepository);

// Create a new product
router.post('/', async (req, res) => {
  try {
    const result = await productService.createProduct(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const result = await productService.updateProduct({ id: req.params.id, ...req.body });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;