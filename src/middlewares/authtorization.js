const authorization = (permission) => {
  return async (req, res, next) => {
    const user = req.user;
    if (!user.isAdmin && !user.role.permission.includes(permission)) {
      return res.status(401).send({ message: "Not authorized" });
    }
    next();
  };
};

export default authorization;
