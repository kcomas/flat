
app.controller('adminTemplateEdit',['$scope','$http',function($scope,$http){
    
    //the current section we are edtiting
    $scope.current = {};
    $scope.current.visual = true;
    $scope.current.template = {};
    $scope.current.valid = true;
    $scope.current.loadFile = '';
    $scope.action = {};
    $scope.action.status = null;
    $scope.action.msg = '';
    $scope.templateList = [];
    $scope.sectionList = [];
    $scope.fileList = [];
    //the defualt itme list
    $scope.visualItems = [
        {
            tag:"!DOCTYPE html",
            children:[
                {
                    tag:"html",
                    children:[
                        {
                            tag:"head"
                        },
                        {
                            tag:"body"
                        }   
                    ]
                }

            ]
        }
    ];

    $scope.$watch(
        'current.visual',function(newValue,oldValue){
            if(newValue === false){
                $scope.current.template.layout = angular.toJson($scope.visualItems);
                $scope.visualItems = [];
                $scope.validate();
            } else {
                $scope.validate();
                if($scope.current.valid === true){
                    $scope.currentVisualItem = null;
                    $scope.currentVisualKey = null;
                    $scope.visualItems = angular.fromJson($scope.current.template.layout);
                    $scope.current.template.layout = '';
                }
            }
        });

    //delete a att from the visual atts object
    $scope.deleteAtts = function(arr,index){
        arr.splice(index,1);
    };

    //add a child to the json template
    $scope.addChild = function(obj){
        if(!obj.children){
            obj.children = [];
        }
        obj.children.push({tag:'',atts:[],children:[]});
    };

    //remove from the array via the object itself
    $scope.removeElement = function(father,index){
        father.visualItem.children.splice(index,1);        
    };

    $scope.load = function(){
        //load the templates
        $http.post('/flat-admin/template/list').success(function(templates,status){
            $scope.templateList = templates;
        });
        $http.post('/flat-admin/section/list').success(function(sections,status){
            $scope.sectionList = sections;        
        });
        $http.post('/flat-admin/file/list/private').success(function(files,status){
            $scope.fileList = files;
        });
    };

    //load all of the sections
    $scope.load();


    //load a converted json template
    $scope.loadPrivate = function(){
        if($scope.current.loadFile !== null){
            var jsonData = JSON.stringify({
                filename : $scope.current.loadFile.fileName
            });
            $http.post('/flat-admin/template/load-private',jsonData).success(function(file,status){
                $scope.current.template.layout = JSON.stringify(file);
                $scope.visualItems = file;
                $scope.validate();
            });
        }
    };

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

    //make sure the text editor and the visual editor have the same data
    $scope.upadateTemplate = function(newTemplate){
        if(typeof newTemplate === 'string'){
            $scope.visualItems = JSON.parse(newTemplate);
        } else {
            $scope.current.template.layout = JSON.stringify(newTemplate);
        }
        $scope.validate();
    };
    
    //add an attribute
    $scope.addAtts = function(item){
        if(!item.atts){
            item.atts = [];
        }
        var obj = {key:'key',value:'value'};
        item.atts.push(obj);
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
            $scope.visual = false;
            $scope.current.template.name = $scope.templateList[index].name;
            $scope.current.template.layout = $scope.templateList[index].layout;
        }
    };

   $scope.clear = function(){
        $scope.current.template.name = '';
        $scope.current.template.layout = '';
        $scope.visualItems = [];
        $scope.action.status = null;
        $scope.action.msg = '';
    };


	function insertAtCaret(areaId,text) {
    var txtarea = document.getElementById(areaId);
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
        "ff" : (document.selection ? "ie" : false ) );
    if (br == "ie") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        strPos = range.text.length;
    }
    else if (br == "ff") strPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0,strPos);  
    var back = (txtarea.value).substring(strPos,txtarea.value.length); 
    txtarea.value=front+text+back;
    strPos = strPos + text.length;
    if (br == "ie") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        range.moveStart ('character', strPos);
        range.moveEnd ('character', 0);
        range.select();
    }
    else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
}
    
    $scope.currentVisualItem = null;
    $scope.currentVisualKey = null;
    $scope.currentVisualBox = function(model,key){
        $scope.currentVisualItem = model;
        $scope.currentVisualKey = key;
    };

   $scope.insert = function(sectionLayout){
        var str = sectionLayout;
        if($scope.current.visual === true){
            $scope.currentVisualItem[$scope.currentVisualKey] = str;
        } else {
		    insertAtCaret('formEdit',str);
        }
   };

    Array.prototype.move = function(element,offset){
            var index = this.indexOf(element);
            var newIndex = index + offset;
            removedElement = this.splice(index, 1)[0];
            this.splice(newIndex, 0, removedElement);
    }

    //shift a child element up in its array
    $scope.shiftDown = function(itemArr,index){
        if(index < itemArr.length){
            itemArr.move(itemArr[index],1);
        }
    };

    //shift a child element down in its array
    $scope.shiftUp = function(itemArr,index){
        if(index > 0){
            itemArr.move(itemArr[index],-1);
        }
    };

    $scope.save = function(){
        if($scope.current.visual === true){
                $scope.current.template.layout = angular.toJson($scope.visualItems);
                $scope.current.valid = true;
        }
        if(!$scope.current.valid){
            $scope.action.status = 500;
            $scope.action.msg = "Invalid JSON";
        } else {
            var jsonData = JSON.stringify({
                name : $scope.current.template.name,
                layout : $scope.current.template.layout
            });
            $http.post('/flat-admin/template/upsert',jsonData).success(function(msg,status){
                $scope.action.status = status;
                $scope.action.msg = msg;
                $scope.load();
            });
        }
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
        $http.post('/flat-admin/template/remove',jsonData).success(function(msg,status){
            $scope.action.msg = msg;
            $scope.action.status = status;
            $scope.load();
        });
    };

    //download a template
    $scope.download = function(name){
        var win = window.open('/flat-admin/template/download?name='+name,'_blank');
        win.focus();
    };

}]);


