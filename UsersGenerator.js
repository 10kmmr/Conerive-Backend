const admin = require('firebase-admin');

var serviceAccount = require('./Conerive-d52cd6e292fe.json');
var randomstring = require("randomstring");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

function addusers(a) {
    for (var i = 0; i < a; i++) {
        var name = randomstring.generate(5);
        var docRef = db.collection('USERS').doc(randomstring.generate(12));
        var setAda = docRef.set({
            Email: name + "@gmail.com",
            ImageURL: 'https://firebasestorage.googleapis.com/v0/b/roadtrip-app-efa3a.appspot.com/o/user_display_picture%2Fvz0Mh7ql8XUxSg0FG43XIFEM5rn1.jpg?alt=media&token=824c072d-d52f-4648-900b-51cc62163fd1',
            Name: name,
            Phone: randomstring.generate({
                length: 13,
                charset: 'numeric '
            }),
            Groups:['bT6JTQO0HAxk9wJwd049']
        });
    }
}



addusers(5)
