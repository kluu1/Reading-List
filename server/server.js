require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(console.log('Connected to database'));

// setup graphQL middleware
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// start the server
app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
