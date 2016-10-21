var Q = require('q');
var _ = require('underscore');
var bcrypt = require('bcryptjs');
var path              = require('path');

var constants               = require('../scripts/constants');

var model                   = require(constants.paths.models +  '/user')
var config            = require(path.join(constants.paths.config, '/config'));
var system            = require(constants.paths.scripts + "/system");

// Service method definition -- Begin
var service = {};

service.getAll = getAll;
service.create = create;

service.getOneById = getOneById;
service.updateById = updateById;
service.deleteById = deleteById;
service.getAllUsers = getAllUsers;
service.getByEmail = getByEmail;
service.getWithQuery = getWithQuery;

module.exports = service;

// Method implementations
function getAll(){
    var deferred = Q.defer();

    model.find(function(err, list){
        if(err) {
            console.log(err);
            system.error({err:err},'Error in Get All Users Api Service');
            deferred.reject(err);
        }
        else
            deferred.resolve(list);
    });

    return deferred.promise;
} // getAll method ends

function getOneById(id){
    var deferred = Q.defer();
    model
    .findOne({ _id: id })
    .exec(function (err, item) {
        if(err) {
            console.log(err);
            system.error({err:err},'Error in Get User By Id Service');
            deferred.reject(err);
        }
        else{
          deferred.resolve(item);
      }
  });

    return deferred.promise;
} // gentOneById method ends

function create(userParam) {
    var deferred = Q.defer();

    // validation
    model.findOne(
        { email: userParam.email },

        function (err, user) {
            if (err) deferred.reject(err);

            if (user) {
                // handle already exists
                deferred.reject('Email id {"' + userParam.handle + '"} is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
      if(typeof userParam.local == "undefined")
        userParam.local = {};

      // set user object to userParam without the cleartext password
      var user = _.omit(userParam, 'password');

      if(userParam.local.email == null)
        userParam.local.email = userParam.email;

    if(userParam.local.password == null)
      userParam.local.password = config.get('profile.default-pwd');

        // add hashed password to user object
        user.local.password = bcrypt.hashSync(userParam.local.password, bcrypt.genSaltSync(8), null);

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
}

function updateById(id, data) {
    var deferred = Q.defer();

    model.findByIdAndUpdate(id, data, function (err, doc) {
        if (err) {
            deferred.reject(err);
            system.error({err:err},'Error in User Update By Id Api Service');            
        }
        else
            deferred.resolve(doc);
            system.info({userId:doc._id,userEmail:doc.email},'User Data Updated');
    });

    return deferred.promise;
}

function deleteById(id) {
    var deferred = Q.defer();

    model.findByIdAndRemove(id, function (err, doc) {
        if (err) {
            deferred.reject(err);
            system.error({err:err},'Error in User Delete By Id Api Service');
        }
        else{
            deferred.resolve(doc);
            system.info({userId:doc._id,userEmail:doc.email},'User Data Deleted');
        }
    });

    return deferred.promise;
}

function getByEmail(email){
    var deferred = Q.defer();

    model
    .findOne({ email: email })
    .exec(function (err, item) {
        if(err) {
            console.log(err);
            deferred.reject(err);
        }
        else
            deferred.resolve(item);
    });

    return deferred.promise;
} // gentOneById method ends

function getAllUsers(query, fields, maxRecs, sortEx){

    var deferred = Q.defer();
    var usersArray = [];
    var userDesig = []
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
                if(usersArray.indexOf(list[i].jobTitle) === -1){
                    usersArray.push(list[i].jobTitle);
                }    
            }   

            var data = usersArray;

            for (var i = 0; i < data.length; i++) {
                userDesig.push({'designation':data[i]});
            }

            console.log(userDesig.length);
            deferred.resolve
            ({
                "items": userDesig
            });
        });

    return deferred.promise;
} // getAll method ends


function getWithQuery(query, fields, maxRecs, sortEx){
    var deferred = Q.defer();
    var usersArray = [];
    
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

                usersArray.push(transform(item[i]));
            }   

            deferred.resolve
            ({
                "items": usersArray
            });
        });

    function transform(user)
    {
        if (user==null) {
            console.log("error in adding");
        }
        else{
            var userData={
                userid : user._id,
                firstName :user.name.first,
                lastName :user.name.last,
                email : user.email,
                avatar :user.avatar,
                association :user.association,
                jobTitle : user.jobTitle
            }
            return userData;
        }
    }
    return deferred.promise;
} // getWithQuery method ends