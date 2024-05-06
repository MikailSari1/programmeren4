import { should, use, request, expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../index'
import { setLevel } from 'tracer'

should();
use(chaiHttp);
setLevel('warn');

const endpointToTest = '/api/user'

describe('UC201 Registreren als nieuwe user', () => {
    /**
     * Voorbeeld van een beforeEach functie.
     * Hiermee kun je code hergebruiken of initialiseren.
     */
    beforeEach((done) => {
        console.log('Before each test')
        done()
    })

    /**
     * Hier starten de testcases
     */
    it('TC-201-1 Verplicht veld ontbreekt', (done) => {
        request(server)
            .post(endpointToTest)
            .send({
                // firstName: 'Voornaam', ontbreekt
                lastName: 'Achternaam',
                emailAdress: 'v.a@server.nl'
            })
            .end((err, res) => {
                /**
                 * Voorbeeld uitwerking met chai.expect
                 */
                expect(res).to.have.status(400)
                expect(res).not.to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('status').equals(400)
                expect(res.body)
                    .to.have.property('message')
                    .equals('Missing or incorrect firstName field')
                expect(res.body)
                    .to.have.property('data')
                    .that.is.a('object').that.is.empty

                done()
            })
    })

    it('TC-201-2 Niet-valide email adres', (done) => {
        request(server)
            .post(endpointToTest)
            .send({
                firstName: 'Voornaam',
                lastName: 'Achternaam',
                emailAdress: 'ongeldig-email-adres' // Ongeldig e-mailadres
            })
            .end((err, res) => {
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('message').equals('Invalid email address')
                done()
            })
    })

    it('TC-201-3 Niet-valide password', (done) => {
        request(server)
            .post(endpointToTest)
            .send({
                firstName: 'Voornaam',
                lastName: 'Achternaam',
                emailAdress: 'geldig@example.com', // Geldig e-mailadres
                password: 'kort' // Ongeldig wachtwoord (te kort)
            })
            .end((err, res) => {
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('message').equals('Invalid password')
                done()
            })
    })

    it.skip('TC-201-4 Gebruiker bestaat al', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('TC-201-5 Gebruiker succesvol geregistreerd', (done) => {
        request(server)
            .post(endpointToTest)
            .send({
                firstName: 'Voornaam',
                lastName: 'Achternaam',
                emailAdress: 'v.a@server.nl'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                res.body.should.have.property('data').that.is.a('object')
                res.body.should.have.property('message').that.is.a('string')

                const data = res.body.data
                data.should.have.property('firstName').equals('Voornaam')
                data.should.have.property('lastName').equals('Achternaam')
                data.should.have.property('emailAdress')
                data.should.have.property('id').that.is.a('number')

                done()
            })
    })
})