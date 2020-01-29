const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
	title: String,
	color: String,
	status: {
		type: String,
		default: 'incompleted',
	},
	note: String,
	date: Date,
	workTime: {
		type: Number,
		default: 25,
	},
	breakTime: {
		type: Number,
		default: 5,
	},
});

const UserSchema = new Schema({
	username: String,
	mail: String,
	password: {
		type: String,
	},
	registeredDate: {
		type: Date,
		default: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(
			new Date().getDate()
		).padStart(2, '0')}`,
	},
	tasks: [TaskSchema],
});

module.exports = mongoose.model('user', UserSchema);
