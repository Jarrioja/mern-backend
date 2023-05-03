import CartManager from "../managers/cartManager.js";

const getCartById = async (req, res) => {
  try {
    const manager = new CartManager();
    const cart = await manager.findById(req.params.cartId);
    return res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: "error",
      message: error.message,
    });
  }
};

const createCart = async (req, res) => {
  try {
    const manager = new CartManager();
    const cart = await manager.create();
    return res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: "error",
      message: error.message,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const manager = new CartManager();
    // Buscar el carrito
    const cart = await manager.addProduct(
      req.params.cartId,
      req.params.productId
    );
    return res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: "error",
      message: error.message,
    });
  }
};

export { createCart, getCartById, addToCart };
