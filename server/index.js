// define the server here.

const path = require('path');
require('dotenv').config();
const cors = require('cors');
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
// solve the problems of being blocked by CORS policy
app.use(cors());

__dirname = path.resolve();
if (process.env.NODE_ENV === 'prod') {
	app.use(express.static(path.join(__dirname, '/client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
} else {
	app.get('/', (req, res) => {
		res.send('api is running...')
	})
}

app.use(`/graphql`, graphqlHTTP({
	schema: schema,
	graphiql: process.env.NODE_ENV === 'development',

}))

app.listen(port, () => {
	console.log(`server is running on ${port}`)
})
