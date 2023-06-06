import { User } from "../../models/userModel.js";
import { Cart } from "../../models/cartModel.js";
import { Role } from "../../models/roleModel.js";

export default class UserMongoDao {
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
        firstName: userDocument?.firstName,
        lastName: userDocument?.lastName,
        email: userDocument?.email,
        password: undefined,
        role: userDocument?.role,
        cart: userDocument?.cart,
        isAdmin: userDocument?.isAdmin,
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
      firstName: userDocument?.firstName,
      lastName: userDocument?.lastName,
      email: userDocument?.email,
      password: undefined,
      role: userDocument?.role,
      cart: userDocument?.cart,
      isAdmin: userDocument?.isAdmin,
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
      firstName: userDocument?.firstName,
      lastName: userDocument?.lastName,
      email: userDocument?.email,
      password: userDocument?.password,
      role: userDocument?.role,
      cart: userDocument?.cart,
      isAdmin: userDocument?.isAdmin,
    };
  }
  async createUser(newUser) {
    const userExists = await User.findOne({ email: newUser.email });
    if (userExists)
      throw {
        message: "User already exists",
      };

    const cartDocument = new Cart({
      products: [],
    });
    const newCart = await cartDocument.save();
    const roleDocument = await Role.findOne({ name: "client" });
    const userDocument = new User({
      ...newUser,
      cart: newCart,
      role: roleDocument,
    });
    await userDocument.save();
    return {
      id: userDocument?._id,
      firstName: userDocument?.firstName,
      lastName: userDocument?.lastName,
      email: userDocument?.email,
      password: userDocument?.password,
      role: userDocument?.role,
      cart: userDocument?.cart,
      isAdmin: userDocument?.isAdmin,
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
      firstName: userDocument?.firstName,
      lastName: userDocument?.lastName,
      email: userDocument?.email,
      password: userDocument?.password,
      role: userDocument?.role,
      cart: userDocument?.cart,
      isAdmin: userDocument?.isAdmin,
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
      firstName: userDocument?.firstName,
      lastName: userDocument?.lastName,
      email: userDocument?.email,
      password: userDocument?.password,
      role: userDocument?.role,
      cart: userDocument?.cart,
      isAdmin: userDocument?.isAdmin,
    };
  }
}
