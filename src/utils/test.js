const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const {
  calculateAge,
  calculateExpiresAt,
  calculateMinFromSec,
} = require("./helper");

const expect = chai.expect;

describe("helper", () => {
  describe("calculateAge", () => {
    it("09/10/22", (done) => {
      const date = new Date("2022-10-09").toISOString();
      const age = calculateAge(date);
      expect(age).to.equal(1);
      done();
    });
    it("11/10/22", (done) => {
      const date = new Date("2022-10-11").toISOString();
      const age = calculateAge(date);
      expect(age).to.equal(0);
      done();
    });
    it("08/10/22", (done) => {
      const date = new Date("2022-10-08").toISOString();
      const age = calculateAge(date);
      expect(age).to.equal(1);
      done();
    });
    it("12/06/02", (done) => {
      const date = new Date("2002-06-12").toISOString();
      const age = calculateAge(date);
      // console.log(age);
      expect(age).to.equal(21);
      done();
    });
    it("07/11/02", (done) => {
      const date = new Date("2002-11-07").toISOString();
      const age = calculateAge(date);
      // console.log(age);
      expect(age).to.equal(20);
      done();
    });
  });

  describe("calculateExpiresAt", () => {
    it("10 sec", (done) => {
      let date = new Date();
      date.setSeconds(date.getSeconds() + 10);
      const expiry = calculateExpiresAt(10);
      expect(expiry).to.be.string;
      expect(expiry).to.equal(date.toISOString());
      done();
    });

    it("90 sec", (done) => {
      let date = new Date();
      date.setSeconds(date.getSeconds() + 90);
      const expiry = calculateExpiresAt(90);
      expect(expiry).to.be.string;
      expect(expiry).to.equal(date.toISOString());
      done();
    });
  });

  describe("calculateMinFromSec", () => {
    it("60 sec", (done) => {
      const seconds = calculateMinFromSec(60);
      // console.log(seconds);
      expect(seconds).to.equal(1);
      done();
    });
    it("90 sec", (done) => {
      const seconds = calculateMinFromSec(90);
      // console.log(seconds);
      expect(seconds).to.equal(1.5);
      done();
    });
    it("30 sec", (done) => {
      const seconds = calculateMinFromSec(30);
      // console.log(seconds);
      expect(seconds).to.equal(0.5);
      done();
    });
  });
});
