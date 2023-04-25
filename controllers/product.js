import { validationResult } from "express-validator";
import { Product } from "../models/product.js";

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
  const sameCode = await Product.find({ code: code });
  if (sameCode.length > 0) {
    return res.status(403).json({
      message: `Ya existe un producto con el codigo '${code}'`,
    });
  }
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
  const savedProduct = await product.save();
  if (!savedProduct) {
    return res.status(503).json({
      errors: `Error de Conecxion`,
    });
  }
  console.log(
    "🚀 ~ file: product.js:36 ~ postAddProduct ~ savedProduct:",
    savedProduct
  );
  return res.status(201).json(savedProduct);
};

const getProducts = async (req, res) => {
  try {
    const limit = +req.query.limit;
    if (!limit) {
      const products = await Product.find();
      return res.status(200).json(products);
    }
    const products = await Product.find().limit(limit);
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Error de servidor`,
      error: error,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById({ _id: productId });
    if (!product)
      return res.status(404).json({ message: "Producto no existe" });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Error de servidor`,
      error: error,
    });
  }
};

const putEditProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const productId = { _id: req.params.productId };
    const newProductData = req.body;
    const options = { new: true };
    const products = await Product.findByIdAndUpdate(
      productId,
      newProductData,
      options
    );

    if (!products)
      return res.status(404).json({ message: "Producto no existe" });
    console.log(
      "🚀 ~ file: product.js:93 ~ putEditProduct ~ products:",
      products
    );
    return res.status(203).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Error de servidor`,
      error: error,
    });
  }
};

const deleteProductById = async (req, res) => {
  const productId = { _id: req.params.productId };
  const deletedProduct = await Product.findByIdAndDelete(productId);
  if (!deletedProduct) {
    return res.status(404).json({
      message: `Producto '${productId._id}' no encontrado`,
    });
  }
  return res.status(200).json(`Producto '${productId._id}' eliminado`);
};

export {
  postAddProduct,
  getProducts,
  getProductById,
  putEditProduct,
  deleteProductById,
};
