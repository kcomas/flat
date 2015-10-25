
app.controller('adminUpload',['$scope','$http',function($scope,$http){

    $scope.current = {};
    $scope.action = {};
    $scope.action.status = null;
    $scope.action.msg = '';
    $scope.current.public = false;

    //clear the form
    $scope.clear = function(){
        $scope.current = {};
        $scope.action.status = null;
        $scope.action.msg = '';
    };

}]);
