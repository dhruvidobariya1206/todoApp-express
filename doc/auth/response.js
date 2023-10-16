module.exports = {
  successfulRegister: {
    description: 'Registeration successfull.',
    content: {
      'application/json': {
        schemas: {
          type: 'object',
          properties: {
            username: {
              type: 'string'
            },
            email: {
              type: 'string'
            }
          }
        },
        example: {
          username: 'dhruvi',
          email: 'abc@gmail.com'
        }
      }
    }
  },

  invalidData: {
    description: 'Incomplete or invalid data.'
  },

  userNotAvailable: {
    description: 'Username or email already in exists.'
  },

  imternalServerError: {
    description: 'Internal server error.'    
  },

  successfulLogin: {
    description: 'Registeration successfull.',
    content: {
      'application/json': {
        schemas: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            username: {
              type: 'string'
            },
            email: {
              type: 'string'
            }
          }
        },
        example: {
          id: 50,
          username: 'dhruvi',
          email: 'abc@gmail.com'
        }
      }
    }
  },

  userNotRegistered: {
    description: 'Username is not registered.'
  },

  successfulLogout: {
    description: 'Successfully logged out.'
  }
}
