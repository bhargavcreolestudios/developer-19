const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors')
const app = express();
// allow cors from local
app.use(cors())
app.use(
    '/graphql',
    expressGraphQL({
        schema,
        graphiql: true,
    })
);
// run the app on port 8000
app.listen(8000, () => {
    console.log('Listening on port: 8000');
});
