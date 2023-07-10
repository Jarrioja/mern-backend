import dotenv from "dotenv";
dotenv.config();
import chai from "chai";

import DbFactory from "../../data/factories/dbFactory.js";

import RoleMongooseRepository from "../../data/repositories/mongoose/roleMongooseRepository.js";

const expect = chai.expect;

const db = await DbFactory.create(process.env.DB);
db.init(process.env.DB_URI);

describe("Testing Role Mongoose Repository", function () {
  before(function () {
    this.roleRepository = new RoleMongooseRepository();
  });
  beforeEach(async function () {
    this.timeout(2000);
    await new Promise((resolve) => setTimeout(resolve, 1500));
  });

  it("El repositorio debe poder obtener todos los roles", function () {
    this.roleRepository.getRoles({ limit: 10 }).then((result) => {
      expect.strictEqual(Array.isArray(result.roles), true);
    });
  });

  it("El repositorio debe poder obtener un rol por su nombre", function () {
    this.roleRepository.getRoleByName("client").then((result) => {
      expect.strictEqual(result.role.name, "client");
    });
  });

  it("El repositorio debe poder crear un rol", function () {
    this.roleRepository.createRole({ name: "test" }).then((result) => {
      expect.strictEqual(result.role.name, "test");
    });
  });

  it("El repositorio debe poder actualizar un rol", function () {
    this.roleRepository.updateRole({ name: "testUpdated" }).then((result) => {
      expect.strictEqual(result.role.name, "testUpdated");
    });
  });
  it("El repositorio debe poder eliminar un rol", function () {
    this.roleRepository.deleteRole({ name: "testUpdated" }).then((result) => {
      expect.strictEqual(result.role.name, "testUpdated");
    });
  });
});
