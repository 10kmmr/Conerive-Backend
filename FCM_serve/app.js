var express = require('express');

var app = express();

//ROUTE FILES
var index = require('./routes/index');
var fcm = require('./routes/FCM');

//Routes
app.use('/', index);
app.use('/fcm', fcm);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

app.listen(7777, function () {
    console.log("conerive FCM < server is running");
});