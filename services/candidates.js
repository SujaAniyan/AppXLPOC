'use strict';

var Q               = require('q');
var _ = require('underscore');
var path              = require('path');

var constants       = require('../scripts/constants');
var model           = require(constants.paths.models +  '/candidates');
var config            = require(path.join(constants.paths.config, '/config'));
var system            = require(constants.paths.scripts + "/system");

// Service method definition -- Begin
var service = {};

service.getAll = getAll;
service.getAllByPositionId       = getAllByPositionId;

module.exports = service;


// Method implementations
function getAll(){
    var deferred = Q.defer();

    model.find(function(err, list){
        if(err) {
            console.log(err);
            system.error({err:err},'Error in Get All candidates Api Service');
            deferred.reject(err);
        }
        else
            deferred.resolve(list);
    });

    return deferred.promise;
} // getAll method ends

function getAllByPositionId(id){
    var deferred = Q.defer();

    model
        .find({ positionId: id })
        .exec(function (err, item) {
            if(err) {
                console.log(err);
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(item);
            }
        }); // end of model

    return deferred.promise;
} // getAllByPositionId method ends

