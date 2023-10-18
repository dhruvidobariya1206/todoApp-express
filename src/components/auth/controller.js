const service = require("./service");

module.exports = {
  register: async (req, res, next) => {
    try {
      const { username, password, email } = req.body;
      const result = await service.register(username, password, email);
      req.user = result;
      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const result = await service.login(username, password);
      req.session.user = result;
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  },

  logout: (req, res, next) => {
    try {
      req.user = req.session.user;
      service.logout(req.session);
      res.status(200).send("Logout successful");
    } catch (error) {
      next(error);
    }
  },
};
