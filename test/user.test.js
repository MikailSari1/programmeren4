// process.env.PORT = 3001;
// process.env.NODE_ENV = "testing";

import { use, request, expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

import { sign } from "jsonwebtoken";
import { jwtSecretKey } from "../util/config.js";

use(chaiHttp);

let token;
let falseToken;

beforeEach(() => {

  token = sign({ id: "1" }, jwtSecretKey);
  falseToken = sign({ id: "99999"}, jwtSecretKey)
});


describe("UC-201 Registreren als nieuwe user", function () {

  it("TC-201-1 Verplicht veld ontbreekt", function () {
    request(app)
      .post("/api/user")
      .send({
        lastName: "Aygun",
        emailAdress: "erenaygun335@gmail.com",
        city: "Roosendaal",
        street: "Gerard doustraat",
        phoneNumber: "06324224316",
        password: "Test123",
        roles: "Admin"

      })
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(400);
        expect(response.message).to.equal("first name is required");
        expect(response.data).to.be.empty();
      });
  });

  it("TC-201-2 Niet-valide emailadres", function () {
    request(app)
      .post("/api/user")
      .send({
        firstName: "Eren",
        lastName: "Aygun",
        emailAdress: "erenaygun335@gmail.com",
        city: "Roosendaal",
        street: "Gerard doustraat",
        phoneNumber: "06324224316",
        password: "TestPassword123",
        roles: "Admin"

      })
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(400);
        expect(response.message).to.equal("Invalid email adress");
        expect(response.data).to.be.empty();
      });
  });

  it("TC-201-3 Niet-valide wachtwoord", function () {
    request(app)
      .post("/api/user")
      .send({
        firstName: "Eren",
        lastName: "Aygun",
        emailAdress: "e.aygun@domain.com",
        city: "Roosendaal",
        street: "Gerard doustraat",
        phoneNumber: "06324224316",
        password: "Test123",
        roles: "Admin"

      })
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(400);
        expect(response.message).to.equal("Password must be at least 8 characters long and contain at least one uppercase letter and one digit");
        expect(response.data).to.be.empty();
      });
  });

  
  it("TC-201-4 Gebruiker bestaat al", function () {
    request(app)
      .post("/api/user")
      .send({
        firstName: "John",
        lastName: "Doe",
        emailAdress: "j.doe@server.com",
        city: "Roosendaal",
        street: "Gerard doustraat",
        phoneNumber: "06 12425475",
        password: "TestPassword123",
        roles: ['editor', 'guest']
      })
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(403);
        expect(response.message).to.equal("User with email j.doe@server.com already exists.");
        expect(response.data).to.be.empty();
      });
  });

  it("TC-201-5 Gebruiker succesvol geregistreerd", function () {
    request(app)
      .post("/api/user")
      .send({
        firstName: "Eren",
        lastName: "Aygun",
        emailAdress: "e.aygun@gmail.com",
        city: "Roosendaal",
        street: "Gerard doustraat",
        phoneNumber: "06324224316",
        password: "TestPassword123",
        roles: "Admin"
      })
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(201);
        expect(response).to.have.property(message);
        expect(response.data).to.have.property(user);
        expect(response.data).to.have.property(user.id).to.be.not.null();
      });
  });

  
});

