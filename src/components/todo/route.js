const express = require("express");
const todoRoute = express.Router({ mergeParams: true });
const validation = require("./validation");
const controller = require("./controller");
const { isAuth } = require("../../middleware/todo");
const { validate } = require("express-validation");

todoRoute.use(isAuth);

/**
 * @swagger
 * /users/todos/:
 *  get:
 *    tags: 
 *      - Todo
 *    description: get all todos
 *    responses:
 *      401:
 *        description: unauthorized - user login required
 *      200:
 *        description: all todo listed
 */
todoRoute.get("/", controller.getAll);

/**
 * @swagger
 * /users/todos/{id}:
 *  get:
 *    tags: 
 *      - Todo
 *    description: get all todos
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: number
 *          example: 39
 *    responses:
 *      401:
 *        description: unauthorized - user login required
 *      400:
 *        description: not user's todo id
 *      200:
 *        description: todo listed
 */
todoRoute.get("/:id", controller.getOne);

/**
 * @swagger
 * /users/todos/:
 *  post:
 *    tags:
 *      - Todo
 *    description: add todo
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *            required:
 *              - title 
 *              - description 
 *            example: 
 *              title: title
 *              description: description 
 *    responses:
 *      401:
 *        description: unauthorized - user login required
 *      201:
 *        description: created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *      500:
 *        description: internal server error
 */
todoRoute.post("/", validate(validation.add, {}, {}), controller.add);

/**
 * @swagger
 * /users/todos/{id}:
 *  put:
 *    tags:
 *      - Todo
 *    description: update todo
 *    parameters:
 *      - name: id
 *        in: path 
 *        required: true
 *        schema:
 *          type: number
 *          example: 39
 *    responses:
 *      401:
 *        description: unauthorized - user login required
 *      400:
 *        description: not user's todo id
 *      202:
 *        description: todo updated
 *      500:
 *        description: internal server error
 */
todoRoute.put("/:id", validate(validation.update, {}, {}), controller.update);

/**
 * @swagger
 * /users/todos/{id}:
 *  delete:
 *    tags:
 *      - Todo
 *    description: delete todo or mark complete
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: number
 *          example: 39
 *    responses:
 *      400:
 *        description: not user's todo
 *      204:
 *        description: todo deleted
 *      500:
 *        description: internal server error
 */
todoRoute.delete("/:id", controller.remove);

module.exports = { todoRoute };
