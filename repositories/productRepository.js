const mysql = require('mysql2/promise');

class ProductRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async insert(product) {
    const { title, description, cat_id, price, brand, img } = product;
    const connection = await this.connection.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO product (title, description, cat_id, price, brand, img) VALUES (?, ?, ?, ?, ?, ?)',
        [title, description, cat_id, price, brand, img]
      );
      return { id: result.insertId, ...product };
    } finally {
      connection.release();
    }
  }

  async findById(id) {
    const connection = await this.connection.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM product WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async update(product) {
    const { id, title, description, cat_id, price, brand, img } = product;
    const connection = await this.connection.getConnection();
    try {
      await connection.query(
        'UPDATE product SET title = ?, description = ?, cat_id = ?, price = ?, brand = ?, img = ? WHERE id = ?',
        [title, description, cat_id, price, brand, img, id]
      );
      return { id, ...product };
    } finally {
      connection.release();
    }
  }

  async delete(id) {
    const connection = await this.connection.getConnection();
    try {
      await connection.query('DELETE FROM product WHERE id = ?', [id]);
      return { id };
    } finally {
      connection.release();
    }
  }
}

module.exports = { ProductRepository };