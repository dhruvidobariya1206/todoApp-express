const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { pool } = require('../../../dbconn');

const expect = chai.expect;

const app = require('../../../server');




describe('Todos', async () => {
    let sessionCookie, todoId;

    before('login', (done) => {
        const userCredentials = {"username": "dhruvi", "password": "12345678"};        
        
        chai.request(app)
            .post('/users/login')
            .send(userCredentials)
            .end((err, res) => {
                if(err) {
                    done(err);
                }
                expect(res).to.have.status(200);
                expect(res.body).to.exist;
                expect(res.body).be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('username');
                const cookies = res.headers['set-cookie'].map((cookie) => cookie.split(';')[0]);
                sessionCookie = cookies.join('; ');
                done();
            });
    });


    after('delete record', async () => {
        const client = await pool.connect();
        try {
            const todoQuery = `
                DELETE FROM
                    todo
                WHERE
                    id = $1`;
            const todoParam = [todoId]
            await client.query(todoQuery, todoParam);
            const userQuery = `
                DELETE FROM
                    "userAccount"
                WHERE
                    username = $1`;
            const userParams = ['dhruvi'];
            await client.query(userQuery, userParams);
        }
        finally {
            client.release();
        }
    });



    describe('add todo', async () =>{
        it('successful addition', (done) => {
        
            const todoDetails = {"title": "15", "description": "one five"};
            chai.request(app)
                .post(`/users/todos`)   
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
                    todoId = res.body.id;
                    done();
                });
        
        });
    
        it('title and description required', (done) => {
            chai.request(app)
                .post(`/users/todos`)
                .send({"":"", "":""})
                .set('Cookie', sessionCookie)
                .end((err,res) => {
                    expect(res.body).to.exist;
                    expect(res).have.status(400);
                    done();
                })
        });
    
        it('description required', (done) => {
            chai.request(app)
                .post(`/users/todos`)
                .send({"title": "15"})
                .set('Cookie', sessionCookie)
                .end((err,res) => {
                    expect(res.body).to.exist;
                    expect(res).have.status(400);
                    done();
                })
        });
    
        it('title required', (done) => {
            chai.request(app)
                .post(`/users/todos`)
                .send({"description": "one five"})
                .set('Cookie', sessionCookie)
                .end((err,res) => {
                    expect(res.body).to.exist;
                    expect(res).have.status(400);
                    done();
                })
        });

        it('unauthorized', (done) => {
            chai.request(app)
                .post(`/users/todos`)
                .send({"title": "15", "description": "one five"})
                .end((err,res) => {
                    expect(res.body).to.exist;
                    expect(res).have.status(401);
                    done();
                })
        });
    
    })

    describe('update todo', async () => {
        it('update title and description', (done) => {
            chai.request(app)
                .put(`/users/todos/${todoId}`)
                .send({"title": "15", "description": "one five"})
                .set('Cookie', sessionCookie)
                .end((err,res) => {
                    expect(res.body).to.exist;
                    expect(res).to.have.status(202);
                    done();
                })
        })

        it('update title ', (done) => {
            chai.request(app)
                .put(`/users/todos/${todoId}`)
                .send({"title": "15"})
                .set('Cookie', sessionCookie)
                .end((err,res) => {
                    expect(res.body).to.exist;
                    expect(res).to.have.status(202);
                    done();
                })
        })

        it('update description', (done) => {
            chai.request(app)
                .put(`/users/todos/${todoId}`)
                .send({"description": "one five"})
                .set('Cookie', sessionCookie)
                .end((err,res) => {
                    expect(res.body).to.exist;
                    expect(res).to.have.status(202);
                    done();
                })
        })

        it('no title and description', (done) => {
            chai.request(app)
                .put(`/users/todos/${todoId}`)
                .send({})
                .set('Cookie', sessionCookie)
                .end((err,res) => {
                    expect(res.body).to.exist;
                    expect(res).to.have.status(400);
                    done();
                })
        });

        it('unauthorized', (done) => {
            chai.request(app)
                .post(`/users/todos/${todoId}`)
                .send({"title": "15", "description": "one five"})
                .end((err,res) => {
                    expect(res.body).to.exist;
                    expect(res).have.status(401);
                    done();
                })
        });

    })

    describe('get all todos', async () => {

        it('all todos', (done) => {
            chai.request(app)
                .get(`/users/todos/`)
                .set('Cookie', sessionCookie)
                .end((err, res) => {
                    expect(res.body).to.exist;
                    expect(res.body).be.an('array');
                    expect(res).to.have.status(200);
                    done();
                })
        });
    })

    describe('get one todo', async () => {
        
        it('one todo', (done) => {
            chai.request(app)
                .get(`/users/todos/${todoId}`)
                .set('Cookie', sessionCookie)
                .end((err,res) => {
                    expect(res.body).to.exist;
                    expect(res).to.have.status(200);
                    done();
                })
        })
        it('invalid todo id', (done) => {
            chai.request(app)
                .get(`/users/todos/50`)
                .set('Cookie', sessionCookie)
                .end((err,res) => {
                    expect(res.body).to.exist;
                    expect(res).to.have.status(400);
                    done();
                })
        });

        it('unauthorized', (done) => {
            chai.request(app)
                .post(`/users/todos/${todoId}`)
                .send({"title": "15", "description": "one five"})
                .end((err,res) => {
                    expect(res.body).to.exist;
                    expect(res).have.status(401);
                    done();
                })
        });

    })

    describe('delete todo', async () => {
        it('delete', (done) => {
            chai.request(app)
                .delete(`/users/todos/${todoId}`)
                .set('Cookie',sessionCookie)
                .end((err,res) => {
                    expect(res).to.have.status(204);
                    done();
                })
        })

        it('invalid todo id', (done) => {
            chai.request(app)
                .delete(`/users/todos/18`)
                .set('Cookie',sessionCookie)
                .end((err,res) => {
                    expect(res).to.have.status(400);
                    done();
                })
        })

        it('unauthorized', (done) => {
            chai.request(app)
                .post(`/users/todos/${todoId}`)
                .send({"title": "15", "description": "one five"})
                .end((err,res) => {
                    expect(res.body).to.exist;
                    expect(res).have.status(401);
                    done();
                })
        });
    })

})