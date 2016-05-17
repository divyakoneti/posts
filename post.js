
 var app1 = angular.module('postApp',['ngRoute'])

  app1.config(['$routeProvider', function($routeProvider){
    $routeProvider.

      when('/showPost/:post_id',{
        templateUrl: 'display.htm',
        controller: 'postsController'
      }).

      when('/newPost',{
        templateUrl: 'form.html',
        controller: 'postsController'
      }).
      when('/editPost/:post_id',{
        templateUrl: 'edit_form.html',
        controller: 'postsController'
      }).
     // when('/link3',{
        // templateUrl: 'total.html',
         //controller: 'postsController'
     // }).
        when('/link1',{
           templateUrl: 'home.html',
           controller: 'postsController'
        }).
      otherwise({
        redirect_to: '/showPost'
      });
  }]);


app1.controller("postsController",function($scope,$http,$window){
	$scope.showPost=function(id){
		
   	$http.get("http://192.168.199.237:3000/posts/"+id)        //show action          
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
  $scope.submitForm=function(){
      $http.post("http://192.168.199.237:3000/students",$scope.post)
      .then(function(response){
        alert("post created....")
        $scope.posts=response.data.posts;
      });
  }
  $scope.editPost= function(id){
      $http.get("http://192.168.199.237:3000/posts/"+id+"/edit")
      .then(function(response){
        alert("do u want to edit ")
        $scope.post=response.data.post;
      });
  } 
  $scope.updatePost=function(post){
      $http.put("http://192.168.199.237:3000/posts/"+post.id,post)
      .then(function(response){
        alert("update successfully")
        $scope.posts=response.data.posts;
      });
  }
  $scope.destroyPost=function(id){
      if($window.confirm("do u want to delete")){
        $http.delete("http://192.168.199.237:3000/posts/"+id)
        .then(function(response){
          alert("deleted successfully")
         $scope.posts=response.data.posts; 
        });
      }
  }

	
	 $scope.post_data = function(){                       //index action
  	
     $http.get("http://192.168.199.237:3000/posts")          
       .then(function(response)
       {
         
         $scope.posts = response.data.posts;
       });
  }                    
   $scope.post_data();
 });
	









 