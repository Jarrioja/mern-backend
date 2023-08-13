import container from '../../container.js';
class RoleManager {
  constructor() {
    this.roleRepository = container.resolve('RoleRepository');
  }

  async getRoles(params) {
    return await this.roleRepository.getRoles(params);
  }

  async getRoleById(roleId) {
    return await this.roleRepository.getRoleById(roleId);
  }

  async getRoleByName(roleName) {
    return await this.roleRepository.getRoleByName(roleName);
  }

  async createRole(role) {
    const newRole = await this.roleRepository.createRole(role);
    return newRole;
  }

  async updateRole(roleId, role) {
    return await this.roleRepository.updateRole(roleId, role);
  }

  async deleteRole(roleId) {
    return await this.roleRepository.deleteRole(roleId);
  }
}
export default RoleManager;
