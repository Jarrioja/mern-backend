import { Router } from "express";
import { body } from "express-validator";
import {
  postAddProduct,
  getProducts,
  getProductById,
  putEditProduct,
  deleteProductById,
} from "../controllers/product.js";

const productRouter = Router();

productRouter.get("/", getProducts);

productRouter.get("/:productId", getProductById);

productRouter.post(
  "/",
  [
    body("title").trim().notEmpty(),
    body("description").trim().notEmpty(),
    body("code").trim().notEmpty(),
    body("price").isNumeric().toFloat(),
    body("stock").isNumeric().toInt(),
    body("category").trim().notEmpty(),
  ],
  postAddProduct
);

productRouter.put(
  "/:productId",
  [
    body("title").trim().notEmpty(),
    body("description").trim().notEmpty(),
    body("code").trim().notEmpty(),
    body("price").isNumeric().toFloat(),
    body("stock").isNumeric().toInt(),
    body("category").trim().notEmpty(),
  ],
  putEditProduct
);

productRouter.delete("/:productId", deleteProductById);
export default productRouter;
