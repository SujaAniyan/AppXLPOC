'use strict';

var profileApp = angular.module('profile');

profileApp.service('multipartForm', ['$http', function($http){
  this.post = function(uploadUrl, data){
    var fd = new FormData();
    for(var key in data)
      fd.append(key, data[key]);
    $http.post(uploadUrl, fd, {
      transformRequest: angular.indentity,
      headers: { 'Content-Type': undefined }
    }).success(function(response){
        });
  }
}]);


profileApp.controller('profileControllerMain', ['$scope', '$http', 'growl', '$rootScope', 'Upload', '$timeout','$mdDialog','$mdMedia','API',
  function($scope, $http, growl, $rootScope, Upload, $timeout,$mdDialog,$mdMedia,API) { 
      
      // users rest api constant
      var userApiEndPoint = API.baseUrl + API.usersEndPoint;

      //acts as get user profile by id for logged in user
      var refresh = function(id) {
      id=$rootScope.user._id;
      $http.get(userApiEndPoint + id).success(function(response) {
      $scope.user = response;  
      $scope.email = $scope.user.email;
      $scope.facebooktoken = '';
      $scope.twittertoken = '';
      $scope.googletoken = '';
      });
      };refresh();  

}])

profileApp.controller('profilebyIdControllerMain', ['$scope', '$http', 'growl','$routeParams','Upload', '$timeout','$mdDialog','$mdMedia','API',
  function($scope, $http, growl,$routeParams, Upload, $timeout,$mdDialog,$mdMedia,API) { 
      
      // users rest api constant
      var userApiEndPoint = API.baseUrl + API.usersEndPoint;
      
      $scope.profileId = $routeParams.id;
      //acts as get user profile by id
      var refresh = function(id) {
      id=$scope.profileId;
      $http.get(userApiEndPoint + id).success(function(response) {
      $scope.userdata = response;  
      $scope.email = $scope.userdata.email;
      $scope.facebooktoken = '';
      $scope.twittertoken = '';
      $scope.googletoken = '';
      });
      };refresh();  
      
      //upload the file(url of image) to database with ngFileupload and multer 
      $scope.upload = function (dataUrl) {
          Upload.upload({
              url: '/api/v1/upload/',
              data: {
                  file: Upload.dataUrltoBlob(dataUrl),                
              },
          }).then(function (response) {            
                $scope.result = response.data;
                $scope.user.avatar=response.data.file.path;   
                $rootScope.cropdataurl=response.data.file.path;             
                $http.post(userApiEndPoint,$scope.user).success(function(response1) {
                });
           });
      };

      //edit the profile picture of user by taking dataurl and user id.
      $scope.editpicture = function (dataUrl,usersdata) {
          Upload.upload({
              url: '/api/v1/upload/profilePics',
              data: {
                  file: Upload.dataUrltoBlob(dataUrl),                
              },
          }).then(function (response) {
                $scope.result = response.data;
                var filepath = response.data.file.path;
                var imagepath = '/'+ filepath.replace(/\\/g , "/");
                usersdata.avatar = imagepath;
                $http.put(userApiEndPoint + usersdata._id, usersdata).success(function(response1) {
                  $mdDialog.hide();
                });
           });
           
      };  
      
      //edit the profile data user by taking user id.
      $scope.editprofile = function (userdata,id) {         
          $http.put(userApiEndPoint + id, $scope.userdata).success(function(response) {
                growl.info(parse("Profile for user [%s]<br/>Edited successfully", id));
          });
      };  

      $scope.showAdvanced = function(userdata,ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: '/public/mods/profile/profiledialog.html',
          locals: { users: userdata },
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true      
        })   
      };

  
}])

function DialogController($scope, $mdDialog, users) {

  $scope.usersdata=users;

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}