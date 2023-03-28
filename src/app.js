import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

import ProductManager from "./producManager.js";

const PORT = process.env.PORT || 5000;
const productManager = new ProductManager("./products.json");
const app = express();

app.get("/products", async (req, res) => {
  const products = await productManager.readFile();
  const limit = +req.query.limit;
  if (!limit) {
    return res.send(products);
  }
  const productLimited = products.slice(0, limit);
  return res.send(productLimited);
});

app.get("/products/:productId", async (req, res) => {
  const productId = +req.params.productId;
  const product = await productManager.getProductsById(productId);
  return res.send(product);
});

app.listen(PORT, () => {
  console.log(`Escuchando en el ${PORT}`);
});
