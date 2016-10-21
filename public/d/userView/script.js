angular.module('userViewDirective', [])
.controller('userViewDirectiveControllerMain', ['$scope', '$http','API', function($scope, $http, API) {

  // user rest api constant
  var userApiEndPoint = API.baseUrl + API.usersEndPoint;

  if($scope.userModel === undefined || $scope.userModel === "")
    $scope.showFlag = "none";
  else
    $scope.showFlag = "user";

  $scope.getUser = function(){
    if($scope.userId===""){
      $scope.showFlag = "none";
      return;
    }

    if($scope.userId!="" && $scope.userId!=undefined){

      url=userApiEndPoint + $scope.userId;
          $http.get(url).success(function(response) {
      $scope.userModel = response;
      $scope.userId = response._id;
      $scope.showFlag = "user";
    })
    .error(function(response, status){
      $scope.showFlag = "noUser";
      if(status===404)
      {
        message = "User not found";
      }
      else
        console.log("error with userView directive");
    });
    }
  }

}])

.directive('userview', function() {
  return {
    controller: 'userViewDirectiveControllerMain',
    templateUrl: '/public/d/userView/templates/userView.html',
    scope: {
      userId: "=userId",
      viewMode: "@viewMode",
      userModel: "=userModel"
    },

    link : function(scope,element,attrs)
    {
      scope.getTemplate = function()
      {
        var viewmode = attrs.viewMode;

        if(viewmode === "bullet-small"){
          return "/public/d/userView/templates/bulletSmall.html";
        }
        if(viewmode === "brief-view"){
          return "/public/d/userView/templates/briefView.html";
        }
        if(viewmode === "detial-view"){
          return "/public/d/userView/templates/detailView.html";
        }

      }
    }
  };
});
