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
 *        $ref: '#/components/responses/unauthorized'
 *      200:
 *        $ref: '#/components/responses/getAllTodos'
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
 *        $ref: '#/components/responses/unauthorized'
 *      400:
 *        $ref: '#/components/responses/invalidData'
 *      200:
 *        $ref: '#/components/responses/getOneTodo'
 *      404:
 *        $ref: '#/components/responses/invalidTodoId'
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
 *      $ref: '#/components/requestBodies/addTodo'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/invalidData'
 *      401:
 *        $ref: '#/components/responses/unauthorized'
 *      201:
 *        $ref: '#/components/responses/successfullyAdded'
 *      500:
 *        $ref: '#/components/responses/imternalServerError'
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
 *    requestBody:
 *      $ref: '#/components/requestBodies/updateTodo'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/unauthorized'
 *      400:
 *        $ref: '#/components/responses/invalidData'
 *      202:
 *        $ref: '#/components/responses/successfullUpdate'
 *      500:
 *        $ref: '#/components/responses/imternalServerError'
 *      404:
 *        $ref: '#/components/responses/invalidTodoId'
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
 *        $ref: '#/components/responses/invalidData'
 *      401:
 *        $ref: '#/components/responses/unauthorized'
 *      204:
 *        $ref: '#/components/responses/todoDeleted'
 *      500:
 *        $ref: '#/components/responses/imternalServerError'
 */
todoRoute.delete("/:id", controller.remove);

module.exports = { todoRoute };
