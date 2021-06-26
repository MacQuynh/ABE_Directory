// index.js
const express = require('express');
const app = express();
const port = 5555;

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define the schema
let schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Implement resolver functions
let root = {
    hello: function () {
        return 'Hello world!';
    },
}

// Set up an endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.get('/', function (req, res) {
    res.send('Express is working!')
});

app.listen(port, function () {
    console.log('Listening on port:' + port)
});