angular.module('userAutoDirective', [])
.controller('userAutoDirectiveControllerMain', ['$scope', '$http', '$timeout','API', function($scope, $http, $timeout,API) {

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
      url=userEmailApiEndPoint + $scope.userEmail.toLowerCase();
    }

    if($scope.switchMode == 'add' && ($scope.moduleType == 'sessions' || $scope.moduleType == 'keynotes'))
    {
      if ($scope.userEmail == "") {
        url=userEmailApiEndPoint + $scope.userEmail.toLowerCase();
        $scope.userEmail = undefined;
        $scope.userId = undefined;
      }
    }
    if($scope.switchMode == 'edit' && ($scope.moduleType == 'sessions'))
    {
      if ($scope.userEmail =="" && $scope.userId!=null) {
        url=userApiEndPoint + $scope.userId;
      }

      if ($scope.userEmail =="" && $scope.notNull!="") {
        url=userEmailApiEndPoint + $scope.userEmail.toLowerCase();
        $scope.userEmail = undefined;
        $scope.userId = undefined;
      }
    }

    $http.get(url).success(function(response) {
        $scope.userModel = response;
        $scope.userId = response._id;
        $scope.userEmail = response.email;
        $scope.showFlag = "user";
    })
    .error(function(response, status){
      $scope.showFlag = "noUser";
      if(status===404)
      {
        $scope.message = "User is not an organization employee!!";
        $timeout(function () { $scope.message = ''; }, 3000);

      }
      else
      {
        console.log("error with user directive");
        $scope.userId = undefined;
      }
    });
  } // end of getUser method

  $scope.getUser1 = function(){
    $scope.userId = $scope.userId1;
    $scope.userEmail = $scope.userEmail1;
    var url= "";
    if($scope.userId!="" && $scope.userId!=undefined){
      url=userApiEndPoint + $scope.userId;
    }
    
    if ($scope.userEmail!="" && $scope.userEmail!=undefined) {
      url=userEmailApiEndPoint + $scope.userEmail.toLowerCase();
    }

    if($scope.switchMode == 'add' && ($scope.moduleType == 'sessions' || $scope.moduleType == 'keynotes'))
    {
      if ($scope.userEmail == "") {
        url=userEmailApiEndPoint + $scope.userEmail.toLowerCase();
        $scope.userEmail = undefined;
        $scope.userId = undefined;
      }
    }
    if($scope.switchMode == 'edit' && ($scope.moduleType == 'sessions'))
    {
      if ($scope.userEmail =="" && $scope.userId!=null) {
        url=userApiEndPoint + $scope.userId1;
      }

      if ($scope.userEmail =="" && $scope.notNull!="") {
        url=userEmailApiEndPoint + $scope.userEmail.toLowerCase();
        $scope.userEmail = undefined;
        $scope.userId = undefined;
      }
    }

    $http.get(url).success(function(response) {
        $scope.userModel = response;
        $scope.userId = response._id;
        $scope.userEmail = response.email;
        $scope.showFlag = "user";
    })
    .error(function(response, status){
      $scope.showFlag = "noUser";
      if(status===404)
      {
        $scope.message = "User is not an organization employee!!";
        $timeout(function () { $scope.message = ''; }, 3000);

      }
      else
      {
        console.log("error with user directive");
        $scope.userId = undefined;
      }
    });
  } // end of getUser method  

    $scope.inputChanged = function(str) {
       $scope.console10 = str;
       if($scope.console10 == null || $scope.console10 == undefined || $scope.console10 == '')
       {
        $scope.userModel = null;
        $scope.userEmail = null;
        $scope.userId = null;
       }
    }

    $scope.clearInput = function (id) {
      if (id) {
        $scope.$broadcast('angucomplete-alt:clearInput', id);
        $scope.userModel = null;
        $scope.userEmail = null;
        $scope.userId = null;
      }
      else{
        $scope.$broadcast('angucomplete-alt:clearInput');
      }
    }

    $scope.selectedUser = function(selected) {
      if (selected) {
        $scope.userEmail1 = selected.originalObject.email;
        $scope.userId1 = selected.originalObject.userid;
        $scope.getUser1();
      } else {
      }
    };
  if($scope.switchMode == 'edit')
  {  
   if($scope.userId)
   { 
   $scope.getUser(); // autoload data
 }
 $scope.showFlag = "user";
}
}])

.directive('userauto', function() {
  return {
    controller: 'userAutoDirectiveControllerMain',
    templateUrl: '/public/d/autoComplete/templates/user-picker.html',
    scope: {
      userModel: "=userModel",
      userId: "=userId",
      userEmail: "=userEmail",
      viewType: "=viewType",
      switchMode: "=switchMode",
      userType: "@userType",
      moduleType: "@moduleType",
      title: "@title"
    },

    link : function(scope,element,attrs)
    {
      scope.getTemplate = function(){

        var viewmode = scope.viewType.toLowerCase();

        if(viewmode === "small" && scope.userEmail!="")
        {
          return "/public/d/autoComplete/templates/smallpanel.html";
        }
        if(viewmode === "large"){
          return "/public/d/autoComplete/templates/largepanel.html";
        }
        if(viewmode === "medium"){
          return "/public/d/autoComplete/templates/mediumpanel.html";
        }
      }
    }
  };
});
