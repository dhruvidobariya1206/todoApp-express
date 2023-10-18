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


// console.log(reqBody);
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
      securitySchemes: {
        userAuth: {
          type: 'apiKey',
          description: 'user authentication. You can use "connect.sid=s%3ARb_3FTxc91slLfur79BiT2zoXgNffus_.Wiy1HoNdrlFBCu6ifsYilZbcO3mgPyQmK3Fpy%2Bfx9Pc; Path=/; HttpOnly;"',
          name: 'connect.sid',
          in: 'cookie',
        }
      }
    },
  },
  apis: ['./src/components/*/route.js'], 
};

const swaggerSpec = swaggerJsdoc(options);
route.use('/', swaggerUi.serve);
route.get('/', swaggerUi.setup(swaggerSpec));


module.exports = route;
