import UserDao from "../daos/mongo/userDao";

class UserManager {
  constructor() {
    this.userDao = new UserDao();
  }

  async findById(userId) {
    return await this.userDao.findById(userId);
  }

  async findByEmail(email) {
    return await this.userDao.findByEmail(email);
  }

  async createUser(user) {
    const user = await this.userDao.createUser(user);
    return { ...user, password: undefined };
  }

  async updateUser(userId, user) {
    return await this.userDao.updateUser(userId, user);
  }

  async deleteUser(userId) {
    return await this.userDao.deleteUser(userId);
  }
}
export default UserManager;
