import container from "../../container.js";
import { createHash, isValidPassword } from "../../common/encrypt.js";
import { transporter } from "../../common/sendMail.js";
import { decodeToken, generateToken } from "../../common/jwt.js";
class SessionManager {
  constructor() {
    this.userRepository = new container.resolve("UserRepository");
  }

  async login(email, password) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user.email) throw new Error("User not found");
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

  async forgotPassword(email) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user.email) throw new Error("User not found");
    const token = await generateToken(user);

    const result = await transporter.sendMail({
      from: "jarrioja2210@gmail.com",
      to: email,
      subject: "Password recovery link",
      html: `<a href="https://forms.jesusarrioja.dev/change-password?token=${token}">Reset password</a>
      
      <p><b>Token: </b><code>${token}</code></p>
      `,
    });

    if (!result) throw new Error("Error sending mail");
    return result;
  }

  async changePassword(token, passwords) {
    const { user } = await decodeToken(token);

    const { id, password } = await this.userRepository.getUserByEmail(
      user.email
    );
    if (passwords.password !== passwords.passwordToConfirm) {
      throw new Error("The passwords do not match");
    }

    if (isSamePassword)
      throw new Error("The new password is the same as the old one");

    const encryptedPassword = await createHash(passwords.password);

    const result = await this.userRepository.updateUser(id, {
      password: encryptedPassword,
    });

    if (!result) throw new Error("Error updating password");
    return result;
  }
}

export default SessionManager;
