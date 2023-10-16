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
 *        $ref: '#/components/responses/allCountries'
 *      401:
 *        $ref: '#/components/responses/unauthorized'
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
 *        $ref: '#/components/responses/getOneCountry'
 *      401:
 *        $ref: '#/components/responses/unauthorized'
 *      404:
 *        $ref: '#/components/responses/invalidCountryId'
 */
countriesRoute.get("/:id", getOneCountry);

module.exports = { countriesRoute };
