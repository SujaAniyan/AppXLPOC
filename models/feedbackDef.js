'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var userSchema 				= require('./user');

var feedbackDefSchema = new mongoose.Schema({
    title                           : { type: String, trim: true, required: true },
	item							: [{
		query							: { type: String, trim: true, required: true },
		mode							: { type: String, lowercase: true, trim: true, required: true},  // {freetext, singlechoice, multichoice}
		choices							: [ { type: String, trim: true } ],
        category                        : { type: String, trim: true, required: true } //Self Assessment, Interviewer 
	}],
	createdBy						: { type: Schema.Types.ObjectId, ref: 'User' },
	createdOn						: { type: Date, default: Date.now }
});

module.exports = mongoose.model('feedbackDefs', feedbackDefSchema);