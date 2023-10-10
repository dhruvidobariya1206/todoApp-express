require("dotenv-safe").config({ path: './.env' });
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const { schedule } = require("./src/lib/cron");
const { authRoute } = require("./src/components/auth/route");
const { todoRoute } = require("./src/components/todo/route");
const { countriesRoute } = require("./src/components/countries/route");
const { errorHandler } = require("./src/utils/helper");

const app = express();

app.use(
  session({
    secret: "your secret",
    saveUninitialized: true,
    resave: false,
  })
);

app.use(express.json());

morgan.token("userSession", (req, res) => {
  if (req.user || req.session.user) {
    return JSON.stringify(req.user || req.session.user);
  }
});
app.use(morgan("[:date[clf]] :method :status :url :userSession"));

// ROUTES
app.use("/users", authRoute);
app.use("/users/todos", todoRoute);
app.use("/countries", countriesRoute);

// app.use((req,res) => {
//     schedule;
// });

app.use((req, res, next) => {
  next(new Error("PAGE_NOT_FOUND"));
});

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port: ${process.env.PORT || 3000}`);
});

module.exports = app;
