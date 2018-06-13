var express = require('express');
var app = express();
const cors = require("cors");
const admin = require('firebase-admin');
var bodyParser = require('body-parser');


const OAuthHandler = require('./OAuthHandler');
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

async function CreateFolder(drive, TripName) {
    const res = await drive.files.create({
        fields:"capabilities(canAddChildren,canDelete,canEdit,canListChildren,canReadTeamDrive,canRemoveChildren,canShare),contentHints/thumbnail/mimeType,createdTime,id,mimeType,permissionIds,size,webContentLink,webViewLink",
        requestBody: {
            name: TripName,
            description: "Conerive Trip : " + TripName + " photos",
            mimeType: 'application/vnd.google-apps.folder'
        },
    });
    return res;
    /*
    * do error handing before returning 
    **/
}
async function SetFolder(id, drive) {
    const res = await drive.permissions.create({
        fileId: id,
        requestBody: {
            role: "writer",
            "type": "anyone"
        },
        sendNotificationEmail: false,
        sendNotificationEmail: false,
        transferOwnership: false,
        useDomainAdminAccess: false
    });
    return res
    /*
    * do error handing before returning 
    **/
}
app.post('/SetUpTrip', async function (req, res) {
    console.log("SetupTrip : AuthCode " + AuthCode);
    let tripName = req.body.TripName;
    let AuthCode = req.body.AuthCode;
    let mOject = await OAuthHandler.Config(AuthCode);
    var drive = google.drive({
        version: 'v3',
        auth: mOject.oauth2Client
    });
    let resCreateFolder = await CreateFolder( drive, tripName);
    let resPermission = await SetFolder(resCreateFolder.data.id, drive);
    /*
    * Write the web link trip in db
    * Handle errors andmake error messages
    */
   let responseObject =Object.assign(resCreateFolder.data,mOject.getTokens());
    res.send(responseObject);
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



