const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const {
  calculateAge,
  calculateExpiresAt,
  calculateMinFromSec,
} = require("./helper");

const expect = chai.expect;

describe("Helper", () => {
  describe("Calculate age", () => {
    it("should return age 1", (done) => {
      const date = new Date("2022-10-09").toISOString();
      const age = calculateAge(date);
      expect(age).to.equal(1);
      done();
    });
    it("should return age 1", (done) => {
      const date = new Date("2022-10-11").toISOString();
      const age = calculateAge(date);
      expect(age).to.equal(1);
      done();
    });
    it("should return age 1", (done) => {
      const date = new Date("2022-10-08").toISOString();
      const age = calculateAge(date);
      expect(age).to.equal(1);
      done();
    });
    it("should return age 21", (done) => {
      const date = new Date("2002-06-12").toISOString();
      const age = calculateAge(date);
      expect(age).to.equal(21);
      done();
    });
    it("should return age 20", (done) => {
      const date = new Date("2002-11-07").toISOString();
      const age = calculateAge(date);
      expect(age).to.equal(20);
      done();
    });
  });

  describe("Calculate expires at", () => {
    it("should expire in 10 sec", (done) => {
      let date = new Date();
      date.setSeconds(date.getSeconds() + 10);
      const expiry = calculateExpiresAt(10);
      expect(expiry).to.be.string;
      expect(expiry).to.equal(date.toISOString());
      done();
    });

    it("should expire in 90 sec", (done) => {
      let date = new Date();
      date.setSeconds(date.getSeconds() + 90);
      const expiry = calculateExpiresAt(90);
      expect(expiry).to.be.string;
      expect(expiry).to.equal(date.toISOString());
      done();
    });
  });

  describe("Calculate min from sec", () => {
    it("should return 1 min", (done) => {
      const seconds = calculateMinFromSec(60);
      expect(seconds).to.equal(1);
      done();
    });
    it("should return 1.5 min", (done) => {
      const seconds = calculateMinFromSec(90);
      expect(seconds).to.equal(1.5);
      done();
    });
    it("should return 0.5 min", (done) => {
      const seconds = calculateMinFromSec(30);
      expect(seconds).to.equal(0.5);
      done();
    });
  });
});
