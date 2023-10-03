const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;

const app = require('../../../server');



describe("Resgister page", () => {
    it('register user', (done) => {
        const userCredentials = {"username": "26", "password": "26262626"};

        chai.request(app)
            .post('/user/register')
            .send(userCredentials)
            .end( (err,res) => {
                expect(res.body).to.exist;
                expect(res).have.status(201);
                expect(res.body).be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('username');
                done();
            });
    });

    it('username already exists', (done) => {
        const userCredentials = {"username": "25", "password": "25252525"};

        chai.request(app)
            .post('/user/register')
            .send(userCredentials)
            .end( (err,res) => {
                expect(res.body).to.exist;
                expect(res).have.status(409);
                expect(res.body).be.a('object');
                done();
            });
    });

    it('password required', (done) => {
        const username = {"username": "25"};
        
        chai.request(app)
            .post('/user/register')
            .send(username)
            .end( (err,res) => {
                expect(res.body).to.exist;
                expect(res).have.status(400);
                done();
            });

    });

    it('username required', (done) => {
        const password = {"password": '25252525'};

        chai.request(app)
            .post('/user/register')
            .send(password)
            .end( (err,res) => {
                expect(res.body).to.exist;
                expect(res).have.status(400);
                done();
            });
    });

    it('password length not of 8 characters', (done) => {
        const userCredentials = {"username": "25", "password": "252525"};

        chai.request(app)
            .post('/user/register')
            .send(userCredentials)
            .end( (err,res) => {
                expect(res.body).to.exist;
                expect(res).have.status(400);
                done();
            });
    });

});


describe("Login page", () => {
    it('login user', (done) => {
        const userCredentials = {"username": "25", "password": "25252525"};

        chai.request(app)
            .post('/user/login')
            .send(userCredentials)
            .end((err,res) => {
                expect(res.body).to.exist;
                expect(res).have.status(200);
                expect(res.body).be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('username');
                done();
            });
    });

    it('user not found', (done) => {
        const userCredentials = {"username": "25", "password": "26252525"};

        chai.request(app)
            .post('/user/login')
            .send(userCredentials)
            .end((err,res) => {
                expect(res.body).to.exist;
                expect(res).have.status(404);
                done();
            });
    });

    it('password required', (done) => {
        const username = {"username": "25"};
        
        chai.request(app)
            .post('/user/login')
            .send(username)
            .end( (err,res) => {
                expect(res.body).to.exist;
                expect(res).have.status(400);
                done();
            });

    });

    it('username required', (done) => {
        const password = {"password": '25252525'};

        chai.request(app)
            .post('/user/login')
            .send(password)
            .end( (err,res) => {
                expect(res.body).to.exist;
                expect(res).have.status(400);
                done();
            });
    });

    it('password length not of 8 characters', (done) => {
        const userCredentials = {"username": "25", "password": "252525"};

        chai.request(app)
            .post('/user/login')
            .send(userCredentials)
            .end( (err,res) => {
                expect(res.body).to.exist;
                expect(res).have.status(400);
                done();
            });
    });


});


describe("logout page", () => {

    before('login user', (done) => {
        const userCredentials = {"username": "25", "password": "25252525"};

        chai.request(app)
            .post('/user/login')
            .send(userCredentials)
            .end((err,res) => {
                expect(res.body).to.exist;
                expect(res).have.status(200);
                expect(res.body).be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('username');
                done();
            });
    });

    it('user logout', (done) => {

        chai.request(app)
            .get('/user/logout')
            .end((err, res) => {
                if(err) {
                    console.log('err');
                    return done(err);
                }
                else {
                    console.log('no err');
                    chai.should(res).have.status(200);
                    done();
                }
            });
    });
});

