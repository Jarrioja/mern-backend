import { Router } from "express";
import CartManager from "../models/cartMamager.js";

const cartRouter = Router();
const cartMamager = new CartManager("carts.json");

cartRouter.get("/", async (req, res) => {
  await cartMamager.createCart();
  return res.status(201).json({ message: "Carrito creado exitosamente" });
});

cartRouter.get("/:cartId", async (req, res) => {
  try {
    const cartId = +req.params.cartId;
    const { products } = await cartMamager.getCart(cartId);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(404).json({ message: "Carrito no encontrado" });
  }
});

cartRouter.post("/:cartId/proudct/:productId/", async (req, res) => {
  const cartId = +req.params.cartId;
  const productId = +req.params.productId;
  const addProduct = await cartMamager.addProduct(cartId, productId);
  if (!addProduct)
    return res.status(404).json({ message: "Carrito o Producto no existe" });
  return res.status(201).json({
    message: `Producto ${productId} agregado exitosamente al carrito ${cartId}`,
  });
});

export default cartRouter;
