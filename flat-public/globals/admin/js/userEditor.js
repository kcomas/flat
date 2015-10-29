
app.controller('userPageEdit',['$scope','$http',function($scope,$http){
    

    //the current section we are edtiting
    $scope.current = {};
    $scope.current.user = {};
    $scope.action = {};
    $scope.action.status = null;
    $scope.action.msg = '';

    //load the user
    $http.post('/flat-admin/current-user').success(function(user,status){
        $scope.current.user = user;
    });
    

    $scope.load = function(){
        
    };

    //load all of the sections
    $scope.load();

    function getItem(name,arr){
        var index = -1;
        for(var i=0,l=arr.length; i<l; i++){
            if(arr[i].name === name){
                index = i;
                break;
            }
        }
        return index;
    }

    $scope.delete = function(page){
    
    };

    $scope.clear = function(){
        $scope.action.status = null;
        $scope.action.msg = '';
    };


    $scope.save = function(name){
        var jsonData = JSON.stringify({
            email : $scope.current.user.email,
            changePass : $scope.current.updatePassword,
            passA : $scope.current.newPasswordA,
            passB : $scope.current.newPasswordB
        });
        $http.post('/flat-admin/current-user/update',jsonData).success(function(msg,status){
            $scope.action.msg = msg;
            $scope.action.status = status;
        });
    };

}]);


