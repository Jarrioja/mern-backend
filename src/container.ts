import dotenv from "dotenv";
dotenv.config();

import { createContainer, asClass } from "awilix";

import UserMongooseRepository from "./data/repositories/mongoose/userMongooseRepository.js";
import RoleMongooseRepository from "./data/repositories/mongoose/roleMongooseRepository.js";
import ProductMongooseRepository from "./data/repositories/mongoose/productMongooseRepository.js";
import CartMongooseRepository from "./data/repositories/mongoose/cartMongooseRepository.js";
import OrderMongooseRepository from "./data/repositories/mongoose/orderMongooseRepository.js";

const container = createContainer();

if (process.env.DB === "MongooseAdapter") {
  container.register({
    UserRepository: asClass(UserMongooseRepository).singleton(),
    RoleRepository: asClass(RoleMongooseRepository).singleton(),
    ProductRepository: asClass(ProductMongooseRepository).singleton(),
    CartRepository: asClass(CartMongooseRepository).singleton(),
    OrderRepository: asClass(OrderMongooseRepository).singleton(),
  });
} else if (process.env.DB === "file") {
}
export default container;
