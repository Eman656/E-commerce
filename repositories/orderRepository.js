const mysql = require('mysql2/promise');


class OrderRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async createOrder(order) {
    const { user_id, item_id, quantity} = order;
    const connection = await this.connection.getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO orders (user_id, item_id, quantity, order_date, deliver_date, status, total_price) VALUES (?, ?, ?, now(), DATE(DATE_ADD(NOW(), INTERVAL +2 DAY)), "shipping", (SELECT quantity * price FROM product WHERE id = ?))',
        [user_id, item_id, quantity, item_id]
      );
      return { id: result.insertId, ...order };
    } finally {
      connection.release();
    }
  }

  async findById(id) {
    const connection = await this.connection.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM orders WHERE id = ?', [id]);
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
      const [rows] = await connection.query('SELECT * FROM orders;');
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async update(order) {
    const { id, item_id, quantity} = order;
    const connection = await this.connection.getConnection();
    try {
      await connection.query(
        'UPDATE orders SET item_id = ?, quantity = ?, total_price = (SELECT quantity * price FROM product WHERE id = ?) WHERE id = ?',
        [item_id, quantity, item_id, id]
      );
      return { id, ...order };
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async updateToDeliverd(order) {
    const {id} = order;
    const connection = await this.connection.getConnection();
    try {
      await connection.query(
        "UPDATE `orders` SET `status` = 'delivered' WHERE `orders`.`id` = ? ;",
        [id]
      );
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async delete(id) {
    const connection = await this.connection.getConnection();
    try {
      await connection.query('DELETE FROM orders WHERE id = ?', [id]);
      return { id };
    } finally {
      connection.release();
    }
  }
}
module.exports = { OrderRepository };