const app = require('./app');
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./apollo/schema/schema');
const resolvers = require('./apollo/resolver/resolver');
const { createClient } = require('./module/rabbitmq.modules')

require('dotenv').config();

const port = process.env.PORT || 4002;
const amqserver = 'amqp://localhost:5672/'


createClient(amqserver).then((channel) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({ req, res, channel }),
    })
    server.applyMiddleware({ app, cors: false })
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
})

app.listen(port, () => {
    console.log('api gateway listen at port ' + port)
})