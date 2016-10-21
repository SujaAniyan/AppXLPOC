var Q = require('q');
var _ = require('underscore');
var path              = require('path');

var constants         = require('../scripts/constants');

var model             = require(constants.paths.models +  '/positions')
var config            = require(path.join(constants.paths.config, '/config'));
var system            = require(constants.paths.scripts + "/system");

// Service method definition -- Begin
var service = {};

service.getAll = getAll;
service.create = create;

service.getOneById = getOneById;
service.updateById = updateById;
service.deleteById = deleteById;
service.getAllPositions = getAllPositions;
service.getWithQuery = getWithQuery;
service.updateFeedBackId = updateFeedBackId;

service.getCandidatesById = getCandidatesById;
service.getFeedbackById = getFeedbackById;
service.updateCandidates = updateCandidates;

module.exports = service;

// Method implementations
function getAll(){
    var deferred = Q.defer();

    model.find(function(err, list){
        if(err) {
            console.log(err);
            system.error({err:err},'Error in Get All Positions Api Service');
            deferred.reject(err);
        }
        else
            deferred.resolve(list);
    });

    return deferred.promise;
} // getAll method ends

function getFeedbackById(id, candidateId){
    console.log ("id = " + id);
    console.log ("candidateId = " + candidateId);
    var feedbackList = [];
    var deferred = Q.defer();
    model
    .findOne({ positionId: id})
    .populate('feedbackTmpl')
	.exec(function (err, item) {
		if(err) {
			console.log(err);
			deferred.reject(err);
		}
		else
			//fetching candidates
            console.log("going to fetch feedback");
            console.log(item);
            if (item.feedbackTmpl != null && item.feedbackTmpl.item!= null)
            {
                for (var i=0; i<item.feedbackTmpl.item.length; i++){
                    feedbackList.push(transform(item.feedbackTmpl.item[i]));				
                }
            }
			console.log(item.feedbackTmpl);
			deferred.resolve(feedbackList);
            //deferred.resolve(transform(item.feedbackTmpl));
	 });

	function transform(feedbackItem)
	{
		if (feedbackItem == null) {
			console.log("error in adding");
		}
		else{
			var feedbackData={
                query:feedbackItem.query,
				mode:feedbackItem.mode, 
				choices:feedbackItem.choices,
                category:feedbackItem.category
			}
			console.log("******************************");
			console.log(feedbackData);
			console.log("******************************");
			return feedbackData;
		}
	}
    
    /*function transform(feedback)
	{
		if (feedback == null) {
			console.log("error in adding");
		}
		else{
            console.log ("In position.js in service feedbackDef._id = " + feedback._id)
			var feedbackData={
                id:feedback._id,
				item:feedback.item, 
				createdBy:feedback.createdBy,
                createdOn:feedback.createdOn
			}
			console.log("******************************");
			console.log(feedbackData);
			console.log("******************************");
			return feedbackData;
		}
	}*/

	function sortOn(property){
		return function(a, b){
			if(a[property] < b[property]){
				return -1;
			}else if(a[property] > b[property]){
				return 1;
			}else{
				return 0;
			}
		}
	}
	return deferred.promise;
}

function getOneById(id){
    var deferred = Q.defer();
    model
    .findOne({ positionId: id })
    .exec(function (err, item) {
        if(err) {
            console.log(err);
            system.error({err:err},'Error in Position By Id Service');
            deferred.reject(err);
        }
        else{
          deferred.resolve(item);
      }
  });

    return deferred.promise;
} // gentOneById method ends

function create(data) {
    var deferred = Q.defer();
    console.log(data);
    model.create(data, function (err, doc) {
        if (err) {
            console.log("err- " + err);
            deferred.reject(err);
        }
        else
        {
            console.log("here you are")
            console.log(doc);
            deferred.resolve(doc);
        }
    });

    return deferred.promise;
} 

/*function create(positionParam) {
    var deferred = Q.defer();

    // validation
    model.findOne(
        { positionId: positionParam.positionId },

        function (err, user) {
            if (err) deferred.reject(err);

            if (user) {
                // handle already exists
                deferred.reject('position id {"' + positionParam.handle + '"} is already taken');
            } else {
                createPosition();
            }
        });

    function createPosition() {
      if(typeof positionParam.local == "undefined")
        positionParam.local = {};

      if(positionParam.local.positionId == null)
        positionParam.local.positionId = positionParam.positionId;

       model.create(
            user,
            function (err, doc) {
                if (err) {
                    console.log(err);
                    deferred.reject(err);
                }

                deferred.resolve();
            });
    }

    return deferred.promise;
}*/

function updateById(id, data) {
    var deferred = Q.defer();
    console.log("updateById in services ");
    console.log("id = " + id);
    console.log("data test 11= " + data);
    model.findByIdAndUpdate(id, data, function (err, doc) {
        if (err) {
            deferred.reject(err);
            system.error({err:err},'Error in Position Update By Id Api Service');            
        }
        else
            deferred.resolve(doc);
            //system.info({positionId:doc._id},'Position Data Updated');
    });

    return deferred.promise;
}

