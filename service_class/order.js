const db = require('../db_connection.js');

class Order {
  constructor({ id, user_id, order_date, deliver_date }) {
    this.id = id;
    this.user_id = user_id;
    this.order_date = order_date;
    this.deliver_date = deliver_date;
  }

  static async create({ user_id, order_date, deliver_date }) {
    try {
      const result = await db.query(
        'INSERT INTO orders (user_id, order_date, deliver_date) VALUES (?, ?, ?)',
        [user_id, order_date, deliver_date]
      );
      return new Order({
        id: result.insertId,
        user_id,
        order_date,
        deliver_date,
      });
    } catch (error) {
      throw new Error(`Could not create order: ${error.message}`);
    }
  }

  static async deleteById(id) {
    try {
      await db.query('DELETE FROM orders WHERE id = ?', [id]);
    } catch (error) {
      throw new Error(`Could not delete order: ${error.message}`);
    }
  }

  static async getAllHistoryOrdersForUser(userId) {
    try {
      const results = await db.query(
        'SELECT * FROM orders WHERE user_id = ?',
        [userId]
      );
      return results.map((result) => new Order(result));
    } catch (error) {
      throw new Error(`Could not get all history orders for user: ${error.message}`);
    }
  }

  static async getAll() {
    try {
      const results = await db.query('SELECT * FROM orders');
      return results.map((result) => new Order(result));
    } catch (error) {
      throw new Error(`Could not get all orders: ${error.message}`);
    }
  }
}

module.exports = Order;
