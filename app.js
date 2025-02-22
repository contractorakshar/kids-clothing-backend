var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connection = require('./db/db.config');
var models = require('./models');
var sequelize = require('sequelize');
const dotenv = require('dotenv');

global.con = connection;
global.models = models;
global.seq = sequelize;
global.config = dotenv.config();

var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');
var productsRouter = require('./routes/products');
var productPhotosRouter = require('./routes/productsPhotos.routes');
var orderRouter = require('./routes/order.routes');
var orderDetailsRouter = require('./routes/orderDetails.routes');
var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/category',categoryRouter);
app.use('/products',productsRouter);
app.use('/product-photos',productPhotosRouter);
app.use('/order',orderRouter);
app.use('/order_details',orderDetailsRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
