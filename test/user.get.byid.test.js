import { should, use, expect } from 'chai'
import chaiHttp from 'chai-http'
import chai from 'chai'
import server from '../index.js'
import { setLevel } from 'tracer'

should();
use(chaiHttp);
setLevel('warn');

const endpointToTest = '/api/user/:userId';


describe('TC-204-1: Ongeldig token', () => {
    it('should return 401 Unauthorized when token is invalid', async () => {
        chai.request(server)
        .get(endpointToTest)
        .end((err, res) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal('Unauthorized: Invalid token');
            done();
        });
    });
});

describe('TC-204-2: Gebruiker-ID bestaat niet', () => {
    it('should return 404 Not Found when user ID does not exist', async () => {
        chai.request(server)
        .get(endpointToTest)
        .end((err, res) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('User ID not found');
            done();
        });

    });
});

describe('TC-204-3: Gebruiker-ID bestaat', () => {
    it('should return 200 OK with user details when user ID exists', async () => {
        const expectedUser = { /* Expected user details */ };

        chai.request(server)
        .get(endpointToTest)
        .end((err, res) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal(expectedUser);
            done();
        });

    });
});
