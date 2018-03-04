var express = require('express');
var bodyParser = require('body-parser');
var methodOveride = require('method-override');

//ROUTE FILES
var index = require('./routes/index');
var users = require('./routes/users/users');
var userDisplayPictures = require('./routes/users/display_pictures');
var emails = require('./routes/users/emails');
var groups = require('./routes/groups/groups');
var groupDisplayPictures = require('./routes/groups/display_pictures');
var groupMembers = require('./routes/group_members');
var trips = require('./routes/trips/trips');
var notificationRadius = require('./routes/trips/notification_radius');
var tripMembers = require('./routes/trip_members');
var images = require('./routes/images');
var vehicles = require('./routes/vehicles/vehicles');
var vehicleMembers = require('./routes/vehicle_members');
var FCM = require('./routes/FCM');

var app = express();

//ROUTES
app.use('/', index);
app.use('/users', users);
app.use('/users/display-pictures', userDisplayPictures);
app.use('/users/emails', emails);
app.use('/groups', groups);
app.use('/groups/display-pictures', groupDisplayPictures);
app.use('/group-members', groupMembers);
app.use('/trips', trips);
app.use('/trips/notification-radius', notificationRadius);
app.use('/trip-members', tripMembers);
app.use('/images', images);
app.use('/vehicles', vehicles);
app.use('/vehicle-members', vehicleMembers);
app.use('/FCM',FCM);

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
    console.log("conerive server is running");
});


