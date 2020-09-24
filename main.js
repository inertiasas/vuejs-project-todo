
let uuid = 2;

Vue.component('task-list', {
  template: '#task-list',
  props: {
    tasks: {default: []}
  },
  data() {
    return {
      newTask: '',
      filter: 'all'
    }
  },
  computed: {
    taskNumber() {
      return this.tasksFiltered.length;
    },
    tasksFiltered() {
    	if (this.filter == 'progress'){
    		return this.tasks.filter(this.inProgress);
    	}
    	else if (this.filter == 'complete'){
    		return this.tasks.filter(this.isCompleted);
    	}
    	else{
    		return this.tasks;
    	}
    }
  },
  methods: {
    addTask() {
      if (this.newTask) {
        this.tasks.push({
        	id: uuid,
        	title: this.newTask,
        	completed: false,
        });
        this.newTask = '';
        uuid += 1;
      }
    },
    completeTask(task) {
      task.completed = ! task.completed;
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    clearCompleted() {
      this.tasks = this.tasks.filter(this.inProgress);
    },
    clearAll() {
      this.tasks = [];
    },
    
    inProgress(task) {
      return ! this.isCompleted(task);
    },
    isCompleted(task) {
      return task.completed;
    }
  }
});

Vue.component('task-item', {
  template: '#task-item',
  props: ['task'],
  computed: {
    className() {
      let classes = 'border-primary text-primary';
      if (this.task.completed) {
        classes  = 'border-light text-muted bg-light del';
      }
      return classes;
    }
  }
});

new Vue({
  el: '#app',
  data: {
    tasks: [
      {
      	id: 0,
        title: 'Make todo list',
        completed: true
      },
      {
      	id: 1,
        title: 'Go skydiving',
        completed: false
      }
    ]
  }
});