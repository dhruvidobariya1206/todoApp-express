const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../../server");
chai.use(chaiHttp);
const { pool } = require("../../../dbconn");

const expect = chai.expect;

describe("authentication", () => {
  const userCredentials = {
    username: "xyz",
    password: "12345678",
    email: "ddobariya5262@gmail.com",
  };

  before("Delete record", async () => {
    const client = await pool.connect();
    try {
      const query = `
                DELETE FROM
                    "userAccount"
                WHERE
                    username = $1`;
      const parameters = ["xyz"];
      await client.query(query, parameters);
    } finally {
      client.release();
    }
  });

  describe("Register page", () => {
    it("Should register user", (done) => {
      chai
        .request(app)
        .post("/users/register")
        .send(userCredentials)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(201);
          expect(res.body).be.a("object");
          expect(res.body).to.have.property("username");
          expect(res.body).to.have.property("email");
          done();
        });
    });

    it("Should give username already exists", (done) => {
      chai
        .request(app)
        .post("/users/register")
        .send(userCredentials)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(409);
          expect(res.body).be.a("object");
          done();
        });
    });

    it("Should require password", (done) => {
      const username = { username: "26", email: "ddobariya5262@gmail.com" };

      chai
        .request(app)
        .post("/users/register")
        .send(username)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(400);
          done();
        });
    });

    it("Should require username", (done) => {
      const password = {
        password: "26262626",
        email: "ddobariya5262@gmail.com",
      };

      chai
        .request(app)
        .post("/users/register")
        .send(password)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(400);
          done();
        });
    });

    it("Should require email", (done) => {
      const password = { username: "26", password: "26262626" };

      chai
        .request(app)
        .post("/users/register")
        .send(password)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(400);
          done();
        });
    });

    it("Should give password length not of 8 characters", (done) => {
      chai
        .request(app)
        .post("/users/register")
        .send({ username: "26", password: "262626" })
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(400);
          done();
        });
    });
  });

  describe("Login page", () => {
    const userCredentials = { username: "xyz", password: "12345678" };
    it("Should login user", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .send(userCredentials)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(200);
          expect(res.body).be.a("object");
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("username");
          done();
        });
    });

    it("returns user not found", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .send({ username: "26", password: "26262625" })
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(404);
          done();
        });
    });

    it("Should require password", (done) => {
      const username = { username: "26" };

      chai
        .request(app)
        .post("/users/login")
        .send(username)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(400);
          done();
        });
    });

    it("Should require username", (done) => {
      const password = { password: "26262626" };

      chai
        .request(app)
        .post("/users/login")
        .send(password)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(400);
          done();
        });
    });

    it("Returns password length not of 8 characters", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .send({ username: "26", password: "262626" })
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(400);
          done();
        });
    });

  });

  describe("Logout page", () => {
    let sessionCookie;
    const userCredentials = { username: "xyz", password: "12345678" };
    before("User login", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .send(userCredentials)
        .end((err, res) => {
          expect(res.body).to.exist;
          expect(res).have.status(200);
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

    it("Should logout user", (done) => {
      chai
        .request(app)
        .get("/users/logout")
        .set("Cookie", sessionCookie)
        .end((err, res) => {
          if (err) {
            return done(err);
          } else {
            expect(res).have.status(200);
            done();
          }
        });
    });
  });
});
