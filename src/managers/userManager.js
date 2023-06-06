import UserMongoDao from "../daos/mongo/userMongoDao.js";
import idValidation from "../validations/common/idValidation.js";
import userCreateValidation from "../validations/user/userCreateValidation.js";
import userUpdateValidation from "../validations/user/userUpdateValidation.js";

class UserManager {
  constructor() {
    this.userDao = new UserMongoDao();
  }

  async getUsers(params) {
    return await this.userDao.getUsers(params);
  }

  async getUserById(userId) {
    await idValidation.parseAsync({ id: userId });
    return await this.userDao.getUserById(userId);
  }

  async getUserByEmail(email) {
    return await this.userDao.getUserByEmail(email);
  }

  async createUser(user) {
    await userCreateValidation.parseAsync(user);
    const newUser = await this.userDao.createUser(user);
    return { ...newUser, password: undefined };
  }

  async updateUser(userId, user) {
    await userUpdateValidation.parseAsync({ ...user, id: userId });
    return await this.userDao.updateUser(userId, user);
  }

  async deleteUser(userId) {
    await idValidation.parseAsync({ id: userId });
    return await this.userDao.deleteUser(userId);
  }
}
export default UserManager;
