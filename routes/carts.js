import { Router } from "express";
import {
  getCreateCart,
  getCartById,
  postAddToCart,
} from "../controllers/cart.js";

const cartRouter = Router();

cartRouter.get("/", getCreateCart);

cartRouter.get("/:cartId", getCartById);

cartRouter.post("/:cartId/proudct/:productId/", postAddToCart);

export default cartRouter;
