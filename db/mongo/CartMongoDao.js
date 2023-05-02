import { Cart } from "../../models/cart.js";
import { Product } from "../../models/product.js";
class CartMongoDao {
  async findById(id) {
    const cartDocument = await Cart.findById({ _id: id });
    return {
      id: cartDocument._id,
      products: cartDocument.products,
    };
  }
  async create() {
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
    const cartDocument = await Cart.findById({ _id: cartId });
    if (!cartDocument)
      throw { message: "Carrito no encontrado", statusCode: 404 };

    const product = await Product.findById({ _id: productId });
    if (!product) throw { message: "Producto no encontrado", statusCode: 404 };

    const productInCart = cartDocument.products.find((p) =>
      p._id.equals(productId)
    );
    if (productInCart) productInCart.quantity += 1;
    else cartDocument.products.push({ _id: productId, quantity: 1 });
    await cartDocument.save();
    return {
      id: cartDocument._id,
      products: cartDocument.products,
    };
  }
}

export { CartMongoDao };
