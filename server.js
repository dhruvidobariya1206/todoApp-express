require("dotenv-safe").config({ path: './.env' });
const express = require("express");
const session = require("express-session");
// const schedular = require('./src/components/schedular');
const swaggerRoute = require('./doc/swaggerJsdoc');
const { authRoute } = require("./src/components/auth/route");
const { todoRoute } = require("./src/components/todo/route");
const { countriesRoute } = require("./src/components/countries/route");
const { errorHandler } = require("./src/utils/helper");
const { logs } = require('./src/lib/logger');

const app = express();

app.use(
  session({
    secret: "your secret",
    saveUninitialized: true,
    resave: false,
  })
);

app.use(express.json());
// schedular.init();


app.use(logs());

// ROUTES
app.use("/users", authRoute);
app.use("/users/todos", todoRoute);
app.use("/countries", countriesRoute);

app.use('/api-docs', swaggerRoute);

app.use((req, res, next) => {
  next(new Error("PAGE_NOT_FOUND"));
});

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port: ${process.env.PORT || 3000}`);
});

module.exports = app;
