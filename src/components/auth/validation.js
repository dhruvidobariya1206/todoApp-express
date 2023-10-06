const { Joi } = require('express-validation');


const register = {
    body: Joi.object({
        username: Joi.string()
            .required(),
        password: Joi.string()
            .required()
            .min(8)
            .max(8),
        email: Joi.string()
            .required()
            .regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)
    }),
}

const login = {
    body: Joi.object({
        username: Joi.string()
            .required(),
        password: Joi.string()
            .required()
            .min(8)
            .max(8)
    }),
}

module.exports = { register, login };
