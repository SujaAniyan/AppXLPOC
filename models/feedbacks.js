
'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var userSchema 	     = require('./user');
var feedbackDefSchema = require('./feedbackDef');

var feedbackSchema = new mongoose.Schema({

	positionid					: { type: String, ref: 'positions', required:true },
	candidateid					: { type: Schema.Types.ObjectId, ref: 'Candidates',},
	template					: { type: Schema.Types.ObjectId, ref: 'feedbackDefs', required:true },
	interviewerid				: { type: Schema.Types.ObjectId, ref: 'User', required:true },
	providedOn					: { type: Date, default: Date.now },
	item						: [{
		query						: { type: String, trim: true, required: true },
		mode						: { type: String, lowercase: true, trim: true, required:true,
		 									enum: ['freetext', 'single-choice', 'multi-choice', 'star-rating']},
		choices						: [ { type: String, trim: true, required:true } ],
		answer						: { type: String, trim: true },
		providedBy					: { type: Schema.Types.ObjectId, ref: 'User', required:true }
	}]
});

module.exports = mongoose.model('feedbacks', feedbackSchema);