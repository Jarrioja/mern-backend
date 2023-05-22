import { User } from "../../models/userModel.js";

export default class UserDao {
  async getUsers({ limit, sort, role, page }) {
    let paginateQuery = {};
    if (role) {
      paginateQuery = { role: role };
    }
    let sortQuery;
    sort === "asc" ? (sortQuery = 1) : sort === "desc" ? (sortQuery = -1) : {};
    const paginateOptions = {
      page: page || 1,
      limit: limit || 10,
      sort: { email: sortQuery || -1 },
    };
    const userDocuments = await User.paginate(paginateQuery, paginateOptions);
    return {
      users: userDocuments.docs.map((userDocument) => ({
        id: userDocument?._id,
        email: userDocument?.email,
        password: undefined,
        role: userDocument?.role,
      })),
    };
  }

  async getUserById(userId) {
    const userDocument = await User.findById(userId);
    if (!userDocument)
      throw {
        message: "User not found",
      };
    return {
      id: userDocument?._id,
      email: userDocument?.email,
      password: undefined,
      role: userDocument?.role,
    };
  }
  async getUserByEmail(email) {
    const userDocument = await User.findOne({ email });
    // FIX PARA PASSPORT
    // if (!userDocument)
    //   throw {
    //     message: "User not found",
    //   };
    return {
      id: userDocument?._id,
      email: userDocument?.email,
      password: userDocument?.password,
      role: userDocument?.role,
    };
  }
  async createUser(newUser) {
    const userExists = await User.findOne({ email: newUser.email });
    if (userExists)
      throw {
        message: "User already exists",
      };
    const userDocument = new User(newUser);
    await userDocument.save();
    return {
      id: userDocument?._id,
      email: userDocument?.email,
      password: userDocument?.password,
      role: userDocument?.role,
    };
  }

  async updateUser(userId, user) {
    const emailExists = await User.findOne({ email: user.email });
    if (emailExists)
      throw {
        message: "Email already exists",
      };
    const userDocument = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });
    if (!userDocument)
      throw {
        message: "User not found",
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
      };
    return {
      id: userDocument?._id,
      email: userDocument?.email,
      password: userDocument?.password,
      role: userDocument?.role,
    };
  }
}
