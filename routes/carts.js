import { Router } from "express";
import {
  createCart,
  getCartById,
  addToCart,
  deleteProduct,
  updateCart,
  updateQuantity,
  emptyCart,
} from "../controllers/cart.js";

const cartRouter = Router();

cartRouter.get("/", createCart);

cartRouter.get("/:cartId", getCartById);

cartRouter.post("/:cartId/proudct/:productId/", addToCart);

cartRouter.delete("/:cartId/proudct/:productId/", deleteProduct);

cartRouter.put("/:cartId", updateCart);

cartRouter.put("/:cartId/proudct/:productId/", updateQuantity);

cartRouter.delete("/:cartId", emptyCart);

export default cartRouter;
