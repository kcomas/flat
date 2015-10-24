
app.controller('adminPageEdit',['$scope','$http',function($scope,$http){
    
    $scope.tinymceOptions = {
        height: 400,
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons", 
        plugins : "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor"
    };

    //the current section we are edtiting
    $scope.current = {};
    $scope.current.sectionEditType = 0;
    $scope.current.page = {};
    $scope.current.template = {};
    $scope.action = {};
    $scope.action.status = null;
    $scope.action.msg = '';
    $scope.templateList = [];
    $scope.pageList = [];
    $scope.sectionParts = [];
    $scope.part = {};
    $scope.part.name = '';
    $scope.part.layout = '';

    $scope.load = function(){
        //load the templates
        $http.post('/flat-admin/list-templates').success(function(templates,status){
            $scope.templateList = templates;
        });
        //load the pages
        $http.post('/flat-admin/list-pages').success(function(pages,status){
            $scope.pageList = pages;
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

    //edit a section
    $scope.edit = function(name){
        var index = getItem(name);
        if(index !== -1){
        }
    };


    //list the replaceable parts in the template
    $scope.loadSelections = function(){
        $scope.sectionParts = [];
        var tmp = getItem($scope.current.template.name,$scope.templateList);
        var parts = tmp.match(/(%%)(.*?)\1/g);
        parts.forEach(function(part){
            part = part.replace(/%%/g,'');
            part = part.split(';',';');
            $scope.sectionParts.push({'name':part[0],'type':part[1],'default':part[2]);
        });

    };

    $scope.delete = function(name){
 
    };

    $scope.clear = function(){
        $scope.current.page = {};
        $scope.action.status = null;
        $scope.action.msg = '';
    };

    $scope.save = function(){
    };

}]);


