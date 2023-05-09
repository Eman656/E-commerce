const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { UserRepository } = require('../repositories/userRepository');
const { UserService } = require('../services/userService');

class UserLog {
  constructor() {
    this.userService = new UserService(new UserRepository());
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      //const user = await this.userService.login(email, password);
      const user = await query("SELECT * FROM users WHERE email = ?", [email]);
      // Check if the user exists and the password is correct
      if (user.length > 0) {
        bcrypt.compare(password, user[0].password, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: "An error occurred while logging in" });
            return;
          }
          if (result) {
            // Use the token from the register endpoint
            const token = user[0].token;

            // Return the token to the user
            res.json({ token: token });
          } else {
            res.status(401).json({ message: "Invalid email or password" });
          }
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async logout(req, res) {
    try {
      const { userId } = req.body;
      await this.userService.logout(userId);
      res.json({ message: 'User logged out successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
const UserLog = new UserLog();

router.post('/login', (req, res) => UserLog.login(req, res));
router.post('/logout', (req, res) => UserLog.logout(req, res));