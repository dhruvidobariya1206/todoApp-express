module.exports = {
  login: {
    description: 'user login',
    required: true,
    content: {
      'application/json': {
        schemas: {
          type: 'object',
          properties: {
            username: {
              type: 'string'
            },
            password: {
              type: 'string',
              minLength: 8,
              maxLength: 8,
            }
          },
        },
        example: {
          username: 'dhruvi',
          password: '12345678'
        }
      }
    }
  },

  register: {
    description: 'register user',
    required: true,
    content: {
      'application/json': {
        schemas: {
          type: 'object',
          properties: {
            username: {
              type: 'string'
            },
            password: {
              type: 'string',
              minLength: 8,
              maxLength: 8,
            },
            email: {
              type: 'string'
            },
          },
        },
        example: {
          username: 'dhruvi',
          password: '12345678',
          email: 'abc@gmail.com',
        }
      }
    }
  }
};

