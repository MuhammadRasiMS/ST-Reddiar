var createError = require('http-errors');
var express = require('express');
const cors =  require('cors');
require("dotenv").config({ path: ".env" });
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var exbs = require('express-handlebars');

var db = require('./config/db')

var session = require('express-session');

var app = express();

const hbs = exbs.create({
  extname: 'hbs', defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layout/',
  partialsDir: __dirname + '/views/partials/',
})

// const start = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log('Database connection established')
//   } catch (e) {
//     console.log(e.message);
//   }
// }

// start();

db.connect((err) => {
  if (err) {
    console.log("connection error" + err);
  } else {
    console.log("database connected");
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: "key", resave: false, saveUninitialized: false }));
app.use(session({secret: "key", cookie: {maxAge:6000000}}))

app.use((req,res,next) => {
  res.set('cache-control', 'no-store')
  next();
})

app.use('/admin', adminRouter);
app.use('/', usersRouter);

app.get("/*", (req, res) => {
  res.render("notfound");
});

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
