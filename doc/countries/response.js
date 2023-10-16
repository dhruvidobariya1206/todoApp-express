module.exports = {
  allCountries: {
    description: 'All Countries listed',
    content: {
      'application/json': {
        schema: {
          type: 'array'
        }
      }
    }
  },
   
  getOneCountry: {
    description: 'One country listed',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            name: {
              type: 'string'
            }
          }
        }
      }
    }
  },

  invalidCountryId: {
    description: 'Invalid country id'
  }
}
