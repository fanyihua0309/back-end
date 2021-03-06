var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const userRouter = require('./routes/user');
const signRouter = require('./routes/sign');
const moviesRouter = require('./routes/movies');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 设置实现 CORS 
app.use((req, res, next) => {
  // 设置允许跨源访问的 URL
  const allowOrigin = [
    "http://localhost:3000",
  ];
  let { origin } = req.headers;
  if(allowOrigin.includes(origin)) {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, HEAD, DELETE, OPTIONS");
  }
  next();
});


app.use('/user', userRouter);
app.use('/sign', signRouter);
app.use('/movies', moviesRouter);


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
