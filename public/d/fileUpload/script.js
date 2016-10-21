angular.module('fileuploadDirective', [])
.controller('fileuploadDirectiveControllerMain', ['$scope', '$http','$mdDialog', '$mdMedia','Upload','growl', function($scope, $http, $mdDialog, $mdMedia,Upload,growl) {

  var folderType =$scope.folderType;
  if($scope.folderType === folderType)
  {
  $scope.upload = function (dataUrl) {
     var filedata = Upload.dataUrltoBlob(dataUrl);
     var filesize = (filedata.size)/1048576 //file size in MB
     if (filesize > 0.6 && filesize < 1)
     {
     Upload.upload({
      url: '/api/v1/upload/' + folderType,
      data: {
        file: filedata,
      },
    }).then(function (response) {
      $scope.result = response.data;
      $mdDialog.hide();
    });
     }
     else if (filesize > 1)
     {
      window.alert("Cropped Image too big.Please crop image in a nice dimension.");
     }
     else
     {
      window.alert("Cropped Image too small.Please crop image in a nice dimension.");
     }
  };
  }

  $scope.status = '  ';

  $scope.showfileUploadButton = function(ev) {
    $mdDialog.show({
      controller: DialogUploadCtrlFile,
      templateUrl: '/public/d/fileUpload/templates/fileUploadDialog.html',
      locals: { folderType: folderType },
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

.directive('fileupload', function() {
  return {
    controller: 'fileuploadDirectiveControllerMain',
    templateUrl: '/public/d/fileUpload/templates/fileUpload.html',
    scope: {
      folderType:"=folderType"
   },

   link : function(scope,element,attrs)
   {
    scope.getTemplate = function(){

      var foldertype = scope.folderType.toLowerCase();

      if(foldertype === "profilepics")
      {
        return "/public/d/fileUpload/templates/fileProfileUpload.html";
      }
      if(foldertype === "entity"){
        return "/public/d/fileUpload/templates/fileEntityUpload.html";
      }
      if(foldertype === "location"){
        return "/public/d/fileUpload/templates/fileLocationUpload.html";
      }

    }
  }
};
});

function DialogUploadCtrlFile($scope, $mdDialog ,folderType) {

  $scope.folderType =folderType;
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
