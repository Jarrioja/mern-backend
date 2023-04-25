import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";

const getCreateCart = async (req, res) => {
  try {
    const cart = new Cart({
      products: [],
    });
    cart.save();
    return res.status(201).json(cart);
  } catch (error) {
    return res.status(500).json({ error: e.message });
  }
};

const getCartById = async (req, res) => {
  try {
    const cartId = { _id: req.params.cartId };
    const { products } = await Cart.findById(cartId);
    if (!products.length)
      return res.status(200).json({ message: "Carrito Vacio" });
    return res.status(200).json(products);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const postAddToCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    // Buscar el carrito
    const cart = await Cart.findById({ _id: cartId });
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    // Buscar el producto
    const product = await Product.findById({ _id: productId });
    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });
    // Buscar si el produco existe en el carrito
    const productInCart = cart.products.find((p) => p._id.equals(productId));
    // Si el producto ya está en el carrito, incrementar la cantidad
    if (productInCart) productInCart.quantity += 1;
    // Si el producto no está en el carrito, agregarlo
    else cart.products.push({ _id: productId, quantity: 1 });
    // Actualizar el carrito
    const updatedCart = await cart.save();

    return res.status(201).json(updatedCart);
  } catch (e) {
    console.log("🚀 ~ file: cart.js:57 ~ postAddToCart ~ e:", e);
    return res.status(500).json({ error: e.message });
  }
};

export { getCreateCart, getCartById, postAddToCart };
