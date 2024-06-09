// import { should, use, expect } from 'chai'
// import chaiHttp from 'chai-http'
// import chai from 'chai'
// import server from '../index.js'
// import { setLevel } from 'tracer'

// should();
// use(chaiHttp);
// setLevel('warn');

// const endpointToTest = '/api/user';

// describe('UC202 Toon gebruikers', () => {
//     it('TC-202-1 Toon alle gebruikers', (done) => {
//         chai.request(server)
//             .get(endpointToTest)
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.have.property(message);
//                 expect(res.body.data).to.have.length.greaterThanOrEqual(2);
//                 done();
//             });
//     });

//     it('TC-202-2 Toon gebruikers met zoekterm op niet-bestaande velden', (done) => {
//         chai.request(server)
//             .get(`${endpointToTest}?search=invalidField`)
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body.data).to.be.empty();
//                 done();
//             });
//     });

//     it('TC-202-3 Toon gebruikers met zoekterm op het veld ‘isActive’=false', (done) => {
//         chai.request(server)
//             .get(`${endpointToTest}?search=isActive:false`)
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body.data).to.be.an('array').that.is.not.empty;
//                 // res.body.forEach(user => {
//                 //     expect(user.isActive).to.be.false;
//                 // });
//                 done();
//             });
//     });

//     it('TC-202-4 Toon gebruikers met zoekterm op het veld ‘isActive’=true', (done) => {
//         chai.request(server)
//             .get(`${endpointToTest}?search=isActive:true`)
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body.data).to.be.an('array').that.is.not.empty;
//                 // res.body.forEach(user => {
//                 //     expect(user.isActive).to.be.true;
//                 // });
//                 done();
//             });
//     });

//     it('TC-202-5 Toon gebruikers met zoektermen op bestaande velden (max op 2 velden filteren)', (done) => {
//         chai.request(server)
//             .get(`${endpointToTest}?search=firstName:John,lastName:Doe`)
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body.data).to.be.an('array').that.is.not.empty;
//                 // res.body.forEach(user => {
//                 //     expect(user.firstName).to.equal('John');
//                 //     expect(user.lastName).to.equal('Doe');
//                 // });
//                 done();
//             });
//     });
// });
