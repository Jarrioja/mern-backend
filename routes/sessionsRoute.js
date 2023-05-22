import { Router } from "express";
import {
  login,
  logout,
  signup,
  signupPaspport,
  loginPassport,
  failed,
} from "../controllers/sessionController.js";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.post("/login", login);
sessionRouter.post("/logout", logout);
sessionRouter.post("/signup", signup);
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

export default sessionRouter;
