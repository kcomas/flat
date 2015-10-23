
app.controller('adminSectionEdit',['$scope','$http',function($scope,$http){
    
    $scope.tinymceOptions = {
        height: '100%',
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons", 
        plugins : "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor"
    };


    //the current section we are edtiting
    var tab = {};
    tab['0'] = true;
    $scope.current = {};
    $scope.current.section = {};
    $scope.save = {};
    $scope.delete = {};
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

    $scope.delete = function(name){
        try {
            var jsonData = JSON.stringify({
                name : $scope.sectionList[getItem(name)].name
            });
        } catch(err){
            $scope.delete.status = 500;
            $scope.delete.msg = err;
            return;
        }
        $http.post('/flat-admin/remove-section',jsonData).success(function(msg,status){
            $scope.delete.msg = msg;
            $scope.delete.status = status;
            $scope.load();
        });
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


