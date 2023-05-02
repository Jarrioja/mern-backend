import { CartMongoDao } from "../db/mongo/CartMongoDao.js";

class CartManager {
  constructor() {
    this.dao = new CartMongoDao();
  }

  async findById(cartId) {
    return await this.dao.findById(cartId);
  }

  async create() {
    return await this.dao.create();
  }

  async addProduct(cartId, productId) {
    return await this.dao.addProduct(cartId, productId);
  }

  //   async delete(id) {
  //     return await this.dao.delete(id);
  //   }
}

export default CartManager;
