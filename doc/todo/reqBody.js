module.exports = {
  addTodo: {
    description: 'Add new todo',
    required: true,
    content: {
      'application/json': {
        schemas: {
          type: 'object',
          properties: {
            title: {
              type: 'string'
            },
            description: {
              type: 'string'
            }
          }
        },
        example: {
          title: 'title',
          description: 'description'
        }
      }
    }
  },

  updateTodo: {
    description: 'update todo',
    required: true,
    content: {
      'application/json': {
        schemas: {
          type: 'object',
          anyOf: [
            'title',
            'description'
          ],
          properties: {
            title: {
              type: 'string'
            },
            description: {
              type: 'string'
            }
          }
        },
        example: {
          title: 'title',
          description: 'description'
        }
      }
    }
  }
}
