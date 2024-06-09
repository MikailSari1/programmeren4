// process.env.PORT = 3001;
// process.env.NODE_ENV = "testing";

import { use, request, expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

use(chaiHttp);

describe("UC-101 Inloggen", function () {
  it("TC-101-1 Verplicht veld ontbreekt", function () {
    request(app)
      .post("/api/auth/login")
      .send({
        emailAdress: "erenaygun335@gmail.com",
        // password: "Test123",
      })
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(400);
        expect(response.message).to.equal("password is required");
        expect(response.data).to.be.empty();
      });
  });

  it("TC-101-1 Niet-valide wachtwoord", function () {
    request(app)
      .post("/api/auth/login")
      .send({
        emailAdress: "erenaygun335@gmail.com",
        password: "Test123",
      })
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(400);
        expect(response.message).to.equal("Invalid password");
        expect(response.data).to.be.empty();
      });
  });

  it("TC-101-3 Gebruiker bestaat niet", function () {
    request(app)
      .post("/api/auth/login")
      .send({
        emailAdress: "erenaygun335@gmail.com",
        password: "TestPassword123",
      })
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(400);
        expect(response.message).to.equal("User not found or password invalid");
        expect(response.data).to.be.empty();
      });
  });

  it("TC-101-4 Gebruiker succesvol ingelogd", function () {
    request(app)
      .post("/api/auth/login")
      .send({
        emailAdress: "erenaygun335@gmail.com",
        password: "TestPassword123",
      })
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(400);
        expect(response.message).to.equal("Logged in successfully!");
        expect(response.data).to.have.property('token');
      });
  });
});
