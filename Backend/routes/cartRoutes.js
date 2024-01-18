const express = require("express");
const router = express.Router();
const CartService = require("../services/cartService");
const verifyToken = require("../middleware/verifyToken");

router.get("/", async (req, res) => {
  try {
    const cartItems = await CartService.getAllCartItems();
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

router.get("/:cartId", async (req, res) => {
  const cartId = req.params.cartId;
  try {
    const cartItem = await CartService.getCartItemById(cartId);
    if (!cartItem) {
      res.status(404).json({ error: "Cart item not found" });
    } else {
      res.status(200).json(cartItem);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch cart item" });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const newCartItem = req.body;
  try {
    const result = await CartService.createCartItem(newCartItem);
    res.status(201).json({ message: 'Cart item created successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new cart item' });
  }
});

router.put("/:cartId", async (req, res) => {
  const cartId = req.params.cartId;
  const updatedCartItem = req.body;
  try {
    const result = await CartService.updateCartItem(cartId, updatedCartItem);
    res.status(200).json({ message: 'Cart item updated successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the cart item' });
  }
});

router.delete("/:cartId", async (req, res) => {
  const cartId = req.params.cartId;
  try {
    const result = await CartService.deleteCartItem(cartId);
    res.status(200).json({ message: 'Cart item deleted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the cart item' });
  }
});

module.exports = router;
