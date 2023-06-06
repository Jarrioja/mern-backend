import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import authorization from "../middlewares/authtorization.js";
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/roleController.js";

const roleRouter = Router();

roleRouter.get("/", authenticate, authorization("getRoles"), getRoles);
roleRouter.get("/:id", authenticate, authorization("getRole"), getRoleById);
roleRouter.post("/", authenticate, authorization("creteRole"), createRole);
roleRouter.put("/:id", authenticate, authorization("updateRole"), updateRole);
roleRouter.delete(
  "/:id",
  authenticate,
  authorization("deleteRole"),
  deleteRole
);

export default roleRouter;
