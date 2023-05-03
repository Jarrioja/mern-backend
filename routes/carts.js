import { Router } from "express";
import { createCart, getCartById, addToCart } from "../controllers/cart.js";

const cartRouter = Router();

cartRouter.get("/", createCart);

cartRouter.get("/:cartId", getCartById);

cartRouter.post("/:cartId/proudct/:productId/", addToCart);

export default cartRouter;
