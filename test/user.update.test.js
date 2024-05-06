import { should, use, expect } from 'chai'
import chaiHttp from 'chai-http'
import chai from 'chai'
import server from '../index.js'
import { setLevel } from 'tracer'

should();
use(chaiHttp);
setLevel('warn');

const endpointToTest = '/api/user/:userId';


describe('TC-205-1: Verplicht veld “emailAddress” ontbreekt', () => {
    it('should return 400 Bad Request when emailAddress field is missing', async () => {


        chai.request(server)
        .get(endpointToTest)
        .end((err, res) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('Missing or incorrect emailAddress field');
            done();


    });
});
});

describe('TC-205-2: De gebruiker is niet de eigenaar van de data', () => {
    it('should return 403 Forbidden when user is not the owner of the data', async () => {


        chai.request(server)
        .get(endpointToTest)
        .end((err, res) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to.equal('Forbidden: User is not the owner of the data');
            done();
        });


    });
});

describe('TC-205-3: Niet-valide telefoonnummer', () => {
    it('should return 400 Bad Request when phoneNumber is not valid', async () => {

        chai.request(server)
        .get(endpointToTest)
        .end((err, res) => {
 
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('Invalid phoneNumber');
            done();
        });

    });
});

describe('TC-205-4: Gebruiker bestaat niet', () => {
    it('should return 404 Not Found when user does not exist', async () => {

        chai.request(server)
        .get(endpointToTest)
        .end((err, res) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('User not found');
            done();
        });

    });
});

describe('TC-205-5: Niet ingelogd', () => {
    it('should return 401 Unauthorized when user is not logged in', async () => {
        chai.request(server)
        .get(endpointToTest)
        .end((err, res) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal('Unauthorized: Not logged in');
            done();
        });

    });
});

describe('TC-205-6: Gebruiker succesvol gewijzigd', () => {
    it('should return 200 OK when user is successfully updated', async () => {

        chai.request(server)
        .get(endpointToTest)
        .end((err, res) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('User successfully updated');
            done();
        });

    });
});
