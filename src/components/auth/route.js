const express = require("express");
const authRoute = express.Router();
const validation = require("./validation");
const controller = require("./controller");
const { validate } = require("express-validation");
// const reqBody = require('../../../doc/auth/reqBody');
// const yaml = require('yaml');

// const doc = new yaml.Document();
// doc.contents = reqBody.login;

/**
 * @swagger
 * /users/register:
 *  post:
 *    tags: 
 *      - Authentication
 *    description: register a user
 *    requestBody:
 *      $ref: '#/components/requestBodies/register'
 *    responses:
 *      201:
 *        $ref: '#/components/responses/successfulRegister'
 *      400:
 *        $ref: '#/components/responses/invalidData'
 *      409:
 *        $ref: '#/components/responses/userNotAvailable'
 *      500:
 *        $ref: '#/components/responses/imternalServerError'
 */
authRoute.post("/register", validate(validation.register, {}, {}), controller.register);


/**
 * @swagger
 * /users/login:
 *  post:
 *    tags: 
 *      - Authentication
 *    description: login a user
 *    requestBody:
 *      $ref: '#/components/requestBodies/login'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/successfulLogin'
 *      400:
 *        $ref: '#/components/responses/invalidData'
 *      404:
 *        $ref: '#/components/responses/userNotRegistered'
 *      500:
 *        $ref: '#/components/responses/imternalServerError'
 */
authRoute.post("/login", validate(validation.login, {}, {}), controller.login);

/**
 * @swagger
 * /users/logout:
 *  get:
 *    tags:
 *      - Authentication
 *    description: logout user
 *    parameters:
 *      name: user
 *      in: cookie
 *    responses:
 *      204:
 *        $ref: '#/components/responses/successfulLogout'
 */
authRoute.get("/logout", controller.logout);

module.exports = { authRoute };
