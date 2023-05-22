import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRouter = Router();

productRouter.get("/", getProducts);

productRouter.get("/:productId", getProductById);

productRouter.post("/", createProduct);

productRouter.put("/:productId", updateProduct);

productRouter.delete("/:productId", deleteProduct);
export default productRouter;
