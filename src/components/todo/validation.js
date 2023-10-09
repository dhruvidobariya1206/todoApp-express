const { Joi } = require('express-validation');

module.exports = {
    add : {
        body : Joi.object({
            title: Joi.string()
                .required(),
            description: Joi.string()
                        .required(),
        }).with('title', 'description'),
    },

    update : {
        body : Joi.object({
            title: Joi.string(),
            description: Joi.string(),
        }).or('title', 'description'),
    }
    
}

