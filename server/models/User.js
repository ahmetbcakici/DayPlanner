const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: String,
    color: String,
    status: {
        type: String,
        default: "uncompleted"
    },
    date: Date
});

const UserSchema = new Schema({
    username: String,
    mail: String,
    password: String,
    tasks: [TaskSchema]
});

module.exports = mongoose.model('user', UserSchema);