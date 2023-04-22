import { Cart } from "../models/cart.js";

const getCreateCart = async (req, res) => {
  try {
    const cart = new Cart({
      products: [],
    });
    cart.save();
    return res.status(201).json({ message: "Carrito creado exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: `Error de servidor`,
      error: error,
    });
  }
};

const getCartById = async (req, res) => {
  try {
    const cartId = { _id: req.params.cartId };
    const [{ products }] = await Cart.find(cartId);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(404).json({ message: "Carrito Vacio" });
  }
};

const postAddToCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    console.log(cartId);
    const newProduct = {
      _id: req.params.productId,
      quantity: 1,
    };
    const filter = { _id: cartId };
    const update = { $push: { products: newProduct } };

    //Agregar suma de quantity cuando ya existe el producto
    const addedToCart = await Cart.findOneAndUpdate(filter, update);
    return res.status(201).json(addedToCart);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

export { getCreateCart, getCartById, postAddToCart };
