import { validationResult } from "express-validator";
import { Product } from "../models/product.js";
// const product = new Product({});

const postAddProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
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

  const product = new Product({
    title: title,
    description: description,
    code: code,
    price: price,
    status: status,
    stock: stock,
    category: category,
    thumbnails: thumbnails,
  });

  if (!product)
    return res.status(403).json({
      message: `Ya existe un producto con el codigo '${code}'`,
    });
  await product.save();
  const io = req.app.get("io");
  io.emit("productAdded", product);
  return res.status(201).json({ message: product });
};

const getProducts = async (req, res) => {};

export { postAddProduct, getProducts };
