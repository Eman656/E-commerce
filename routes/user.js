const express = require('express');
const router = express.Router();
//const User = require('../models/user');
const { UserRepository } = require('../repositories/userRepository');
const { UserService } = require('../services/userService');

class UserController {
  constructor() {
    this.userService = new UserService(new UserRepository());
  }

  async createUser(req, res) {
    try {
      const { firstName, lastName, email, phone, address, password, type } = req.body;
      const user = new User(null, firstName, lastName, email, phone, address, password, null, type);
      const createdUser = await this.userService.createUser(user);
      res.json(createdUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const user = new User(id, req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.address, req.body.password, null, req.body.type);
      const updatedUser = await this.userService.updateUser(user);
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async searchUsers(req, res) {
    try {
      const { search } = req.query;
      const users = await this.userService.searchUsers(search);
      res.json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

const userController = new UserController();

router.post('/login', (req, res) => userController.login(req, res));
router.post('/logout', (req, res) => userController.logout(req, res));
router.post('/', (req, res) => userController.createUser(req, res));
router.put('/:id', (req, res) => userController.updateUser(req, res));
router.delete('/:id', (req, res) => userController.deleteUser(req, res));
router.get('/', (req, res) => userController.searchUsers(req, res));

module.exports = router;