import dotenv from "dotenv";
dotenv.config();
import chai from "chai";
import { faker } from "@faker-js/faker";

import DbFactory from "../data/factories/dbFactory.js";
import UserMongooseRepository from "../data/repositories/mongoose/userMongooseRepository.js";

const expect = chai.expect;

const db = await DbFactory.create(process.env.DB);
db.init(process.env.DB_URI);

describe("Testing User Mongoose Repository", () => {
  before(async function () {
    this.userRepository = new UserMongooseRepository();
  });

  it("El repositorio debe ser una instancia de UserMongooseRepository", function () {
    expect(this.userRepository instanceof UserMongooseRepository).to.be.ok;
  });
  it("El repositoria debe devolver un array", function () {
    this.userRepository.getUsers({ limit: 10 }).then((result) => {
      expect.strictEqual(Array.isArray(result.users), true);
    });
  });

  it("El repositorio debe poder crear un user", function () {
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: 18,
      isAdmin: false,
      password: 12345678,
    };

    this.userRepository.createUser(user).then((result) => {
      expect(result.firstName).to.be.equals(user.firstName);
      expect(result.email).to.be.equals(user.email);
    });
  });

  it("El repositorio debe poder actualizar un usuario", function () {
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: 18,
      isAdmin: false,
      password: "12345678",
    };

    this.timeout(5000); // Ajusta el tiempo límite de la prueba si es necesario

    this.userRepository.createUser(user).then((createdUser) => {
      const updatedUser = {
        ...createdUser,
        firstName: faker.person.firstName(),
        age: 25,
      };

      this.userRepository.updateUser(updatedUser).then((result) => {
        assert.strictEqual(result.firstName, updatedUser.firstName);
        assert.strictEqual(result.age, updatedUser.age);
      });
    });
  });

  it("El repositorio debe poder eliminar un usuario", function () {
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: 18,
      isAdmin: false,
      password: "12345678",
    };

    this.timeout(5000); // Ajusta el tiempo límite de la prueba si es necesario

    this.userRepository.createUser(user).then((createdUser) => {
      this.userRepository.deleteUser(createdUser).then((deletedUser) => {
        assert.strictEqual(deletedUser.id, createdUser.id);
      });
    });
  });

  it("El repositorio debe poder buscar un usuario por id", function () {
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: 18,
      isAdmin: false,
      password: "XXXXXXXX",
    };

    this.timeout(5000); // Ajusta el tiempo límite de la prueba si es necesario

    this.userRepository.createUser(user).then((createdUser) => {
      this.userRepository.getUserById(createdUser.id).then((result) => {
        assert.strictEqual(result.id, createdUser.id);
      });
    });
  });
});
