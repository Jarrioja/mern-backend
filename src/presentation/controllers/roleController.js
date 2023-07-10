import RoleManager from "../../domain/managers/roleManager.js";

const getRoles = async (req, res, next) => {
  try {
    const manager = new RoleManager();
    const roles = await manager.getRoles(req.query);
    return res.status(200).json({
      status: "success",
      payload: roles,
    });
  } catch (error) {
    next(error);
  }
};

const getRoleById = async (req, res, next) => {
  try {
    const manager = new RoleManager();
    const role = await manager.getRoleById(req.params.id);
    return res.status(200).json({
      status: "success",
      payload: role,
    });
  } catch (error) {
    next(error);
  }
};

const createRole = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const manager = new RoleManager();
    const roleExist = await manager.getRoleByName(req.body.name);
    if (roleExist) {
      return res.status(400).json({
        status: "error",
        message: "Role already exist",
      });
    }
    const role = await manager.createRole(req.body);
    return res.status(201).json({
      status: "success",
      payload: role,
    });
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const manager = new RoleManager();
    const role = await manager.updateRole(req.params.id, req.body);
    return res.status(200).json({
      status: "success",
      payload: role,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const manager = new RoleManager();
    await manager.deleteRole(req.params.id);
    return res.status(200).json({
      status: "success",
      message: "Role deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export { getRoles, getRoleById, createRole, updateRole, deleteRole };
