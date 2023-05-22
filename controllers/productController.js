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
    next(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const manager = new ProductManager();
    const product = await manager.findById(productId);
    return res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    next(error);
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
    next(error);
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
    next(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const manager = new ProductManager();
    const product = await manager.delete(req.params.productId);
    return res.status(201).json({ status: "success", payload: product });
  } catch (error) {
    next(error);
  }
};

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
