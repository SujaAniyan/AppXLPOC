var positionSchema     = require('./position');
var candidateSchema     = require('./candidate');

var ratingSchema =  new mongoose.Schema({
    positionId      : [{ type: Schema.Types.ObjectId, ref: 'position' }],
    candidateId      : [{ type: Schema.Types.ObjectId, ref: 'candidate' }],
    interviewer                      : {
                                    empId         : String,
                                    empName        : String,
                                    empShortId     : String
                                    },
    query              : String,
    rating             : Integer
    
   })
module.exports = mongoose.model('rating', ratingSchema);