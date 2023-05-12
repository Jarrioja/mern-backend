import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", auth, createUser);
userRouter.put("/:id", auth, updateUser);
userRouter.delete("/:id", auth, deleteUser);

export default userRouter;
