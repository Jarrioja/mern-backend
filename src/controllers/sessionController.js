import { z } from "zod";
import SessionManager from "../managers/sessionManager.js";
import UserMangaer from "../managers/userManager.js";
import loginValidation from "../validations/session/loginValidation.js";
import { decodeToken, generateToken } from "../utils/jwt.js";

export const signup = async (req, res, next) => {
  try {
    const manager = new SessionManager();
    const result = await manager.signup(req.body);
    return res.status(201).json({
      status: "success",
      message: "Signup success!",
      payload: { ...result, password: undefined },
    });
  } catch (error) {
    next(error);
  }
};

export const signupPaspport = async (req, res, next) => {
  try {
    return res.status(201).json({
      status: "success",
      message: "Signup success!",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    await loginValidation.parseAsync(req.body);
    const { email, password } = req.body;
    const manager = new SessionManager();
    const result = await manager.login(email, password);

    const accessToken = await generateToken(result);

    if (result.role === "admin") {
      req.session.admin = true;
    }

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      })
      .send({
        accessToken,
        message: "Login success!",
      });
  } catch (error) {
    next(error);
  }
};

export const loginPassport = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }
    const { email, role } = req.user;

    req.session.user = { email, role };
    if (role === "admin") {
      req.session.admin = true;
    }

    return res.status(200).json({
      status: "success",
      message: "Login success!",
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    req.session.destroy((err) => {
      if (!err) {
        return res.status(200).json({
          message: "Logout ok!",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

export const failed = (req, res) => {
  return res.status(500).send({ error: "failed" });
};

export const current = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).send({ status: "error", message: "Unauthorized" });
    }
    const decodedToken = await decodeToken(accessToken);
    const userManager = new UserMangaer();

    const user = await userManager.getUserById(decodedToken.user.id);
    if (!user) {
      return res.status(401).send({ status: "error", message: "Unauthorized" });
    }
    return res.status(200).send({ status: "success", payload: req.user });
  } catch (error) {
    next(error);
  }
};
