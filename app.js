const createError = require('http-errors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const db = require('./helper/db')();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const errorMiddleware = require('./middleware/error-middleware')
const usersRouter = require('./routes/users');

const app = express();
 



app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploadFile')));

app.use('/api', usersRouter);
app.use(errorMiddleware);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.json({message: "Error"}).status(err.status || 500);
});

module.exports = app;
