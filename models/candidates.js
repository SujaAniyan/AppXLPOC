'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

//var positionSchema     = require('./positions');

var candidateSchema       = new mongoose.Schema({
    
    empId                  : String, 
    empName                : String, 
    jobTitle               : String, 
    empShortId             : String,
    cv                     : String,
    overallRating          : Number,
    summary                : String,
    email                  : String,
    avatar                 : String
})

module.exports = mongoose.model('candidates', candidateSchema);