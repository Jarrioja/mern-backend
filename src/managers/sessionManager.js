import UserMongoDao from "../daos/mongo/userMongoDao.js";
import { createHash, isValidPassword } from "../utils/encrypt.js";
import CartManager from "./cartManager.js";
class SessionManager {
  constructor() {
    this.userDao = new UserMongoDao();
  }

  async login(email, password) {
    const user = await this.userDao.getUserByEmail(email);
    const isPasswordCorrect = await isValidPassword(password, user.password);
    if (!isPasswordCorrect) throw new Error("Password incorrect");
    return user;
  }

  async signup(user) {
    const encryptedPassword = await createHash(user.password);
    const newUser = {
      ...user,
      password: encryptedPassword,
    };
    return await this.userDao.createUser(newUser);
  }
}

export default SessionManager;
