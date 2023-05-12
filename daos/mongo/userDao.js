import { User } from "../../models/userModel.js";

export default class UserDao {
  async findById(userId) {
    const userDocument = await User.findById(userId);
    if (!userDocument)
      throw {
        message: "User not found",
        statusCode: 404,
      };
    return {
      id: userDocument?._id,
      email: userDocument?.email,
      password: undefined,
      role: userDocument?.role,
    };
  }
  async findByEmail(email) {
    const userDocument = await User.findOne({ email });
    if (!userDocument)
      throw {
        message: "User not found",
        statusCode: 404,
      };
    return {
      id: userDocument?._id,
      email: userDocument?.email,
      password: userDocument?.password,
      role: userDocument?.role,
    };
  }
  async createUser(user) {
    const userExists = await User.findOne({ email: user.email });
    if (userExists)
      throw {
        message: "User already exists",
        statusCode: 409,
      };
    const userDocument = new User(user);
    await userDocument.save();
    return {
      id: userDocument?._id,
      email: userDocument?.email,
      password: userDocument?.password,
      role: userDocument?.role,
    };
  }
  async updateUser(userId, user) {
    const userDocument = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });
    if (!userDocument)
      throw {
        message: "User not found",
        statusCode: 404,
      };
    return {
      id: userDocument?._id,
      email: userDocument?.email,
      password: userDocument?.password,
      role: userDocument?.role,
    };
  }
  async deleteUser(userId) {
    const userDocument = await User.findByIdAndDelete(userId);
    if (!userDocument)
      throw {
        message: "User not found",
        statusCode: 404,
      };
    return {
      id: userDocument?._id,
      email: userDocument?.email,
      password: userDocument?.password,
      role: userDocument?.role,
    };
  }
}
