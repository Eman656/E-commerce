const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const util = require("util"); // helper



class Auth {
  constructor(connection) {
    this.connection = connection;
  }

  async register(user) {
    const { first_name, last_name, email, phone, address, password, type } = user;
    const connection = await this.connection.getConnection();
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const [result] = await connection.query(
        'INSERT INTO users (first_name, last_name, email, phone, address, password, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [first_name, last_name, email, phone, address, hashedPassword, type]
      );
      return { id: result.insertId, ...user };
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async login(email, password) {
    const connection = await this.connection.getConnection();
    try {
      // Find the user by email

      const query = util.promisify(connection.query).bind(connection);
      const [rows] = await query('SELECT * FROM users WHERE email = ?', [email]);
      const user = rows[0];

      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Return the user object without the password
      delete user.password;
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = { Auth };