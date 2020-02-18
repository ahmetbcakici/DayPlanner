const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/task', require('./routes/task'));
app.use('/user', require('./routes/user'));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
	if (err) throw err;
	console.log('Mongoose connected!');
});

app.listen(PORT, err => {
	if (err) throw err;
	console.log(`Server is running on ${PORT}`);
}); 
