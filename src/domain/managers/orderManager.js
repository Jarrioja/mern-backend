import uniqid from 'uniqid';
import container from '../../container.js';

class OrderManager {
  constructor() {
    this.orderRepository = container.resolve('OrderRepository');
    this.productRepository = container.resolve('ProductRepository');
    this.cartRepository = container.resolve('CartRepository');
  }
  async createOrder(userData, cart) {
    const { email } = userData;
    const { products } = cart;

    const code = uniqid();
    let amount = 0;
    const noStockProducts = [];
    const filteredProducts = products.filter((product) => {
      if (product.product.stock < product['quantity']) {
        noStockProducts.push({
          id: product.product.id,
          title: product.product.title,
          currentStock: product.product.stock,
          requestedQuantity: product['quantity'],
        });
        return false; // No se incluirá el producto en el nuevo array
      }
      amount += product.product.price * product['quantity'];

      return true; // Se incluirá el producto en el nuevo array
    });
    if (noStockProducts.length === products.length) {
      const error = new Error('Order fail');
      error.noStockProducts = noStockProducts;
      throw error;
    }

    const orderData = {
      email,
      code,
      amount,
    };

    const orderCreated = await this.orderRepository.createOrder(orderData);

    if (orderCreated) {
      filteredProducts.forEach(async (product) => {
        product.product.stock = product.product.stock - product['quantity'];
        const newProduct = { id: undefined, ...product.product };
        await this.productRepository.updateProduct(product.product.id, newProduct);
      });
    }
    await this.cartRepository.emptyCart(cart.id);
    if (!noStockProducts.length) return orderCreated;
    return { orderCreated, noStockProducts };
  }

  async getOrder(id) {
    return this.orderRepository.getOrder(id);
  }

  async completeOrder(id) {
    return this.orderRepository.updateOrder(id, { status: 'completed', completedAt: new Date() });
  }
}

export default OrderManager;
