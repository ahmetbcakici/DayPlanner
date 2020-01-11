const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Models
const User = require("./models/User");

// Middleware
app.use(cors());

mongoose.connect("mongodb://localhost:27017/DayPlanner", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log("Mongoose connected!");
})

app.get('/task/get', (req, res) => {
    if (req.query.date) {
        // User.findOne({ username: "ahmet" }).then((docs) => {
        //     res.send(docs);
        // });
    } else {
        User.findOne({ username: "ahmet" }).then((docs) => {
            res.send(docs);
        });
    }
});

app.post('/task/post', (req, res) => {
    User.findOne({ username: "ahmet" }).then((doc) => {
        doc.tasks.push({
            title: req.query.title,
            date: req.query.date
        });
        doc.save().then(() => res.end());
    });
});

app.delete('/task/delete/:id', (req, res) => {
    User.findOne({ username: "ahmet" }).then((doc) => {
        doc.tasks.map(task => {
            if (task.id === req.params.id) task.remove();
        })
        doc.save().then(() => res.end());
    })
});

app.put('/task/put', (req, res) => {
    console.log(req.query)
})


// Test request for add new user
app.get('/test', (req, res) => {
    const newrecord = new User({
        username: "mehmet",
        password: "123",
    })
    newrecord.save((err) => {
        if (err) throw err;
        console.log("SAVED!")
    })
})


// Test request for add new task to an user
app.get('/test/addtask', (req, res) => {
    User.findOne({ username: "ahmet" }).then((doc) => {
        doc.tasks.push({
            title: "you should make perfect your linkedin profile",
            color: "red",
            status: "active"
        });
        doc.save().then(() => {
            console.log("oktur");
        });
    });
})

app.listen(3001 || process.env.PORT, (err) => {
    if (err) throw err;
    console.log("Server is running now!");
});