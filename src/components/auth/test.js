const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const pool = require('../../../dbconn');

const expect = chai.expect;

const app = require('../../../server');


describe('auth', () => {
    const userCredentials = {"username": "26", "password": "26262626"};

    before('delete record', async () => {
        const client = await pool.connect();
        const query = `
            DELETE FROM
                "user"
            WHERE
                username = '26'`;
        await client.query(query);
        await client.release;
    });


    describe("Resgister page", () => {
        it('register user', (done) => {
            
    
            chai.request(app)
                .post('/users/register')
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
    
            chai.request(app)
                .post('/users/register')
                .send(userCredentials)
                .end( (err,res) => {
                    expect(res.body).to.exist;
                    expect(res).have.status(409);
                    expect(res.body).be.a('object');
                    done();
                });
        });
    
        it('password required', (done) => {
            const username = {"username": "26"};
            
            chai.request(app)
                .post('/users/register')
                .send(username)
                .end( (err,res) => {
                    expect(res.body).to.exist;
                    expect(res).have.status(400);
                    done();
                });
    
        });
    
        it('username required', (done) => {
            const password = {"password": '26262626'};
    
            chai.request(app)
                .post('/users/register')
                .send(password)
                .end( (err,res) => {
                    expect(res.body).to.exist;
                    expect(res).have.status(400);
                    done();
                });
        });
    
        it('password length not of 8 characters', (done) => {
    
            chai.request(app)
                .post('/users/register')
                .send({"username": "26", "password": "262626"})
                .end( (err,res) => {
                    expect(res.body).to.exist;
                    expect(res).have.status(400);
                    done();
                });
        });
    
    });
    
    
    describe("Login page", () => {
        it('login user', (done) => {
    
            chai.request(app)
                .post('/users/login')
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
    
            chai.request(app)
                .post('/users/login')
                .send({"username": "26", "password": "26262625"})
                .end((err,res) => {
                    expect(res.body).to.exist;
                    expect(res).have.status(404);
                    done();
                });
        });
    
        it('password required', (done) => {
            const username = {"username": "26"};
            
            chai.request(app)
                .post('/users/login')
                .send(username)
                .end( (err,res) => {
                    expect(res.body).to.exist;
                    expect(res).have.status(400);
                    done();
                });
    
        });
    
        it('username required', (done) => {
            const password = {"password": '26262626'};
    
            chai.request(app)
                .post('/users/login')
                .send(password)
                .end( (err,res) => {
                    expect(res.body).to.exist;
                    expect(res).have.status(400);
                    done();
                });
        });
    
        it('password length not of 8 characters', (done) => {
    
            chai.request(app)
                .post('/users/login')
                .send({"username": "26", "password": "262626"})
                .end( (err,res) => {
                    expect(res.body).to.exist;
                    expect(res).have.status(400);
                    done();
                });
        });
    
        it('user not found', (done) => {
    
            chai.request(app)
                .post('/users/login')
                .send({"username": "00", "password": "26262626"})
                .end( (err,res) => {
                    expect(res.body).to.exist;
                    expect(res).have.status(404);
                    done();
                });
        });
    
    });
    
    
    describe("logout page", () => {
        let sessionCookie;
        before('login user', (done) => {
    
            chai.request(app)
                .post('/users/login')
                .send(userCredentials)
                .end((err,res) => {
                    expect(res.body).to.exist;
                    expect(res).have.status(200);
                    expect(res.body).be.a('object');
                    expect(res.body).to.have.property('id');
                    expect(res.body).to.have.property('username');
                    const cookies = res.headers['set-cookie'].map((cookie) => cookie.split(';')[0]);
                    sessionCookie = cookies.join('; ');
                    done();
                });
        });
    
        it('user logout', (done) => {
    
            chai.request(app)
                .get('/users/logout')
                .set('Cookie', sessionCookie)
                .end((err, res) => {
                    if(err) {
                        // console.log('err');
                        return done(err);
                    }
                    else {
                        // console.log('no err');
                        expect(res).have.status(200);
                        done();
                    }
                });
        });
    });
    
    


    after('delete record', async () => {
        const client = await pool.connect();
        const query = `
            DELETE FROM
                "user"
            WHERE
                username = '26'`;
        await client.query(query);
        await client.release();
    });
})


