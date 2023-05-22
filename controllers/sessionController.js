import { z } from "zod";
import SessionManager from "../managers/sessionManager.js";
import loginValidation from "../validations/loginValidation.js";
const manager = new SessionManager();

const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await manager.signup(req.body);
    req.session.user = { email };
    return res.status(200).json({
      message: "Signup success!",
      payload: { ...result, password: undefined },
    });
  } catch (error) {
    next(error);
  }
};

const signupPaspport = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: "success",
      message: "Signup success!",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    await loginValidation.parseAsync(req.body);
    const { email, password } = req.body;
    const result = await manager.login(email, password);
    req.session.user = { email, role: result.role };
    if (result.role === "admin") {
      req.session.admin = true;
    }

    return res.status(200).json({
      message: "Login success!",
    });
  } catch (error) {
    next(error);
  }
};

const loginPassport = async (req, res, next) => {
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

const logout = async (req, res, next) => {
  try {
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

const failed = (req, res) => {
  res.status(500).send({ error: "failed" });
};

export { login, logout, signup, signupPaspport, loginPassport, failed };
