const ShoppingCart = require('../../models/users/cartModel');

class CartService {
  
  static async addToCart(user_id, product_id, quantity) {
    try {
      return await ShoppingCart.addToCart(user_id, product_id, quantity);
    } catch (error) {
      throw error;
    }
  }

  static async getCartItemsByUserId(user_id) {
    try {
      return await ShoppingCart.getCartItemsByUserId(user_id);
    } catch (error) {
      throw error;
    }
  }

  static async removeFromCart(user_id, product_id) {
    try {
      return await ShoppingCart.removeFromCart(user_id, product_id);
    } catch (error) {
      throw error;
    }
  }

  static async removeFromCartByUserId(user_id) {
    try {
      return await ShoppingCart.removeFromCartByUserId(user_id);
    } catch (error) {
      throw error;
    }
  }

  static async updateCartItemQuantity(user_id, product_id, new_quantity) {
    try {
      return await ShoppingCart.updateCartItemQuantity(user_id, product_id, new_quantity);
    } catch (error) {
      throw error;
    }
  }

  static async createShoppingCartTable() {
    try {
      return await ShoppingCart.createShoppingCartTable();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartService;
