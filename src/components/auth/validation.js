const { Joi } = require("express-validation");

module.exports = {
  register: {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required().min(8).max(8),
      email: Joi.string()
        .email()
        .required(),
    }),
  },

  login: {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required().min(8).max(8),
    }),
  },
};
