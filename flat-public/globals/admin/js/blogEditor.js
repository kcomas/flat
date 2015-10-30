
app.controller('adminPageEdit',['$scope','$http',function($scope,$http){
    
    $scope.tinymceOptions = {
        height: 400,
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons", 
        plugins : "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor"
    };

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

    //edit a section
    $scope.edit = function(page){
    };


    $scope.delete = function(page){
    };

    $scope.clear = function(){
    };


    $scope.save = function(name){
        
    };

    

}]);


