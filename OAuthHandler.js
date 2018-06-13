const { google } = require('googleapis');
const ClientJson = require("./client_secret_505944589113-il1kp84d2etp25i17nm4oa4kla7okhql.apps.googleusercontent.com.json")
var createObject = async function (AuthCode) {
    this.oauth2Client = new google.auth.OAuth2(
        ClientJson.web.client_id,
        ClientJson.web.client_secret,
        ClientJson.web.redirect_uris,
    );
    var idk = await this.oauth2Client.getToken(AuthCode);
    this.TokenInfomation = idk.tokens;
    this.getTokens = ()=>{
        return this.TokenInfomation;
    }
    this.oauth2Client.setCredentials(idk.tokens);
    return this;
}

module.exports = {
    Config: createObject
};