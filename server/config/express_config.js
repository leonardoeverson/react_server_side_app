const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');

//helmet
app.use(helmet());

//Morgan
app.use(morgan('dev'));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Express-Session
app.use(session({
    secret: '1234567890![]?:>.;@#$%¨&*()_-+§qazxswedcvfrtgbnyujmkiolpç^~;.',
    resave: false,
    saveUninitialized: false
}));

//Rotas
app.use(require('../routes/routes'));

module.exports = app;
