import { cartSchema } from "../../models/mongoose/cartSchema.js";
import { productSchema } from "../../models/mongoose/productSchema.js";
import Cart from "../../../domain/entities/cart.js";

export default class CartMongooseRepository {
  async findById(cartId) {
    const cartDocument = await cartSchema.findById(cartId);

    return new Cart({
      id: cartDocument._id,
      products: cartDocument.products,
    });
  }

  async createCart() {
    const cartDocument = new cartSchema({
      products: [],
    });
    cartDocument.save();
    return new Cart({
      id: cartDocument._id,
      products: cartDocument.products,
    });
  }

  async addProduct(cartId, productId) {
    const cartDocument = await cartSchema.findById(cartId);
    if (!cartDocument) throw { message: "Cart not found" };

    const product = await productSchema.findById(productId);
    if (!product) throw { message: "Product not found" };

    const productInCart = cartDocument.products.find((p) => {
      return p.product.equals(productId);
    });
    if (productInCart) productInCart.quantity += 1;
    else cartDocument.products.push({ product: productId, quantity: 1 });
    await cartDocument.save();
    return new Cart({
      id: cartDocument._id,
      products: cartDocument.products,
    });
  }

  async deleteProduct(cartId, productId) {
    const cartDocument = await cartSchema.findById(cartId);
    if (!cartDocument) throw { message: "Cart not found" };

    const product = await productSchema.findById(productId);
    if (!product) throw { message: "Product not found" };

    const index = cartDocument.products.findIndex((p) => {
      return p.product.equals(productId);
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
    const cartDocument = await cartSchema.findById(cartId);
    if (!cartDocument) throw { message: "Cart not found" };
    cartDocument.products = products;
    await cartDocument.save();
    return new Cart({
      id: cartDocument._id,
      products: cartDocument.products,
    });
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cartDocument = await cartSchema.findById(cartId);
    if (!cartDocument) throw { message: "Cart not found" };
    const product = await productSchema.findById(productId);
    if (!product) throw { message: "Product not found" };

    const productInCart = cartDocument.products.find((p) =>
      p.product.equals(productId)
    );

    if (productInCart) productInCart.quantity = quantity;
    else cartDocument.products.push({ product: productId, quantity: quantity });
    await cartDocument.save();

    return new Cart({
      id: cartDocument._id,
      products: cartDocument.products,
    });
  }

  async emptyCart(cartId) {
    const cartDocument = await cartSchema.findById(cartId);
    if (!cartDocument) throw { message: "Cart not found" };
    cartDocument.products = [];
    await cartDocument.save();
    return new Cart({
      id: cartDocument._id,
      products: cartDocument.products,
    });
  }
}
