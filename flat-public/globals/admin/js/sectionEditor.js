


app.controller('adminSectionEdit',['$scope','$http',function($scope,$http){
    
    $scope.tinymceOptions = {
        height:500,
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons", 
        plugins : "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor"
    };

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

    //the current section we are edtiting
    $scope.current = {};

    $scope.clear = function(){
        $scope.current = {};
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


