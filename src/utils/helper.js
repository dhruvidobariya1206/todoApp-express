const { ValidationError } = require("express-validation");
const { ERRORS } = require("./constants");

module.exports = {
  errorHandler: (error, req, res, next) => {
    if (error instanceof ValidationError) {
      res.status(error.statusCode).send(error);
    } else {
      res
        .status(ERRORS[error.message].code)
        .send(ERRORS[error.message].response);
    }
  },

  calculateAge: (birthDateStr) => {
    const currentDate = new Date();
    const birthDate = new Date(birthDateStr);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age -= 1;
    }
    return age;
  },

  calculateExpiresAt: (expiresInSec) => {
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresInSec);
    return expiresAt.toISOString();
  },

  calculateMinFromSec: (seconds) => seconds / 60,
};
