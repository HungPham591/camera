const Promise = require("promise");
const async = require("async");

const fs = require("fs");
const { google } = require("googleapis");

const credentials = {
    installed: {
        client_id:
            "337068524036-upc5u3b9daa701g07u9c0paslhdonm8o.apps.googleusercontent.com",
        project_id: "camera-ip-312903",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_secret: "WTefcVilu_G25rJyrce7vtHy",
        redirect_uris: ["http://localhost:4000/auth/google/callback"],
        javascript_origins: ["http://localhost:4000"],
    },
};

let initAuth = (user) => {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );
    let token = {
        access_token: user.google_token,
    };
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
};

const uploadFile = (folderId, filePath, fileName, user) => {
    const auth = initAuth(user);
    const drive = google.drive("v3");

    //create file
    var fileMetadata = {
        name: fileName,
        parents: [folderId],
    };
    var media = {
        mimeType: "video/mp4",
        body: fs.createReadStream(filePath),
    };
    var promise = new Promise(function (resolve, reject) {
        drive.files.create(
            {
                auth: auth,
                resource: fileMetadata,
                media: media,
                fields: "id",
            },
            function (err, file) {
                if (err) {
                    // Handle error
                    console.error(err);
                    reject(err);
                } else {
                    console.log("File Id: ", file.data.id);
                    resolve(file.data.id);
                }
            }
        );
    });
    return promise;
};

const createFolder = (folder_name, user) => {
    const auth = initAuth(user);

    const drive = google.drive("v3");

    //create folder
    var fileMetadata = {
        name: folder_name,
        mimeType: "application/vnd.google-apps.folder",
    };
    var promise = new Promise(function (resolve, reject) {
        drive.files.create(
            {
                auth: auth,
                resource: fileMetadata,
                fields: "id",
            },
            function (err, file) {
                if (err) {
                    // Handle error
                    console.error(err);
                    reject(err);
                } else {
                    console.log("Folder Id: ", file.data.id);
                    resolve(file.data.id);
                }
            }
        );
    });
    return promise;
};


module.exports = { uploadFile, createFolder };
