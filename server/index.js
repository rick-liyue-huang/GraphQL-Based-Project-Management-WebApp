// define the server here.

require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3500;

const app = express();

app.listen(port, () => {
	console.log(`server is running on ${port}`)
} )
