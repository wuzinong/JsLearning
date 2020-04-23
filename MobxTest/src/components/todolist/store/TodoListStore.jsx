import { observable, action, computed } from 'mobx'

class Todo {
    id = Math.random();
    @observable title;
    @observable finished = false;

    constructor(title) {
        this.title = title
    }
}

class TodoList {
    @observable todos = [];

    @computed get completedTodosCount() {
        return this.todos.filter(todo => todo.finished).length;
    }

    @computed get report() {
        if (this.todos.length === 0) 
            return "mission completed"
        return `next task is：${this.todos[0].title}`
    }

    @action addTodo (title) {
        if (!title) return;
        this.todos.push(new Todo(title));
    }
}
const store = new TodoList();
store.todos.push(new Todo('init value1'), new Todo('init value2'));
store.todos[1].finished = true;

export default store;