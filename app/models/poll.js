'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var poll = new Schema({
    _id:String,
	info:{
	    Name:String,
	    options:[{option:Number,name:String,color:Number,nbrVote:Number},
	    		{option:Number,name:String,color:Number,nbrVote:Number},
	    		{option:Number,name:String,color:Number,nbrVote:Number},
	    		{option:Number,name:String,color:Number,nbrVote:Number}],
	    optionNbr:Number,		
	    totalVote:Number,
	    when:Number
	},
	who:{
	    made:{userName:String},
	    vote:Array
	},
	voted:Boolean
},{ versionKey: false });

module.exports = mongoose.model('poll', poll);
