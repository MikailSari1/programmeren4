import { should, use, request, expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../index'
import { setLevel } from 'tracer'

should();
use(chaiHttp);
setLevel('warn');

const endpointToTest = '/api/user/:userId';


describe('TC-204-1: Ongeldig token', () => {
    it('should return 401 Unauthorized when token is invalid', async () => {
        const invalidToken = 'invalid_token';

        const response = await getById(userId, invalidToken);

        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Unauthorized: Invalid token');
    });
});

describe('TC-204-2: Gebruiker-ID bestaat niet', () => {
    it('should return 404 Not Found when user ID does not exist', async () => {
        const nonExistentUserId = 'non_existent_user_id';
        const validToken = 'valid_token';

        const response = await getById(nonExistentUserId, validToken);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('User ID not found');
    });
});

describe('TC-204-3: Gebruiker-ID bestaat', () => {
    it('should return 200 OK with user details when user ID exists', async () => {
        const existingUserId = 'existing_user_id';
        const validToken = 'valid_token';
        const expectedUser = { /* Expected user details */ };

        const response = await getById(existingUserId, validToken);

        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(expectedUser);
    });
});
