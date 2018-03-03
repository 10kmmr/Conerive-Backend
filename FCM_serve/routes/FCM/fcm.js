var bodyParser = require('body-parser');
var express = require('express');
var http = require('http');
var mysql = require('mysql');
var connectionObject = require('../../config/database');
var router = express.Router();
var querystring = require("querystring");

var admin = require('../../config/FirebaseAdmin');

var router = express.Router();


router.get('/', function (req, res) {
    res.send("welcome to the FCM API")
});
// router.post('/sendInvitation', function (req, res) {
//     // var parms = {
//     // }
//     // http.post("post",parms ,(err,parms) =>{
//     // });
//     var userId = req.body.userId;
//     var token = req.body.token;

// });

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function (req, res, next) {
    res.send("hello world - from index");
});

router.post('/newtoken', function (req, res) {
    var userId = req.body.userId;
    var token = req.body.token;

    var connection = mysql.createConnection(connectionObject);
    connection.connect(function (err) {
        if (err) { console.log(err) }
        else {
            var queryFields = "User_id, Token";
            var values = [[userId, token]];
            var query = "INSERT INTO USER_REGISTRATION_TOKEN(" + queryFields + ") VALUES ?"
            connection.query(query, [values], function (err2, results, fields) {
                if (err2) { console.log(err2); }
                else {
                    console.log("token inserted");
                    connection.end();
                    res.send(results);
                }
            });
        }
    });
});

router.post("/notification/GroupInvitation", function (req, res) {
    var senderId = req.body.senderId;
    var receiverPhoneNumber = req.body.receiverPhoneNumber;
    var groupId = req.body.groupId;
    var groupName = req.body.groupName;

    var connection = mysql.createConnection(connectionObject);
    connection.connect(function (err) {
        if (err) { console.log(err) }
        else {
            var queryFields = "Sender_id, Receiver_id, Group_id";
            var query = "INSERT INTO GROUP_INVITE_NOTIFICATION(" + queryFields + ") VALUES "
            query += '("' + senderId + '", (select User_id from users where phone = ' + receiverPhoneNumber +'), ' + groupId + ')'
            connection.query(query, function (err2, results, fields) {
                if (err2) { console.log(err2); }
                else {
                    console.log("notification inserted");
                    connection.end();
                    res.send(results);
                }
            });
        }
    });

    // GroupInvitation_Notification(token, res);
});

function GroupInvitation_Notification(Registerationtoken, respon) {
    var payload = {
        notification: {
            title: "This is a Notification",
            body: "This is the body of the notification message."
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

router.post("/notification/redCircle", function (req, res) {
    /*
   {
    Name:
    Phone:

   }
   return token of phone 
   then run call back send GroupInvitation_Notification
   */
    GroupInvitation_Notification(token, res);
});






module.exports = router; 