import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

import productRouter from "./routes/products.js";
import cartRouter from "./routes/carts.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(PORT, () => {
  console.log(`Escuchando en el ${PORT}`);
});