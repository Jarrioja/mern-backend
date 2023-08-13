import container from '../../container.js';
import idValidation from '../validations/common/idValidation.js';
import userCreateValidation from '../validations/user/userCreateValidation.js';
import userUpdateValidation from '../validations/user/userUpdateValidation.js';
import { createHash } from '../../common/encrypt.js';

class UserManager {
  constructor() {
    this.userRepository = container.resolve('UserRepository');
    this.roleRepository = container.resolve('RoleRepository');
  }

  async getUsers(params) {
    return await this.userRepository.getUsers(params);
  }

  async getUserById(userId) {
    await idValidation.parseAsync({ id: userId });
    return await this.userRepository.getUserById(userId);
  }

  async getUserByEmail(email) {
    return await this.userRepository.getUserByEmail(email);
  }

  async createUser(user) {
    await userCreateValidation.parseAsync(user);
    const encryptedPassword = await createHash(user.password);
    user.password = encryptedPassword;
    const newUser = await this.userRepository.createUser(user);
    return { ...newUser, password: undefined };
  }

  async updateUser(userId, user) {
    await userUpdateValidation.parseAsync({ ...user, id: userId });
    const userUpdated = await this.userRepository.updateUser(userId, user);

    if (userUpdated == null)
      throw {
        message: 'User not found',
      };
    return;
  }

  async deleteUser(userId) {
    await idValidation.parseAsync({ id: userId });
    const deletedUser = await this.userRepository.deleteUser(userId);
    if (deletedUser == null)
      throw {
        message: 'User not found',
      };
    return await this.userRepository.deleteUser(userId);
  }
  async setPremiumUser(userId) {
    try {
      // Validar el ID del usuario
      await idValidation.parseAsync({ id: userId });

      // Obtener los roles necesarios
      const [premiumRole, clientRole] = await Promise.all([
        this.roleRepository.getRoleByName('premium'),
        this.roleRepository.getRoleByName('client'),
      ]);

      if (!premiumRole || !clientRole) {
        throw new Error('Roles not found');
      }

      // Obtener el usuario
      const user = await this.userRepository.getUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Cambiar el rol del usuario
      const newRoleId = user.role.name === clientRole.name ? premiumRole.id : clientRole.id;
      const userUpdated = await this.userRepository.updateUser(userId, { role: newRoleId });
      return userUpdated;
    } catch (error) {
      throw new Error(`Failed to set premium user: ${error.message}`);
    }
  }
}
export default UserManager;
