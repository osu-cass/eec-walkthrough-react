var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var subjectsRouter = require('./routes/subjects');
var cardsRouter = require('./routes/cards');
var tidbitsRouter = require('./routes/tidbits');

var app = express();



var mysql = require("mysql");
var con = mysql.createPool({
  host: "chum-groups.engr.oregonstate.edu",
  user: "eec_database",
  password: "bacondonuts",
  database: "eec_dev2_database",
	tls: {
    secureProtocol: "TLSv1_method"
	}
});
con.timeout = 0

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
    req.con = con;
    next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/subjects', subjectsRouter);
app.use('/cards', cardsRouter);
app.use('/tidbits', tidbitsRouter);

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
