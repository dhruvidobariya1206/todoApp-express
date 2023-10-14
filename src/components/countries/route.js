const express = require("express");
const countriesRoute = express.Router();
const { getCountries, getOneCountry } = require("./controller");
const { isAuth } = require("../../middleware/todo");

countriesRoute.use(isAuth);

/**
 * @swagger
 * /countries/:
 *  get:
 *    tags: 
 *      - Countries
 *    description: get all countries
 *    responses:
 *      200:
 *        description: all countries listed
 */
countriesRoute.get("/", getCountries);

/**
 * @swagger
 * /countries/{id}:
 *  get:
 *    tags: 
 *      - Countries
 *    description: get country by id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema: 
 *          type: number
 *          example: 76
 *    responses:
 *      200:
 *        description: get country
 *      401:
 *        description: user not logged in
 *      404:
 *        description: invalid country id
 */
countriesRoute.get("/:id", getOneCountry);

module.exports = { countriesRoute };
