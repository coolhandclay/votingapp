'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);

var Option = new Schema({
	name: String,
	votes: Number
});

var Poll = new Schema({
	name: String,
	createdBy: String,
	options: [Option]
});

Poll.plugin(autoIncrement.plugin, 'Poll');

module.exports = mongoose.model('Poll', Poll);