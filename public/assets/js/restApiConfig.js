'use strict';
//defining rest API constants in AppXL
angular.module('restApiConfig', [])

.constant('API', {
  'baseUrl': '/api/v1/secure/',
  'usersEndPoint': 'admin/users/',
  'usersEmailEndPoint': 'admin/users/email/',
  'groupsEndPoint': 'admin/groups/'
});