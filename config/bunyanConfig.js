var convict       = require('convict');
var constants     = require('../scripts/constants');
var bunyan = require('bunyan') , bformat = require('bunyan-format') , formatOut = bformat({ outputMode: 'short' });

var bunyanConfig = convict({

  "fatal" : [
    { 
      level: 'fatal',
      stream: formatOut
    }
  ],

  "error" : [
    { 
      level: 'error',
      stream: process.stdout,
    },
    { 
      level: 'error',
      path: 'logs/error.log'
    }
  ],

  "warn" : [
    { 
      level: 'warn',
      stream: formatOut
    }
  ],

  "info" : [
    {  
      level: 'info',
      stream: formatOut
    },      
    { 
      level: 'info',
      path: 'logs/info.log'
    }
  ],

  "debug" : [
    {  
      level: 'debug',
      stream: process.stdout
    }
  ],

  "trace" : [
    { 
      level: 'trace',
      stream: formatOut
    }
  ]
});

// validate
bunyanConfig.validate();

module.exports = bunyanConfig;