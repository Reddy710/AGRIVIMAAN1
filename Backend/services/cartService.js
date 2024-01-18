const ShoppingCart = require('../models/cartModel');

class CartService {
  static async getAllCartItems() {
    try {
      return await ShoppingCart.getAllCartItems();
    } catch (error) {
      throw error;
    }
  }

  static async getCartItemById(cartId) {
    try {
      return await ShoppingCart.getCartItemById(cartId);
    } catch (error) {
      throw error;
    }
  }

  static async createCartItem(cartItemData) {
    try {
      const newCartItem = {
        OrderID: cartItemData.OrderID,
        drone_id: cartItemData.drone_id,
        QuantityInCart: cartItemData.QuantityInCart,
        TotalCost: cartItemData.TotalCost,
      };

      const createdCartItem = await ShoppingCart.createCartItem(newCartItem);
      return createdCartItem;
    } catch (error) {
      throw error;
    }
  }

  static async updateCartItem(cartId, updatedCartItem) {
    try {
      return await ShoppingCart.updateCartItem(cartId, updatedCartItem);
    } catch (error) {
      throw error;
    }
  }

  static async deleteCartItem(cartId) {
    try {
      return await ShoppingCart.deleteCartItem(cartId);
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
