const express = require('express');
const router = express.Router();
const { Auth } = require('../repositories/userRepository');
const connection = require('../db_connection');
const auth = new Auth(connection);

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