describe("UC-202 Opvragen van overzicht van users", function () {

  it("TC-202-1 Toon alle gebruikers (minimaal 2)", function () {
    request(app)
      .get("/api/user")
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(200);
        expect(response).to.have.property(message);
        expect(response.data).to.have.length.greaterThanOrEqual(2);
      });
  });

  it("TC-202-2 Toon alle gebruikers met zoekterm op niet-bestaande velden", function () {
    request(app)
      .get("/api/user?car=Mercedes")
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(200);
        expect(response).to.have.property(message).to.equal('Unknown field found');
        expect(response.data).to.be.empty()
      });
  });

  it("TC-202-3 Toon alle gebruikers met gebruik van de zoekterm op het veld 'isActive'=false", function () {
    request(app)
      .get("/api/user?isActive=False")
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(200);
        expect(response).to.have.property(message);
        expect(response.data).length.to.be.greaterThanOrEqual(2);
      });
  });

  it("TC-202-4 Toon alle gebruikers met gebruik van de zoekterm op het veld 'isActive'=true", function () {
    request(app)
      .get("/api/user?isActive=True")
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(200);
        expect(response).to.have.property(message);
        expect(response.data).length.to.be.greaterThanOrEqual(2);
      });
  });

  it("TC-202-5 Toon gebruikers met gebruik van de zoekterm op bestaande velden (max op 2 velden filteren)", function () {
    request(app)
      .get("/api/user?city=Roosendaal&street=Gerard doustraat")
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(200);
        expect(response).to.have.property(message);
        expect(response.data).length.to.be.greaterThanOrEqual(2);
      });
  });
});

describe("UC-203 Opvragen van gebruikersprofiel", function () {

  it("TC-203-1 Ongeldig token", function () {
    request(app)
      .get("/api/user/profile")
      .set("Authorization", `Bearer 1`)
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(401);
        expect(response).to.have.property(message).to.equal('Invalid token');
        expect(response.data).to.be.empty();
      });
  });
  
  it("TC-203-2 Gebruiker is ingelogd met geldig token.", function () {
    request(app)
      .get("/api/user/profile")
      .set("Authorization", `Bearer ${token}`)
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(200);
        expect(response.data).to.be.not.empty()
      });
  });
});

describe("UC-204 Opvragen van usergegevens bij ID", function () {

  it("TC-204-1 Ongeldig token", function () {
    request(app)
      .get("/api/user/100")
      .set("Authorization", `Bearer ${falseToken}`)
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(401);
        expect(response).to.have.property(message).to.equal('Invalid token');
        expect(response.data).to.be.empty();
      });
  });

  it("TC-204-2 Gebruiker-ID bestaat niet", function () {
    request(app)
      .get("/api/user/100")
      .set("Authorization", `Bearer ${token}`)
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(404);
        expect(response).to.have.property(message).to.equal('User with id 100 not found!');
        expect(response.data).to.be.empty();
      });
  });

  it("TC-204-3 Gebruiker-ID bestaat", function () {
    request(app)
      .get("/api/user/1")
      .set("Authorization", `Bearer ${token}`)
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", /json/);
        expect(response).status(200);
        expect(response).to.have.property(message);
        expect(response.data).to.have.property(user);
      });
  });
});

