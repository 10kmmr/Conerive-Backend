var express = require('express');

var app = express();



// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});


function GroupInvitation_Notification(Registerationtoken, respon, GroupName, SenderName) {
    var payload = {
        notification: {
            title: "Group Invitation",
            body: "Invited to Group " + GroupName + "  by " + SenderName
        }
    };
    var options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };
    admin.messaging().sendToDevice(Registerationtoken, payload, options)
        .then(function (response) {
            console.log("Successfully sent message:", response);
            respon.send(response);
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
            respon.send(error);
        });
}


//Routes
router.get('/', function (req, res) {
    res.send("hello world - from index");
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(7777, function () {
    console.log("conerive FCM < server is running");
});