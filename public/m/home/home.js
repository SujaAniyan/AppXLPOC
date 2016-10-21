angular.module('home', ['ngRoute'])

.run(function ($rootScope, $location, $http) {
	$http.get('/token')
		.success(function (user, status) {
		if (user) {
			$rootScope.user = user;
		}
    else {
			// user not found, ask to login
    }
	});
})

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

  .when('/home', {
    templateUrl: '/public/m/home/home.html',
    controller: 'homeCtrl'
  })
  
.when('/positions', {
    templateUrl: '/public/m/positions/openPositions.html',
    controller: 'positionsCtrl'
  })

.when('/positions/:id', {
    templateUrl: '/public/m/positions/canditates.html',
    controller: 'positionsCtrl'
  })

	// if none of the above states are matched, use this as the fallback
  $routeProvider.otherwise('/home');

}]);
