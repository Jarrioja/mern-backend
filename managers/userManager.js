import UserDao from "../daos/mongo/userDao.js";

class UserManager {
  constructor() {
    this.userDao = new UserDao();
  }

  async getUsers(params) {
    return await this.userDao.getUsers(params);
  }

  async getUserById(userId) {
    return await this.userDao.getUserById(userId);
  }

  async getUserByEmail(email) {
    return await this.userDao.getUserByEmail(email);
  }

  async createUser(user) {
    const newUser = await this.userDao.createUser(user);
    return { ...newUser, password: undefined };
  }

  async updateUser(userId, user) {
    return await this.userDao.updateUser(userId, user);
  }

  async deleteUser(userId) {
    return await this.userDao.deleteUser(userId);
  }
}
export default UserManager;
