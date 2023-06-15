import { Role } from "../../models/roleModel.js";

export default class RoleMongoDao {
  async getRoles({ limit, sort, role, page }) {
    let paginateQuery = {};
    if (role) {
      paginateQuery = { role: role };
    }
    let sortQuery;
    sort === "asc" ? (sortQuery = 1) : sort === "desc" ? (sortQuery = -1) : {};
    const paginateOptions = {
      page: page || 1,
      limit: limit || 10,
      sort: { email: sortQuery || -1 },
    };
    const roleDocuments = await Role.paginate(paginateQuery, paginateOptions);
    return {
      roles: roleDocuments.docs.map((roleDocument) => ({
        id: roleDocument?._id,
        name: roleDocument?.name,
        permissions: roleDocument?.permissions,
      })),
    };
  }

  async getRoleById(roleId) {
    const roleDocument = await Role.findById(roleId);
    if (!roleDocument)
      throw {
        message: "Role not found",
      };
    return {
      id: roleDocument?._id,
      name: roleDocument?.name,
      permissions: roleDocument?.permissions,
    };
  }

  async getRoleByName(roleName) {
    const roleDocument = await Role.findOne({ name: roleName });
    if (!roleDocument)
      throw {
        message: "Role not found",
      };
    return {
      id: roleDocument?._id,
      name: roleDocument?.name,
      permissions: roleDocument?.permissions,
    };
  }

  async createRole(newRole) {
    const roleDocument = await Role.create(newRole);

    return {
      id: roleDocument?._id,
      name: roleDocument?.name,
      permissions: roleDocument?.permissions,
    };
  }

  async updateRole(roleId, role) {
    const roleDocument = await Role.findByIdAndUpdate(roleId, role, {
      new: true,
    });
    if (!roleDocument)
      throw {
        message: "Role not found",
      };

    return {
      id: roleDocument?._id,
      name: roleDocument?.name,
      permissions: roleDocument?.permissions,
    };
  }
  async deleteRole(roleId) {
    const roleDocument = await Role.findByIdAndDelete(roleId);
    if (!roleDocument)
      throw {
        message: "Role not found",
      };
    return {
      id: roleDocument?._id,
      name: roleDocument?.name,
      permissions: roleDocument?.permissions,
    };
  }
}
