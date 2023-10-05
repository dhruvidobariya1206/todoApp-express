const { ValidationError } = require('express-validation');
const { ERRORS } = require('./constants');

const errorHandler = (error, req, res, next) => {
    if(error instanceof ValidationError) {
        res.status(error.statusCode).send(error);
    }
    else {
        res.status(ERRORS[error.message].code).send(ERRORS[error.message].response);
    }
    
}


module.exports = { errorHandler };