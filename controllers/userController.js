import { validationResult } from "express-validator";
import UserManager from "../managers/userManager.js";

const manager = new UserManager();

const getUsers = async (req, res, next) => {
  try {
    const users = await manager.getUsers(req.query);
    return res.status(200).json({
      status: "success",
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await manager.getUserById(req.params.id);
    return res.status(200).json({
      status: "success",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
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
    next(error);
  }
};

const updateUser = async (req, res, next) => {
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
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await manager.deleteUser(req.params.id);
    return res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export { getUsers, getUserById, createUser, updateUser, deleteUser };
