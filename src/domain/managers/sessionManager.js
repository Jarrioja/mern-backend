import container from "../../container.js";
import { createHash, isValidPassword } from "../../common/encrypt.js";
class SessionManager {
  constructor() {
    this.userRepository = new container.resolve("UserRepository");
  }

  async login(email, password) {
    const user = await this.userRepository.getUserByEmail(email);
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
    return await this.userRepository.createUser(newUser);
  }
}

export default SessionManager;
