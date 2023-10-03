const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;

const app = require('../../../server');
const session = require('express-session');

let sessionCookie;

// const login = () => {
//     before('login', (done) => {
//         const userCredentials = {"username": "25", "password": "25252525"};
//         console.log('before');
        
//         chai.request(app)
//             .post('/user/login')
//             .send(userCredentials)
//             .end((err, res) => {
//                 if(err) {
//                     console.log(err);
//                 }
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.exist;
//                 expect(res.body).be.a('object');
//                 expect(res.body).to.have.property('id');
//                 expect(res.body).to.have.property('username');
//                 const cookies = res.headers['set-cookie'].map((cookie) => cookie.split(';')[0]);
//                 sessionCookie = cookies.join('; ');
//                 console.log('login',sessionCookie);
//                 done();
//             });
//     });
// }


describe('add todo', async () => {

    before('login', (done) => {
        const userCredentials = {"username": "25", "password": "25252525"};
        console.log('before');
        
        chai.request(app)
            .post('/user/login')
            .send(userCredentials)
            .end((err, res) => {
                if(err) {
                    console.log(err);
                }
                expect(res).to.have.status(200);
                expect(res.body).to.exist;
                expect(res.body).be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('username');
                const cookies = res.headers['set-cookie'].map((cookie) => cookie.split(';')[0]);
                sessionCookie = cookies.join('; ');
                console.log('login',sessionCookie);
                done();
            });
    });

    it('successful addition', (done) => {
        const todoDetails = {"title": "15", "description": "one five"};
        console.log(sessionCookie);
        chai.request(app)
            .post('/user/*/todo')
            .send(todoDetails)
            .set('Cookie', sessionCookie)
            .end((err,res) => {
                if(err) {
                    return err;
                }
                expect(res).have.status(201);
                expect(res.body).to.exist;
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('description');
                done();
            });
    
    });

    it('description required', (done) => {
        chai.request(app)
            .post('/user/*/todo/')
            .send({"title": "15"})
            .end((err,res) => {
                expect(res.body).to.exist;
                expect(res).have.status(400);
                done();
            })
    }) 
})