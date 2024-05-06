// import { should, use, expect } from 'chai'
// import chaiHttp from 'chai-http'
// import server from '../index.js'
// import { setLevel } from 'tracer'

// should();
// use(chaiHttp);
// setLevel('warn');

// const endpointToTest = '/api/user/:userId';


// describe('TC-206-1: Gebruiker bestaat niet', () => {
//     it('should return 404 Not Found when user does not exist', async () => {
        
//         const nonExistentUserId = 'non_existent_user_id';
//         const validToken = 'valid_token';

//         const response = await deleteUser(nonExistentUserId, validToken);

//         expect(response.status).to.equal(404);
//         expect(response.body.message).to.equal('User not found');
//     });
// });

// describe('TC-206-2: Gebruiker is niet ingelogd', () => {
//     it('should return 401 Unauthorized when user is not logged in', async () => {
//         const validUserId = 'valid_user_id';
//         const unauthenticatedToken = '';

//         const response = await deleteUser(validUserId, unauthenticatedToken);

//         expect(response.status).to.equal(401);
//         expect(response.body.message).to.equal('Unauthorized: Not logged in');
//     });
// });

// describe('TC-206-3: De gebruiker is niet de eigenaar van de data', () => {
//     it('should return 403 Forbidden when user is not the owner of the data', async () => {
//         const validUserId = 'valid_user_id';
//         const invalidToken = 'invalid_token';

//         const response = await deleteUser(validUserId, invalidToken);

//         expect(response.status).to.equal(403);
//         expect(response.body.message).to.equal('Forbidden: User is not the owner of the data');
//     });
// });

// describe('TC-206-4: Gebruiker succesvol verwijderd', () => {
//     it('should return 200 OK when user is successfully deleted', async () => {
//         const validUserId = 'valid_user_id';
//         const validToken = 'valid_token';

//         const response = await deleteUser(validUserId, validToken);

//         expect(response.status).to.equal(200);
//         expect(response.body.message).to.equal('User successfully deleted');
//     });
// });