function updateFeedBackId(id, data) {
    var deferred = Q.defer();
    console.log("updateFeedBackId in services ");
    console.log("id = " + id);
    
    console.log("data = " + data);

    model.findByIdAndUpdate(id, {feedbackTmpl : data}, function (err, doc) {
        if (err) {
            deferred.reject(err);
            system.error({err:err},'Error in Position Update By Id Api Service');            
        }
        else
            deferred.resolve(doc);
            //system.info({positionId:doc._id},'Position Data Updated');
    });

    return deferred.promise;
}

function deleteById(id) {
    var deferred = Q.defer();

    model.findByIdAndRemove(id, function (err, doc) {
        if (err) {
            deferred.reject(err);
            system.error({err:err},'Error in Position Delete By Id Api Service');
        }
        else{
            deferred.resolve(doc);
            system.info({positionId:doc._id},'Position Data Deleted');
        }
    });

    return deferred.promise;
}


function getAllPositions(query, fields, maxRecs, sortEx){

    var deferred = Q.defer();
    var positionsArray = [];
 
    model
    .find(query)
    .limit(maxRecs)
    .select(fields)
    .sort(sortEx)
    .exec(function(err, list){
        if(err) {
            console.log(err);
            deferred.reject(err);
        }
        else
            for(var i=0;i<list.length;i++)
            {        
                if(positionsArray.indexOf(list[i].jobTitle) === -1){
                    positionsArray.push(list[i].jobTitle);
                }    
            }   

            var data = positionsArray;

            /*for (var i = 0; i < data.length; i++) {
                userDesig.push({'designation':data[i]});
            }

            console.log(userDesig.length);
            deferred.resolve
            ({
                "items": userDesig
            });*/
        });

    return deferred.promise;
} // getAll method ends


function getWithQuery(query, fields, maxRecs, sortEx){
    var deferred = Q.defer();
    var positionsArray = [];
    
    model
    .find(query)
    .limit(maxRecs)
    .select(fields)
    .sort(sortEx)
    .exec(function (err, item) {
        if(err) {
            console.log(err);
            deferred.reject(err);
        }
        else
            for(var i=0;i<item.length;i++)
            {        
                positionsArray.push(transform(item[i]));
            }   

            deferred.resolve
            ({
                "items": positionsArray
            });
        });

    function transform(position)
    {
        if (position==null) {
            console.log("error in adding");
        }
        else{
            var positionData={
		jobTitle  : position.jobTitle,
		requestor  :  position.requestor,           
    		status : position.status,                   		
		jobDescription : position.jobDescription
            }
            return positionData;
        }
    }
    return deferred.promise;
} // getWithQuery method ends


function getCandidatesById(id){
   	var candidates= [];
	var deferred = Q.defer();
	
    console.log("id = " + id);
	model
    .findOne({ positionId:id})
	.populate('candidate.candid')
	.exec(function (err, item) {
		if(err) {
			console.log(err);
			deferred.reject(err);
		}
		else
			//fetching candidates
            console.log("going to fetch candidates");
            console.log("item.candidate.length = " + item.candidate.length);
        
			for (var i=0; i<item.candidate.length; i++){
				candidates.push(transform(item.candidate[i]));				
			}
			console.log(item);
			deferred.resolve(candidates);
	 });

	function transform(candidate)
	{
		if (candidate==null) {
			console.log("error in adding");
		}
		else{
			var candidateData={
                id:candidate.candid._id,
                empId: candidate.candid.empId, 
                empName: candidate.candid.empName, 
                empShortId: candidate.candid.empShortId,
                cv: candidate.candid.cv,
                jobTitle : candidate.candid.jobTitle,
                overallRating: candidate.candid.overallRating,
                summary: candidate.candid.summary,
                email: candidate.candid.email,
                avatar: candidate.candid.avatar
			}
			console.log("******************************");
			console.log(candidateData);
			console.log("******************************");
			return candidateData;
		}
	}

	function sortOn(property){
		return function(a, b){
			if(a[property] < b[property]){
				return -1;
			}else if(a[property] > b[property]){
				return 1;
			}else{
				return 0;
			}
		}
	}
	return deferred.promise;
}

function updateCandidates(id, data) {
    var deferred = Q.defer();
    console.log("update candidates in services ");
    console.log("id = " + id);
    
    console.log("data = " + data);
    //var json = JSON.parse(data);
    model.findByIdAndUpdate(id, {candidate : data}, function (err, doc) {
        if (err) {
            deferred.reject(err);
            system.error({err:err},'Error in candidate Update By Id Api Service');            
        }
        else
            deferred.resolve(doc);
    });

    return deferred.promise;
}