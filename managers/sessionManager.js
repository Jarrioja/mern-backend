import UserDao from "../daos/mongo/userDao.js";
import { createHash, isValidPassword } from "../utils/encrypt.js";
class SessionManager {
  constructor() {
    this.userDao = new UserDao();
  }

  async login(email, password) {
    const user = await this.userDao.findByEmail(email);
    const isPasswordCorrect = await isValidPassword(password, user.password);
    if (!isPasswordCorrect) throw new Error("Password incorrect");
    return user;
  }

  async logout(email) {
    return await this.userDao.findByEmail(email);
  }

  async register(user) {
    const { email, password } = user;
    const encryptedPassword = await createHash(password);
    const newUser = {
      email,
      password: encryptedPassword,
    };
    return await this.userDao.createUser(newUser);
  }
}

export default SessionManager;
