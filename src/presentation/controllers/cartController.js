import CartManager from "../../domain/managers/cartManager.js";

const getCartById = async (req, res, next) => {
  try {
    const manager = new CartManager();
    const cart = await manager.findById(req.params.cartId);
    return res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    next(error);
  }
};

const createCart = async (req, res, next) => {
  try {
    const manager = new CartManager();
    const cart = await manager.create();
    return res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const manager = new CartManager();
    // Buscar el carrito
    const cart = await manager.addProduct(
      req.params.cartId,
      req.params.productId
    );
    return res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const manager = new CartManager();
    const cart = await manager.deleteProduct(
      req.params.cartId,
      req.params.productId
    );
    return res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    next(error);
  }
};

const updateCart = async (req, res, next) => {
  try {
    const manager = new CartManager();
    const cart = await manager.updateCart(req.params.cartId, req.body.products);
    return res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    next(error);
  }
};

const updateQuantity = async (req, res, next) => {
  try {
    const manager = new CartManager();
    const cart = await manager.updateQuantity(
      req.params.cartId,
      req.params.productId,
      req.body.quantity
    );
    return res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    next(error);
  }
};
const emptyCart = async (req, res, next) => {
  try {
    const manager = new CartManager();
    const cart = await manager.emptyCart(req.params.cartId);
    return res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    next(error);
  }
};

export {
  createCart,
  getCartById,
  addToCart,
  deleteProduct,
  updateCart,
  updateQuantity,
  emptyCart,
};
