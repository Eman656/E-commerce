const express = require('express');
const router = express.Router();
const OrderService = require('../service_class/orderService');
const { OrderRepository } = require('../repositories/orderRepository');
const connection = require('../db_connection');

const orderRepository = new OrderRepository(connection);
const orderService = new OrderService(orderRepository);

// Create a new order
router.post('/', async (req, res) => {
  try {
    const result = await orderService.createOrder(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get an order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get history order for user
router.get('/userHistory/:id', async (req, res) => {
    try {
      const order = await orderService.findAllUserOrders(req.params.id);
      console.log(req.params.id);
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an order
router.put('/:id', async (req, res) => {
  try {
    const result = await orderService.updateOrder({ id: req.params.id, ...req.body });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Deliver order
router.put('/deliver/:id', async (req, res) => {
    try {
      const result = await orderService.updateOrderToDeliverd({ id: req.params.id, ...req.body });
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Delete an order
router.delete('/:id', async (req, res) => {
  try {
    const result = await orderService.deleteOrder(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
