


app.controller('adminSectionEdit',['$scope','$http',function($scope,$http){
    
    $scope.tinymceOptions = {
        height:'500px',
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons", 
        plugins : "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor"
    };

    //the current section we are edtiting
    $scope.current.section = {};
    $scope.save = {};
    $scope.save.status = null;
    $scope.save.msg = '';
    $scope.sectionList = [];

    $scope.load = function(){
        $http.post('/flat-admin/list-sections').success(function(sections,status){
            $scope.sectionList = sections;        
        });
    };

    //load all of the sections
    $scope.load();

    function getItem(name){
        var index = -1;
        for(var i=0,l=$scope.sectionList.length; i<l; i++){
            if($scope.sectionList[i].name === name){
                index = i;
                break;
            }
        }
        return index;
    }

    //edit a section
    $scope.edit = function(name){
        var index = getItem(name);
        if(index !== -1){
            $scope.clear();
            $scope.current.section.name = $scope.sectionList[index].name;
            $scope.current.section.content = $scope.sectionList[index].layout;
        }
    };

    $scope.clear = function(){
        $scope.current.section = {};
        $scope.save.status = null;
        $scope.save.msg = '';
    };

    $scope.save = function(){
        var jsonData = JSON.stringify({
                name : $scope.current.section.name,
                content : $scope.current.section.content
        });

        $http.post('/flat-admin/upsert-section',jsonData).success(function(msg,status){
            $scope.save.msg = msg;
            $scope.save.status = status;
            $scope.load();
        });

    };

}]);


