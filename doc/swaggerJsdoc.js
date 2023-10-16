const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const route = express.Router();
const authReq = require('./auth/reqBody');
const authRes = require('./auth/response');
const todoReq = require('./todo/reqBody');
const todoRes = require('./todo/response');
const countryRes = require('./countries/response');

let reqBody = {};
Object.assign(reqBody, authReq, todoReq);
let response = {};
Object.assign(response, authRes, todoRes, countryRes);


console.log(reqBody);
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'todo app documentation',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/`,
        description: 'Local server'
      }
    ],
    components: {
      requestBodies: reqBody,
      responses: response,
    },
  },
  apis: ['./src/components/*/route.js'], 
};

const swaggerSpec = swaggerJsdoc(options);
route.use('/', swaggerUi.serve);
route.get('/', swaggerUi.setup(swaggerSpec));


module.exports = route;
