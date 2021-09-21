const express = require("express");//la framework cua nodejs
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const route = require("./routes");
const db = require("./config/db");
const fileUpload = require("express-fileupload");
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express')
const ControlCamera = require("./modules/control_camera.modules");
const ControlNotification = require('./modules/control_notification.modules');
const typeDefs = require('./apollo/schema/schema');
const resolvers = require('./apollo/resolver/resolver');
const controller = require('./controllers');
const Authentication = require('./middleware/authentication.middleware');

require('dotenv').config();

db.connect();

const app = express();

app.use(bodyParser.json());//nhan data tu stream khoi tao req.body
app.use(logger("dev"));//log ra request
app.use(express.json());//nhan data tu stream khoi tao req.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());//xu ly cookie gui tu client
app.use(express.static(path.join(__dirname, "public")));//
app.use(fileUpload());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));// enable cors
app.use('/graphql', Authentication)


ControlCamera.start();
app.use(route);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ controller, req, res }),
})
server.applyMiddleware({ app, cors: false })
console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)


// const workerFarm = require('worker-farm')
// const service = workerFarm(require.resolve(__dirname + '\\modules\\test.js'))
// service(null, function (err, output) {
// })


module.exports = app;
