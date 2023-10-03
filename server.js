const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')
const { authRoute } = require('./src/components/auth/route');
const { todoRoute } = require('./src/components/todo/route');
const { errorHandler } = require('./handleErrors');
require('dotenv').config({ path: './.env' })



const app = express();

app.use(session({
    secret: 'your secret',
    saveUninitialized: true,
    resave: false
}));

app.use(bodyParser.json());

// ROUTES
app.use('/user', authRoute);
app.use('/user/:userId/todo', todoRoute);

app.use((req, res, next) => {
    next(new Error('PAGE_NOT_FOUND'));
});

app.use(errorHandler);

app.listen(process.env.PORT||3000, ()=>{
    console.log(`Server started on port: ${process.env.PORT || 3000}`);
});

module.exports = app;