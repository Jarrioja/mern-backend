import { faker } from "@faker-js/faker";
import chai from "chai";
import supertest from "supertest";
import initServer from "./index.js";

const expect = chai.expect;
let jwt = "";

describe("Testing Products endpoints", () => {
  before(async function () {
    const { app, db } = await initServer();
    this.request = supertest.agent(app.callback());
    this.app = app;
    this.db = db;

    this.adminUser = {
      firstName: `${faker.person.firstName()} Admin`,
      lastName: `${faker.person.lastName()} Admin`,
      email: faker.internet.email(),
      age: 20,
      isAdmin: true,
      password: "123451234123",
    };

    const createAdmin = await this.request
      .post("/api/sessions/signup")
      .send(this.adminUser);
    this.adminUser.id = createAdmin.body.id;
    const loginAdmin = await this.request.post("/api/sessions/login").send({
      email: this.adminUser.email,
      password: this.adminUser.password,
    });

    jwt = loginAdmin.body.accessToken;
  });

  after(async function () {
    await this.db.clear();
    await this.db.close();
    this.request.app.close(() => {
      console.log("Conexión cerrada");
    });
  });
  beforeEach(async function () {
    this.timeout(2000);
    await new Promise((resolve) => setTimeout(resolve, 1500));
  });
  it("Crear un producto - POST /api/products", async function () {
    const product = {
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      code: faker.number.int(),
      status: true,
      stock: faker.number.int(),
      category: "Electronics",
    };
    const response = await this.request
      .post("/api/products")
      .set("Authorization", `Bearer ${jwt}`)
      .send(product);
    this.product = response._body.payload;
    expect(response.status).to.equal(201);
    expect(response._body.payload).to.be.an("object");

    expect(response._body.payload).to.have.property("title");
    expect(response._body.payload).to.have.property("price");
    expect(response._body.payload).to.have.property("description");
    expect(response._body.payload).to.have.property("code");
    expect(response._body.payload).to.have.property("status");
    expect(response._body.payload).to.have.property("stock");
    expect(response._body.payload).to.have.property("category");
  });

  it("[ERROR TEST] Producto con el mismo código - POST /api/products", async function () {
    const response = await this.request
      .post("/api/products")
      .set("Authorization", `Bearer ${jwt}`)
      .send(this.product);
    expect(response.status).to.equal(409);
    expect(response._body.message).to.equal("Product code already exists");
  });

  it("Actualizar un producto - PUT /api/products/:id", async function () {
    const product = {
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      code: faker.number.int(),
      status: true,
      stock: faker.number.int(),
      category: "Electronics",
    };
    const response = await this.request
      .put(`/api/products/${this.product.id}`)
      .set("Authorization", `Bearer ${jwt}`)
      .send(product);
    expect(response.status).to.equal(201);
    expect(response._body.payload).to.be.an("object");
    expect(response._body.payload).to.have.property("title");
    expect(response._body.payload).to.have.property("price");
    expect(response._body.payload).to.have.property("description");
    expect(response._body.payload).to.have.property("code");
    expect(response._body.payload).to.have.property("status");
  });

  it("Listar productos - GET /api/products", async function () {
    const response = await this.request.get("/api/products");
    expect(response.status).to.equal(200);
    expect(response._body.payload).to.be.an("array");
  });

  it("Eliminar Producto - DELETE /api/products/:id", async function () {
    const response = await this.request
      .delete(`/api/products/${this.product.id}`)
      .set("Authorization", `Bearer ${jwt}`);
    expect(response.status).to.equal(201);
    expect(response._body.payload).to.be.an("object");
    expect(response._body.status).to.equal("success");
  });
});
