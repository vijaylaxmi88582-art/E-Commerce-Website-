const orderRouter = require('express').Router();

const {
    createOrder,
    getAllOrders
} = require('../controllers/orderController');

const auth = require('../middleware/auth');

orderRouter.post('/create-order', auth, createOrder);

// ✅ Admin Dashboard
orderRouter.get('/all-orders', auth, getAllOrders);

module.exports = orderRouter;