const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(session({ secret: `ARaC](NlFW%W{f:~@6:q$:j}Y+'c%D`,saveUninitialized: true, resave: true,cookie:{expires:new Date(Date.now() + (60000 * 60 * 24 * 7))}}));//session expires one week later
app.use(cors());
app.use(bodyParser.json());
app.use("/task", require("./routes/task"));
app.use("/user", require("./routes/user"));

mongoose.connect('mongodb://localhost:27017/DayPlanner', { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) throw err;
    console.log('Mongoose connected!');
});

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on ${PORT}`);
})