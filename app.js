var express = require('express');
var app = express();
const cors = require("cors");
const admin = require('firebase-admin');
var bodyParser = require('body-parser');

var serviceAccount = require('./Conerive-d52cd6e292fe.json');

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore(); 

function TripInvite_Notification(Registerationtoken, respon, SenderName ,TripName) {
    var payload = {
        notification: {
            title: "Trip Invitation",
            body: "Trip Request " + SenderName
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
function FriendInvite_Notification(Registerationtoken, respon, SenderName ,SenderImage) {
    var payload = {
        notification: {
            title: "Friend Invitation",
            body: "Friend Request " + SenderName
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
    res.send("hello abhi");
});

app.post('/sendFriendRequest', function (req, res) {
    var SenderName = req.body.SenderName;
    var Token = req.body.Token;
    var SenderImage = req.body.SenderImage; 
    FriendInvite_Notification(Token,res,SenderName,SenderImage);
   
});
app.post('/sendTripRequest', function (req, res) {
    var SenderName = req.body.SenderName;
    var Token = req.body.Token;
    var TripName = req.body.TripName;
    TripInvite_Notification(Token,res,SenderName,TripName);
   
});
app.listen(process.env.PORT || 3000, () => {
    console.log("Api up and running");
});



