const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: String,
    color: String,
    status: String,
});

const UserSchema = new Schema({
    username: String,
    password: String,
    tasks: [TaskSchema]
});

module.exports = mongoose.model('user', UserSchema);