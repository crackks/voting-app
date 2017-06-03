'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    _id:String,
	info:{
	    userName:String,
	    Email:String,
	    Password:String
	},
	poll:{
	    pollCreated:Array,
	    pollVoted:Array,
	    waitForValidation:String
	}
},{ versionKey: false });

module.exports = mongoose.model('User', User);
