
app.controller('userPageEdit',['$scope','$http',function($scope,$http){
    

    //the current section we are edtiting
    $scope.current = {};
    $scope.current.user = {};
    $scope.action = {};
    $scope.action.status = null;
    $scope.action.msg = '';
    $scope.userList = [];

    //load the user
    $http.post('/flat-admin/user/current').success(function(user,status){
        $scope.current.user = user;
    });
    

    $scope.load = function(){
       $http.post('/flat-admin/user/list').success(function(users,status){
            $scope.userList = users;
       });
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
        $http.post('/flat-admin/user/current/update',jsonData).success(function(msg,status){
            $scope.action.msg = msg;
            $scope.action.status = status;
        });
    };

    //new user functions
    //clear the new user
    $scope.clearUser = function(){
        $scope.newUser = {};
    };

    //add the new user
    $scope.addUser = function(){
        var jsonData = JSON.stringify({
            username : $scope.newUser.name,
            email : $scope.newUser.email,
            passA : $scope.newUser.passwordA,
            passB : $scope.newUser.passwordB
        });
        $http.post('/flat-admin/user/add',jsonData).success(msg,status){
            $scope.action.status = status;
            $scope.action.msg = msg;
            $scope.load();
        });
    };

}]);


