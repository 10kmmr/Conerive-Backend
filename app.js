var express = require('express');
var bodyParser = require('body-parser');
var methodOveride = require('method-override');

var mysql = require("mysql");
var connectionObject = {
    host: "localhost",
    user: 'root',
    password: 'Abhijeeth29$',
    database: 'conerivedev',
    port: 3306
  };

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

app.listen(8080, function () {
    console.log("FPP server is running")
});


