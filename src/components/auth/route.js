const express = require('express');
const authRoute = express.Router();
const validation = require('./validation');
const controller = require('./controller');
const {validate} = require('express-validation');


authRoute.post('/register', validate(validation.register, {}, {}), controller.register);
authRoute.post('/login', validate(validation.login, {}, {}), controller.login);
authRoute.get('/logout', controller.logout);

module.exports = { authRoute };