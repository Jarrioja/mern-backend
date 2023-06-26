import RoleMongoDao from "../../data/repositories/mongoose/roleMongooseRepository.js";

class RoleManager {
  constructor() {
    this.roleDao = new RoleMongoDao();
  }

  async getRoles(params) {
    return await this.roleDao.getRoles(params);
  }

  async getRoleById(roleId) {
    return await this.roleDao.getRoleById(roleId);
  }

  async getRoleByName(roleName) {
    return await this.roleDao.getRoleByName(roleName);
  }

  async createRole(role) {
    return await this.roleDao.createRole(role);
  }

  async updateRole(roleId, role) {
    return await this.roleDao.updateRole(roleId, role);
  }

  async deleteRole(roleId) {
    return await this.roleDao.deleteRole(roleId);
  }
}
export default RoleManager;
