import { should, use, request, expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../index'
import { setLevel } from 'tracer'

should();
use(chaiHttp);
setLevel('warn');

const endpointToTest = '/api/user/:userId';


describe('TC-205-1: Verplicht veld “emailAddress” ontbreekt', () => {
    it('should return 400 Bad Request when emailAddress field is missing', async () => {
        const userDataWithoutEmail = { /* user data without emailAddress */ };
        const validToken = 'valid_token';

        const response = await update(userDataWithoutEmail, validToken);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Missing or incorrect emailAddress field');
    });
});

describe('TC-205-2: De gebruiker is niet de eigenaar van de data', () => {
    it('should return 403 Forbidden when user is not the owner of the data', async () => {
        const userData = { /* user data */ };
        const invalidToken = 'invalid_token';

        const response = await update(userData, invalidToken);

        expect(response.status).to.equal(403);
        expect(response.body.message).to.equal('Forbidden: User is not the owner of the data');
    });
});

describe('TC-205-3: Niet-valide telefoonnummer', () => {
    it('should return 400 Bad Request when phoneNumber is not valid', async () => {
        const userDataWithInvalidPhoneNumber = { /* user data with invalid phoneNumber */ };
        const validToken = 'valid_token';

        const response = await update(userDataWithInvalidPhoneNumber, validToken);

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Invalid phoneNumber');
    });
});

describe('TC-205-4: Gebruiker bestaat niet', () => {
    it('should return 404 Not Found when user does not exist', async () => {
        const nonExistentUserId = 'non_existent_user_id';
        const userData = { /* user data */ };
        const validToken = 'valid_token';

        const response = await update(nonExistentUserId, userData, validToken);

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('User not found');
    });
});

describe('TC-205-5: Niet ingelogd', () => {
    it('should return 401 Unauthorized when user is not logged in', async () => {
        const userData = { /* user data */ };
        const unauthenticatedToken = '';

        const response = await update(userData, unauthenticatedToken);

        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Unauthorized: Not logged in');
    });
});

describe('TC-205-6: Gebruiker succesvol gewijzigd', () => {
    it('should return 200 OK when user is successfully updated', async () => {
        const userData = { /* user data */ };
        const validToken = 'valid_token';

        const response = await update(userData, validToken);
        
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('User successfully updated');
    });
});
