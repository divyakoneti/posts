


  var app = angular.module("postApp", []);
  app.controller("categoriesController", function($scope, $http) {
  $scope.newCategoryValue = 0;
  $scope.newCategory = function(value){
        $scope.newCategoryValue = value;                 //value for new category
        };

      $scope.allCategoriesValue = 0;
      $scope.allCategories = function(value){           
      $scope.allCategoriesValue = value;  
      }

      $scope.clear = function(){
	    $scope.category.name="";                 //after creation clear the form

          $(".clr").hide();
	    }  
	
                     //hide the update form                     
              
   $scope.submitForm=function(){                       
     $http.post("http://192.168.199.237:3000/categories",$scope.category)      //post action for create new category
    	.then(function(response){
         $http.get("http://192.168.199.237:3000/categories")                   
        .then(function(response)
          {
             $scope.categories = response.data.categories;
          });
        $("#content").html("category Record created successfully");
   	 });
   }
  $scope.updateForm=function(id){
  	$http.put("http://192.168.199.237:3000/categories/"+id,$scope.category)     //update action 
   	.then(function(response){
   		 $http.get("http://192.168.199.237:3000/categories")                       
       .then(function(response)
       {
         $scope.categories = response.data.categories;
       });
   	});	

  }
  $scope.show=function(id){
   	$http.get("http://192.168.199.237:3000/categories/"+id)        //show action          
   	.then(function(response){

   		$scope.category1=response.data.category;
   	});
  }
   $scope.destroy=function(id){                                       
   	if(confirm("sure"))                                         //destroy action
       	       
  $http.delete("http://192.168.199.237:3000/categories/"+id)
  .then(function(response){
   $scope.category1=response.data.category;
  });
   
  }   
  $scope.edit=function(id){                                  //edit action
                                           
  	$http.get("http://192.168.199.237:3000/categories/"+id)        
  	.then(function(response){
  		$scope.id=id;
  		
  		$scope.category_edit=response.data.category;
  		$scope.category=$scope.category_edit;
  	});
  }

  $scope.category_data = function(){                       //index action
  	
     $http.get("http://192.168.199.237:3000/categories")          
       .then(function(response)
       {
       
         $scope.categories = response.data.categories;
       });
  }
   $scope.category_data();
 });
  


  




