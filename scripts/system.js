var bunyan = require('bunyan');
var path   = require('path');
var constants = require('../scripts/constants');  

var bunyanConfig = require(path.join(constants.paths.config, '/bunyanConfig')); 

var streamsArray = [];

var levelwiseConfig = function()
{
	for(var i=0;i<bunyanConfig._instance.trace.length;i++)
	{
		streamsArray.push(bunyanConfig._instance.trace[i]);
	}

	for(var i=0;i<bunyanConfig._instance.debug.length;i++)
	{
		streamsArray.push(bunyanConfig._instance.debug[i]);
	}

	for(var i=0;i<bunyanConfig._instance.info.length;i++)
	{
		streamsArray.push(bunyanConfig._instance.info[i]);
	}

	for(var i=0;i<bunyanConfig._instance.warn.length;i++)
	{
		streamsArray.push(bunyanConfig._instance.warn[i]);
	}

	for(var i=0;i<bunyanConfig._instance.error.length;i++)
	{
		streamsArray.push(bunyanConfig._instance.error[i]);
	}

	for(var i=0;i<bunyanConfig._instance.fatal.length;i++)
	{
		streamsArray.push(bunyanConfig._instance.fatal[i]);
	}

	// for(var i=0;i<bunyanConfig._instance.notify.length;i++)
	// {
	// 	streamsArray.push(bunyanConfig._instance.notify[i]);
	// }
}

levelwiseConfig();

var system = bunyan.createLogger(
{	
	name:"systemlogs",
	src: true,
	streams: streamsArray
})

module.exports = system;
