const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../../server");
chai.use(chaiHttp);
const { pool } = require("../../../dbconn");

const expect = chai.expect;



describe("Todos", async () => {
  let sessionCookie, todoId;

  before("User login", (done) => {
    const userCredentials = { username: "xyz", password: "12345678" };

    chai
      .request(app)
      .post("/users/login")
      .send(userCredentials)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.exist;
        expect(res.body).be.a("object");
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("username");
        const cookies = res.headers["set-cookie"].map(
          (cookie) => cookie.split(";")[0]
        );
        sessionCookie = cookies.join("; ");
        done();
      });
  });

  after("Delete records", async () => {
    const client = await pool.connect();
    try {
      const todoQuery = `
                DELETE FROM
                    todo
                WHERE
                    id = $1`;
      const todoParam = [todoId];
      await client.query(todoQuery, todoParam);
      const userQuery = `
                DELETE FROM
                    "userAccount"
                WHERE
                    username = $1`;
      const userParams = ["xyz"];
      await client.query(userQuery, userParams);
    } finally {
      client.release();
    }
  });

  describe("Add todo", async () => {
    it("Should successfully add todo", (done) => {
      const todoDetails = { title: "15", description: "one five" };
      chai
        .request(app)
        .post(`/users/todos`)
        .send(todoDetails)
        .set("Cookie", sessionCookie)
        .end((err, res) => {
          if (err) {
            return err;
          }

          expect(res).have.status(201);
          expect(res.body).to.exist;
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("title");
          expect(res.body).to.have.property("description");
          todoId = res.body.id;
          done();
        });
    });

    it("Requires title and description", (done) => {
      chai
        .request(app)
        .post(`/users/todos`)
        .send({ "": "", "": "" })
        .set("Cookie", sessionCookie)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(400);
          done();
        });
    });

    it("Requires description", (done) => {
      chai
        .request(app)
        .post(`/users/todos`)
        .send({ title: "15" })
        .set("Cookie", sessionCookie)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(400);
          done();
        });
    });

    it("Requires title", (done) => {
      chai
        .request(app)
        .post(`/users/todos`)
        .send({ description: "one five" })
        .set("Cookie", sessionCookie)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(400);
          done();
        });
    });

    it("Requires user login", (done) => {
      chai
        .request(app)
        .post(`/users/todos`)
        .send({ title: "15", description: "one five" })
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(401);
          done();
        });
    });
  });

  describe("Update todo", async () => {
    it("Should update title and description", (done) => {
      chai
        .request(app)
        .put(`/users/todos/${todoId}`)
        .send({ title: "15", description: "one five" })
        .set("Cookie", sessionCookie)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).to.have.status(202);
          done();
        });
    });

    it("Should update title ", (done) => {
      chai
        .request(app)
        .put(`/users/todos/${todoId}`)
        .send({ title: "15" })
        .set("Cookie", sessionCookie)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).to.have.status(202);
          done();
        });
    });

    it("Should update description", (done) => {
      chai
        .request(app)
        .put(`/users/todos/${todoId}`)
        .send({ description: "one five" })
        .set("Cookie", sessionCookie)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).to.have.status(202);
          done();
        });
    });

    it("Requires title or description", (done) => {
      chai
        .request(app)
        .put(`/users/todos/${todoId}`)
        .send({})
        .set("Cookie", sessionCookie)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).to.have.status(400);
          done();
        });
    });

    it("Requires user login", (done) => {
      chai
        .request(app)
        .post(`/users/todos/${todoId}`)
        .send({ title: "15", description: "one five" })
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(401);
          done();
        });
    });
  });

  describe("Get all todos", async () => {
    it("Returns all todos", (done) => {
      chai
        .request(app)
        .get(`/users/todos/`)
        .set("Cookie", sessionCookie)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res.body).be.an("array");
          expect(res).to.have.status(200);
          done();
        });
    });

    it("Requires user login", (done) => {
      chai
        .request(app)
        .get(`/users/todos/`)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res.body).be.an("object");
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe("Get one todo", async () => {
    it("Returns one todo", (done) => {
      chai
        .request(app)
        .get(`/users/todos/${todoId}`)
        .set("Cookie", sessionCookie)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).to.have.status(200);
          done();
        });
    });
    it("returns invalid todo id", (done) => {
      chai
        .request(app)
        .get(`/users/todos/50`)
        .set("Cookie", sessionCookie)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).to.have.status(400);
          done();
        });
    });

    it("Requires user login", (done) => {
      chai
        .request(app)
        .post(`/users/todos/${todoId}`)
        .send({ title: "15", description: "one five" })
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(401);
          done();
        });
    });
  });

  describe("Delete todo", async () => {
    it("Should delete todo", (done) => {
      chai
        .request(app)
        .delete(`/users/todos/${todoId}`)
        .set("Cookie", sessionCookie)
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });

    it("Returns invalid todo id", (done) => {
      chai
        .request(app)
        .delete(`/users/todos/18`)
        .set("Cookie", sessionCookie)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it("Requires user login", (done) => {
      chai
        .request(app)
        .post(`/users/todos/${todoId}`)
        .send({ title: "15", description: "one five" })
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(401);
          done();
        });
    });
  });
});
