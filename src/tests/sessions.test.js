import { faker } from "@faker-js/faker";
import chai from "chai";
import supertest from "supertest";
import initServer from "./index.js";

const expect = chai.expect;
let jwt = "";

describe("Testing Auth Endpoints", () => {
  before(async function () {
    const { app, db } = await initServer();
    const application = app.callback();
    this.requester = supertest.agent(application);
    this.app = app;
    this.db = db;
    this.payload = {};
  });
  after(async function () {
    await this.db.clear();
    await this.db.close();
    this.requester.app.close(() => {
      console.log("Conexión cerrada");
    });
  });
  beforeEach(async function () {
    this.timeout(2000);
    await new Promise((resolve) => setTimeout(resolve, 1500));
  });
  it("Creacion de cuenta - POST /api/sessions/signup", async function () {
    this.payload = {
      firstName: `${faker.person.firstName()} Ana Maria`,
      lastName: `${faker.person.lastName()} Ana Maria`,
      email: faker.internet.email(),
      age: 20,
      password: "123451234123",
    };

    const { status, _body } = await this.requester
      .post("/api/sessions/signup")
      .send(this.payload);

    expect(status).to.be.equals(201);
    expect(_body.payload.email).to.be.equals(this.payload.email);
    expect(_body.message).to.be.equals("Signup success!");
  });

  it("Login de cuenta - POST /api/sessions/login", async function () {
    const payload = {
      email: this.payload.email,
      password: this.payload.password,
    };

    const { _body, status } = await this.requester
      .post("/api/sessions/login")
      .send(payload);

    expect(status).to.be.equals(200);
    expect(_body.message).to.be.equals("Login success!");

    jwt = _body.accessToken;
  });

  it("Current GET - /api/sessions/current", async function () {
    this.payload = {
      email: this.payload.email,
      password: this.payload.password,
    };

    const { _body, status } = await this.requester
      .get("/api/sessions/current")
      .set("Authorization", `Bearer ${jwt}`);
    expect(status).to.be.equals(200);
    expect(_body.payload.email).to.be.equals(this.payload.email);
  });
});
