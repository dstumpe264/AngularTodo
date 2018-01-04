angular.module('appModule')
.factory('todoService', function(){
	var service = {};
	
	var todos = [
        {
	          id : 1,
	          task : 'Apply for jobs',
	          description : '',
	          completed : false
	        },
	        {
	          id : 2,
	          task : 'Play games',
	          description : '',
	          completed : false
	        },
	        {
	          id : 3,
	          task : 'Do Code',
	          description : '',
	          completed :  false
	        }
	];
	
	service.index = function(){
		return todos;
	};
	service.create = function(todo){
		var copy = angular.copy(todo);
//		todo.description = '';
		todo.completed = false;
		todo.id = generateId();
		todos.push(todo);
	};
    var generateId = function() {
  	  return todos[todos.length-1].id + 1;
  	};
	
	service.update = function(todo){
		todos.forEach(function(item, index, array){
			if (item.id === todo.id) {
				array.splice(index, 1, todo);
			}
		});
	};
	
	service.destroy = function(todo){
		todos.forEach(function(item, index, array){
			if (item.id === todo.id) {
				array.splice(index, 1);
			}
		});
		
	};
	
	return service;
})