
app.controller('adminUpload',['$scope','$http',function($scope,$http){

    $scope.current = {};
    $scope.action = {};
    $scope.action.status = null;
    $scope.action.msg = '';
    $scope.current.private = false;
    $scope.current.upload = "Upload"
    $scope.current.uploadDisable = false;

    //clear the form
    $scope.clear = function(){
        $scope.current = {};
        $scope.current.public = false;
        $scope.action.status = null;
        $scope.action.msg = '';
    };

    //upload the files
    $scope.upload = function(){
        var formData = sendFile($scope);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/flat-admin/upload', true);
        xhr.onload = function () {
            if(xhr.status === 200){
                $scope.action.msg = xhr.responseText;
                $scope.status = 200;
            } else {
                $scope.action.msg = xhr.statusText;
                $scope.status = 500;
            }
            $scope.current.upload = "Upload"
            $scope.current.uploadDisable = false;
            $scope.current = {};
        };
        xhr.send(formData);
    }
}]);

function sendFile($scope){
    $scope.current.upload = "Uploading....."
    $scope.current.uploadDisable = true;
    fileSelect = document.getElementById('fileToBeUploaded');
    var formData = new FormData();
    var files = fileSelect.files;
    for(var i=0,l=files.length; i<l; i++){
        formData.append('fileData',files[i],files[i].name);
    }
    formData.append('name',$scope.current.name);
    formData.append('private',$scope.current.private);
    return formData;
}
