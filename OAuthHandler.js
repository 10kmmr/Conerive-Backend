const { google } = require('googleapis');
const ClientJson = require("./client_secret_505944589113-il1kp84d2etp25i17nm4oa4kla7okhql.apps.googleusercontent.com.json")
const oauth2Client = new google.auth.OAuth2(
    ClientJson.web.client_id,
    ClientJson.web.client_secret,
    ClientJson.web.redirect_uris[0],
  );
var setAuth = async function (AuthCode) {
    const {tokens} = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens);
    return oauth2Client;
}

module.exports = {
    Config: setAuth,
    Oauth : oauth2Client
};