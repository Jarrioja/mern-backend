import SessionManager from "../../domain/managers/sessionManager.js";
import UserMangaer from "../../domain/managers/userManager.js";
import loginValidation from "../../domain/validations/session/loginValidation.js";
import { decodeToken, generateToken } from "../../common/jwt.js";

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
