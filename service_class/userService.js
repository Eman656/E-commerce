const { UserRepository } = require('../repositories/userRepository');
const User = require('../classes/user');
const { Auth } = require('../auth');

class Userervice {
  constructor(UserRepository, auth) {
    this.UserRepository = UserRepository;
    this.auth = auth;
  }


  async register(user) {
    try {
      const result = await this.auth.register(user);
      return "added successfully\n" + result;
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