var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

require('./models/db');
var studentRouter = require('./routes/student');

// Swagger configuration
//import swaggerJSDoc from 'swagger-jsdoc';  // If using ES-modules
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API to manage students',
    version: '1.0.0',
    description: 'This is a REST API application made with Express. Just a demo.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Poul Ejnar Rovsing',
      url: 'https://ece.au.dk',
      email: 'per@ece.au.dk',
    },
    servers: [{
      url: 'http://localhost:3000',
      description: 'Development server',
    }, ],
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/students', studentRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json('Error: ' + (err.message || 'Internal server error'));
});

module.exports = app;
