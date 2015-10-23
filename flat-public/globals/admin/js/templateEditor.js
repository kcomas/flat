
app.controller('adminTemplateEdit',['$scope','$http',function($scope,$http){
    
    //the current section we are edtiting
    $scope.current = {};
    $scope.current.template = {};
    $scope.current.valid = true;
    $scope.action = {};
    $scope.action.status = null;
    $scope.action.msg = '';
    $scope.templateList = [];
    $scope.sectionList = [];

    $scope.load = function(){
        //load the templates
    };

    //load all of the sections
    $scope.load();

    //valiate the json on change 
    $scope.validate = function(){
        try {
             $scope.current.template.layout = JSON.stringify(JSON.parse($scope.current.template.layout),undefined,4);
            $scope.current.valid = true;
        } catch(err){
             //console.dir(err);
             $scope.current.valid = false;
        }
    };

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
        $scope.current.template = {};
        $scope.action.status = null;
        $scope.action.msg = '';
    };

    $scope.save = function(){
        var jsonData = JSON.parse({
            name : $scope.current.template.name,
            layout : $scope.current.template.layout
        });
        $http.post('/flat-admin/upsert-template',jsonData).success(function(msg,status){
            $scope.action.status = status;
            $scope.action.msg = msg;
        });
   };

}]);


