
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
        $http.post('/flat-admin/list-templates').success(function(templates,status){
            $scope.templateList = templates;
        });
        $http.post('/flat-admin/list-sections').success(function(sections,status){
            $scope.sectionList = sections;        
        });
       
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

    function getItem(name,array){
        var index = -1;
        for(var i=0,l=array.length; i<l; i++){
            if(array[i].name === name){
                index = i;
                break;
            }
        }
        return index;
    }
    //edit a section
    $scope.edit = function(name){
        var index = getItem(name,$scope.templateList);
        if(index !== -1){
            $scope.clear();
            $scope.current.template.name = $scope.templateList[index].name;
            $scope.current.template.layout = $scope.templateList[index].layout;
        }
    };

   $scope.clear = function(){
        $scope.current.template = {};
        $scope.action.status = null;
        $scope.action.msg = '';
    };

    $scope.save = function(){
        var jsonData = JSON.stringify({
            name : $scope.current.template.name,
            layout : $scope.current.template.layout
        });
        $http.post('/flat-admin/upsert-template',jsonData).success(function(msg,status){
            $scope.action.status = status;
            $scope.action.msg = msg;
            $scope.load();
        });
   };

    $scope.delete = function(name){
        try {
            var jsonData = JSON.stringify({
                name : $scope.templateList[getItem(name,$scope.templateList)].name
            });
        } catch(err){
            $scope.action.status = 500;
            $scope.action.msg = err;
            return;
        }
        $http.post('/flat-admin/remove-template',jsonData).success(function(msg,status){
            $scope.action.msg = msg;
            $scope.action.status = status;
            $scope.load();
        });
    };

}]);


