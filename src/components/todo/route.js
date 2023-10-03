const express = require('express');
const todoRoute = express.Router({mergeParams: true});
const validation = require('./validation');
const controller = require('./controller');
const { isAuth } = require('../../middleware/todo');
const { validate } = require('express-validation');

todoRoute.use(isAuth);

todoRoute.get('/', controller.getAll);
todoRoute.get('/:id', controller.getOne);
todoRoute.post('/', validate(validation.add, {}, {}), controller.add);
todoRoute.put('/:id', validate(validation.update, {}, {}), controller.update);
todoRoute.delete('/:id', controller.remove);

module.exports = { todoRoute };