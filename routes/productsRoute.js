import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { validateProduct } from "../middlewares/validations.js";

const productRouter = Router();

productRouter.get("/", getProducts);

productRouter.get("/:productId", getProductById);

productRouter.post("/", validateProduct, createProduct);

productRouter.put("/:productId", validateProduct, updateProduct);

productRouter.delete("/:productId", deleteProduct);
export default productRouter;
