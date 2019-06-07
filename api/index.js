const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors')
const app = express();
app.use(cors())
app.use(
    '/graphql',
    expressGraphQL({
        schema,
        graphiql: true,
    })
);

app.listen(8080, () => {
    console.log('Listening on port: 8080');
});
