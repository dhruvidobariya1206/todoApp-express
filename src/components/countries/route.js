const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { isAuth } = require("../../middleware/todo");

router.use(isAuth);

/**
 * @swagger
 * /countries/:
 *  get:
 *    tags: 
 *      - Countries
 *    description: get all countries
 *    security:
 *      - userAuth: []
 *    responses:
 *      200:
 *        $ref: '#/components/responses/allCountries'
 *      401:
 *        $ref: '#/components/responses/unauthorized'
 */
router.route("/")
  .get(controller.getCountries);

/**
 * @swagger
 * /countries/{id}:
 *  get:
 *    tags: 
 *      - Countries
 *    description: get country by id
 *    security: 
 *      - userAuth: []
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
router.route("/:id")
  .get(controller.getOneCountry);

module.exports = router;
