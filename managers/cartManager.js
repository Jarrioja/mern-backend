import CartMongoDao from "../daos/mongo/cartDao.js";

class CartManager {
  constructor() {
    this.dao = new CartMongoDao();
  }

  async findById(cartId) {
    return await this.dao.findById(cartId);
  }

  async create() {
    return await this.dao.createCart();
  }

  async addProduct(cartId, productId) {
    return await this.dao.addProduct(cartId, productId);
  }

  async deleteProduct(cartId, productId) {
    return await this.dao.deleteProduct(cartId, productId);
  }

  async updateCart(cartId, products) {
    return await this.dao.updateCart(cartId, products);
  }

  async updateQuantity(cartId, products, quantity) {
    return await this.dao.updateQuantity(cartId, products, quantity);
  }

  async emptyCart(cartId) {
    return await this.dao.emptyCart(cartId);
  }
}

export default CartManager;
