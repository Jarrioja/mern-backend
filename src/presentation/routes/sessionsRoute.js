import { Router } from "express";
import passport from "passport";
import {
  login,
  logout,
  signup,
  signupPaspport,
  loginPassport,
  failed,
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

/** PASSPORT **/
sessionRouter.post(
  "/signup-passport",
  passport.authenticate("singupPassport", {
    failureRedirect: "/api/sessions/signupfail",
  }),
  signupPaspport
);
sessionRouter.get("/signupfail", failed);
sessionRouter.post(
  "/login-passport",
  passport.authenticate("loginPassport"),
  loginPassport
);
sessionRouter.get(
  "/github",
  passport.authenticate(
    "github",
    { scope: ["user:email"] },
    async (req, res) => {}
  )
);
sessionRouter.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    console.log(req.user);
    res.redirect("/");
  }
);
/** PASSPORT **/

export default sessionRouter;