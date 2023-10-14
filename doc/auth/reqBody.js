module.exports = {
  "login": {
    "type": "object",
    "properties": {
     "username": {
       "type": "string"
     },
     "password": {
       "type": "string",
       "minLength": 8,
       "maxLength": 8,
     }
    },
    "example": {
      "username": "dhruvi",
      "password": '12345678'
    }
  },
};

