import { Router } from "express";
// import { body, validationResult } from "express-validator";
import ProductManager from "../models/productManager.js";

const productRouter = Router();

const productManager = new ProductManager("products.json");

productRouter.get("/", async (req, res) => {
  const products = await productManager.readFile();
  const limit = +req.query.limit;
  if (!limit) {
    return res.status(200).json(products);
  }
  const productLimited = products.slice(0, limit);
  res.status(200).json(productLimited);
});

productRouter.get("/:productId", async (req, res) => {
  const productId = +req.params.productId;
  const product = await productManager.getProductsById(productId);
  res.status(200).json(product);
});

productRouter.post("/", async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;
  const newProduct = await productManager.createProduct({
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  });
  return res.status(201).json(newProduct);
});

export default productRouter;
