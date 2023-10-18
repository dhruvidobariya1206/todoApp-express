module.exports = {
  isAuth: (req, res, next) => {
    if (!req.session.user) {
      res.status(401).send({
        code: "Unauthorized",
        message: "Validation required",
      });
    } else {
      next();
    }
  },
};
