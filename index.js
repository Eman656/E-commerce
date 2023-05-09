const express = require('express');
const app = express();
const ProductService = require('./routes/productService');
const { ProductRepository } = require('./repositories/productRepository');
const connection = require('./db_connection');

const productRepository = new ProductRepository(connection);
const productService = new ProductService(productRepository);

app.use(express.json());

// Create a new product
app.post('/products', async (req, res) => {
  try {
    const result = await productService.createProduct(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product
app.put('/products/:id', async (req, res) => {
  try {
    const result = await productService.updateProduct({ id: req.params.id, ...req.body });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a product
app.delete('/products/:id', async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});