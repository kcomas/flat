
app.controller('adminPageEdit',['$scope','$http',function($scope,$http){
    
    $scope.tinymceOptions = {
        height: 400,
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons", 
        plugins : "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor"
    };

    //the current section we are edtiting
    $scope.current = {};
    $scope.page = {};
    $scope.page.template = null;
    $scope.page.def = {};
    $scope.page.permalink = '';
    $scope.current.template = null;
    $scope.action = {};
    $scope.action.status = null;
    $scope.action.msg = '';
    $scope.templateList = [];
    $scope.pageList = [];
    $scope.sectionParts = [];
    $scope.part = {};
    $scope.part.sectionEditType = 'null';
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
        if($scope.page.template){
            $scope.current.template = $scope.page.template;
        }
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
        $scope.page = page;
        $scope.loadSelections();
    };

    $scope.editPart = function(part){
       $scope.part.name = part.name;
       $scope.part.sectionEditType = part.type;
       $scope.part.html = part.html;
       $scope.part.text = part.text;
       $scope.part.index = part.index;
    };

    //list the replaceable parts in the template
    $scope.loadSelections = function(){
        $scope.sectionParts = [];
        if(!$scope.current.template){
            $scope.current.template = $scope.templateList[getItem($scope.page.template,$scope.templateList)];
        }
        var parts = $scope.current.template.layout.match(/(%%)(.*?)\1/g);
        var i=0;
        parts.forEach(function(part){
            part = part.replace(/%%/g,'');
            part = part.split('!');
            partA = part[1].split(':');
            //merge the page defs with the part
            if($scope.page.def[part[0]]){
                if($scope.page.def[part[0]].type === 'text'){
                    var obj = {'name':part[0],'type':partA[0],'text':$scope.page.def[part[0]].text,'html':$scope.page.def[part[0]].text,'index':i}; 
                } else if($scope.page.def[part[0]].type === 'html'){
                    var obj = {'name':part[0],'type':partA[0],'text':$scope.page.def[part[0]].html,'html':$scope.page.def[part[0]].html,'index':i}; 
                }
            } else {
                var obj = {'name':part[0],'type':partA[0],'text':partA[1],'html':partA[1],'index':i}; 
            }
            $scope.sectionParts.push(obj);
            i++;
        });

    };

    $scope.delete = function(page){
 
    };

    $scope.clear = function(){
        $scope.current.page = {};
        $scope.action.status = null;
        $scope.action.msg = '';
    };

    $scope.partUpdate = function(){
        var i = $scope.part.index;
        $scope.sectionParts[i].text = $scope.part.text; 
        $scope.sectionParts[i].html = $scope.part.html; 
    };

    $scope.save = function(name){
       var newArr = [];
       $scope.sectionParts.forEach(function(part){
            var obj = {};
            obj.name = part.name;
            if(part.type === 'text'){
                obj.text = part.text;
            } else if(part.type === 'html'){
                obj.html = part.html;
            }
            obj.type = part.type;
            newArr.push(obj);
       });
       var jsonData = JSON.stringify({
            permalink : $scope.page.permalink,
            template : $scope.current.template.name,
            def : newArr
       });
       $scope.page.template = $scope.current.template;
       $http.post('/flat-admin/upsert-page',jsonData).success(function(msg,status){
            $scope.action.status = status;
            $scope.action.msg = msg;
            $scope.load();
       });
    };

}]);


