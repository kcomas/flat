
app.controller('indexEdit',['$scope','$http',function($scope,$http){
    

    //the current section we are edtiting
    $scope.current = {};
    $scope.current.logName = '';
    $scope.current.logText = '';
    $scope.current.logLines = '20';
    $scope.current.info = {};
    $scope.action = {};
    $scope.action.status = null;
    $scope.action.msg = '';
    $scope.current.session = '';


    $scope.getAccessLog = function(){
        $scope.log('access.log');
    };

    $scope.getErrorLog = function(){
        $scope.log('error.log');
    };

    $scope.toDisk = function(){
        $http.post('/flat-admin/index/info/toDisk').success(function(msg,status){
            $scope.action.status = status;
            $scope.action.msg = msg;
        });
    };

    $scope.log = function(name){
        $scope.current.logName = name;
        var jsonData = JSON.stringify({
            log : name,
            lines : $scope.current.logLines
        });
        $http.post('/flat-admin/index/log',jsonData).success(function(log,status){
                $scope.current.logText = log;
        });
    };

    $scope.clear = function(){
        $scope.action.status = null;
        $scope.action.msg = '';
    }

    $scope.refresh = function(){
        $scope.clear();
        $http.post('/flat-admin/index/info').success(function(info,status){
            $scope.current.info = JSON.stringify(info,null,2);
        });
        $http.post('/flat-admin/index/list-sessions').success(function(sessions,status){
            $scope.current.session = JSON.stringify(sessions,null,2);
        });
    };

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


  $scope.refresh();
  $scope.getAccessLog();

}]);


