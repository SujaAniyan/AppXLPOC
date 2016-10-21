var path    = require('path');
var constants  = require('../scripts/constants');
var system  = require(constants.paths.scripts + "/system");

//Uncaught Exception Logging
/*process.on('uncaughtException', function (err) {
  system.fatal({err:err.message},'Uncaught Exception');
});*/