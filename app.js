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

function FriendInvite_Notification(Registerationtoken, respon, SenderName) {
    var payload = {
        notification: {
            title: "Friend Invitation",
            body: "Friend Requestion" + SenderName
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

app.post('/sendrequest', function (req, res) {
    var userId = req.body.senderId;
    var tosendphonenumber = req.body.phone;
    console.log(userId,tosendphonenumber)
    db.collection('USERS').doc(userId).get().then(userdetails=>{
        db.collection("USERS").where("Phone","==", tosendphonenumber).get().then(reciverdetails=>{
            FriendInvite_Notification(reciverdetails.docs[0].data().Token,res,userdetails.Name);
            let temp={};
            temp["Sender_id"]=userId;
            temp["Type"]="FRIEND_REQUEST";
            db.collection("USERS").doc(reciverdetails.docs[0].id).collection("NOTIFICATIONS").add(temp);
        }); 
    });
});
app.listen(process.env.PORT || 3000, () => {
    console.log("Api up and running");
});



