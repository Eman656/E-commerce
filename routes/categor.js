const db = require('../db_connection.js');

class Category {
  constructor({ id, title, description, img }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.img = img;
  }

  static async create({ title, description, img }) {
    try {
      const result = await db.query(
        'INSERT INTO categories (title, description, img) VALUES (?, ?, ?)',
        [title, description, img]
      );
      return new Category({
        id: result.insertId,
        title,
        description,
        img,
      });
    } catch (error) {
      throw new Error(`Could not create category: ${error.message}`);
    }
  }

  static async deleteById(id) {
    try {
      await db.query('DELETE FROM categories WHERE id = ?', [id]);
    } catch (error) {
      throw new Error(`Could not delete category: ${error.message}`);
    }
  }

  async update() {
    try {
      await db.query(
        'UPDATE categories SET title = ?, description = ?, img = ? WHERE id = ?',
        [this.title, this.description, this.img, this.id]
      );
    } catch (error) {
      throw new Error(`Could not update category: ${error.message}`);
    }
  }

  static async getAll() {
    try {
      const results = await db.query('SELECT * FROM categories');
      return results.map((result) => new Category(result));
    } catch (error) {
      throw new Error(`Could not get all categories: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const results = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
      if (results.length === 0) {
        throw new Error(`No category found with id: ${id}`);
      }
      return new Category(results[0]);
    } catch (error) {
      throw new Error(`Could not get category by id: ${error.message}`);
    }
  }
}

module.exports = Category;
