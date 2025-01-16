const Order = require('../models/orderModel');

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { total_amount } = req.body;
      const user_id = req.user.id; 

      const result = await Order.createOrder({
        user_id,
        total_amount
      });

      res.status(201).json({ message: 'Order created successfully', orderId: result.insertId });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUserOrders: async (req, res) => {
    try {
      const userId = req.user.id; 
      const orders = await Order.getUserOrders(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = orderController;
