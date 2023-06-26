import container from "../../container.js";
import idValidation from "../validations/common/idValidation.js";
import userCreateValidation from "../validations/user/userCreateValidation.js";
import userUpdateValidation from "../validations/user/userUpdateValidation.js";

class UserManager {
  constructor() {
    this.userRepository = container.resolve("UserRepository");
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
    const newUser = await this.userRepository.createUser(user);
    return { ...newUser, password: undefined };
  }

  async updateUser(userId, user) {
    await userUpdateValidation.parseAsync({ ...user, id: userId });
    const userUpdated = await this.userRepository.updateUser(userId, user);

    if (userUpdated == null)
      throw {
        message: "User not found",
      };
    return;
  }

  async deleteUser(userId) {
    await idValidation.parseAsync({ id: userId });
    const deletedUser = await this.userRepository.deleteUser(userId);
    if (deletedUser == null)
      throw {
        message: "User not found",
      };
    return await this.userRepository.deleteUser(userId);
  }
}
export default UserManager;
