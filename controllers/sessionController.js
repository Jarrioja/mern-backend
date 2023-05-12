import SessionManager from "../managers/sessionManager.js";

const manager = new SessionManager();

const signup = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await manager.signup(req.body);
    req.session.user = { email };
    return res.status(200).json({
      message: "Signup success!",
      payload: { ...result, password: undefined },
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      status: "error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await manager.login(email, password);
    req.session.user = { email };
    if (result.role === "admin") {
      req.session.admin = true;
    }
    return res.status(200).json({
      message: "Login success!",
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
    req.session.destroy((err) => {
      if (!err) {
        return res.status(200).json({
          message: "Logout ok!",
        });
      }
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
