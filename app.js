var express = require('express');
var app = express();
const cors = require("cors");
app.use(cors({ origin: true }));
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



app.get('/', function (req, res) {
    res.send("hello world - from index");
});



app.listen(7777, function () {
    console.log("conerive FCM < server is running");
});