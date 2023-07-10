import { Router } from "express";
import {
  login,
  logout,
  signup,
  current,
} from "../../presentation/controllers/sessionController.js";
import authenticate from "../../presentation/middlewares/authenticate.js";

const sessionRouter = Router();

/** JWT **/
sessionRouter.post("/login", login);
sessionRouter.get("/current", authenticate, current);
sessionRouter.post("/signup", signup);
sessionRouter.post("/logout", logout);
/** JWT **/

export default sessionRouter;
