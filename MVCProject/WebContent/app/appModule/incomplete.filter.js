angular.module('appModule')
.filter('incomplete', function(){
	return function(todos, bool){
		if(bool){
			return todos;
		}
		var incompleted = [];
		todos.forEach(function(todo){
			if (!todo.completed) {
				incompleted.push(todo);
			}
		})
		return incompleted;
	}
})