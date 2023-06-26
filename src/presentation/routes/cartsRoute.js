import { Router } from "express";
import {
  createCart,
  getCartById,
  addToCart,
  deleteProduct,
  updateCart,
  updateProductQuantity,
  emptyCart,
} from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.get("/", createCart);
cartRouter.get("/:cartId", getCartById);
cartRouter.post("/:cartId/proudct/:productId/", addToCart);
cartRouter.delete("/:cartId/proudct/:productId/", deleteProduct);
cartRouter.put("/:cartId", updateCart);
cartRouter.put("/:cartId/proudct/:productId/", updateProductQuantity);
cartRouter.delete("/:cartId", emptyCart);

export default cartRouter;
