angular.module('appModule')
.factory('todoService', function($http, $filter){
	var service = {};
	
	service.index = function(){
		return $http({
			method : 'GET',
			url : "rest/user/1/todos"
		})
	};

	service.create = function(todo){
		return $http({
			method : "POST",
			url : "rest/user/1/todos",
		    headers : {
		          'Content-Type' : 'application/json'
		        },
		    data : todo	
		})
		
	};
	
	
	service.update = function(todo){
		
		if(todo.completed){
			todo.completeDate = $filter('date')(Date.now(), 'MM/dd/yyyy')
		}
		if(!todo.completed){
			todo.completeDate = "";
		}
		return $http({
			method : "PUT",
			url : "rest/user/1/todos/" + todo.id ,
		    headers : {
		          'Content-Type' : 'application/json'
		        },
		    data : todo	
		})
	};
	
	service.destroy = function(todo){
		return $http({
			method : "DELETE",
			url : "rest/user/1/todos/" + todo.id,
		})
	};
	
	return service;
})