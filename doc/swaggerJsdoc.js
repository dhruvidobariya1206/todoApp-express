const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const route = express.Router();
const reqBody = require('./auth/reqBody');

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
  },
  apis: ['./src/components/*/route.js'],
  components: {
    "schemas": { reqBody }
  }  
};

const swaggerSpec = swaggerJsdoc(options);
route.use('/', swaggerUi.serve);
route.get('/', swaggerUi.setup(swaggerSpec));


module.exports = route;
