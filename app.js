var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// const catalogRouter = require('./routes/catalog');  // 导入 catalog 路由
const signRouter = require('./routes/sign');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//需要跨域的url
let allowOrigin = [
  "http://localhost:3000",
];

app.use((request, response, next) => {
  let {origin} = request.headers;
  if(allowOrigin.includes(origin)) {
      response.setHeader("Access-Control-Allow-Origin", origin);
      response.setHeader("Access-Control-Allow-Credentials", true);
      response.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
      response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, HEAD, DELETE, OPTIONS");
      // response.setHeader("X-Powered-By", "3.2.1");
      // if(request.method.toUpperCase() == "OPTIONS") {
      //     response.statusCode = 204;
      //     response.end();
      // }
  }
  next();
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/catalog', catalogRouter);  // 将 catalog 路由添加进中间件链
app.use('/sign', signRouter);


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
