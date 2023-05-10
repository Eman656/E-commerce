const express = require('express');
const router = express.Router();
const CategoryService = require('../service_class/categoryService');
const { CategoryRepository } = require('../repositories/categoryRepository');
const connection = require('../db_connection');

const categoryRepository = new CategoryRepository(connection);
const categoryService = new CategoryService(categoryRepository);

// Create a new category
router.post('/', async (req, res) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const category = await categoryService.getAllCategories();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a category
router.put('/:id', async (req, res) => {
  try {
    const result = await categoryService.updateCategory({ id: req.params.id, ...req.body });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  try {
    const result = await categoryService.deleteCategory(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;