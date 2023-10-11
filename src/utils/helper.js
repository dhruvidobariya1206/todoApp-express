import { ValidationError } from "express-validation";
import { ERRORS } from "./constants";

export function errorHandler(error, req, res, next) {
  if (error instanceof ValidationError) {
    res.status(error.statusCode).send(error);
  } else {
    res
      .status(ERRORS[error.message].code)
      .send(ERRORS[error.message].response);
  }
}
export function calculateAge(birthDateStr) {
  const currentDate = new Date();
  const birthDate = new Date(birthDateStr);
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}
export function calculateExpiresAt(expiresInSec) {
  const expiresAt = new Date();
  expiresAt.setSeconds(expiresAt.getSeconds() + expiresInSec);
  return expiresAt.toISOString();
}
export function calculateMinFromSec(seconds) { return seconds / 60; }
