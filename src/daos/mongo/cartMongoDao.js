import { Cart } from "../../models/cartModel.js";
import { Product } from "../../models/productModel.js";

export default class CartMongoDao {
  async findById(cartId) {
    const cartDocument = await Cart.findById(cartId);

    return {
      id: cartDocument._id,
      products: cartDocument.products,
    };
  }

  async createCart() {
    const cartDocument = new Cart({
      products: [],
    });
    cartDocument.save();
    return {
      id: cartDocument._id,
      products: cartDocument.products,
    };
  }

  async addProduct(cartId, productId) {
    const cartDocument = await Cart.findById(cartId);
    if (!cartDocument) throw { message: "Cart not found" };

    const product = await Product.findById(productId);
    if (!product) throw { message: "Product not found" };

    const productInCart = cartDocument.products.find((p) =>
      p.product.equals(productId)
    );
    if (productInCart) productInCart.quantity += 1;
    else cartDocument.products.push({ product: productId, quantity: 1 });
    await cartDocument.save();
    return {
      id: cartDocument._id,
      products: cartDocument.products,
    };
  }

  async deleteProduct(cartId, productId) {
    const cartDocument = await Cart.findById(cartId);
    if (!cartDocument) throw { message: "Cart not found" };

    const product = await Product.findById(productId);
    if (!product) throw { message: "Product not found" };

    const index = cartDocument.products.findIndex((p) => {
      return p._id.equals(productId);
    });
    if (index !== -1) {
      cartDocument.products.splice(index, 1);
    }
    await cartDocument.save();
    return {
      id: cartDocument._id,
      products: cartDocument.products,
    };
  }

  async updateCart(cartId, products) {
    const cartDocument = await Cart.findById(cartId);
    if (!cartDocument) throw { message: "Cart not found" };
    cartDocument.products = products;
    await cartDocument.save();
    return {
      id: cartDocument._id,
      products: cartDocument.products,
    };
  }

  async updateQuantity(cartId, productId, quantity) {
    const cartDocument = await Cart.findById(cartId);
    if (!cartDocument) throw { message: "Cart not found" };
    const product = await Product.findById(productId);
    if (!product) throw { message: "Product not found" };

    const productInCart = cartDocument.products.find((p) =>
      p.product.equals(productId)
    );

    if (productInCart) productInCart.quantity = quantity;
    else cartDocument.products.push({ product: productId, quantity: quantity });
    await cartDocument.save();
    return {
      id: cartDocument._id,
      products: cartDocument.products,
    };
  }

  async emptyCart(cartId) {
    const cartDocument = await Cart.findById(cartId);
    if (!cartDocument) throw { message: "Cart not found" };
    cartDocument.products = [];
    await cartDocument.save();
    return {
      id: cartDocument._id,
      products: cartDocument.products,
    };
  }
}
