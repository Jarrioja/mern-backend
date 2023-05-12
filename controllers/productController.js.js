import { validationResult } from "express-validator";
import ProductManager from "../managers/productManager.js";

const getProducts = async (req, res) => {
  try {
    const manager = new ProductManager();
    const { products, pagination } = await manager.find(req.query);
    return res.status(200).json({
      status: "success",
      payload: products,
      ...pagination,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: "error",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const manager = new ProductManager();
    const product = await manager.findById(productId);
    return res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: `error`,
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const manager = new ProductManager();
    const product = await manager.create(req.body);
    return res.status(201).json({ status: "success", payload: product });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: `error`,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const manager = new ProductManager();
    const product = await manager.update(req.params.productId, req.body);
    return res.status(201).json({ status: "success", payload: product });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: `error`,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const manager = new ProductManager();
    const product = await manager.delete(req.params.productId);
    return res.status(201).json({ status: "success", payload: product });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    console.log(error.message.message);
    return res.status(statusCode).json({
      status: `error`,
      message: error.message,
    });
  }
};

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
