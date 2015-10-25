
app.controller('adminUpload',['$scope','$http',function($scope,$http){

    $scope.current = {};
    $scope.action = {};
    $scope.action.status = null;
    $scope.action.msg = '';
    $scope.current.private = false;
    $scope.current.upload = "Upload"
    $scope.current.uploadDisable = false;
    $scope.uploadList = [];    
    $scope.uploadDirs = {};

    $http.post('/flat-admin/upload/dirs').success(function(jsonData,status){
        $scope.uploadDirs = jsonData;
    });


    $scope.getDir = function(bool){
        if($scope.uploadDirs.private){
            if(bool){
                return $scope.uploadDirs.private;
            } else {
                return $scope.uploadDirs.private;
            }
        }
    };

    $scope.load = function(){
        $http.post('/flat-admin/list-files').success(function(files,status){
            $scope.uploadList = files;
        });
    };

    $scope.load();

    //clear the form
    $scope.clear = function(){
        $scope.current.public = false;
        $scope.current.private = false;
        $scope.action.status = null;
        $scope.action.msg = '';
    };

    //upload the files
    $scope.uploadFile = function(){
        $scope.current.upload = "Uploading....."
        $scope.current.uploadDisable = true;
        sendFile($scope,function(stat,msg){
            $scope.current.upload = "Upload";
            $scope.current.uploadDisable = false;
            if(stat === 200){
                $scope.action.msg = msg
                $scope.action.status = 200;
            } else {
                $scope.action.msg = msg
                $scope.action.status = 500;
            }
            $scope.$apply();
            $scope.load();
        });
    }
}]);

function sendFile($scope,callback){
    fileSelect = document.getElementById('fileToBeUploaded');
    var formData = new FormData();
    var files = fileSelect.files;
    for(var i=0,l=files.length; i<l; i++){
        formData.append('fileData',files[i],files[i].name);
    }
    formData.append('private',$scope.current.private);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/flat-admin/upload', true);
    xhr.onload = function () {
        if(xhr.status === 200){
            return callback(xhr.status,xhr.responseText);
        } else {
            return callback(xhr.status,xhr.statusText);
        }
    };
    xhr.send(formData);
}
