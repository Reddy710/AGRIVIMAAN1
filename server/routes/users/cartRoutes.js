const express = require("express");
const router = express.Router();
const CartService = require("../../services/users/cartService");
const verifyToken = require("../../middleware/verifyToken");

// Route for adding item to cart
router.post('/add', (req, res) => {
  const { user_id, drone_id, quantity } = req.body;

  CartService.addToCart(user_id, drone_id, quantity )
    .then(message => res.status(200).json({ message }))
    .catch(error => {
      if (error === 'Duplicate entry for drone_id') {
        res.status(400).json({ error: 'Item already added to the Cart' });
      } else {
        res.status(500).json({ error: 'Failed to add item to cart' });
      }
    });
});


// Route for retrieving cart items by user ID
router.get('/:user_id', (req, res) => {
  const { user_id } = req.params;

  CartService.getCartItemsByUserId(user_id)
    .then(cartItems => res.status(200).json(cartItems))
    .catch(error => res.status(500).json({ error }));
});

// Route for removing item from cart
router.delete('/remove/:user_id/:drone_id', (req, res) => {
  const { user_id, drone_id } = req.params;

  CartService.removeFromCart(user_id, drone_id)
    .then(message => res.status(200).json({ message }))
    .catch(error => res.status(500).json({ error }));
});

router.delete('/delete/:user_id', (req, res) => {
  const { user_id } = req.params;

  CartService.removeFromCartByUserId(user_id)
    .then(message => res.status(200).json({ message }))
    .catch(error => res.status(500).json({ error }));
});

// Route for updating the quantity of a product in the user's cart
router.put('/update-quantity/:user_id/:drone_id', (req, res) => {
  const { user_id, drone_id } = req.params;
  const { quantity } = req.body;
  console.log(user_id,drone_id,quantity)
  CartService.updateCartItemQuantity(user_id, drone_id, quantity)
    .then(message => res.status(200).json({ message }))
    .catch(error => res.status(500).json({ error }));
});


module.exports = router;
