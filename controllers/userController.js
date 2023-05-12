import { validationResult } from "express-validator";
import UserManager from "../managers/userManager.js";

const manager = new UserManager();

const getUsers = async (req, res) => {
  try {
    const users = await manager.getUsers(req.query);
    return res.status(200).json({
      status: "success",
      payload: users,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: "error",
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await manager.getUserById(req.params.id);
    return res.status(200).json({
      status: "success",
      payload: user,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: "error",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await manager.createUser(req.body);
    return res.status(201).json({
      status: "success",
      payload: user,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: "error",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await manager.updateUser(req.params.id, req.body);
    return res.status(200).json({
      status: "success",
      payload: user,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: "error",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await manager.deleteUser(req.params.id);
    return res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: "error",
      error: error.message,
    });
  }
};
export { getUsers, getUserById, createUser, updateUser, deleteUser };
