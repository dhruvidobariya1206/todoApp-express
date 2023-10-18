const express = require("express");
const router = express.Router({ mergeParams: true });
const validation = require("./validation");
const controller = require("./controller");
const { isAuth } = require("../../middleware/todo");
const { validate } = require("express-validation");

router.use(isAuth);

/**
 * @swagger
 * /users/todos/:
 *  get:
 *    tags: 
 *      - Todo
 *    description: get all todos
 *    security:
 *      - userAuth: []
 *    responses:
 *      401:
 *        $ref: '#/components/responses/unauthorized'
 *      200:
 *        $ref: '#/components/responses/getAllTodos'
 *  post:
 *    tags:
 *      - Todo
 *    description: add todo
 *    security:
 *      - userAuth: []
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
 *        $ref: '#/components/responses/internalServerError'
 */
router.route("/")
  .get(controller.getAll)
  .post(validate(validation.add), controller.add);

/**
 * @swagger
 * /users/todos/{id}:
 *  get:
 *    tags: 
 *      - Todo
 *    description: get all todos
 *    security:
 *      - userAuth: []
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
 *  put:
 *    tags:
 *      - Todo
 *    description: update todo
 *    security:
 *      - userAuth: []
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
 *        $ref: '#/components/responses/successfulUpdate'
 *      500:
 *        $ref: '#/components/responses/internalServerError'
 *      404:
 *        $ref: '#/components/responses/invalidTodoId'
 *  delete:
 *    tags:
 *      - Todo
 *    description: delete todo or mark complete
 *    security:
 *      - userAuth: []
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
 *        $ref: '#/components/responses/internalServerError'
 */
router.get("/:id", controller.getOne);
router.route("/:id")
  .get(controller.getOne)
  .put(validate(validation.update), controller.update)
  .delete(controller.remove);

module.exports = router;
