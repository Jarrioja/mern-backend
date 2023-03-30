import { Router } from "express";
import CartManager from "../models/cartMamager.js";

const cartRouter = Router();
const cartMamager = new CartManager("carts.json");

cartRouter.get("/", async (req, res) => {
  await cartMamager.createCart();
  return res.status(201).json("Carrito Creado");
});

cartRouter.post("/:cartId/proudct/:productId/", async (req, res) => {
  const cartId = +req.params.cartId;
  const productId = +req.params.productId;
  const addProduct = await cartMamager.addProduct(cartId, productId);
  return res.status(201).json(addProduct);
});

export default cartRouter;
