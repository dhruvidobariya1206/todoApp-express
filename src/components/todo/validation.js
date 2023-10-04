const { Joi } = require('express-validation');

const add = {
    body : Joi.object({
        title: Joi.string()
            .required(),
        description: Joi.string()
                    .required(),
    }).with('title', 'description'),
}


const update = {
    body : Joi.object({
        title: Joi.string(),
        description: Joi.string(),
    }).or('title', 'description'),
}

module.exports = { add, update };