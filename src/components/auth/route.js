const express = require("express");
const authRoute = express.Router();
const validation = require("./validation");
const controller = require("./controller");
const { validate } = require("express-validation");
const reqBody = require('../../../doc/auth/reqBody');


/**
 * @swagger
 * /users/register:
 *  post:
 *    tags: 
 *      - Authentication
 *    description: register a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *              email:
 *                type: string
 *            required:
 *              - username 
 *              - password 
 *              - email 
 *            example: 
 *              username: dhruvi2
 *              password: '12345678'
 *              email: abc@gmail.com
 *    responses:
 *      201:
 *        description: created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id: 
 *                  type: integer
 *                username: 
 *                  type: string
 *                password: 
 *                  type: string
 *                email: 
 *                  type: string
 *      400:
 *        description: incomplete/invalid data
 *      409:
 *        description: username or email already exists
 *      500:
 *        description: internal server error
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
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *            required:
 *              - username 
 *              - password 
 *            example: 
 *              username: dhruvi
 *              password: '12345678'
 *    responses:
 *      200:
 *        description: successful login
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id: 
 *                  type: integer
 *                username: 
 *                  type: string
 *                email: 
 *                  type: string
 *      400:
 *        description: incomplete data
 *      404:
 *        description: username not found
 *      500:
 *        description: internal server error
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
 *      200:
 *        description: successfull logout
 *      204:
 *        description: successfull logout
 */
authRoute.get("/logout", controller.logout);

module.exports = { authRoute };
