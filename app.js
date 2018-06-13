var express = require('express');
var app = express();
const cors = require("cors");
const admin = require('firebase-admin');
var bodyParser = require('body-parser');


import { Oauth, Config } from './OAuthHandler';
const { google } = require('googleapis');

var serviceAccount = require('./Conerive-d52cd6e292fe.json');

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

function TripInvite_Notification(Registerationtoken, respon, SenderName, TripName) {
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
function FriendInvite_Notification(Registerationtoken, respon, SenderName, SenderImage) {
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

async function CreateFolder(mOauth) {
    const res = await drive.files.create({
        requestBody: {
            name: TripName,
            description: "Conerive Trip : " + TripName + " photos",
            mimeType: 'application/vnd.google-apps.drive-sdk'
        },
    });
    if (res.status == 400)
        return res;
    else
        console.log("Status of CreateFile : error");
}
async function SetFolder(id) {
    const res = await drive.permissions.create({
        fileId: id,
        requestBody: {
            role: "writer",
            "type": "anyone"
        },
        sendNotificationEmail:false,
        sendNotificationEmail:false,
        transferOwnership:false,
        useDomainAdminAccess:false
    });
    if(res.status==400){
        return res
    }else
     console.log("Status of permissions : error");
}
app.post('/SetUpTrip', async function (req, res) {
    let tripid = res.body.TripId;
    let tripName = res.body.TripName;
    let AuthCode = res.body.AuthCode;
    let UserId = res.body.UserId;
    let mOauth = await Config(AuthCode);
    var drive = google.drive({
        version: 'v3',
        auth: mOauth
    });
    let resCreateFolder = await CreateFolder(mOauth);
    let resPermission = await SetFolder(res.data.id);
    let resObject={};
    if(completed){
        resObject["Completed"]=1;
        resObject["Response from create"]=resCreateFolder;
        resObject["Response from Permission"]=resPermission;
    }else{
        resObject["Completed"]=0;
        resObject["Response from create"]=resCreateFolder;
        resObject["Response from Permission"]=resPermission;
    }
    /*
    * Write the web link trip in db
    */
    res.send(resObject);
});

app.get('/', function (req, res) {
    res.send("hello abhi");
});
app.post('/sendFriendRequest', function (req, res) {
    var SenderNamee = req.body.SenderName;
    var Token = req.body.Token;
    var SenderImage = req.body.SenderImage;
    FriendInvite_Notification(Token, res, SenderNamee, SenderImage);
});
app.post('/sendTripRequest', function (req, res) {
    var SenderName = req.body.SenderName;
    var Token = req.body.Token;
    var TripName = req.body.TripName;
    TripInvite_Notification(Token, res, SenderName, TripName);
});
app.listen(process.env.PORT || 3000, () => {
    console.log("Api up and running");
});



