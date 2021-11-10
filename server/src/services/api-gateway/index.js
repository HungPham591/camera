require('dotenv').config({ path: './.env.api-gateway' });
const app = require('./app');
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('../../apollo/schema/schema');
const resolvers = require('../../apollo/resolver/resolver');
const { createClient, sendRPCMessage } = require('../../modules/rabbitmq.modules.js');

const port = process.env.PORT || 4002;
const amqserver = 'amqp://localhost:5672/';


createClient(amqserver).then((channel) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({ req, res, channel }),
    })
    server.applyMiddleware({ app, cors: false })
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
    googleRoute(channel)
});

const googleRoute = (channel) => {
    const { google } = require('googleapis');
    const CLIENT_ID = process.env.client_id;
    const CLIENT_SECRET = process.env.client_secret;
    const REDIRECT_URI = process.env.redirect_uris;
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    app.get('/auth/google', (req, res) => {
        const scope = ['profile', 'email', 'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/drive'];
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope,
            prompt: 'consent'
        });
        return res.redirect(authUrl);
    })
    app.get('/auth/google/callback', (req, res) => {
        const code = req.query.code;
        oAuth2Client.getToken(code, async (err, token) => {
            oAuth2Client.setCredentials(token);
            const oauth2 = google.oauth2({
                auth: oAuth2Client,
                version: 'v2'
            });
            const user = await oauth2.userinfo.v2.me.get();
            const BODY = { user_name: user.data.email, google_token: token.refresh_token };
            sendRPCMessage(channel, BODY, 'UPDATE_USER')
        })
        return res.redirect('http://localhost:3000/');
    })

}



app.listen(port, () => {
    console.log('api gateway listen at port ' + port)
})