const fs = require("fs");
const { google } = require("googleapis");

const CLIENT_ID = process.env.client_id;
const CLIENT_SECRET = process.env.client_secret;
const REDIRECT_URI = process.env.redirect_uris;

const initAuth = (google_token) => {
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    //refresh token auto get access token
    const token = { refresh_token: google_token };
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
};

const uploadFile = (filePath, fileName, token) => {
    const auth = initAuth(token);
    const drive = google.drive("v3");

    const fileMetadata = { name: fileName };
    const media = {
        mimeType: "video/mp4",
        body: fs.createReadStream(filePath),
    };
    try {
        drive.files.create({
            auth: auth,
            resource: fileMetadata,
            media: media,
            fields: "id",
        })
        console.log('google drive')
    } catch (err) {
        console.log('google drive error: ' + err)
    }
};
const generateRefreshToken = async (code) => {
    try {
        const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
        return await oAuth2Client.getToken(code);
    } catch (err) {
        console.log(err);
        return null;
    }
}


module.exports = { uploadFile, generateRefreshToken };
