import container from "../../container.ts";
class ProductManager {
  constructor() {
    this.productRepository = container.resolve("ProductRepository");
  }

  async find(params) {
    return await this.productRepository.find(params);
  }

  async findById(id) {
    const product = await this.productRepository.findById(id);
    if (product == null) throw new Error("Product not found");
    return product;
  }

  async create(product) {
    return await this.productRepository.createProduct(product);
  }

  async update(id, product) {
    return await this.productRepository.updateProduct(id, product);
  }

  async delete(id) {
    return await this.productRepository.deleteProduct(id);
  }
}

export default ProductManager;
