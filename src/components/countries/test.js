const chai = require("chai");
const chaiHttp = require("chai-http");
const nock = require("nock");
const sinon = require("sinon");
const { countries } = require("./controller");

chai.use(chaiHttp);

const expect = chai.expect;

const app = require("../../../server");

describe("Countries test", () => {
  let sessionCookie,
    id = 1;
  const data = {
    data: {
      countries: [
        { id: 1, name: "India" },
        { id: 2, name: "Albania" },
      ],
    },
  };

  nock("https://dev-api-minibrands.zurutech.online/v1/countries")
    .persist()
    .get("")
    .reply(200, data);

  before("login", (done) => {
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

  describe("get /countries/", async () => {
    it("get all countries", (done) => {
      chai
        .request(app)
        .get("/countries/")
        .set("Cookie", sessionCookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.exist;
          expect(res.body).be.an("array");
          done();
        });
    });

    it("check login", (done) => {
      chai
        .request(app)
        .get("/countries/")
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.exist;
          expect(res.body).be.an("object");
          done();
        });
    });
  });

  describe("get /countries/:id", async () => {
    it("get country", (done) => {
      chai
        .request(app)
        .get(`/countries/${id}`)
        .set("Cookie", sessionCookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.exist;
          expect(res.body).be.an("object");
          done();
        });
    });

    it("invalid id", (done) => {
      chai
        .request(app)
        .get(`/countries/5`)
        .set("Cookie", sessionCookie)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.exist;
          expect(res.body).be.an("object");
          done();
        });
    });

    it("check login", (done) => {
      chai
        .request(app)
        .get(`/countries/${id}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.exist;
          expect(res.body).be.an("object");
          done();
        });
    });
  });
});

describe("mocking function", () => {
  it("countries", () => {
    const mock = sinon
      .stub(countries, "allCountries")
      .value({ id: 1, name: "India" });

    const result = countries.allCountries;

    expect(result).to.deep.equal({ id: 1, name: "India" });

    mock.restore();
  });
});
