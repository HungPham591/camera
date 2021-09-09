const fs = require("fs");
const { google } = require("googleapis");
const { auth } = require("googleapis/build/src/apis/abusiveexperiencereport");


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

const uploadVideo = (filePath, fileName, user) => {
    const service = google.youtube("v3");
    const auth = initAuth(user);
    service.videos.insert(
        {
            auth: auth,
            part: "snippet,contentDetails,status",
            resource: {
                // Video title and description
                snippet: {
                    title: fileName,
                    description: "My description",
                },
                // I set to private for tests
                status: {
                    privacyStatus: "public",
                },
            },

            // Create the readable stream to upload the video
            media: {
                body: fs.createReadStream(filePath), // Change here to your real video
            },
        },
        (error, data) => {
            if (error) {
                console.log(error);
            }
            console.log("https://www.youtube.com/watch?v=" + data.data.id);
        }
    );
};

const streamVideo = () => {
    const url_stream = "rtmp://a.rtmp.youtube.com/live2";
    const url_server = "rtmp://b.rtmp.youtube.com/live2?backup=1";
    const stream_key = "tm50-mb04-h74t-9g3h-0gdt";
    //const link_stream = url_server + "/" + stream_key;
    const link_stream = url_stream + "/" + stream_key;

    const service = google.youtube("v3");
    const auth = initAuth();

    service.liveStreams.insert(
        {
            auth: auth,
            part: "snippet,contentDetails,status",
            resource: {
                // Video title and description
                snippet: {
                    title: "My title",
                    description: "My description",
                },
                // I set to private for tests
                status: {
                    privacyStatus: "private",
                },
                cdn: {
                    ingestionType: "rtmp",
                    ingestionInfo: {
                        streamName: stream_key,
                        ingestionAddress: url_stream,
                        backupIngestionAddress: url_server,
                    },
                    resolution: "360p",
                    frameRate: "30fps",
                },
            },

            // Create the readable stream to upload the video
            media: {
                body: fs.createReadStream("video.mp4"), // Change here to your real video
            },
        },
        (error) => {
            if (error) {
                console.log(error);
            }
            console.log("dang stream");
        }
    );
};

module.exports = { uploadVideo, streamVideo };
