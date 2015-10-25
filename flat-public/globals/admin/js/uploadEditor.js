
app.controller('adminUpload',['$scope','$http',function($scope,$http){

    $scope.current = {};
    $scope.action = {};
    $scope.action.status = null;
    $scope.action.msg = '';
    $scope.current.public = false;
    var fileSelect = document.getElementById('fileToBeUploaded');

    //clear the form
    $scope.clear = function(){
        $scope.current = {};
        $scope.current.public = false;
        $scope.action.status = null;
        $scope.action.msg = '';
    };

    //upload the files
    $scope.upload = function(){
        var formData = new FormData();
        var files = fileSelect.files();
        files.forEach(function(file){
            formData.append('files',file,file.name);
        });
        var xhr = new XMLHttpRequest();
        xhr.xhr.open('POST', '/flat-admin/upload', true);
        xhr.onload = function () {
            if(xhr.status === 200){
                $scope.action.msg = "File Uploaded";
                $scope.status = 200;
            } else {
                $scope.action.msg = "Upload Failed";
                $scope.status = 500;
            }
        };
        xhr.send(formData);
    }

}]);
