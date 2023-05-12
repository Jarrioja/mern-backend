//import { validationResult } from "express-validator";
import SessionManager from "../managers/sessionManager.js";

const manager = new SessionManager();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await manager.login(email, password);
    req.session.user = { email };
    return res.status(200).json({
      status: "success",
      payload: result,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: "error",
      error: error.message,
    });
  }
};
const logout = async (req, res) => {
  try {
    req.session.destroy();
    //const result = await manager.logout(req.user.id);
    return res.status(200).json({
      status: "success",
      payload: null,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: "error",
      error: error.message,
    });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await manager.signup(email, password);
    req.session.user = { email };
    return res.status(200).json({
      status: "success",
      payload: result,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: "error",
      error: error.message,
    });
  }
};

export { login, logout, signup };
