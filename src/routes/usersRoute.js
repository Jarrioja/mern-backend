import { Router } from "express";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import authenticate from "../middlewares/authenticate.js";
import authorization from "../middlewares/authtorization.js";

const userRouter = Router();

userRouter.get("/", authenticate, authorization("getUsers"), getUsers);
userRouter.get("/:id", authenticate, authorization("getUser"), getUserById);
userRouter.post("/", authenticate, authorization("saveUser"), createUser);
userRouter.put("/:id", authenticate, authorization("updateUser"), updateUser);
userRouter.delete(
  "/:id",
  authenticate,
  authorization("deleteUser"),
  deleteUser
);

export default userRouter;
