// process.env.PORT = 3001;
// process.env.NODE_ENV = "testing";

import { use, request, expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import { jwtSecretKey } from "../util/config.js";
import { sign } from "jsonwebtoken";

use(chaiHttp);

let token;
let falseToken;

beforeEach(() => {
  token = sign({ Id: "1" }, jwtSecretKey);
  falseToken = sign({ id: "99999"}, jwtSecretKey)
});

describe("UC-301 Toevoegen van maaltijd", function () {

  it("TC-301-1 Verplicht veld ontbreekt", function () {
    request(app)
      .post("/api/meal")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Een hoop gebakken aardappelen met worst.",
        imageURL: "",
        dateTime: new Date(),
        ingredients: ["Aardappelen", "Worst"],
        allergies: ["Soja", "Kippenei"],
        isVega: false,
        isVegan: false,
        isToTakeHome: false,
        isActive: false,
        maxAmountParticipants: 1,
      })
      .end(function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(400);
        expect(JSON.parse(response.text).message).to.equal('name is required')
      });
  });

  it("TC-301-2 Niet ingelogd", function () {
    request(app)
      .post("/api/meal")
      .send({
        description: "Een hoop gebakken aardappelen met worst.",
        imageURL: "",
        dateTime: new Date(),
        ingredients: ["Aardappelen", "Worst"],
        allergies: ["Soja", "Kippenei"],
        isVega: false,
        isVegan: false,
        isToTakeHome: false,
        isActive: false,
        maxAmountParticipants: 1,
      })
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(401);
        expect(response.message).to.equal("No token provided");
      });
  });

  it("TC-301-3 Maaltijd succesvol toegevoegd", function () {
    request(app)
      .post("/api/meal")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Stampot",
        description: "Een hoop gebakken aardappelen met worst.",
        imageURL: "",
        dateTime: new Date(),
        ingredients: ["Aardappelen", "Worst"],
        allergies: ["Soja", "Kippenei"],
        isVega: false,
        isVegan: false,
        isToTakeHome: false,
        isActive: false,
        maxAmountParticipants: 1,
      })
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(201);
        expect(response).to.have.property(message);
        expect(response.data).to.have.property(id).to.not.be.null();
        expect(response.data).to.have.property(meal.owner).to.not.be.null();
      });
  });
});

describe("UC-202 Opvragen van alle maaltijden", function () {
  it("TC-303-1 Lijst van maaltijden geretourneerd", function () {
    request(app)
      .get("/api/meal")
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(200);
        expect(response).to.have.property(message);
        expect(response.data).to.have.greaterThanOrEqual(1);
      });
  });
});

describe("UC-304 Opvragen van maaltijd bij ID", function () {
  it("TC-304-1 maaltijd bestaat niet", function () {
    request(app)
      .get("/api/meal/999999999")
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(404);
        expect(response)
          .to.have.property(message)
          .to.equal("User with id 999999999 not found!");
        expect(response.data).to.be.empty();
      });
  });

  it("TC-304-2 Details van maaltijd geretourneerd", function () {
    request(app)
      .get("/api/meal/1")
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(200);
        expect(response).to.have.property(message);
        expect(response.data).to.have.property(meal);
      });
  });
});

describe("UC-205 Wijzigen van user", function () {
  it("TC-205-1 Verplicht veld emailaddress ontbreekt", function () {
    request(app)
      .put("/api/user/1")
      .send({
        firstName: "Eren",
        lastName: "Aygun",
        city: "Roosendaal",
        street: "Gerard doustraat",
        phoneNumber: "06324224316",
        password: "TestPassword123",
        roles: "Admin",
      })
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", json);
        expect(response).status(400);
        expect(response)
          .to.have.property(message)
          .to.equal("emailAdress is required");
        expect(response.data).to.be.empty();
      });
  });

  it("TC-205-4 Gebruiker bestaat niet", function () {
    request(app)
      .put("/api/user/1")
      .send({
        firstName: "Eren",
        lastName: "Aygun",
        emailAdress: "e.aygun@gmail.com",
        city: "Roosendaal",
        street: "Gerard doustraat",
        phoneNumber: "06324224316",
        password: "TestPassword123",
        roles: "Admin",
      })
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", json);
        expect(response).status(404);
        expect(response)
          .to.have.property(message)
          .to.equal("User not found!");
        expect(response.data).to.be.empty();
      });
  });

  it("TC-205-6 Gebruiker successvol gewijzigd", function () {
    request(app)
      .put("/api/user/1")
      .send({
        firstName: "Eren",
        lastName: "Aygun",
        emailAdress: "e.aygun@gmail.com",
        city: "Roosendaal",
        street: "Gerard doustraat",
        phoneNumber: "06324224316",
        password: "TestPassword123",
        roles: "Admin",
      })
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", json);
        expect(response).status(200);
        expect(response)
          .to.have.property(message)
          .to.equal("User updated successfully!");
        expect(response.data).to.be.empty();
      });
  });
});

describe("UC-305 Verwijderen van maaltijd", function () {

  it("TC-305-1 Niet ingelogd", function () {
    request(app)
      .delete("/api/meal/1")
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", json);
        expect(response).status(401);
        expect(response)
          .to.have.property(message)
          .to.equal("No token provided");
        expect(response.data).to.be.empty();
      });
  });
  
  it("TC-305-2 Niet de eigenaar van de data", function () {
    request(app)
      .delete("/api/meal/1")
      .set("Authorization", `Bearer ${falseToken}`)
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", json);
        expect(response).status(403);
        expect(response)
          .to.have.property(message)
          .to.equal("Not owner of this entity");
        expect(response.data).to.be.empty();
      });
  });


  it("TC-305-3 Maaltijd bestaat niet", function () {
    request(app)
      .delete("/api/meal/99999")
      .set("Authorization", `Bearer ${token}`)
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", json);
        expect(response).status(404);
        expect(response)
          .to.have.property(message)
          .to.equal("Meal not found!");
        expect(response.data).to.be.empty();
      });
  });

  it("TC-206-4 Gebruiker succesvol verwijderd", function () {
    request(app)
      .delete("/api/user/1")
      .set("Authorization", `Bearer ${token}`)
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(200);
        expect(response)
          .to.have.property(message)
          .to.equal("User was deleted successfully!");
        expect(response.data).to.have.lengthOf(1);
      });
  });
});
