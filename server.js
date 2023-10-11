// eslint-disable-next-line no-undef
require("dotenv-safe").config({ path: './.env' });
import express, { json } from "express";
import session from "express-session";
import morgan, { token } from "morgan";
// import { schedule } from "./src/lib/cron";
import { authRoute } from "./src/components/auth/route";
import { todoRoute } from "./src/components/todo/route";
import { countriesRoute } from "./src/components/countries/route";
import { errorHandler } from "./src/utils/helper";

const app = express();

app.use(
  session({
    secret: "your secret",
    saveUninitialized: true,
    resave: false,
  })
);

app.use(json());

token("userSession", (req) => {
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

// eslint-disable-next-line no-undef
app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-undef
  console.log(`Server started on port: ${process.env.PORT || 3000}`);
});

export default app;