describe("UC-205 Wijzigen van user", function() {
  it("TC-205-1 Verplicht veld emailaddress ontbreekt", function () {
    request(app)
    .put("/api/user/1")
    .set("Authorization", `Bearer ${token}`)
    .send({
      firstName: "Eren",
      lastName: "Aygun",
      city: "Roosendaal",
      street: "Gerard doustraat",
      phoneNumber: "06324224316",
      password: "TestPassword123",
      roles: "Admin"
    })
    .end(async function (err, response) {
      expect(response).to.have.header("content-type", json);
      expect(response).status(400);
      expect(response).to.have.property(message).to.equal('emailAdress is required');
      expect(response.data).to.be.empty();
    });
  })

  it("TC-205-2 De gebruiker is niet de eigenaar van de data", function () {
    request(app)
    .put("/api/user/1")
    .set("Authorization", `Bearer ${token}`)
    .send({
      firstName: "Eren",
      lastName: "Aygun",
      city: "Roosendaal",
      street: "Gerard doustraat",
      phoneNumber: "06324224316",
      password: "TestPassword123",
      roles: "Admin"
    })
    .end(async function (err, response) {
      expect(response).to.have.header("content-type", json);
      expect(response).status(403);
      expect(response).to.have.property(message).to.equal('Not owner of this entity');
      expect(response.data).to.be.empty();
    });
  })

  it("TC-205-3 Niet-valide telefoonnummer", function () {
    request(app)
    .put("/api/user/1")
    .set("Authorization", `Bearer ${token}`)
    .send({
      firstName: "Eren",
      lastName: "Aygun",
      city: "Roosendaal",
      street: "Gerard doustraat",
      phoneNumber: "1",
      password: "TestPassword123",
      roles: "Admin"
    })
    .end(async function (err, response) {
      expect(response).to.have.header("content-type", json);
      expect(response).status(400);
      expect(response).to.have.property(message).to.equal('Phone number must start with 06 and contain 10 digits (e.g. 06-12345678)');
      expect(response.data).to.be.empty();
    });
  })


  it("TC-205-4 Gebruiker bestaat niet", function () {
    request(app)
    .put("/api/user/1")
    .set("Authorization", `Bearer ${token}`)
    .send({
      firstName: "Eren",
      lastName: "Aygun",
      emailAdress: "e.aygun@gmail.com",
      city: "Roosendaal",
      street: "Gerard doustraat",
      phoneNumber: "06324224316",
      password: "TestPassword123",
      roles: "Admin"
    })
    .end(async function (err, response) {
      expect(response).to.have.header("content-type", json);
      expect(response).status(404);
      expect(response).to.have.property(message).to.equal('User not found!');
      expect(response.data).to.be.empty();
    });
  });

  it("TC-205-5 Niet-ingelogd", function () {
    request(app)
    .put("/api/user/1")
    .send({
      firstName: "Eren",
      lastName: "Aygun",
      city: "Roosendaal",
      street: "Gerard doustraat",
      phoneNumber: "06434756323",
      password: "TestPassword123",
      roles: "Admin"
    })
    .end(async function (err, response) {
      expect(response).to.have.header("content-type", json);
      expect(response).status(401);
      expect(response).to.have.property(message).to.equal('No token provided');
      expect(response.data).to.be.empty();
    });
  })

  it("TC-205-6 Gebruiker successvol gewijzigd", function () {
    request(app)
    .put("/api/user/1").send({
      firstName: "Eren",
      lastName: "Aygun",
      emailAdress: "e.aygun@gmail.com",
      city: "Roosendaal",
      street: "Gerard doustraat",
      phoneNumber: "06324224316",
      password: "TestPassword123",
      roles: "Admin"
    })
    .end(async function (err, response) {
      expect(response).to.have.header("content-type", json);
      expect(response).status(200);
      expect(response).to.have.property(message).to.equal('User updated successfully!');
      expect(response.data).to.be.empty();
    });
  });
});

 

describe("UC-206 Verwijderen van user", function () {

  it("TC-206-1 Gebruiker bestaat niet", function () {
    request(app)
    .delete("/api/user/1")
    .set("Authorization", `Bearer ${token}`)
    .end(async function (err, response) {
      expect(response).to.have.header("content-type", json);
      expect(response).status(404);
      expect(response).to.have.property(message).to.equal('User not found!');
      expect(response.data).to.be.empty();
    });
  });

  it("TC-206-2 Gebruiker is niet ingelogd", function () {
    request(app)
      .delete("/api/user/1")
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", json);
        expect(response).status(401);
        expect(response)
          .to.have.property(message)
          .to.equal("No token provided");
        expect(response.data).to.be.empty();
      });
  });

  it("TC-206-3 De gebruiker is niet de eigenaar van de data", function () {
    request(app)
      .delete("/api/user/1")
      .set("Authorization", `Bearer ${falseToken}`)
      .end(async function (err, response) {
        expect(response).to.have.header("content-type", json);
        expect(response).status(404);
        expect(response)
          .to.have.property(message)
          .to.equal("Not owner of this entity");
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
        expect(response).to.have.property(message).to.equal("User was deleted successfully!");
        expect(response.data).to.have.lengthOf(1);
      });
  });
});