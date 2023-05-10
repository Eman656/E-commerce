const express = require('express');
const router = express.Router();
const ProductService = require('../service_class/productService');
const { ProductRepository } = require('../repositories/productRepository');
const { Auth } = require('../repositories/userRepository');
const connection = require('../db_connection');

const productRepository = new ProductRepository(connection);
const productService = new ProductService(productRepository);
const auth = new Auth(connection);

// Create a new product
router.post('/products', async (req, res) => {
  try {
    const result = await productService.createProduct(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product
router.put('/products/:id', async (req, res) => {
  try {
    const result = await productService.updateProduct({ id: req.params.id, ...req.body });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User registration
router.post('/register', async (req, res) => {
  try {
    const result = await auth.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await auth.login(email, password);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;