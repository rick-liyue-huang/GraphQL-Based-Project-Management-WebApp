// define the server here.


require('dotenv').config();
const colors = require('colors');
const express = require('express');
const port = process.env.PORT || 3500;

// using the graphql express
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db-config');

const app = express();

// connect with mongoDB database
connectDB();

app.use(`/graphql`, graphqlHTTP({
	schema: schema,
	graphiql: process.env.NODE_ENV === 'development',

}))

app.listen(port, () => {
	console.log(`server is running on ${port}`)
})
