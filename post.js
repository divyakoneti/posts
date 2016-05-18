
 var app1 = angular.module('postApp',['ngRoute'])

  app1.config(['$routeProvider', function($routeProvider){
    $routeProvider.

      when('/showPost/:post_id',{
        templateUrl: 'display.htm',              //show view
        controller: 'postsController'
      }).

      when('/newPost',{
        templateUrl: 'form.html',               //new for post creation
        controller: 'postsController'
      }).
      when('/editPost/:post_id',{
        templateUrl: 'edit_form.html',          //edit view
        controller: 'postsController'
      }).
      
        when('/index',{
           templateUrl: 'total.html',          //index view 
           controller: 'postsController'
        }).
        
        when('/sample',{
           templateUrl: 'Users/divya/Documents/angularjs/post/category_form.html',      //render to the index page
           controller:  'categoriesController'
        }).

      otherwise({
        redirect_to: '/showPost'
      });
  }]);


app1.controller("postsController",function($scope,$http,$window){
  $http.get("http://192.168.199.237:3000/categories")
    .then(function(response){
      $scope.categories=response.data.categories;
    });
	$scope.showPost=function(id){

		
   	$http.get("http://192.168.199.237:3000/categories/37/posts/"+id)        //show action          
   	.then(function(response){
      
         
   	$scope.post=response.data.post;
   	});
  }
  $scope.newPost=function(){
    $http.get("http://192.168.199.237:3000/posts/new")
    alert("hello")
    .then(function(response){
      $scope.post=response.data.post;
    })
  }
  $scope.submitForm=function(post){
      
      $http.post("http://192.168.199.237:3000/categories/"+post.category+"/posts/",post)
      .then(function(response){
        alert("post created successfully....")
          $http.get("http://192.168.199.237:3000/posts")          
       .then(function(response)
       {
         
         $scope.posts = response.data.posts;
       });
                      
        
      });
  }
  $scope.editPost= function(id){
      $http.get("http://192.168.199.237:3000/categories/37/posts/"+id+"/edit")
      .then(function(response){
        alert("do u want to edit ")
        $scope.categoey.posts=response.data.category.posts;
      });
  } 
  $scope.updatePost=function(post){

      $http.put("http://192.168.199.237:3000/categories/37/posts/"+post.id)
      .then(function(response){
        alert("updated successfully...")
        $scope.posts=response.data.posts;
      });
  }
  $scope.destroyPost=function(id){
      if($window.confirm("do u want to delete")){
        $http.delete("http://192.168.199.237:3000/categories/37/posts/"+id)
        .then(function(response){
          alert("deleted successfully")
         $scope.posts=response.data.posts; 
        });
      }
  }
  $scope.category_data=function(){
    $http.get("http://192.168.199.237:3000/categories")
    .then(function(response){
      $scope.categories=response.data.categories;
    });
    $scope.category_data();
  }


	
	 $scope.post_data = function(){  
     	
     $http.get("http://192.168.199.237:3000/categories/37/posts")          
       .then(function(response)
       {
         
         $scope.posts = response.data.posts;
       });
  }                    
   $scope.post_data();
 });
	









 