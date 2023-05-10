const { OrderRepository } = require('../repositories/orderRepository');
const Order = require('../classes/order');

class OrderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async createOrder(orderData) {
    const { user_id, item_id, quantity, order_date, deliver_date, status, total_price } = orderData;

    const order = new Order(null, user_id, item_id, quantity, order_date, deliver_date, status, total_price);

    try {
      await this.orderRepository.createOrder(order);
      return { message: 'Order created successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create order');
    }
  }

  async getOrderById(id) {
    try {
      const order = await this.orderRepository.findById(id);
      return order;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get order');
    }
  }

  async getAllOrders() {
    try {
      const orders = await this.orderRepository.findAll();
      return orders;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get orders');
    }
  }

  async findAllUserOrders() {
    try {
      const orders = await this.orderRepository.findAllUserOrders();
      return orders;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get orders');
    }
  }

  async updateOrder(orderData) {
    const { id, user_id, item_id, quantity, order_date, deliver_date, status, total_price } = orderData;

    const order = new Order(id, user_id, item_id, quantity, order_date, deliver_date, status, total_price);

    try {
      await this.orderRepository.update(order);
      return { message: 'Order updated successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update order');
    }
  }

  async updateOrderToDeliverd(orderData) {
    const { id, user_id, item_id, quantity, order_date, deliver_date, status, total_price } = orderData;

    const order = new Order(id, user_id, item_id, quantity, order_date, deliver_date, status, total_price);

    try {
      await this.orderRepository.updateToDeliverd(order);
      return { message: 'Order Deliverd successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to Deliver order');
    }
  }

  async deleteOrder(id) {
    try {
      await this.orderRepository.delete(id);
      return { message: 'Order deleted successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete order');
    }
  }
}

module.exports = OrderService;
