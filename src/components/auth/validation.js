const { Joi } = require('express-validation');


const login = {
    body: Joi.object({
        username: Joi.string()
            .required(),
        password: Joi.string()
            .required()
            .min(8)
            // .regex(/=.*8[A-Z]=.*8[a-z]=.*8[0-9]/),
    }),
}
module.exports = { login };
