module.exports = {
  unauthorized: {
    description: 'User not logged in.'
  },

  getAllTodos: {
    description: 'All todos listed.'
  },

  getOneTodo: {
    description: 'Found todo.'
  },

  successfullyAdded: {
    description: 'todo created',
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            title: {
              type: 'string'
            },
            description: {
              type: 'string'
            }
          }
        },
        example: {
          id: 51,
          title: 'title',
          description: 'description'
        }
      }
    }
  },

  successfulUpdate: {
    description: 'todo updated',
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            title: {
              type: 'string'
            },
            description: {
              type: 'string'
            }
          }
        },
        example: {
          id: 51,
          title: 'title',
          description: 'description'
        }
      }
    }
  },

  invalidTodoId: {
    description: 'Invalid todo id'
  },

  todoDeleted: {
    description: 'Todo is marked complete.'
  }
}
