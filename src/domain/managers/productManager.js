import ProductMongoDao from "../../data/daos/mongo/productMongoDao.js";

class ProductManager {
  constructor() {
    this.dao = new ProductMongoDao();
  }

  async find(params) {
    return await this.dao.find(params);
  }

  async findById(id) {
    return await this.dao.findById(id);
  }

  async create(product) {
    return await this.dao.createProduct(product);
  }

  async update(id, product) {
    return await this.dao.updateProduct(id, product);
  }

  async delete(id) {
    return await this.dao.deleteProduct(id);
  }
}

export default ProductManager;
