var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// https://github.com/chimurai/http-proxy-middleware/tree/v0.21.0#readme
const proxy = require("http-proxy-middleware");

// var indexRouter = require('./routes/index');
var app = express();
// app.use(logger('dev'));
// 在此版本种不能使用：
// app.use(express.json());

app.use(express.urlencoded({
    extended: false,
    limit: '100mb'
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'view')));


// 跨域问题
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,Origin,Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Content-Type', 'application/json;charset=utf-8');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(
  "/agent",
  proxy({ target: "https://test.tope365.com", changeOrigin: true })
);
app.use(
  "/api",
  proxy({ target: "https://test.tope365.com", changeOrigin: true })
);
// app.use('/', indexRouter);


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
