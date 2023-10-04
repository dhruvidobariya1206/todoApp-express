const express = require('express');
const countriesRoute = express.Router();
const { getCountries, getOneCountry } = require('./controller');
const { isAuth } = require('../../middleware/todo')

countriesRoute.use(isAuth);
countriesRoute.get('/', getCountries);
countriesRoute.get('/:id', getOneCountry);

module.exports = { countriesRoute };