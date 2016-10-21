angular.module('userprofileDirective', [])
.controller('userprofileDirectiveControllerMain', ['$scope', '$http', '$mdDialog', '$mdMedia','Upload','growl','API', function($scope, $http, $mdDialog, $mdMedia,Upload,growl,API) {

  // user and userEmail rest api constant
  var userApiEndPoint = API.baseUrl + API.usersEndPoint;
  var userEmailApiEndPoint = API.baseUrl + API.usersEmailEndPoint;
  $scope.array = [];

  $scope.entity = "entity";
  if($scope.userModel === undefined || $scope.userModel === "")
    $scope.showFlag = "none";
  else
    $scope.showFlag = "user";

  getUser();

  function getUser() {

    //if both the email and id are given find the user by id only
    if($scope.userEmail || $scope.userId)
    {
      $http.get(userApiEndPoint + $scope.userId).success(function(response) {
        $scope.userModel = response;
        if(response.attachment!=null)
        {
          $scope.array.push(response.attachment);
        }
        $scope.showFlag = "user";
      })
    }

    else
    {
      $scope.showFlag = "noUser";
      if(status===404)
      {
        message = "User not found";
      }
      else
      {
        console.log("Error with the directive");
      }
    }
  }

  $scope.editprofile = function (user,id,resume) {
    console.log(resume);
    console.log(user);
    console.log(id);

    user.attachment = resume.toString();
    var userid = id;
    $http.put(userApiEndPoint + id, user).success(function(response) {

      growl.info(parse("Profile for user [%s]<br/>Edited successfully", userid));
    });
  };

  //edit the profile picture of user by taking dataurl and user id.
  $scope.editpicture = function (dataUrl,users) {
    console.log(users._id);
    Upload.upload({
      url: '/api/v1/upload/profilePics',
      data: {
        file: Upload.dataUrltoBlob(dataUrl),
      },
    }).then(function (response) {
      console.log('update');
      $scope.result = response.data;
      var filepath = response.data.file.path;
      var imagepath = '/'+ filepath.replace(/\\/g , "/");
      users.avatar = imagepath;
      console.log(users.avatar);
      $http.put(userApiEndPoint + users._id, users).success(function(response1) {
        $mdDialog.hide();
      });

    });

  };

  $scope.status = '  ';

  $scope.showButton = function(userModel,ev) {
    //console.log(userModel);
    $mdDialog.show({
      controller: DialogCtrl,
      templateUrl: '/public/d/userProfile/templates/user-dialog.html',
      locals: { userModel: userModel },
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true

    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });

  };

}])

.directive('userprofile', function() {
  return {
    controller: 'userprofileDirectiveControllerMain',
    templateUrl: '/public/d/userProfile/templates/user-profile.html',
    scope: {
      userModel: "=userModel",
      userId: "=userId",
      userEmail: "=userEmail",
    }
  };
});

function DialogCtrl($scope, $mdDialog,userModel) {

  $scope.users = userModel;
  console.log($scope.users);
  console.log($scope.users._id);
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
