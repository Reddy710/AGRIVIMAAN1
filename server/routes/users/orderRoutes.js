const express = require("express");
const router = express.Router();
const OrderService = require("../../services/users/orderService");
const verifyToken = require("../../middleware/verifyToken");

router.get("/", async (req, res) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.get("/:OrderID", async (req, res) => {
  const OrderID = req.params.OrderID;
  try {
    const order = await OrderService.getOrderById(OrderID);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

router.get("/orders/:UserID", async (req, res) => {
  const UserID = req.params.UserID;
  try {
    const order = await OrderService.getOrderByUserId(UserID);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

router.post("/", async (req, res) => {
    console.log(req.body);
    const newOrder = req.body;
    try {
      const result = await OrderService.createOrder(newOrder);
      res.status(201).json({ message: 'Order created successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create a new order' });
    }
});

router.put("/:orderId", async (req, res) => {
    const orderId = req.params.orderId;
  const updatedOrder = req.body;
  try {
    const result = await OrderService.updateOrder(orderId, updatedOrder);
    res.status(200).json({ message: 'Order updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the order' });
  }
});

router.put('/status/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { updatedStatus } = req.body;
  try {
    const result = await OrderService.updateOrderStatus(orderId, updatedStatus);
    res.status(200).json({ message: 'Order updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the order' });
  }
});

router.delete("/delete/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const result = await OrderService.deleteOrder(orderId);
    res.status(200).json({ message: 'Order deleted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the order' });
  }
});

router.put("/cancel_order/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const result = await OrderService.cancelOrder(orderId);
    res.status(200).json({ message: 'Order cancenlled successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to cancel the order' });
  }
});
module.exports = router;

