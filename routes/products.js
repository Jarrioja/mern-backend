import { Router } from "express";
import {
  postAddProduct,
  getProducts,
  getProductById,
  putEditProduct,
  deleteProductById,
} from "../controllers/product.js";
import { validateProduct } from "../middleware/validations.js";

const productRouter = Router();

productRouter.get("/", getProducts);

productRouter.get("/:productId", getProductById);

productRouter.post("/", validateProduct, postAddProduct);

productRouter.put("/:productId", validateProduct, putEditProduct);

productRouter.delete("/:productId", deleteProductById);
export default productRouter;
