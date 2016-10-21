var app = angular.module('home');

app.controller('homeCtrl', ['$scope', 'location', function ($scope, location) {
   location.get(angular.noop, angular.noop);
}]);

app.controller('welcomeCtrl', ['$scope', 'location', function ($scope, location) {

}]);
