const express = require('express');
require('dotenv').config();
const config = require('./config/app');
const routes = require('./routes');
const { errorHandler, errorConverter } = require('./middlewares/error');
const httpStatus = require('http-status');
const ApiError = require('./utils/apiError');

const app = express();

// v1 api routes
app.use('/v1', routes);

// Error handlers
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

const server = app.listen(config.server.port, () => {
  console.log(`Listening at http://localhost:${config.server.port}`);
});
