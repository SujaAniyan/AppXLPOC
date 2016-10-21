'use strict';

// defining error management configuration in AppXL
var errorManagement = angular.module('errorManagement', ['angular-growl'])

// uiLogger level wise methods
errorManagement.factory('uiLogger', function (growl) {
	var uiLogger= {};
	uiLogger.info = function (statusText,msg) {
		growl.info(parse("Status [%s]<br/> Message [%s]", statusText,msg));
	}
	uiLogger.warn = function (statusText,msg) {
		growl.warning(parse("Status [%s]<br/> Message [%s]", statusText,msg));
	}
	uiLogger.error = function (statusText,msg) {
		growl.error(parse("Status [%s]<br/> Message [%s]", statusText,msg));
	}
	uiLogger.success = function (statusText,msg) {
		growl.success(parse("Status [%s]<br/> Message [%s]", statusText,msg));
	}
	return uiLogger;
});

// uiLogger error status codes configuration
errorManagement.config(function($httpProvider) {
	$httpProvider.interceptors.push(function(growl,uiLogger) {
		return {
			response: function(response) {
				return response;
			},
			responseError: function (rejection) {
				console.log(rejection);
				switch(rejection.status)
				{	
					//400 Bad Request
					case 400:
					uiLogger.warn(rejection.statusText,rejection.data);
					break;

					//401 Unauthorized
					case 401:
					uiLogger.warn(rejection.statusText,rejection.data);
					break;

					//403 Forbidden
					case 403:
					uiLogger.warn(rejection.statusText,rejection.data);
					break;

					//404 Not Found
					case 404:					
					uiLogger.warn(rejection.statusText,rejection.data);
					break;

					//405 Method Not Allowed
					case 405:					
					uiLogger.warn(rejection.statusText,rejection.data);
					break;

					//408 Request Timeout
					case 408:
					uiLogger.warn(rejection.statusText,rejection.data);
					break;

					//500 Internal Server Error					
					case 500:
					uiLogger.warn(rejection.statusText,rejection.data);
					break;

					//501 Not Implemented
					case 501:
					uiLogger.warn(rejection.statusText,rejection.data);
					break;

					//502 Bad Gateway
					case 502:
					uiLogger.warn(rejection.statusText,rejection.data);
					break;

					//503 Service Unavailable
					case 503:
					uiLogger.warn(rejection.statusText,rejection.data);
					break;

					//504 Gateway Timeout
					case 504:
					uiLogger.warn(rejection.statusText,rejection.data);
					break;

					//505 HTTP Version Not Supported
					case 505:
					uiLogger.warn(rejection.statusText,rejection.data);
					break;					

					default:
					growl.info("Invalid action");
				}
			}
		};
	});
});
