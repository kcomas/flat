
//init tinymce
tinymce.init({
    selector:'#tinymce',
    plugins: [
         "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
     "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
     "save table contextmenu directionality emoticons template paste textcolor"
   ],
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      ink image | print preview media fullpage | forecolor backcolor emoticons"
});


app.controller('adminSectionEdit',['$scope','$http',function($scope,$http){
    
    $scope.sectionList = [];
    //load all of the sections
    

    //the current section we are edtiting
    $scope.current = {};

}]);
