const mysql = require('mysql2/promise');

class CategoryRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async insert(category) {
    const { title, description} = category;
    const connection = await this.connection.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO category (title, description) VALUES (?, ?)',
        [title, description]
      );
      return { id: result.insertId, ...category };
    } finally {
      connection.release();
    }
  }

  async findById(id) {
    const connection = await this.connection.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM category WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async findAll() {
    const connection = await this.connection.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM category');
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async update(category) {
    const { id, title, description} = category;
    const connection = await this.connection.getConnection();
    try {
      await connection.query(
        'UPDATE category SET title = ?, description = ? WHERE id = ?',
        [title, description, id]
      );
      return { id, ...category };
    } finally {
      connection.release();
    }
  }

  async delete(id) {
    const connection = await this.connection.getConnection();
    try {
      await connection.query('DELETE FROM category WHERE id = ?', [id]);
      return { id };
    } finally {
      connection.release();
    }
  }
}

module.exports = { CategoryRepository };