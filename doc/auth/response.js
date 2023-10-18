module.exports = {
  successfulRegister: {
    description: 'Registration successful.',
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

  internalServerError: {
    description: 'Internal server error.'    
  },

  successfulLogin: {
    description: 'Login successful.',
    headers: {
      'Set-Cookie': {
        schema: {
          type: 'string',
        },
        example: 'connect.sid=s%3ARb_3FTxc91slLfur79BiT2zoXgNffus_.Wiy1HoNdrlFBCu6ifsYilZbcO3mgPyQmK3Fpy%2Bfx9Pc; Path=/; HttpOnly;'
      }
    },
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
    description: 'successfully logged out.'
  },
}
