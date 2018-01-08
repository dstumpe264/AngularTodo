

angular.module('appModule')
.component('todoList',{
	templateUrl : 'app/appModule/todoList/todoList.component.html',
	controller :	 function(todoService, $filter) {
		var vm = this;

		vm.selected = null;
		vm.edit = null;
		
		
	    vm.todos = [];
	    
	    var index = function(){
	    		todoService.index()
	    			.then(function(response){
	    			vm.todos = response.data;
	    		})
	    }
	    
	    index();

	    vm.getNumTodos = function(todos){
	    		vm.numIncomplete = $filter('incomplete')(vm.todos, false);
	    		return vm.numIncomplete.length;
	    }
	    
	    vm.getUrgency = function(){
	    		var num =  vm.getNumTodos(vm.todos);
	    		if(num < 5){
	    			return 'lessFive';
	    		}
	    		else if(num >= 5 && num < 10){
	    			return 'moreFive';
	    		}
	    		else {
	    			return 'moreTen';
	    		}
	    			
	    }
	    
	    vm.isComplete = function(todo){
	    		if (todo.completed) {
					return 'complete';
				}
	    		
	    }

	    vm.addTodo = function(todo){
	    		todoService.create(todo)
	    		.then(function(response){
	    			index();
	    		})
	    };


			vm.detailedView = function(todo){
				var copy = angular.copy(todo);
				vm.selected = copy;
			}

			vm.setEditTodo = function(todo){
				vm.editTodo = angular.copy(vm.selected);
				
			}
			vm.updateTodo = function(todo){
				todoService.update(todo)
				.then(function(response){
					index();
				})
				vm.selected = null;
			};
			
			vm.displayTable = function(){
				vm.selected = null;
			}
			vm.destroy = function(todo){
				todoService.destroy(todo)
				.then(function(response){
					index()
				})
				vm.selected = null;
			}

	},
	controllerAs : 'vm'
})
