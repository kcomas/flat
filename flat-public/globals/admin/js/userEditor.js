
app.controller('adminPageEdit',['$scope','$http',function($scope,$http){
    

    //the current section we are edtiting
    $scope.current = {};
    $scope.action = {};
    $scope.action.status = null;
    $scope.action.msg = '';

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
       
    };

}]);


