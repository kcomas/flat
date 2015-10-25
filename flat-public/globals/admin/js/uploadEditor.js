
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
        fileSelect.files = null;
    };

}]);
