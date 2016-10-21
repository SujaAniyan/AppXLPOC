angular.module('userDirective', [])
.controller('userDirectiveControllerMain', ['$scope', '$http','API', function($scope, $http, API) {

  // users and usersEmail rest api constants
  var userApiEndPoint = API.baseUrl + API.usersEndPoint;
  var userEmailApiEndPoint = API.baseUrl + API.usersEmailEndPoint;

  if($scope.userModel === undefined || $scope.userModel === "")
    $scope.showFlag = "none";
  else
    $scope.showFlag = "user";

  $scope.getUser = function(){
    var url= "";
    if($scope.userId!="" && $scope.userId!=undefined){
      url=userApiEndPoint + $scope.userId;
    }
    
    if ($scope.userEmail!="" && $scope.userEmail!=undefined) {
      url=userEmailApiEndPoint + $scope.userEmail;
    }

    $http.get(url).success(function(response) {

      if(response){
        $scope.userModel = response;
        $scope.userId = response._id;
        $scope.userEmail = response.email;
        $scope.showFlag = "user";
      }

      else{
        $scope.showFlag = "noUser";
        message = "User not found";
      }

    })
    .error(function(response, status){
      $scope.showFlag = "noUser";
      if(status===404)
      {
        message = "User not found";
      }
    });
  } // end of getUser method
  
  if($scope.switchMode == 'edit')
  {  
   if($scope.userId)
   { 
	 $scope.getUser(); // autoload data
 }
 $scope.showFlag = "user";
}
}])

.directive('user', function() {
  return {
    controller: 'userDirectiveControllerMain',
    templateUrl: '/public/d/user/templates/user-picker.html',
    scope: {
      userModel: "=userModel",
      userId: "=userId",
      userEmail: "=userEmail",
      viewType: "=viewType",
      switchMode: "=switchMode",
      userType: "@userType"
    },

    link : function(scope,element,attrs)
    {
      scope.getTemplate = function(){

        var viewmode = scope.viewType.toLowerCase();

        if(viewmode === "small" && scope.userEmail!="")
        {
          return "/public/d/user/templates/smallpanel.html";
        }
        if(viewmode === "large"){
          return "/public/d/user/templates/largepanel.html";
        }
        if(viewmode === "medium"){
          return "/public/d/user/templates/mediumpanel.html";
        }

      }
    }
  };
});
