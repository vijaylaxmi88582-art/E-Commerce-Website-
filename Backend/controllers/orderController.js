const Order = require('../models/order');

exports.createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentType } = req.body;

        const order = await Order.create({
            user: req.user.userId,
            items,
            totalAmount,
            address,
            paymentType
        });

        res.status(200).json({
            success: true,
            message: "Order Created",
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating order",
            error: error.message
        });
    }
};

// ✅ New API for Admin Dashboard
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            totalOrders: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching orders",
            error: error.message
        });
    }
};