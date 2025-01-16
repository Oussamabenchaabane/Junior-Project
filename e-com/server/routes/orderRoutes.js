const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
// Assuming you'll create this middleware for authentication
const auth = require('../middleware/auth');

router.post('/', auth, orderController.createOrder);
router.get('/my-orders', auth, orderController.getUserOrders);

module.exports = router;
