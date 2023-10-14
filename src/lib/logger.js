const morgan = require("morgan");

morgan.token("userSession", (req, res) => {
    if (req.user || req.session.user) {
      return JSON.stringify(req.user || req.session.user);
    }
});

module.exports = {
    logs: () => {
        return morgan("[:date[clf]] :method :status :url :userSession");
    }
}
