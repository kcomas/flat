
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

    $http.post('/flat-admin/file/dirs').success(function(jsonData,status){
        $scope.uploadDirs = jsonData;
    });


    $scope.getDir = function(bool,name){
        if($scope.uploadDirs.private){
            var dir = ''
            if(bool){
                dir = $scope.uploadDirs.private;
            } else {
                dir = $scope.uploadDirs.public;
            }
            return dir+name;
        }
    };

    $scope.load = function(){
        $http.post('/flat-admin/file/list').success(function(files,status){
            $scope.uploadList = files;
        });
    };

    //delete a file
    $scope.delete = function(obj){
        var jsonData = JSON.stringify({
            name : obj.fileName
        });
        $http.post('/flat-admin/file/remove',jsonData).success(function(msg,status){
            $scope.action.msg = msg;
            $scope.action.status = status;
            $scope.load();
        });
    };


    var public_remove = '../flat-public';
    //view a public or private file
    $scope.view = function(obj){
        var dir = $scope.getDir(obj.private,obj.fileName);
        if(obj.private === false){
            dir = dir.replace(public_remove,'');
            var win = window.open(dir,'_blank');
            win.focus();
        }
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
    xhr.open('POST', '/flat-admin/file/upload', true);
    xhr.onload = function () {
        if(xhr.status === 200){
            return callback(xhr.status,xhr.responseText);
        } else {
            return callback(xhr.status,xhr.statusText);
        }
    };
    xhr.send(formData);
}
