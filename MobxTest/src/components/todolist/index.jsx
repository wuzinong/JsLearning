import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

const TodoView = ({todo}) => (
    <li 
        onClick={
            () => {todo.finished = !todo.finished;}
        }
        style={{
               textDecoration:todo.finished?'line-through':'none',
               color:todo.finished?'green':'black'
           }}
    >
        {todo.title}
    </li>
)
@inject('TodoListStore')

@observer
class TodoListView extends Component {
    constructor(props) {
      super(props);
      this.state = {
          title: ''
      }
    }

  changeTitle = e => {
      let title = e.target.value;
      this.setState({title});
  }

  submit = () => {
      this.props.TodoListStore.addTodo(this.state.title);
  }

  render() {
      return (
          <div>
              <input type="text" value={this.state.title} onChange={this.changeTitle} />
        <button onClick={this.submit}>submit</button>
        <ul>
            {this.props.TodoListStore.todos.map(todo => (
                <TodoView todo={todo} key={todo.id} />
            ))}
        </ul>
        Tasks finished: {this.props.TodoListStore.completedTodosCount}
          </div>
      );
  }
}
export default TodoListView