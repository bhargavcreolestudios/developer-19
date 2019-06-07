# Developer-2019
Test assignment for Remote Frontend JavaScript E-commerce Developer

## Installation

  - Run `npm install` in root directory and in api/ directory.
  - This will install all dependencies and dev dependencies in the app.

## Startup

 To start Production server.
 ```sh
 $ npm run start:server
```
 To start Development server whenever any modifications are done in the code.
 ```sh
 $ npm run watch:server
 ```
This is to start Development server and client. This will start server on port `8000` and client on port `3000`.
```sh
$ npm run both
```
## Description
#####  `Server`
1) Used graphql as query language for APIs. The modal defination and schema are defined in `api/schema/schema.js` file.
2) Used express js, which will target `/graphql` route and other calls will be handled by graphql query language with expressGraphQL.
3) Haven't used any database for backend for now, used faker library, which will generates random records based on our requirenments and used lodash to paginate and filter from those records. This logic is implemented in `api/schema/schema.js` file.
4) Used cors js to enable CORS with various options.
##### `Client`
1) Used Ant Design for layout and design.
2) Used Styled Components to style the elements and components instead of pure css.
3) Used axios to make request to our server from our client for this have made one custom file to handle this, which is located at `src/utils/requestHandler`. The functions are reusable to call any type of graphql calls, and set base url based on our app's current environment. The response of our call will be handled in `responseHandler` which will return callback if everytyhing goes good.
4) installed `npm-run-all` as devDependencies to run both client and server in single call during development time.
5) installed `nodemon` library in devDependencies to keep watching our server while development, so whenever our server side code changes while development, it will restart our server, so we don't need to restart server manually.