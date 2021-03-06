
app.controller('blogPageEdit',['$scope','$http',function($scope,$http){
    
    $scope.tinymceOptions = {
        height: 400,
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons", 
        plugins : "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor"
    };

    //the current section we are edtiting
    $scope.current = {};
    $scope.current.blog = {};
    $scope.current.blog.permalink = '';
    $scope.current.blog.template = '';
    $scope.current.blogList = {};
    $scope.current.blogList.numPerPage = 10;
    $scope.current.blogList.cache = '';
    $scope.action = {};
    $scope.action.status = null;
    $scope.action.msg = '';
    $scope.blogList =[];

    $scope.load = function(){
        $http.post('/flat-admin/blog/list').success(function(blogs,status){
            $scope.blogList = blogs;
        });
        $http.post('/flat-admin/blog/blogTemplate/get').success(function(data,status){
            $scope.current.blogList.numPerPage = data.numPerPage;
            $scope.current.blogList.cache = data.cache;
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
    $scope.edit = function(blog){
        $scope.current.blog = blog;
    };

    $scope.delete = function(blog){
        var jsonData = JSON.stringify({
            permalink : blog.permalink
        });
        $http.post('/flat-admin/blog/remove',jsonData).success(function(msg,status){
            $scope.action.msg = msg;
            $scope.action.status = status;
            $scope.load();
        });
    };

    $scope.clear = function(){
        $scope.current.blog = {};
        $scope.current.blog.permalink = '';
        $scope.action.msg = '';
        $scope.action.status = null;
    };

    $scope.render = function(blog){
        var jsonData = JSON.stringify({
            permalink : blog.permalink
        });
        $http.post('/flat-admin/blog/render',jsonData).success(function(msg,status){
            $scope.action.msg = msg;
            $scope.action.status = status;
        });
    };

    $scope.save = function(name){
       var tmpTags = [];
       try {
            tmpTags = $scope.current.blog.tags.split(',');
       } catch(err){

       }
       var jsonData = JSON.stringify({
            name : $scope.current.blog.name,
            title : $scope.current.blog.title,
            tags : tmpTags,
            content : $scope.current.blog.content,
            permalink : $scope.current.blog.permalink
       });
       $http.post('/flat-admin/blog/upsert',jsonData).success(function(msg,status){
            $scope.action.msg = msg;
            $scope.action.status = status;
            if($scope.current.blog.permalink === ''){
                //if no permalink for saving reload blogs list
                $scope.clear();
            }
            $scope.load();
       });
    };

    //save the blog list template
    $scope.saveListTemplate = function(){
        var num = parseInt($scope.current.blogList.numPerPage);
        if(isNaN(num)){
            $scope.current.blogList.numPerPage = 10;
        }
        var jsonData = JSON.stringify({
            numPerPage : $scope.current.blogList.numPerPage
        });
        $http.post('/flat-admin/blog/blogTemplate/set',jsonData).success(function(msg,status){
            $scope.action.msg = msg;
            $scope.action.status = status;
            $scope.load();
        });
    };

}]);


